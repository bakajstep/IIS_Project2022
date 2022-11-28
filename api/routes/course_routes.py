from api.models.database import db
from api.models.student_model import Student
from api.models.person_model import Person
from api.models.actuality_model import Actuality
from api.models.lector_model import Lector
from api.models.course_model import Course
from api.models.term_model import Term
from flask import request
from flask_restx import Resource, fields
from api.routes.routes import rest_api
import json

"""
    Flask-Restx models for api request and response data
"""

course_model = rest_api.model('CourseModel', {"label": fields.String(required=True, min_length=1, max_length=64),
                                              "description": fields.String(required=True, min_length=1, max_length=255),
                                              "type": fields.String(required=True, min_length=1, max_length=64),
                                              "price": fields.Integer(required=True),
                                              "capacity": fields.Integer(required=True),
                                              "guarantor": fields.Integer(required=True),
                                              "autoReg": fields.Boolean(required=True)
                                              })

actuality_model = rest_api.model('ActualityModel',
                                 {"description": fields.String(required=True, min_length=1, max_length=255)})


@rest_api.route('/api/course')
class Courses(Resource):
    """
       Create new course
    """

    @rest_api.expect(course_model)
    def post(self):
        req_data = request.get_json()

        _label = req_data.get('label')
        _description = req_data.get('description')
        _type = req_data.get('type')
        _price = req_data.get('price')
        _capacity = req_data.get('price')
        _guarantor = req_data.get('guarantor')
        _autoReg = req_data.get('autoReg')

        course_exists = Course.get_by_label(_label)

        if course_exists:
            return {"success": False,
                    "msg": "This course already exist."}, 404

        new_course = Course(label=_label, description=_description, type=_type, price=_price, guarantor=_guarantor,
                            state='PENDING', capacity=_capacity, autoReg=_autoReg)
        db.session.add(new_course)
        db.session.commit()

        return {"success": True,
                "course": new_course.to_json()}, 200


@rest_api.route('/api/course/<int:courseId>')
class Courses(Resource):
    """
       Delete course
    """

    def delete(self, courseId):
        course_exists = Course.get_by_id(courseId)

        if not course_exists:
            return {"success": False,
                    "msg": "Course does not exist."}, 400

        db.session.delete(course_exists)
        db.session.commit()

        return {"success": True}, 200


@rest_api.route('/api/course/approved')
class Courses(Resource):
    """
       Get list of pending from course
    """

    def get(self):
        courses_json = []
        course_list = db.session.query(Course).filter(Course.state == "APPROVED").all()
        for course in course_list:
            courses_json.append(course.to_json())

        return {"course": courses_json}, 200


@rest_api.route('/api/course/<int:courseId>/approved')
class Courses(Resource):
    """
       Approve course
    """

    def put(self, courseId):
        course_exists = Course.get_by_id(courseId)

        if not course_exists:
            return {"success": False,
                    "msg": "This course does not exist."}, 400

        setattr(course_exists, 'state', 'APPROVED')
        db.session.commit()

        return {"course": course_exists.to_json()}, 200


@rest_api.route('/api/course/pending')
class Courses(Resource):
    """
       Get list of approved from course
    """

    def get(self):
        courses_json = []
        course_list = db.session.query(Course).filter(Course.state == "PENDING").all()
        for course in course_list:
            courses_json.append(course.to_json())

        return {"course": courses_json}, 200


@rest_api.route('/api/course/<int:courseId>/student')
class Courses(Resource):
    """
       Get list of students from course
    """

    def get(self, courseId):
        course_exists = Course.get_by_id(courseId)

        if not course_exists:
            return {"success": False,
                    "msg": "This course does not exist."}, 400

        students_json = []
        course = db.session.query(Course).filter(Course.id == courseId).first()
        student_list = course.student
        for student in student_list:
            if student.state == "APPROVED":
                person = Person.get_by_id(student.person_id)
                students_json.append(person.to_json())

        return {"student": students_json}, 200


@rest_api.route('/api/course/<int:courseId>/actuality')
class Courses(Resource):
    """
       Get list of actualities from course and create actuality
    """

    @rest_api.expect(actuality_model)
    def post(self, courseId):
        req_data = request.get_json()

        _description = req_data.get('description')
        actuality = Actuality(description=_description, course_id=courseId)

        db.session.add(actuality)
        db.session.commit()
        return {"success": True}, 200

    def get(self, courseId):
        course_exists = Course.get_by_id(courseId)

        if not course_exists:
            return {"success": False,
                    "msg": "This course does not exist."}, 400

        actuality_json = []
        course = db.session.query(Course).filter(Course.id == courseId).first()
        actuality_list = course.actuality
        for actuality in actuality_list:
            actuality_json.append(actuality.to_json())

        return {"actuality": actuality_json}, 200

    

@rest_api.route('/api/course/<int:courseId>/person/<int:personId>')
class Courses(Resource):
    """
       Sign student to course
    """

    def post(self, courseId, personId):
        student = db.session.query(Student).filter(Student.person_id == personId).filter(
            Student.course_id == courseId).first()

        if student:
            return {"success": False,
                    "msg": "This person is already in course."}, 400

        course = db.session.query(Course).filter(Course.id == courseId).first()
        if not course:
            return {"success": False,
                    "msg": "This course does not exist."}, 400

        if course.guarantor == personId:
            return {"success": False,
                    "msg": "Guarantor cant be student."}, 400

        for lector in course.lector:
            if lector.person_id == personId:
                return {"success": False,
                        "msg": "Lector cant be student."}, 400

        user_exists = Person.get_by_id(personId)

        if not user_exists:
            return {"success": False,
                    "msg": "Person does not exist."}, 400

        student_count = len(course.student)
        if student_count >= course.capacity:
            return {"success": False,
                    "msg": "Capacity of the course is full."}, 400

        if course.autoReg:
            signed = Student(person_id=personId, course_id=courseId, state='APPROVED')
        else:
            signed = Student(person_id=personId, course_id=courseId, state='PENDING')
        return {"success": True}, 200

    def put(self, courseId, personId):
        course = db.session.query(Course).filter(Course.id == courseId).first()
        if not course:
            return {"success": False,
                    "msg": "This course does not exist."}, 400

        student = db.session.query(Student).filter(Student.person_id == personId).filter(
            Student.course_id == courseId).first()

        if not student:
            return {"success": False,
                    "msg": "Student does not exist."}, 400

        setattr(student, 'state', "APPROVED")
        db.session.commit()
        return {"success": True}, 200

    def delete(self, courseId, personId):
        student = db.session.query(Student).filter(Student.person_id == personId).filter(
            Student.course_id == courseId).first()

        if not student:
            return {"success": False,
                    "msg": "Student does not exist."}, 400

        db.session.delete(student)
        db.session.commit()
        return {"success": True}, 200


@rest_api.route('/api/course/<int:courseId>/person/approved')
class Courses(Resource):
    """
       List student approved in course
    """

    def get(self, courseId):
        course = Course.get_by_id(courseId)

        student_json = []
        list_of_students = course.student

        for student in list_of_students:
            if student.state == "APPROVED":
                person = Person.get_by_id(student.person_id)
                student_json.append(person.to_json())

        return {"student": student_json}


@rest_api.route('/api/course/<int:courseId>/person/pending')
class Courses(Resource):
    """
       List student approved in course
    """

    def get(self, courseId):
        course = Course.get_by_id(courseId)

        student_json = []
        list_of_students = course.student

        for student in list_of_students:
            if student.state == "PENDING":
                person = Person.get_by_id(student.person_id)
                student_json.append(person.to_json())

        return {"student": student_json}


@rest_api.route('/api/course/<int:courseId>/lector')
class Courses(Resource):
    """
       Get list of lectors from course
    """

    def get(self, courseId):
        course_exists = Course.get_by_id(courseId)

        if not course_exists:
            return {"success": False,
                    "msg": "This course does not exist."}, 400

        lectors_json = []
        course = db.session.query(Course).filter(Course.id == courseId).first()
        lector_list = course.lector
        for lector in lector_list:
            person = Person.get_by_id(lector.person_id)
            lectors_json.append(person.to_json())

        return {"lector": lectors_json}, 200


@rest_api.route('/api/course/<int:courseId>/person/<int:personId>/term')
class Courses(Resource):
    """
        Get list of terms from person for that course
    """

    def get(self, courseId, personId):
        student = db.session.query(Student).filter(Student.person_id == personId).filter(
            Student.course_id == courseId).first()

        if not student:
            return {"success": False,
                    "msg": "Student does not exist."}, 400

        term_json = []
        for registred in student.registered_term:
            term = Term.get_by_id(registred.term_id)
            term_json.append(term.to_json())

        return {"term": term_json}, 200


@rest_api.route('/api/course/<int:courseId>/term')
class Courses(Resource):
    """
        Get list of terms from course
    """

    def get(self, courseId):
        course = Course.get_by_id(courseId)

        if not course:
            return {"success": False,
                    "msg": "Course does not exist"}, 400

        term_json = []
        for term in course.terms:
            term_json.append(term.to_json())

        return {"term": term_json}, 200


@rest_api.route('/api/course/<int:courseId>/lector/<int:personId>')
class Courses(Resource):
    """
       Add or delete lector to course
    """

    def put(self, courseId, personId):
        course = db.session.query(Course).filter(Course.id == courseId).first()
        if not course:
            return {"success": False,
                    "msg": "This course does not exist."}, 400

        student = db.session.query(Student).filter(Student.person_id == personId).filter(
            Student.course_id == courseId).first()

        if student:
            return {"success": False,
                    "msg": "Person is already student."}, 400

        lector = db.session.query(Lector).filter(Lector.course_id == courseId).filter(
            Lector.person_id == personId).first()

        if lector:
            return {"success": False,
                    "msg": "Person is already lector."}, 400

        lector = Lector(course_id=courseId, person_id=personId)
        db.session.add(lector)
        db.session.commit()
        return {"success": True}, 200

    def delete(self, courseId, personId):

        lector = db.session.query(Lector).filter(Lector.course_id == courseId).filter(
            Lector.person_id == personId).first()
        db.session.delete(lector)
        db.session.commit()
        return {"success": True}, 200
