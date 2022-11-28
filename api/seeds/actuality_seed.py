from api.models.database import db
from api.models.actuality_model import Actuality


def add_actuality(_description, _course_id):
    new_actuality = Actuality(description=_description, course_id=_course_id)
    db.session.add(new_actuality)
    db.session.commit()


def import_actualities():
    add_actuality('Project deadline changed from 08.12.2022 to 09.12.2022', 1)
    add_actuality('Registration for the half-semester exam is open', 2)
    add_actuality('New project assignments available', 2)
    add_actuality('Online streaming of lectures from 10.10.2022', 3)
    add_actuality('Cancellation of the half-semester test', 3)
    add_actuality('The laboratory exercise will start 2 hours later', 4)
    add_actuality('This week laboratory exercise taughut by Forman', 5)
    add_actuality('Bring ISICs to laboratory exercise', 6)

