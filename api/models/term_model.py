from .database import db


class Term(db.Model):
    id = db.Column(db.Integer(), nullable=False, unique=True, primary_key=True)
    label = db.Column(db.String(length=256), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    min_points = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime(), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id', ondelete="CASCADE"))
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'))
    student_id = db.Column(db.Integer, db.ForeignKey('student.id', ondelete="CASCADE"))
    rank = db.relationship('Rank', backref='Term')
