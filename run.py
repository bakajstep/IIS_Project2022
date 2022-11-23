from api.models.database import db
from api import app
from api.seeds.seed_all import import_all


if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        import_all()
    app.run(debug=True)
