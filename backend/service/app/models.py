import sys
sys.path.append("../../app")
from . import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    full_name = db.Column(db.String(64), index=True)
    descriptor = db.Column(db.Text(), index=True, unique=True)

    def delete(self, instance):
        db.session.delete(instance)
        db.session.commit()

    def __repr__(self):
        return '<ID {}>'.format(self.id)
