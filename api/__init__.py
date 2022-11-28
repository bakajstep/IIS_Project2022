import MySQLdb
from flask import Flask
from flask_cors import CORS
from .models.database import db
from api.routes.routes import rest_api
from api.models.person_model import Person
from api.models.term_model import Term
from api.models.actuality_model import Actuality
from api.models.rank_model import Rank
from api.models.course_model import Course
from api.models.lector_model import Lector
from api.models.registered_term_model import RegisteredTerm
from api.models.room_model import Room
from api.models.student_model import Student
from api.models.term_date_model import TermDate
from api.routes.person_routes import *
from api.routes.room_routes import *
from api.routes.course_routes import *
from api.routes.term_routes import *
from api.routes.registered_term_routes import *


app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://xjfdljckc3pzubfd:c26dmh89gaebjnii@bv2rebwf6zzsv341.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ps99xg1d3thb007a'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://wis:Heslo123456789@localhost:3306/wis'
app.config['SECRET_KEY'] = '0c932d819321d1252b2acfc5'

db.init_app(app)
rest_api.init_app(app)
CORS(app)
