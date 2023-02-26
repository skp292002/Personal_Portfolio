const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const uri = 'mongodb://127.0.0.1:27017/formsdb';
let _db;

const mongoConnect = callback =>{
    MongoClient.connect(uri)
    .then(client =>{
        console.log('Connected to db!');
        _db = client.db();
        callback();
    })
    .catch(err =>{
        console.log(err);
        throw err;
    });
}

const getDb = () =>{
    if(_db)return _db;
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;