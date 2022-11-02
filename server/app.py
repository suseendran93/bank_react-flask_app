import os
from flask import Flask, request, jsonify, send_from_directory
import connectmongo
from bson.json_util import dumps
import face_capture
import face_detector
import liveness_detector
import json
mongoDb = connectmongo
app = Flask(__name__, static_folder='./build', static_url_path='/')
# app = Flask(__name__, static_folder='../client/build', static_url_path='/')
# CORS(app)


@app.route('/login/<id>', methods=["GET"])
# @cross_origin()
def login(id):

    isReal = liveness_detector.liveness()
    if isReal=='real':
        cursor = mongoDb.getData(id)
        json_data = dumps(cursor, indent=2)

        users = json.loads(json_data)
        for user in users:
            username = user['Name']
        detectedname = face_detector.detectFace(username)
        if detectedname:
            return json_data
        else:
            return "null"
    else:
        print('unreal')



@app.route('/createaccount', methods=["POST"])
# @cross_origin()
def createAccount():

    data = request.json
    data = {
        "_id": data["id"],
        "Acc": data['acc'],
        "Name": data['name'],
        "Balance": 1000,
        "Beneficiary": {}
    }
    mongoDb.postData(data)
    face_capture.getFace(data['Name'])
    face_capture.trainFace()
    return jsonify(response_value=request.json)


@app.route('/showbeneficiary/<id>', methods=["GET"])
# @cross_origin()
def showBeneficiary(id):
    cursor = mongoDb.getData(id)
    json_data = dumps(cursor, indent=2)
    return json_data


@app.route('/addBeneficiary', methods=["POST"])
# @cross_origin()
def addBeneficiary():
    data = request.json

    mongoDb.update(data["fromAcc"], "Beneficiary.{}".format(
        data["name"]), data["toAcc"])
    return jsonify(response_value=request.json)


@app.route('/transferfund', methods=["POST"])
# @cross_origin()
def transferfund():

    data = request.json
    mongoDb.update(data["fromAcc"], "Balance",
                   data["fund"] - data["amount"])

    mongoDb.update(data["toAcc"], "Balance",
                   100)
    return jsonify(response_value=request.json)


@app.route('/')
# @cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
