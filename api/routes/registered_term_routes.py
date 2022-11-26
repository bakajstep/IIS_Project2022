from ..models.database import db
from ..models.term_model import Term
from ..models.room_model import Room
from flask import request
from flask_restx import Resource, fields
from .routes import rest_api
import json


"""
    Flask-Restx models for api request and response data
"""


update_term_model = rest_api.model('UpdateTermModel',
                                     {
                                        "label": fields.String(required=True, min_length=1, max_length=64),
                                        "rating": fields.Integer(required=True),
                                        "min_points": fields.Integer(required=True),
                                        "date": fields.DateTime(required=True)
                                    })

term_model = rest_api.model('TermModel',
                                     {
                                        "label": fields.String(required=True, min_length=1, max_length=64),
                                        "rating": fields.Integer(required=True),
                                        "min_points": fields.Integer(required=True),
                                        "date": fields.DateTime(required=True),
                                        "course_id": fields.Integer(required=True),
                                        "room_id": fields.Integer(required=False)
                                    })

room_model = rest_api.model('RoomModel',
                            {
                                "id": fields.Integer(required=True),
                                "label": fields.String(required=True, min_length=1, max_length=64),
                                "capacity": fields.Integer(required=True)
                            })

register_on_term_model = rest_api.model('RegisterOnTermModel',
                                        {
                                            "term_id": fields.Integer(required=True),
                                            "student_id":  fields.Integer(required=True),

                                        }*)
    term_id = db.Column(db.Integer(), db.ForeignKey('term.id', ondelete="CASCADE"))
    student_id = db.Column(db.Integer(), db.ForeignKey('student.id', ondelete="CASCADE"))


"""
    Flask-Restx routes
"""

@rest_api.route('/api/registered_term/register')
class RegisterToTerm(Resource):
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
