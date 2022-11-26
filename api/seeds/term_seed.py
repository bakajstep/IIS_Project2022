from api.models.database import db
from api.models.term_model import Term


def add_term(_label, _rating, _min_points, _date, _course_id, _room_id):
    new_term = Term(label=_label, rating=_rating, min_points=_min_points, date=_date, course_id=_course_id,
                    room_id=_room_id)
    db.session.add(new_term)
    db.session.commit()


def import_terms():
    add_term('Záverečná skúška', '60', '30', '2.1.2023', 1, 2)
    add_term('Polsemestrálna skúška', '20', '0', '2.11.2022', 1, 3)
    add_term('Zápočet', '60', '30', '24.12.2022', 1, 1)

    add_term('Záverečná skúška', '70', '30', '4.1.2023', 2, 2)
    add_term('Polsemestrálna skúška', '25', '5', '4.11.2022', 2, 3)
    add_term('Zápočet', '60', '30', '24.12.2022', 2, 1)

    add_term('Záverečná skúška', '50', '20', '6.1.2023', 3, 3)
    add_term('Polsemestrálna skúška', '30', '10', '25.11.2022', 3, 3)
    add_term('Zápočet', '60', '30', '24.12.2022', 3, 1)

    add_term('Záverečná skúška', '60', '30', '2.1.2023', 4, 3)
    add_term('Polsemestrálna skúška', '20', '0', '2.11.2022', 4, 4)
    add_term('Zápočet', '60', '30', '24.12.2022', 4, 1)
