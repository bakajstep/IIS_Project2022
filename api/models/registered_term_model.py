from .database import db


class RegisteredTerm(db.Model):
    id = db.Column(db.Integer(), nullable=False, unique=True, primary_key=True)
    term_id = db.Column(db.Integer(), db.ForeignKey('term.id', ondelete="CASCADE"))
    student_id = db.Column(db.Integer(), db.ForeignKey('student.id', ondelete="CASCADE"))
