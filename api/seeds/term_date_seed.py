import datetime

from api.models.database import db
from api.models.term_date_model import TermDate


def add_term_date(_date, _points, _term_id):
    new_term_date = TermDate(date=_date, points=_points, term_id=_term_id)
    db.session.add(new_term_date)
    db.session.commit()


def import_term_date():
    add_term_date(datetime.date(2023, 2, 3), 0, 1)
    add_term_date(datetime.date(2023, 1, 3), 0, 2)

    add_term_date(datetime.date(2022, 11, 20), 15, 5)
    add_term_date(datetime.date(2022, 12, 18), 0, 4)

    add_term_date(datetime.date(2023, 2, 3), 0, 7)
    add_term_date(datetime.date(2023, 1, 3), 0, 8)

    add_term_date(datetime.date(2023, 1, 3), 0, 10)
    add_term_date(datetime.date(2023, 1, 3), 0, 11)
