from api.models.database import db
from api.models.course_model import Course


def add_course(_label, _description, _type, _price, _state):
    new_course = Course(label=_label, description=_description, type=_type, price=_price, state=_state)
    db.session.add(new_course)
    db.session.commit()


def import_courses():
    add_course('ITU', 'Tvorba uživatelských rozhraní', 'povinný', 1000, 'prebieha')
    add_course('IDS', 'Databázové systémy', 'povinný', 1500, 'prebieha')
    add_course('ISS', 'Signály a systémy', 'povinný', 2000, 'prebieha')
    add_course('IUS', 'Úvod do softvérového inžinierstva', 'povinný', 1800, 'nezahájený')
    add_course('IMS', 'Modelovanie a simulácie', 'povinný', 1500, 'prebieha')
    add_course('ITW', 'Tvorba webových stránok', 'volitelný', 1000, 'nezahájený')
    add_course('I1C', 'Jazyk C', 'povinne-volitelný', 1000, 'nezahájený')
