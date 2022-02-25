from pymongo import MongoClient


__cluster = MongoClient(
    "mongodb+srv://suzeendran:1234@cluster0.i4zg6.mongodb.net/testdb?retryWrites=true&w=majority")
__db = __cluster["testdb"]
__collection = __db["testcollection"]


def postData(post):
    __collection.insert_one(post)


def getData(accNumber):
    return __collection.find({"Acc": accNumber})


def update(acc, data, value):
    __collection.update_one(
        {"Acc": acc}, {"$set": {data: value}})
