from .database import db
from ..models.person_model import Person


class Course(db.Model):
    id = db.Column(db.Integer, nullable=False, unique=True, primary_key=True)
    label = db.Column(db.String(length=256), nullable=False, unique=True)
    description = db.Column(db.String(length=256), nullable=False)
    type = db.Column(db.String(length=256), nullable=False)
    price = db.Column(db.Integer(), nullable=False)
    capacity = db.Column(db.Integer(), nullable=False)
    state = db.Column(db.String(length=256), nullable=False)
    autoReg = db.Column(db.Boolean(), nullable=False)
    guarantor = db.Column(db.Integer, db.ForeignKey('person.id'))
    terms = db.relationship('Term', backref='Course', passive_deletes=True)
    lector = db.relationship('Lector', backref='Course', passive_deletes=True)
    student = db.relationship('Student', backref='Course', passive_deletes=True)
    actuality = db.relationship('Actuality', backref='Course', passive_deletes=True)

    @classmethod
    def get_by_label(cls, _label):
        return cls.query.filter_by(label=_label).first()

    @classmethod
    def get_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    def to_dict(self):
        user = Person.get_by_id(self.guarantor)
        cls_dict = {'id': self.id, 'label': self.label, 'description': self.description, 'type': self.type,
                    'price': self.price, 'guarantor_id': self.guarantor}
        return cls_dict

    def to_json(self):
        return self.to_dict()
