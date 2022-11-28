import datetime

from api.models.database import db
from api.models.term_model import Term


def add_term(_label, _max_points, _min_points, _course_id, _room_id, _from_time, _to_time):
    new_term = Term(label=_label, max_points=_max_points, min_points=_min_points, course_id=_course_id,
                    room_id=_room_id, from_time=_from_time, to_time=_to_time)
    db.session.add(new_term)
    db.session.commit()


def import_terms():
    add_term('Final Exam', '60', '30', 1, 16, datetime.time(7, 0, 0), datetime.time(8, 0, 0))
    add_term('Half-semester exam', '10', '0', 1, 16, datetime.time(14, 30, 0), datetime.time(15, 0, 0))
    add_term('Project', '30', '5', 1, None, datetime.time(0, 0, 0), datetime.time(0, 0, 0))
    add_term('Credit', '40', '20', 1, None, datetime.time(0, 0, 0), datetime.time(0, 0, 0))
    add_term('Lecture', '0', '0', 1, 16, datetime.time(8, 0, 0), datetime.time(10, 0, 0))
    add_term('Lecture', '0', '0', 1, 19, datetime.time(16, 0, 0), datetime.time(18, 0, 0))
    add_term('Exercise', '0', '0', 1, 1, datetime.time(7, 0, 0), datetime.time(9, 0, 0))
    add_term('Exercise', '0', '0', 1, 1, datetime.time(8, 0, 0), datetime.time(10, 0, 0))

    add_term('Final Exam', '50', '25', 2, 19, datetime.time(8, 0, 0), datetime.time(10, 0, 0))
    add_term('Half-semester exam', '20', '5', 2, 19, datetime.time(10, 0, 0), datetime.time(11, 30, 0))
    add_term('Project', '30', '0', 2, None, datetime.time(0, 0, 0), datetime.time(0, 0, 0))
    add_term('Credit', '50', '25', 2, None, datetime.time(0, 0, 0), datetime.time(0, 0, 0))
    add_term('Lecture', '0', '0', 2, 16, datetime.time(9, 0, 0), datetime.time(11, 0, 0))
    add_term('Lecture', '0', '0', 2, 17, datetime.time(12, 0, 0), datetime.time(14, 0, 0))

    add_term('Final Exam', '70', '32', 3, 16, datetime.time(10, 0, 0), datetime.time(11, 0, 0))
    add_term('Half-semester exam', '20', '0', 3, 16, datetime.time(14, 30, 0), datetime.time(15, 0, 0))
    add_term('Project', '10', '0', 3, None, datetime.time(0, 0, 0), datetime.time(0, 0, 0))
    add_term('Credit', '30', '15', 3, None, datetime.time(0, 0, 0), datetime.time(0, 0, 0))
    add_term('Lecture', '0', '0', 3, 16, datetime.time(10, 0, 0), datetime.time(12, 0, 0))
    add_term('Exercise', '0', '0', 3, 2, datetime.time(12, 0, 0), datetime.time(14, 0, 0))

    add_term('Final Exam', '70', '30', 4, 16, datetime.time(11, 0, 0), datetime.time(13, 0, 0))
    add_term('Half-semester exam', '30', '15', 4, 19, datetime.time(13, 0, 0), datetime.time(14, 30, 0))
    add_term('Credit', '30', '15', 4, None, datetime.time(0, 0, 0), datetime.time(0, 0, 0))
    add_term('Lecture', '0', '0', 4, 19, datetime.time(16, 0, 0), datetime.time(19, 0, 0))

    add_term('Final Exam', '70', '32', 5, 16, datetime.time(13, 0, 0), datetime.time(14, 0, 0))
    add_term('Half-semester exam', '10', '0', 5, 16, datetime.time(8, 30, 0), datetime.time(9, 30, 0))
    add_term('Project', '20', '0', 5, None, datetime.time(0, 0, 0), datetime.time(0, 0, 0))
    add_term('Credit', '30', '10', 5, None, datetime.time(0, 0, 0), datetime.time(0, 0, 0))
    add_term('Lecture', '0', '0', 5, 16, datetime.time(9, 0, 0), datetime.time(11, 0, 0))
    add_term('Lecture', '0', '0', 5, 19, datetime.time(17, 0, 0), datetime.time(19, 0, 0))
    add_term('Exercise', '0', '0', 5, 3, datetime.time(7, 0, 0), datetime.time(9, 0, 0))
    add_term('Exercise', '0', '0', 5, 3, datetime.time(15, 0, 0), datetime.time(17, 0, 0))

    add_term('Project', '100', '50', 6, None, datetime.time(0, 0, 0), datetime.time(0, 0, 0))
    add_term('Credit', '0', '0', 6, None, datetime.time(0, 0, 0), datetime.time(0, 0, 0))
    add_term('Lecture', '0', '0', 6, 17, datetime.time(18, 0, 0), datetime.time(20, 0, 0))
    add_term('Exercise', '0', '0', 6, 4, datetime.time(6, 0, 0), datetime.time(7, 0, 0))

    add_term('Final Exam', '70', '35', 7, 16, datetime.time(8, 0, 0), datetime.time(9, 0, 0))
    add_term('Project', '30', '15', 7, None, datetime.time(0, 0, 0), datetime.time(0, 0, 0))
    add_term('Credit', '30', '15', 7, None, datetime.time(0, 0, 0), datetime.time(0, 0, 0))
    add_term('Lecture', '0', '0', 7, 16, datetime.time(9, 0, 0), datetime.time(11, 0, 0))

    add_term('Final Exam', '70', '35', 8, 17, datetime.time(8, 0, 0), datetime.time(9, 0, 0))
    add_term('Project', '30', '15', 8, None, datetime.time(0, 0, 0), datetime.time(0, 0, 0))
    add_term('Credit', '30', '15', 8, None, datetime.time(0, 0, 0), datetime.time(0, 0, 0))
    add_term('Lecture', '0', '0', 8, 17, datetime.time(9, 0, 0), datetime.time(11, 0, 0))









