const mongodb = require("../config/mongodb");
const ObjectId = require("mongodb").ObjectID;

function getAllCities(callback){
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").find({},
            {cidade:1,uf:1,pais:1}).toArray(callback);
    })
}

function getCinemaByCityId(cityId, callback){
    var ObjCity = ObjectId(cityId);
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").find({_id: ObjCity},
            {cinema:1}).toArray((err, cities) => {
                if(err) return callback(err, null);
                callback(err, cities[0].cinemas);
        });
    });
}

function disconnect(){
    return mongodb.disconnect();
}

module.exports = { getAllCities, getCinemaByCityId, disconnect }