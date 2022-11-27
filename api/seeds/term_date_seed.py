import datetime
from api.models.database import db
from api.models.term_date_model import TermDate


def add_term_date(_date, _term_id):
    new_term_date = TermDate(date=_date, term_id=_term_id)
    db.session.add(new_term_date)
    db.session.commit()


def import_term_date():
    add_term_date(datetime.date(2023, 2, 3), 1)
    add_term_date(datetime.date(2023, 1, 3), 2)

    add_term_date(datetime.date(2022, 11, 20), 5)
    add_term_date(datetime.date(2022, 12, 18), 4)

    add_term_date(datetime.date(2023, 2, 3), 7)
    add_term_date(datetime.date(2023, 1, 3), 8)

    add_term_date(datetime.date(2023, 1, 3), 10)
    add_term_date(datetime.date(2023, 1, 3), 11)

    add_term_date(datetime.date(2022, 11, 14), 13)
    add_term_date(datetime.date(2022, 11, 21), 13)
    add_term_date(datetime.date(2022, 11, 28), 13)
    add_term_date(datetime.date(2022, 12, 5), 13)
    add_term_date(datetime.date(2022, 12, 12), 13)

    add_term_date(datetime.date(2022, 11, 10), 14)



