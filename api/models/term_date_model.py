from .database import db


class TermDate(db.Model):
    id = db.Column(db.Integer(), nullable=False, unique=True, primary_key=True)
    date = db.Column(db.Date(), nullable=False)
    term_id = db.Column(db.Integer(), db.ForeignKey('term.id', ondelete="CASCADE"))
    rank = db.relationship('Rank', backref='TermDate')

    @classmethod
    def get_all(cls):
        return cls.query.all()

    def to_dict(self):
        cls_dict = {'id': self.id, 'date': str(self.date)}
        return cls_dict

    def to_json(self):
        return self.to_dict()
