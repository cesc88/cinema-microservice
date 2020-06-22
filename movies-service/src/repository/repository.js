const mondodb = require("../config/mongodb")
const mongodb = require("../config/mongodb");
const { ObjectId } = require("mongodb");


function InsertMovie(movie, callback){
    mongodb.connect((err, db) => {
        db.collection("movie").insert(movie, callback);
    })
}

function updateMovie(id, movie, callback){
    mongodb.connect((err, db) => {
        db.collection("movie").update({
            _Id: new ObjectId(id)}, movie, callback)
    })
}

function patchMovie(id, updates, callback){
    mongodb.connect((err, db) => {
        db.collection("movie").updateMany({_Id: new ObjectId(id)},
            { $set: updates }, callback
        )
    })
}

function deleteMovie(id, callback){
    mongodb.connect((err, db) => {
        db.collection().deleteOne({_Id: new ObjectId(id)}, callback)
    })
}

function getAllMovies(callback){
    mongodb.connect((err, db) => {

        db.collection("movies").find().toArray(callback);
    })
}

function getMovieById(id, callback){
    mongodb.connect((err, db) => {
        db.collection("movies").findOne({_id: 
            require("mongodb").ObjectId(id)}, callback);
    });
}

function getMoviePremiers(callback){

    let monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    monthAgo.setHours(0,0,0);
    monthAgo.setMilliseconds(0);

    mongodb.connect((err, db) => {
        db.collection("movies").find({dataLancamento: {$gte: monthAgo}
        }).toArray(callback);
    });
}

function disconnect(){
    return mongodb.disconnect()
}

module.exports = { getAllMovies, getMovieById, getMoviePremiers, disconnect }