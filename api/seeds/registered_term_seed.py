from api.models.database import db
from api.models.registered_term_model import RegisteredTerm


def add_registered_term(_term_id, _student_id):
    new_registered_term = RegisteredTerm(term_id=_term_id, student_id=_student_id)
    db.session.add(new_registered_term)
    db.session.commit()


def import_registered_terms():
    add_registered_term(3, 1)
    add_registered_term(4, 1)
    add_registered_term(5, 1)
    add_registered_term(7, 1)

    add_registered_term(12, 2)
    add_registered_term(13, 2)

    add_registered_term(22, 4)
    add_registered_term(23, 4)
    add_registered_term(24, 4)

    add_registered_term(34, 6)
    add_registered_term(35, 6)

    add_registered_term(38, 7)
    add_registered_term(39, 7)
    add_registered_term(40, 7)

    add_registered_term(42, 8)
    add_registered_term(43, 8)
    add_registered_term(44, 8)

    add_registered_term(15, 11)
    add_registered_term(16, 11)
    add_registered_term(17, 11)
    add_registered_term(18, 11)

    add_registered_term(22, 12)
    add_registered_term(23, 12)
    add_registered_term(24, 12)

    add_registered_term(27, 13)
    add_registered_term(28, 13)
    add_registered_term(29, 13)

    add_registered_term(38, 15)
    add_registered_term(39, 15)
    add_registered_term(40, 15)

    add_registered_term(43, 16)
    add_registered_term(44, 16)

    add_registered_term(1, 17)
    add_registered_term(2, 17)
    add_registered_term(4, 17)

    add_registered_term(22, 20)
    add_registered_term(23, 20)
    add_registered_term(24, 20)

    add_registered_term(27, 21)
    add_registered_term(28, 21)
    add_registered_term(30, 21)
    add_registered_term(32, 21)

    add_registered_term(38, 23)
    add_registered_term(39, 23)
    add_registered_term(40, 23)

    add_registered_term(41, 24)
    add_registered_term(42, 24)
    add_registered_term(43, 24)
    add_registered_term(44, 24)

    add_registered_term(11, 26)
    add_registered_term(12, 26)
    add_registered_term(13, 26)

    add_registered_term(16, 27)
    add_registered_term(17, 27)
    add_registered_term(18, 27)
    add_registered_term(19, 27)
    add_registered_term(20, 27)

    add_registered_term(27, 29)
    add_registered_term(28, 29)
    add_registered_term(30, 29)
    add_registered_term(31, 29)

    add_registered_term(34, 30)

    add_registered_term(38, 31)
    add_registered_term(39, 31)
    add_registered_term(40, 31)

    add_registered_term(2, 33)
    add_registered_term(3, 33)
    add_registered_term(4, 33)
    add_registered_term(6, 33)

    add_registered_term(11, 34)
    add_registered_term(12, 34)
    add_registered_term(14, 34)

    add_registered_term(23, 36)
    add_registered_term(24, 36)

    add_registered_term(27, 37)
    add_registered_term(28, 37)

    add_registered_term(38, 39)
    add_registered_term(39, 39)
    add_registered_term(40, 39)

    add_registered_term(43, 40)
    add_registered_term(44, 40)

    add_registered_term(12, 42)