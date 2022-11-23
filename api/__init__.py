from flask import Flask
from flask_cors import CORS
from .models.database import db
from api.models.person_model import Person
from api.models.term_model import Term
from api.models.actuality_model import Actuality
from api.models.rank_model import Rank
from api.models.course_model import Course
from api.models.lector_model import Lector
from api.models.registered_term_model import RegisteredTerm
from api.models.room_model import Room
from api.models.student_model import Student
from api.routes.person_routes import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://wis:Heslo123456789@localhost:3306/wis'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://joe:Dudy1973*@localhost:3306/wis'
app.config['SECRET_KEY'] = '0c932d819321d1252b2acfc5'

db.init_app(app)
rest_api.init_app(app)
CORS(app)


