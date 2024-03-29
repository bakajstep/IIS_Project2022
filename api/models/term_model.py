from .database import db


class Term(db.Model):
    id = db.Column(db.Integer(), nullable=False, unique=True, primary_key=True)
    label = db.Column(db.String(length=256), nullable=False)
    max_points = db.Column(db.Integer, nullable=False)
    min_points = db.Column(db.Integer, nullable=False)
    from_time = db.Column(db.Time(), nullable=False)
    to_time = db.Column(db.Time(), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id', ondelete="CASCADE"))
    room_id = db.Column(db.Integer, db.ForeignKey('room.id', ondelete="CASCADE"))
    registered_term = db.relationship('RegisteredTerm', backref='Term')
    term_date = db.relationship('TermDate', backref='Term')

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
        cls_dict = {'id': self.id, 'label': self.label, 'max_points': self.max_points, 'min_points': self.min_points,
                    'course_id': self.course_id, 'room_id': self.room_id,
                    'from_time': str(self.from_time), 'to_time': str(self.to_time)}
        return cls_dict

    def to_json(self):
        return self.to_dict()
