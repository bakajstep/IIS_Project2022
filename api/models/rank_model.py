from .database import db


class Rank(db.Model):
    id = db.Column(db.Integer(), nullable=False, unique=True, primary_key=True)
    points = db.Column(db.Integer(), nullable=False)
    term_date_id = db.Column(db.Integer(), db.ForeignKey('term_date.id', ondelete="CASCADE"))
    student_id = db.Column(db.Integer(), db.ForeignKey('student.id', ondelete="CASCADE"))
