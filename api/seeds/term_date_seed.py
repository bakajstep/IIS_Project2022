import datetime
from api.models.database import db
from api.models.term_date_model import TermDate


def add_term_date(_date, _term_id):
    new_term_date = TermDate(date=_date, term_id=_term_id)
    db.session.add(new_term_date)
    db.session.commit()


def import_term_date():
    add_term_date(datetime.date(2023, 1, 5), 1)
    add_term_date(datetime.date(2023, 1, 19), 1)
    add_term_date(datetime.date(2023, 1, 26), 1)
    add_term_date(datetime.date(2022, 10, 15), 2)
    add_term_date(datetime.date(2022, 12, 1), 3)
    add_term_date(datetime.date(2022, 12, 5), 4)
    add_term_date(datetime.date(2022, 10, 3), 5)
    add_term_date(datetime.date(2022, 10, 10), 5)
    add_term_date(datetime.date(2022, 10, 17), 5)
    add_term_date(datetime.date(2022, 10, 24), 5)
    add_term_date(datetime.date(2022, 10, 31), 5)
    add_term_date(datetime.date(2022, 10, 4), 6)
    add_term_date(datetime.date(2022, 10, 11), 6)
    add_term_date(datetime.date(2022, 10, 18), 6)
    add_term_date(datetime.date(2022, 10, 25), 6)
    add_term_date(datetime.date(2022, 11, 1), 6)
    add_term_date(datetime.date(2022, 11, 2), 7)
    add_term_date(datetime.date(2022, 11, 16), 7)
    add_term_date(datetime.date(2022, 11, 3), 8)
    add_term_date(datetime.date(2022, 11, 17), 8)

    add_term_date(datetime.date(2023, 1, 4), 9)
    add_term_date(datetime.date(2023, 1, 18), 9)
    add_term_date(datetime.date(2023, 1, 25), 9)
    add_term_date(datetime.date(2022, 10, 17), 10)
    add_term_date(datetime.date(2022, 12, 2), 11)
    add_term_date(datetime.date(2022, 12, 6), 12)
    add_term_date(datetime.date(2022, 11, 17), 13)
    add_term_date(datetime.date(2022, 11, 24), 13)
    add_term_date(datetime.date(2022, 12, 1), 13)
    add_term_date(datetime.date(2022, 11, 16), 14)
    add_term_date(datetime.date(2022, 11, 23), 14)

    add_term_date(datetime.date(2023, 1, 6), 15)
    add_term_date(datetime.date(2023, 1, 20), 15)
    add_term_date(datetime.date(2023, 1, 27), 15)
    add_term_date(datetime.date(2022, 10, 18), 16)
    add_term_date(datetime.date(2022, 11, 4), 17)
    add_term_date(datetime.date(2022, 11, 4), 18)
    add_term_date(datetime.date(2022, 9, 27), 19)
    add_term_date(datetime.date(2022, 10, 4), 19)
    add_term_date(datetime.date(2022, 10, 11), 19)
    add_term_date(datetime.date(2022, 9, 28), 20)
    add_term_date(datetime.date(2022, 12, 7), 20)

    add_term_date(datetime.date(2023, 1, 3), 21)
    add_term_date(datetime.date(2023, 1, 17), 21)
    add_term_date(datetime.date(2023, 1, 24), 21)
    add_term_date(datetime.date(2022, 11, 1), 22)
    add_term_date(datetime.date(2022, 12, 1), 23)
    add_term_date(datetime.date(2022, 9, 29), 24)
    add_term_date(datetime.date(2022, 10, 6), 24)
    add_term_date(datetime.date(2022, 10, 13), 24)
    add_term_date(datetime.date(2022, 10, 20), 24)

    add_term_date(datetime.date(2023, 1, 2), 25)
    add_term_date(datetime.date(2023, 1, 9), 25)
    add_term_date(datetime.date(2023, 1, 23), 25)
    add_term_date(datetime.date(2022, 11, 9), 26)
    add_term_date(datetime.date(2022, 12, 16), 27)
    add_term_date(datetime.date(2022, 12, 14), 28)
    add_term_date(datetime.date(2022, 12, 15), 28)
    add_term_date(datetime.date(2022, 12, 7), 29)
    add_term_date(datetime.date(2022, 12, 8), 29)
    add_term_date(datetime.date(2022, 10, 17), 30)
    add_term_date(datetime.date(2022, 10, 18), 31)

    add_term_date(datetime.date(2022, 12, 13), 32)
    add_term_date(datetime.date(2022, 12, 14), 33)
    add_term_date(datetime.date(2022, 11, 17), 34)
    add_term_date(datetime.date(2022, 11, 10), 34)
    add_term_date(datetime.date(2022, 11, 24), 34)
    add_term_date(datetime.date(2022, 10, 10), 35)
    add_term_date(datetime.date(2022, 10, 24), 35)

    add_term_date(datetime.date(2023, 1, 10), 36)
    add_term_date(datetime.date(2023, 1, 24), 36)
    add_term_date(datetime.date(2023, 1, 31), 36)
    add_term_date(datetime.date(2022, 12, 11), 37)
    add_term_date(datetime.date(2022, 12, 15), 38)
    add_term_date(datetime.date(2022, 11, 28), 39)
    add_term_date(datetime.date(2022, 11, 21), 39)
    add_term_date(datetime.date(2022, 11, 14), 39)

    add_term_date(datetime.date(2023, 1, 17), 40)
    add_term_date(datetime.date(2023, 1, 24), 40)
    add_term_date(datetime.date(2023, 1, 31), 40)
    add_term_date(datetime.date(2022, 11, 30), 41)
    add_term_date(datetime.date(2022, 12, 12), 42)
    add_term_date(datetime.date(2022, 9, 28), 43)
    add_term_date(datetime.date(2022, 10, 13), 43)
















