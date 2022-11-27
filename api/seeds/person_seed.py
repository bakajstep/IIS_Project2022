from api.models.database import db
from api.models.person_model import Person


def add_person(_name, _surname, _email, _password_hash, _admin):
    new_person = Person(name=_name, surname=_surname, email=_email, password_hash=_password_hash, admin=_admin)
    db.session.add(new_person)
    db.session.commit()


def import_persons():
    add_person('Adam', 'Andrašik', 'adam.andrasik@gmail.com', 'passhash100000', 0)
    add_person('Branislav', 'Bezák', 'branobez@salamon.sk', 'passhash100001', 0)
    add_person('Cyril', 'Cyprich', 'cyprich_cyril@seznam.cz', 'passhash100002', 0)
    add_person('Dávod', 'Deák', 'dado.deak@gmail.com', 'passhash100003', 0)
    add_person('Ernest', 'Emek', 'ernestemek@salamon.sk', 'passhash100005', 0)
    add_person('Filip', 'Fico', 'filip_fico@seznam.cz', 'passhash100006', 0)
    add_person('Gábor', 'Boraros', 'punisher@gmail.com', '$2a$10$CwTycUXWue0Thq9StjUM0uai5XFKOiTlTD5iijP028bUBKzMGAsrW',
               1)
    add_person('Hana', 'Dobrá', 'hankadobra@salamon.sk', 'passhash100008', 0)
    add_person('Ivan', 'Hrozný', 'ivo_hrozny@seznam.cz', 'passhash100009', 0)
    add_person('Jan', 'Janoška', 'jan.janoska123@gmail.com', 'passhash100010', 0)
    add_person('Kamil', 'Macejka', 'kmacejka@salamon.sk', 'passhash100011', 0)
    add_person('Leonard', 'Toplansky', 'leotop@seznam.cz', 'passhash100012', 0)
    add_person('Miroslav', 'Ševčík', 'miro.sevcik4@gmail.com', 'passhash100013', 0)
    add_person('Norbert', 'Žbirka', 'norozbirkameky@salamon.sk', 'passhash100014', 0)
    add_person('Ondrej', 'Pekarek', 'opekarek@seznam.cz', 'passhash100015', 0)
    add_person('Peter', 'Andraši', 'peter.andrasi741@gmail.com', 'passhash100016', 0)
    add_person('Rastislav', 'Oťázik', 'rastootazik@salamon.sk', 'passhash100017', 0)
    add_person('Samuel', 'Fečo', 'feco_samuel@seznam.cz', 'passhash100018', 0)
    add_person('Tibor', 'Švéda', 'svedabar.tibor@gmail.com', 'passhash100019', 0)
    add_person('Bohumil', 'Brtnik', 'bouhous.brtnik@gmail.com',
               '$2a$10$CwTycUXWue0Thq9StjUM0uai5XFKOiTlTD5iijP028bUBKzMGAsrW', 0)
