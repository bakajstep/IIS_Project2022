from .database import db


class Student(db.Model):
    id = db.Column(db.Integer(), nullable=False, unique=True, primary_key=True)
    state = db.Column(db.String(20), nullable=False)
    person_id = db.Column(db.Integer(), db.ForeignKey('person.id'))
    course_id = db.Column(db.Integer(), db.ForeignKey('course.id'))

