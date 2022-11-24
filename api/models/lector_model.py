from .database import db


class Lector(db.Model):
    id = db.Column(db.Integer(), nullable=False, unique=True, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id', ondelete="CASCADE"))
    person_id = db.Column(db.Integer, db.ForeignKey('person.id', ondelete="CASCADE"))
