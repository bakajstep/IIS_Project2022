from api.models.database import db
from api.models.rank_model import Rank


def add_rank(_points, _term_date_id, _student_id):
    new_rank = Rank(points=_points, term_date_id=_term_date_id, student_id=_student_id)
    db.session.add(new_rank)
    db.session.commit()


def import_ranks():
    add_rank(80, 1, 1)
    add_rank(75, 1, 2)
    add_rank(96, 1, 3)
    add_rank(54, 1, 4)
    add_rank(17, 1, 5)
    add_rank(74, 2, 1)
    add_rank(85, 2, 2)
    add_rank(92, 2, 3)
    add_rank(80, 3, 6)
    add_rank(62, 6, 7)
    add_rank(100, 5, 8)
    add_rank(97, 5, 9)
    add_rank(39, 4, 10)






