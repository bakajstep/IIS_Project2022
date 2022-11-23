from .database import db


class Person(db.Model):
    id = db.Column(db.Integer(), nullable=False, unique=True, primary_key=True)
    name = db.Column(db.String(length=256), nullable=False)
    surname = db.Column(db.String(length=256), nullable=False)
    email = db.Column(db.String(length=256), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=60), nullable=False)
    admin = db.Column(db.Boolean(), nullable=False)
    guarantor = db.relationship('Course', backref='Person')
    student = db.relationship('Student', backref='Person')
    lector = db.relationship('Lector', backref='Person')

    def __repr__(self):
        return f'Person {self.email}'

    def check_password(self, _password):
        return self.password_hash == _password

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def to_dict(self):
        cls_dict = {'id': self.id, 'name': self.name, 'surname': self.surname, 'email': self.email, 'admin': self.admin}
        return cls_dict

    def to_json(self):
        return self.to_dict()
