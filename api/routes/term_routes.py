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


"""
    Flask-Restx routes
"""

@rest_api.route('/api/term')
class Terms(Resource):
    """
       Create new course
    """

    @rest_api.expect(term_model)
    def post(self):
        req_data = request.get_json()

        _label = req_data.get('label')
        _rating = req_data.get('rating')
        _min_points = req_data.get('min_points')
        _date = req_data.get('date')
        _course_id = req_data.get('course_id')
        _room_id = req_data.get('room_id')


        term_exists = Term.get_by_label(req_data.get('label'))

        if term_exists:
            return {"success": False,
                    "msg": "This term already exist."}, 404

        new_term = Term(label=_label, rating=_rating, min_points=_min_points, date=_date, course_id=_course_id,
                        room_id=_room_id)
        db.session.add(new_term)
        db.session.commit()

        print(new_term.to_json())

        return {"success": True,
                "course": new_term.to_json()}, 200


@rest_api.route('/api/term/<int:termId>/room')
class Courses(Resource):
    """
       Get room where term is held at
    """

    def get(self, termId):
        term = Term.get_by_id(termId)

        if not term:
            return {"success": False,
                    "msg": "This term does not exist."}, 404

        if not term.room_id:
            return {"success": False,
                    "msg": "This term does not have room."}, 404

        room_json = Room.get_by_id(term.room_id).to_json()

        return {"room": room_json}, 200


@rest_api.route('/api/term/<int:termId>')
class SingleTerm(Resource):
    """
       List or update single term
    """

    def get(self, termId):
        _id = termId
        term_exists = Term.get_by_id(_id)

        if not term_exists:
            return {"success": False,
                    "msg": "Term does not exist."}, 400

        return {"success": True,
                "term": term_exists.to_json()}, 200

    @rest_api.expect(update_term_model, validate=True)
    def put(self, termId):
        req_data = request.get_json()
        term_exists = Term.get_by_id(termId)

        if not term_exists:
            return {"success": False,
                    "msg": "Term does not exist."}, 400

        setattr(term_exists, 'label', req_data.get("label"))
        setattr(term_exists, 'rating', req_data.get("rating"))
        setattr(term_exists, 'min_points', req_data.get("min_points"))
        setattr(term_exists, 'date', req_data.get("date"))
        db.session.commit()
        updated_term = Term.get_by_id(termId)
        return {"success": True,
                "term": updated_term.to_json()}, 200

    def delete(self, termId):
        term_exists = Term.get_by_id(termId)

        if not term_exists:
            return {"success": False,
                    "msg": "Term does not exist."}, 400

        db.session.query(Term).filter(Term.id == termId).delete()
        db.session.commit()

        return {"success": True}, 200
