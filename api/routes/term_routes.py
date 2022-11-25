import datetime
from ..models.database import db
from ..models.term_model import Term
from ..models.term_date_model import TermDate
from ..models.room_model import Room
from ..models.rank_model import Rank
from ..models.student_model import Student
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
                                "min_points": fields.Integer(required=True),
                                "max_points": fields.Integer(required=True),
                                "from_time": fields.String(required=True),
                                "to_time": fields.String(required=True),
                                "course_id": fields.Integer(required=True),
                                "room_id": fields.Integer(required=False),
                                "date": fields.String(required=True)
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
       Create new term in course
    """

    @rest_api.expect(term_model)
    def post(self):
        req_data = request.get_json()

        _label = req_data.get('label')
        _max_points = req_data.get('max_points')
        _min_points = req_data.get('min_points')
        _from_time = toTime(req_data.get('from_time'))
        _to_time = toTime(req_data.get('to_time'))
        _date = req_data.get('date')
        _course_id = req_data.get('course_id')
        _room_id = req_data.get('room_id')

        term_exists = Term.get_by_label(_label)

        if term_exists:
            return {"success": False,
                    "msg": "This term already exist."}, 404

        new_term = Term(label=_label, min_points=_min_points, max_points=_max_points, course_id=_course_id,
                        room_id=_room_id, from_time=_from_time, to_time=_to_time)
        db.session.add(new_term)

        term = Term.get_by_label(_label)
        for date in _date.split(','):
            term_date = TermDate(date=toDate(date), term_id=term.id)
            db.session.add(term_date)

        for student in db.session.query(Student).filter(Student.course_id == _course_id).all():
            for ter in db.session.query(TermDate).filter(TermDate.term_id == term.id).all():
                rank = Rank(points=0, term_date_id=ter.id, student_id=student.id)
                db.session.add(rank)
        db.session.commit()
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


def toTime(time):
    field = time.split(':')
    return datetime.time(int(field[0]), int(field[1]), int(field[2]))


def toDate(date):
    field = date.split('/')
    return datetime.date(int(field[0]), int(field[1]), int(field[2]))
