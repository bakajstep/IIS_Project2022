from ..models.database import db
from ..models.term_model import Term
from ..models.registered_term_model import RegisteredTerm
from ..models.student_model import Student
from ..models.rank_model import Rank
from flask_restx import Resource
from .routes import rest_api

"""
    Flask-Restx routes
"""


@rest_api.route('/api/person/<int:personId>/term/<int:termId>')
class RegisterToTerm(Resource):
    """
       Register student to term from course
    """

    def put(self, termId, personId):
        term = Term.get_by_id(termId)

        student = db.session.query(Student).filter(Student.course_id == term.course_id).filter(
            Student.person_id == personId).first()

        register = RegisteredTerm(term_id= termId, student_id=student.id)
        db.session.add(register)
        for term_date in term.term_date:
            rank = Rank(points=0, term_date_id=term_date.id, student_id=student.id)
            db.session.add(rank)

        db.session.commit()

        return {"success": True}, 200
