from api.seeds.person_seed import import_persons
from api.seeds.term_seed import import_terms
from api.seeds.actuality_seed import import_actualities
from api.seeds.course_seed import import_courses
from api.seeds.room_seed import import_rooms
from api.seeds.student_seed import import_students
from api.seeds.registered_term_seed import import_registered_terms
from api.seeds.rank_seed import import_ranks
from api.seeds.lector_seed import import_lectors
from api.seeds.term_date_seed import import_term_date


def import_all():
    import_persons()
    import_courses()
    import_rooms()
    import_actualities()
    import_students()
    import_terms()
    import_term_date()
    import_registered_terms()
    import_ranks()
    import_lectors()





