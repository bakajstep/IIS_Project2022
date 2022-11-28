from api.models.database import db
from api.models.student_model import Student


def add_student(_state, _person_id, _course_id):
    new_student = Student(state=_state, person_id=_person_id, course_id=_course_id)
    db.session.add(new_student)
    db.session.commit()


def import_students():
    add_student('APPROVED', 13, 1)
    add_student('APPROVED', 13, 2)
    add_student('PENDING', 13, 3)

    add_student('APPROVED', 14, 4)
    add_student('PENDING', 14, 5)
    add_student('APPROVED', 14, 6)

    add_student('APPROVED', 15, 7)
    add_student('APPROVED', 15, 8)
    add_student('PENDING', 15, 1)

    add_student('PENDING', 16, 2)
    add_student('APPROVED', 16, 3)
    add_student('APPROVED', 16, 4)

    add_student('APPROVED', 17, 5)
    add_student('PENDING', 17, 6)
    add_student('APPROVED', 17, 7)

    add_student('APPROVED', 18, 8)
    add_student('APPROVED', 18, 1)
    add_student('PENDING', 18, 2)

    add_student('PENDING', 19, 3)
    add_student('APPROVED', 19, 4)
    add_student('APPROVED', 19, 5)

    add_student('PENDING', 20, 6)
    add_student('APPROVED', 20, 7)
    add_student('APPROVED', 20, 8)

    add_student('PENDING', 22, 1)
    add_student('APPROVED', 22, 2)
    add_student('APPROVED', 22, 3)

    add_student('PENDING', 23, 4)
    add_student('APPROVED', 23, 5)
    add_student('APPROVED', 23, 6)

    add_student('APPROVED', 24, 7)
    add_student('PENDING', 24, 8)
    add_student('APPROVED', 24, 1)

    add_student('APPROVED', 25, 2)
    add_student('PENDING', 25, 3)
    add_student('APPROVED', 25, 4)

    add_student('APPROVED', 26, 5)
    add_student('PENDING', 26, 6)
    add_student('APPROVED', 26, 7)

    add_student('APPROVED', 27, 8)
    add_student('PENDING', 27, 1)
    add_student('APPROVED', 27, 2)



