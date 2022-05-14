import os
from flask import Flask, request, jsonify
import connectmongo
from bson.json_util import dumps
mongoDb = connectmongo
app = Flask(__name__)


@app.route('/login/<accNumber>', methods=["GET"])
def login(accNumber):
    cursor = mongoDb.getData(int(accNumber))
    json_data = dumps(cursor, indent=2)
    return json_data


@app.route('/createaccount', methods=["POST"])
def createAccount():

    data = request.json
    data = {
        "Acc": data['acc'],
        "Name": data['name'],
        "Balance": 1000,
        "Beneficiary": {}
    }
    mongoDb.postData(data)
    return jsonify(response_value_1=1, response_value_2="value")


@app.route('/showbeneficiary/<accNumber>', methods=["GET"])
def showBeneficiary(accNumber):
    cursor = mongoDb.getData(int(accNumber))
    json_data = dumps(cursor, indent=2)
    return json_data


@app.route('/addBeneficiary', methods=["POST"])
def addBeneficiary():
    data = request.json

    mongoDb.update(data["fromAcc"], "Beneficiary.{}".format(
        data["name"]), data["toAcc"])
    return jsonify(response_value_1=1, response_value_2="value")


@app.route('/transferfund', methods=["POST"])
def transferfund():

    data = request.json
    mongoDb.update(data["fromAcc"], "Balance",
                   data["fund"] - data["amount"])

    mongoDb.update(data["toAcc"], "Balance",
                   100)
    return jsonify(response_value_1=1, response_value_2="value")


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
