from .database import db


class Room(db.Model):
    id = db.Column(db.Integer, nullable=False, unique=True, primary_key=True)
    label = db.Column(db.String(length=256), nullable=False, unique=True)
    capacity = db.Column(db.Integer, nullable=False)
    terms = db.relationship('Term', backref='Room')
