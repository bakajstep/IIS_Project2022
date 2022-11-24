from api.models.database import db
from api.models.student_model import Student
from api.models.person_model import Person
from api.models.course_model import Course
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
                                              "guarantor": fields.Integer(required=True)
                                              })


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
        _guarantor = req_data.get('guarantor')

        course_exists = Course.get_by_label(req_data.get('label'))

        if course_exists:
            return {"success": False,
                    "msg": "This course already exist."}, 404

        new_course = Course(label=_label, description=_description, type=_type, price=_price, guarantor=_guarantor,
                            state='PENDING')
        db.session.add(new_course)
        db.session.commit()

        return {"success": True,
                "course": new_course.to_json()}, 200


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
                    "msg": "This course does not exist."}, 404

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
                    "msg": "This course does not exist."}, 404

        students_json = []
        course = db.session.query(Course).filter(Course.id == courseId).first()
        student_list = course.student
        for student in student_list:
            person = Person.get_by_id(student.person_id)
            students_json.append(person.to_json())

        return {"student": students_json}, 200


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
                    "msg": "This person is already in course."}, 404

        course = db.session.query(Course).filter(Course.id == courseId).first()
        student_count = len(course.student)
        if student_count >= course.capacity:
            return {"success": False,
                    "msg": "Capacity of the course is full."}, 404

        signed = Student(person_id=personId, course_id=courseId, state='PENDING')
        return {"student": signed}, 200


@rest_api.route('/api/course/<int:courseId>/lector')
class Courses(Resource):
    """
       Get list of lectors from course
    """

    def get(self, courseId):
        course_exists = Course.get_by_id(courseId)

        if not course_exists:
            return {"success": False,
                    "msg": "This course does not exist."}, 404

        lectors_json = []
        course = db.session.query(Course).filter(Course.id == courseId).first()
        lector_list = course.lector
        for lector in lector_list:
            person = Person.get_by_id(lector.person_id)
            lectors_json.append(person.to_json())

        return {"lector": lectors_json}, 200
