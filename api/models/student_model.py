from .database import db


class Student(db.Model):
    id = db.Column(db.Integer(), nullable=False, unique=True, primary_key=True)
    state = db.Column(db.String(20), nullable=False)
    person_id = db.Column(db.Integer(), db.ForeignKey('person.id', ondelete="CASCADE"))
    course_id = db.Column(db.Integer(), db.ForeignKey('course.id', ondelete="CASCADE"))
    registered_term = db.relationship('RegisteredTerm', backref='Student')
    rank = db.relationship('Rank', backref='Student')

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

