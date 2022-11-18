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
    add_room('A111', 50)
    add_room('A112', 25)
    add_room('A113', 40)
    add_room('D105', 350)
    add_room('E116', 250)
    add_room('C201', 30)
    add_room('C202', 30)
    add_room('C203', 35)
    add_room('L333', 20)
    add_room('L334', 25)
    add_room('L335', 40)


