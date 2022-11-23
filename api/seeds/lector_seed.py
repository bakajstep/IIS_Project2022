from api.models.database import db
from api.models.lector_model import Lector


def add_lector(_course_id, _person_id):
    new_lector = Lector(course_id=_course_id, person_id=_person_id)
    db.session.add(new_lector)
    db.session.commit()


def import_lectors():
    add_lector(1, 1)
    add_lector(2, 2)
    add_lector(3, 3)
    add_lector(4, 4)
    add_lector(5, 5)



