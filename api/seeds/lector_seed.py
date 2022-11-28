from api.models.database import db
from api.models.lector_model import Lector


def add_lector(_course_id, _person_id):
    new_lector = Lector(course_id=_course_id, person_id=_person_id)
    db.session.add(new_lector)
    db.session.commit()


def import_lectors():
    add_lector(1, 2)
    add_lector(2, 4)
    add_lector(3, 6)
    add_lector(4, 8)
    add_lector(5, 10)
    add_lector(6, 12)
    add_lector(7, 2)
    add_lector(8, 4)
    add_lector(9, 6)
    add_lector(10, 8)
    add_lector(11, 10)
    add_lector(12, 12)
    add_lector(13, 2)





