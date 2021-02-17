from backend.service.app import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    full_name = db.Column(db.String(64), index=True, unique=True)
    descriptor = db.Column(db.Text(), index=True, unique=True)

    def __repr__(self):
        return '<Full name {}>'.format(self.full_name)
