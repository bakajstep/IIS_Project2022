from .database import db


class Term(db.Model):
    id = db.Column(db.Integer(), nullable=False, unique=True, primary_key=True)
    label = db.Column(db.String(length=256), nullable=False)
    max_points = db.Column(db.Integer, nullable=False)
    min_points = db.Column(db.Integer, nullable=False)
    from_time = db.Column(db.Time(), nullable=False)
    to_time = db.Column(db.Time(), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id', ondelete="CASCADE"))
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'))
    rank = db.relationship('Rank', backref='Term')
    term_date = db.relationship('TermDate', backref='Term')
