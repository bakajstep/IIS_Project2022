from .database import db


class Term(db.Model):
    id = db.Column(db.Integer(), nullable=False, unique=True, primary_key=True)
    label = db.Column(db.String(length=256), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    min_points = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime(), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id', ondelete="CASCADE"))
    room_id = db.Column(db.Integer, db.ForeignKey('room.id', ondelete="CASCADE"))
    rank = db.relationship('Rank', backref='Term')


    def __repr__(self):
        return f'Term {self.id}'

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def get_by_label(cls, _label):
        return cls.query.filter_by(label=_label).first()

    def to_dict(self):
        cls_dict = {'id': self.id, 'label': self.label, 'rating': self.rating, 'min_points': self.min_points,
                    'date':self.date, 'course_id': self.course_id, 'room_id': self.room_id}
        return cls_dict

    def to_json(self):
        return self.to_dict()
