from api.models.database import db
from api.models.actuality_model import Actuality


def add_actuality(_description, _course_id):
    new_actuality = Actuality(description=_description, course_id=_course_id)
    db.session.add(new_actuality)
    db.session.commit()


def import_actualities():
    add_actuality('projekt deadline zmena 12.12.2022', 1)
    add_actuality('prihlasovanie na polsemestralnu skusku spustene', 2)
    add_actuality('zadanie projektu', 2)
    add_actuality('online streamovanie prednašok od 10.10.2022', 3)
    add_actuality('zrusenie polsemestralnej skusky', 3)
    add_actuality('projekt deadline zmena 12.12.2022', 4)
    add_actuality('prihlasovanie na polsemestralnu skusku spustene', 4)
    add_actuality('zadanie projektu', 5)
    add_actuality('online streamovanie prednašok od 10.10.2022', 5)
    add_actuality('zrusenie polsemestralnej skusky', 5)
    add_actuality('Lab1 je posunuta ', 8)
    add_actuality('Lab2 supluje Forman', 8)
    add_actuality('Lab3 se bude zkouset osciloskop', 8)
