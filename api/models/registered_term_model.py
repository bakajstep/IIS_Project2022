from .database import db


class RegisteredTerm(db.Model):
    term_id = db.Column(db.Integer(), db.ForeignKey('term.id'), primary_key=True)
    student_id = db.Column(db.Integer(), db.ForeignKey('student.id'), primary_key=True)
