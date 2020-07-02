const mongodb = require("../config/mongodb");
const ObjectId = require("mongodb").ObjectId;

function getAllCities(callback){
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").find({},
            {cidade:1,uf:1,pais:1}).toArray(callback);
    })
}

function getCinemasByCityId(cityId, callback){
    var ObjCityId = ObjectId(cityId);
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").find({_id: ObjCityId},
            {cinemas:1}).toArray((err, cities) => {
                if(err) return callback(err, null);
                callback(err, cities[0].cinemas);
        });
    });
}

function disconnect(){
    return mongodb.disconnect();
}

module.exports = { getAllCities, getCinemasByCityId, disconnect }