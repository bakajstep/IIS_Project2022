from api.models.database import db
from api.models.course_model import Course


def add_course(_label, _description, _type, _price, _state, _capacity, _guarantor, _autoReg):
    new_course = Course(label=_label, description=_description, type=_type, price=_price, state=_state,
                        capacity=_capacity, guarantor=_guarantor, autoReg=_autoReg)
    db.session.add(new_course)
    db.session.commit()


def import_courses():
    add_course('IUI', 'Creating user interfaces', 'mandatory', 1000, 'APPROVED', 250, 1, True)
    add_course('IDS', 'Database systems', 'mandatory', 1500, 'PENDING', 500, 3, True)
    add_course('ISS', 'Signals and systems', 'mandatory', 2000, 'APPROVED', 100, 5, True)
    add_course('ISE', 'Introduction to software engineering', 'mandatory', 1800, 'PENDING', 850, 7, True)
    add_course('IMS', 'Modelling and simulation', 'mandatory', 1500, 'APPROVED', 500, 9, True)
    add_course('IWC', 'Website creation', 'optional', 1000, 'PENDING', 150, 11, False)
    add_course('ICL', 'C Language', 'mandatory-optional', 1200, 'APPROVED', 350, 1, False)
    add_course('IJA', 'Java', 'mandatory-optional', 1400, 'APPROVED', 350, 3, False)
    add_course('ELM', 'Electrotechnical measurements', 'mandatory', 1600, 'APPROVED', 350, 5, True)
    add_course('IAI', 'Basics of artificial intelligence', 'mandatory', 1500, 'PENDING', 500, 7, True)
    add_course('I1C', 'Network cabling and routing (CCNA1+CCNA2)', 'optional', 2500, 'APPROVED', 500, 9, False)
    add_course('IPS', 'Probability and statistics', 'mandatory', 1500, 'APPROVED', 500, 11, True)
    add_course('I2C', 'LAN and WAN technologies (CCNA3+4)', 'optional', 2500, 'APPROVED', 500, 1, False)

