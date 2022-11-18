from api.models.database import db
from api import app
from api.seeds.person_seed import *


if __name__ == '__main__':
    with app.app_context():
        """db.drop_all()
        db.create_all()
        do_import()"""
    app.run(debug=True)
