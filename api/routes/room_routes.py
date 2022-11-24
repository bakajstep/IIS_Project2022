from api.routes.routes import rest_api
from ..models.database import db
from ..models.room_model import Room
from flask import request
from flask_restx import Resource, fields

"""
    Flask-Restx models for api request and response data
"""

room_model = rest_api.model('RoomModel', {"label": fields.String(required=True, min_length=4, max_length=64),
                                          "capacity": fields.Integer(required=True)
                                          })


@rest_api.route('/api/room')
class Rooms(Resource):
    """
       Create new room and list new room
    """

    @rest_api.expect(room_model)
    def post(self):
        req_data = request.get_json()

        _label = req_data.get("label")
        _capacity = req_data.get("capacity")

        room_exists = Room.get_by_label(_label)

        if room_exists:
            return {"success": False,
                    "msg": "This room already exist."}, 404

        new_room = Room(label=_label, capacity=_capacity)
        db.session.add(new_room)
        db.session.commit()

        return {"success": True,
                "room": new_room.to_json()}, 200

    def get(self):

        room_list = Room.get_all()

        room_json = []
        for room in room_list:
            room_json.append(room.to_json())

        return {"room": room_json}, 200


@rest_api.route('/api/room/<int:roomId>')
class Rooms(Resource):
    """
       Delete, update and get room
    """

    def delete(self, roomId):
        room_exists = Room.get_by_id(roomId)

        if not room_exists:
            return {"success": False,
                    "msg": "Room does not exist."}, 404

        db.session.delete(room_exists)
        db.session.commit()

        return {"success": True}, 200

    @rest_api.expect(room_model)
    def put(self, roomId):
        req_data = request.get_json()
        room_exists = Room.get_by_id(roomId)

        _label = req_data.get("label")
        _capacity = req_data.get("capacity")

        if not room_exists:
            return {"success": False,
                    "msg": "Room does not exist."}, 404

        room_check = Room.get_by_label(_label)
        if room_check:
            return {"success": False,
                    "msg": "Room label exist."}, 404

        setattr(room_exists, 'label', _label)
        setattr(room_exists, 'capacity', _capacity)
        db.session.commit()

        updated_room = Room.get_by_id(roomId)
        return {"success": True,
                "room": updated_room.to_json()}, 200

    def get(self, roomId):
        room_exists = Room.get_by_id(roomId)

        if not room_exists:
            return {"success": False,
                    "msg": "Room does not exist."}, 404

        return {"success": True,
                "room": room_exists.to_json()}, 200
