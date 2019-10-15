from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
from sqlalchemy import create_engine
from json import dumps
#from flask.ext.jsonpify import jsonify
import pyrebase
#ALL DEPRECATED
config = {
  "apiKey": "AIzaSyBaZ-hC6RfdQnsaWwlWBHvHfEaiHtoNKow",
  "authDomain": "safebanananice.firebaseapp.com",
  "databaseURL": "https://safebanananice.firebaseio.com/",
  "storageBucket": "safebanananice.appspot.com",
  "serviceAccount": "safebanananice-firebase-adminsdk-t15ef-284f485aec.json"
}
#safebanananice-firebase-adminsdk-t15ef-284f485aec.json

app = Flask(__name__)
api = Api(app)

firebase = pyrebase.initialize_app(config)
db = firebase.database()

parser = reqparse.RequestParser()
parser.add_argument('data')

class Auth(Resource):
    def get(self):
        json_data = request.get_json(force=True)
        data = {
            "user": json_data["user"],
            "password": json_data["password"],
        }
        result = db.child("user").where('user', '==', data['user']).get()
        return result

class UserById(Resource):
    def get(self, username):
        users = db.child("user").order_by_child("\"username\"").equal_to(username).get()
        return jsonify(users.val())

class User(Resource):
    def get(self):
        users = db.child("user").get()
        return jsonify(users.val())
    def post(self):
        json_data = request.get_json(force=True)
        data = {
            "name": json_data["name"],
            "last_name": json_data["last_name"],
            "email": json_data["email"],
            "user": json_data["user"],
            "password": json_data["password"],
            "phone": json_data["phone"],
            "type": json_data["type"],
        }
        result = db.child("user").push(data)
        return result
        

api.add_resource(Auth, '/auth') # Route_1
api.add_resource(User, '/user') # Route_3
api.add_resource(UserById, '/user/<username>') # Route_3


if __name__ == '__main__':
    app.run(port='5002')