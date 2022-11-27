from api.models.database import db
from api.models.course_model import Course


def add_course(_label, _description, _type, _price, _state, _capacity, _guarantor, _autoReg):
    new_course = Course(label=_label, description=_description, type=_type, price=_price, state=_state,
                        capacity=_capacity, guarantor=_guarantor, autoReg=_autoReg)
    db.session.add(new_course)
    db.session.commit()


def import_courses():
    add_course('ITU', 'Tvorba uživatelských rozhraní', 'povinný', 1000, 'APPROVED', 250, 1, False)
    add_course('IDS', 'Databázové systémy', 'povinný', 1500, 'PENDING', 500, 5, False)
    add_course('ISS', 'Signály a systémy', 'povinný', 2000, 'APPROVED', 100, 5, True)
    add_course('IUS', 'Úvod do softvérového inžinierstva', 'PENDING', 1800, 'APPROVED', 850, 3, False)
    add_course('IMS', 'Modelovanie a simulácie', 'povinný', 1500, 'APPROVED', 500, 6, False)
    add_course('ITW', 'Tvorba webových stránok', 'volitelný', 1000, 'PENDING', 150, 1, False)
    add_course('I1C', 'Jazyk C', 'povinne-volitelný', 1000, 'APPROVED', 350, 1, False)
    add_course('ELM', 'Elektrotechnicke mereni', 'povinne', 1000, 'APPROVED', 350, 1, False)
