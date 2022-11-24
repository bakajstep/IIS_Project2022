from .database import db


class Actuality(db.Model):
    id = db.Column(db.Integer(), nullable=False, unique=True, primary_key=True)
    description = db.Column(db.String(length=256), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id', ondelete="CASCADE"))

    def to_dict(self):
        cls_dict = {'id': self.id, 'description': self.description}
        return cls_dict

    def to_json(self):
        return self.to_dict()
