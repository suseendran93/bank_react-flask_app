from sqlite3 import Cursor
from flask import Flask, request, jsonify
from sqlalchemy import null
import connectmongo
from bson.json_util import dumps
mongoDb = connectmongo

app = Flask(__name__)


@app.route('/createaccount', methods=["POST"])
def createAccount():

    data = request.json
    data = {
        "Acc": data['acc'],
        "Name": data['name'],
        "Balance": 0,
        "Beneficiary": {}
    }
    mongoDb.postData(data)
    return jsonify(response_value_1=1, response_value_2="value")


@app.route('/showbeneficiary/<accNumber>', methods=["GET"])
def showBeneficiary(accNumber):
    cursor = mongoDb.getData(int(accNumber))
    json_data = dumps(cursor, indent=2)
    return json_data


if __name__ == "__main__":
    app.run(debug=True)
