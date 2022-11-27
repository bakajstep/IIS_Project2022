from api.models.database import db
from api.models.registered_term_model import RegisteredTerm


def add_registered_term(_term_id, _student_id):
    new_registered_term = RegisteredTerm(term_id=_term_id, student_id=_student_id)
    db.session.add(new_registered_term)
    db.session.commit()


def import_registered_terms():
    add_registered_term(1, 1)
    add_registered_term(1, 2)
    add_registered_term(2, 3)
    add_registered_term(3, 4)
    add_registered_term(3, 5)
    add_registered_term(3, 6)
    add_registered_term(4, 7)
    add_registered_term(4, 8)
    add_registered_term(5, 9)
    add_registered_term(5, 10)
    add_registered_term(5, 11)
    add_registered_term(13, 13)






