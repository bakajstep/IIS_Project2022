from .database import db


class RegisteredTerm(db.Model):
    id = db.Column(db.Integer(), nullable=False, unique=True, primary_key=True)
    term_id = db.Column(db.Integer(), db.ForeignKey('term.id', ondelete="CASCADE"))
    student_id = db.Column(db.Integer(), db.ForeignKey('student.id', ondelete="CASCADE"))

    def to_dict(self):
        cls_dict = {'id': self.id, 'term_id': self.term_id, 'student_id': self.student_id}
        return cls_dict

    def to_json(self):
        return self.to_dict()
