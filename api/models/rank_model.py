from .database import db


class Rank(db.Model):
    points = db.Column(db.Integer(), nullable=False)
    term_id = db.Column(db.Integer(), db.ForeignKey('term.id'), primary_key=True)
    student_id = db.Column(db.Integer(), db.ForeignKey('student.id'), primary_key=True)
