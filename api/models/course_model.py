from .database import db


class Course(db.Model):
    id = db.Column(db.Integer, nullable=False, unique=True, primary_key=True)
    label = db.Column(db.String(length=256), nullable=False, unique=True)
    description = db.Column(db.String(length=256), nullable=False)
    type = db.Column(db.String(length=256), nullable=False)
    price = db.Column(db.String(length=256), nullable=False)
    state = db.Column(db.String(length=256), nullable=False)
    guarantor = db.Column(db.Integer, db.ForeignKey('person.id'))
    terms = db.relationship('Term', backref='Course')
    lector = db.relationship('Lector', backref='Course', passive_deletes=True)
    student = db.relationship('Student', backref='Course')
    actuality = db.relationship('Actuality', backref='Course')
    # todo - aktuality
