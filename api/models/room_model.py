from .database import db


class Room(db.Model):
    id = db.Column(db.Integer, nullable=False, unique=True, primary_key=True)
    label = db.Column(db.String(length=256), nullable=False, unique=True)
    capacity = db.Column(db.Integer, nullable=False)
    terms = db.relationship('Term', backref='Room')

    @classmethod
    def get_by_label(cls, _label):
        return cls.query.filter_by(label=_label).first()

    @classmethod
    def get_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    def to_dict(self):
        cls_dict = {'id': self.id, 'label': self.label, 'capacity': self.capacity}
        return cls_dict

    def to_json(self):
        return self.to_dict()
