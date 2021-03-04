const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const MongoConnect = (callback) => {
    // MongoClient.connect("mongodb+srv://bothrag:gunj24@1990@mycluster-coo01.mongodb.net/test?retryWrites=true&w=majority")
    MongoClient.connect('mongodb+srv://bothrag:gunj24@1990@mycluster-coo01.mongodb.net/test')   
    .then( client => {
            console.log("connected");
            _db = client.db(); // This is connecting to the database "test", I can also provide my db name like client.db("shop")
            callback(); 
        }).catch((err)=> {
            console.log(err)
        });
};

const getdb = () => {
    if (_db) {
        return _db;
    } throw 'No database found';
};

exports.MongoConnect = MongoConnect;
exports.getdb = getdb;