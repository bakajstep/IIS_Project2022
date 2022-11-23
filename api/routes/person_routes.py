from ..models.database import db
from ..models.person_model import Person
from flask import request
from flask_restx import Resource, fields
from .routes import rest_api
import json


"""
    Flask-Restx models for api request and response data
"""

signup_model = rest_api.model('SignUpModel', {"name": fields.String(required=True, min_length=1, max_length=64),
                                              "surname": fields.String(required=True, min_length=1, max_length=64),
                                              "email": fields.String(required=True, min_length=4, max_length=64),
                                              "password": fields.String(required=True, min_length=4, max_length=20),
                                              "admin": fields.Boolean(required=True)
                                              })

login_model = rest_api.model('LoginModel', {"email": fields.String(required=True, min_length=4, max_length=64),
                                            "password": fields.String(required=True, min_length=4, max_length=16)
                                            })

update_password_model = rest_api.model('UpdatePasswordModel',
                                       {
                                           "old_password": fields.String(required=True, min_length=0, max_length=16),
                                           "new_password": fields.String(required=True, min_length=0, max_length=16)
                                       })

update_person_model = rest_api.model('UpdatePersonModel',
                                     {
                                         "name": fields.String(required=True, min_length=1, max_length=64),
                                         "surname": fields.String(required=True, min_length=1, max_length=64),
                                         "email": fields.String(required=True, min_length=4, max_length=64)
                                     })

"""
    Flask-Restx routes
"""


@rest_api.route('/api/person/login')
class Login(Resource):
    """
       Login person by taking 'login_model' input and send back success
    """

    @rest_api.expect(login_model)
    def post(self):

        req_data = request.get_json()

        _email = req_data.get("email")
        _password = req_data.get("password")

        user_exists = Person.get_by_email(_email)

        if not user_exists:
            return {"success": False,
                    "msg": "This email does not exist."}, 404

        if not user_exists.check_password(_password):
            return {"success": False,
                    "msg": "Wrong credentials."}, 404

        return {"success": True,
                "user": user_exists.to_json()}, 200


@rest_api.route('/api/person/register')
class Register(Resource):
    """
       Register person by taking 'signup_model' input and store it
    """

    @rest_api.expect(signup_model)
    def post(self):
        req_data = request.get_json()

        _name = req_data.get("name")
        _surname = req_data.get("surname")
        _email = req_data.get("email")
        _password = req_data.get("password")
        _admin = req_data.get("admin")

        user_exists = Person.get_by_email(_email)

        if user_exists:
            return {"success": False,
                    "msg": "This email is already taken."}, 400

        new_person = Person(name=_name, surname=_surname, email=_email, password_hash=_password, admin=_admin)
        db.session.add(new_person)
        db.session.commit()

        return {"success": True,
                "user": new_person.to_json()}, 200


@rest_api.route('/api/person/<int:perId>')
class SinglePerson(Resource):
    """
       List or update single person
    """

    def get(self, perId):
        _id = perId
        user_exists = Person.get_by_id(_id)

        if not user_exists:
            return {"success": False,
                    "msg": "Person does not exist."}, 400

        return {"success": True,
                "user": user_exists.to_json()}, 200

    @rest_api.expect(update_person_model, validate=True)
    def put(self, perId):
        req_data = request.get_json()
        user_exists = Person.get_by_id(perId)

        if not user_exists:
            return {"success": False,
                    "msg": "Person does not exist."}, 400

        setattr(user_exists, 'name', req_data.get("name"))
        setattr(user_exists, 'surname', req_data.get("surname"))
        setattr(user_exists, 'email', req_data.get("email"))
        db.session.commit()
        updated_user = Person.get_by_id(perId)
        return {"success": True,
                "user": updated_user.to_json()}, 200


@rest_api.route('/api/person')
class SinglePerson(Resource):
    """
       List all person from datatbase
    """

    def get(self):
        user_list = Person.get_all()

        if not user_list:
            return {"success": False,
                    "msg": "No person."}, 400

        persons_json = ""
        for person in user_list:
            persons_json += json.dumps(person.to_json())

        return {"success": True,
                "count": len(user_list),
                "user": persons_json}, 200


@rest_api.route('/api/person/<int:perId>/password')
class SinglePerson(Resource):

    @rest_api.expect(update_password_model, validate=True)
    def put(self, perId):
        req_data = request.get_json()
        user_exists = Person.get_by_id(perId)

        if not user_exists:
            return {"success": False,
                    "msg": "Person does not exist."}, 403

        if not user_exists.password_hash == req_data.get("old_password"):
            return {"success": False,
                    "msg": "Old password does not match."}, 403

        setattr(user_exists, 'password_hash', req_data.get("new_password"))
        db.session.commit()
        updated_user = Person.get_by_id(perId)
        return {"success": True,
                "user": updated_user.to_json()}, 200
