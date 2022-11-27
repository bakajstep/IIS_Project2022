from api.models.database import db
from api.models.room_model import Room

id = db.Column(db.Integer, nullable=False, unique=True, primary_key=True)
label = db.Column(db.String(length=256), nullable=False, unique=True)
capacity = db.Column(db.Integer, nullable=False)
terms = db.relationship('Term', backref='Room')


def add_room(_label, _capacity):
    new_room = Room(label=_label, capacity=_capacity)
    db.session.add(new_room)
    db.session.commit()


def import_rooms():
    add_room('A112', 64)
    add_room('A113', 64)
    add_room('A211', 50)
    add_room('A218', 26)
    add_room('A318', 26)

    add_room('B112', 30)
    add_room('B113', 40)
    add_room('B211', 50)
    add_room('B218', 60)
    add_room('B318', 26)

    add_room('C123', 50)
    add_room('C223', 50)
    add_room('C133', 25)
    add_room('C321', 70)
    add_room('C318', 26)

    add_room('D105', 350)
    add_room('D106', 75)
    add_room('D107', 50)

    add_room('E105', 250)
    add_room('E106', 60)


