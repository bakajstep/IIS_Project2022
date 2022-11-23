from api.models.database import db
from api.models.student_model import Student


def add_student(_state, _person_id, _course_id):
    new_student = Student(state=_state, person_id=_person_id, course_id=_course_id)
    db.session.add(new_student)
    db.session.commit()

def import_students():
    add_student('na praskoch', 1, 1)
    add_student('zdravy', 1, 2)
    add_student('na praskoch', 2, 1)
    add_student('zdravy', 3, 2)
    add_student('na praskoch', 4, 2)
    add_student('zdravy', 5, 2)
    add_student('na praskoch', 5, 3)
    add_student('zdravy', 6, 2)
    add_student('na praskoch', 7, 5)
    add_student('zdravy', 8, 3)
    add_student('na praskoch', 9, 4)
    add_student('zdravy', 10, 2)






