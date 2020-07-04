const mongodb = require("../config/mongodb");
const ObjectId = require("mongodb").ObjectId;

function getAllCities(callback){
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").find({},
            {cidade:1,uf:1,pais:1}).toArray(callback);
    })
}

function getCinemasByCityId(cityId, callback){
    let ObjCityId = ObjectId(cityId);
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").find({_id: ObjCityId},
            {cinemas:1}).toArray((err, cities) => {
                if(err) return callback(err, null);
                callback(err, cities[0].cinemas);
        });
    });
}

function getMoviesByCinemaId(cinemaId, callback){
    let ObjectCinemaId = ObjectId(cinemaId);
    mongodb.connect((err, db) => {
        db.collection("cineamCatalog").aggregate([
            {$matches: {"cinema._id": ObjectCinemaId}},
            {$unwind: "$cinema"},
            {$unwind: "$cinema.salas"},
            {$unwind: "$cinema.salas.sessoes"},
            {$group: {_id:{
                filme:"$cinema.salas.sessoes.filme", 
                idFilme: "$cinema.salas.sessoes.idFilme"}}}
        ]).toArray(callback)
    });
}

function getMoviesByCityId(cityId, callback){
    let objCityId = ObjectId(cityId);
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").aggregate([
            {$match: {"_id": objCityId}},
            {$unwind: "$cinemas"},
            {$unwind: "cinemas.salas"},
            {$unwind: "cinemas.salas.sessoes"},
            {$group: {_id: { 
                filme: "$cinemas.salas.sessoes.filme", 
                idFilme: "$cinemas.salas.sessoes.idFilme"}}}
        ]).toArray((err, sessions) => {
            if(err) return callback(err, null);
            callback(err, sessions.map(item => {
                return {idFilme: item._id.idFilme, 
                    filme: item._id.filme
            }}));
        });
    })
}

function getmovieSessionsByCityId(movieId, cityId, callback){
    let objMovieId = ObjectId(movieId);
    let objCityId = ObjectId(cityId);

    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").aggregate([
            {$match: {objCityId}},
            {$unwind: "$cinemas"},
            {$unwind: "$cinemas.salas"},
            {$unwind: "$cinemas.salas.sessoes"},
            {$match: {"cinemas.salas.sessoes.idFilme":
        objMovieId}},
            {$group: {_id: {
                filme:"$cinemas.salas.sessoes.filme", 
                idFilme: "$cinemas.salas.sessoes.idFilme",
                idCinema: "$cinemas._id", 
                salas: "$cinemas.salas.nome", 
                sessao: "$cinemas.salas.sessoes"}}}
        ]).toArray((err, sessions) => {
            if(err) return callback(err, null);
            callback(err, sessions.map(item => {
                return {
                    idFilme: item._id.idFilme,
                    filme: item._id.filme, 
                    idCinema: item._id.idCinema,
                    sala: item._id.sala,
                    sessoa: item._id.sessao
            }}));
        });
    });
}

function getMovieSessionsByCinemaId(movieId, cinemaId, callback){
    let objMovieId = ObjectId(movieId);
    let objCinemaId = ObjectId(cinemaId);
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").aggregate([
            {$match: {objCinemaId}},
            {$unwind: "$cinemas"},
            {$unwind: "$cinemas.salas"},
            {$unwind: "$cinemas.salas.sessoes"},
            {$match: {"cinemas.salas.sessoes.idFilme":
        objMovieId}},
            {$group: {_id: {
                filme:"$cinemas.salas.sessoes.filme", 
                idFilme: "$cinemas.salas.sessoes.idFilme",
                idCinema: "$cinemas._id", 
                salas: "$cinemas.salas.nome", 
                sessao: "$cinemas.salas.sessoes"}}}
        ]).toArray((err, sessions) => {
            if(err) return callback(err, null);
            callback(err, sessions.map(item => {
                return {
                    idFilme: item._id.idFilme,
                    filme: item._id.filme, 
                    idCinema: item._id.idCinema,
                    sala: item._id.sala,
                    sessoa: item._id.sessao
             }}));
        });    
    })
}

function disconnect(){
    return mongodb.disconnect();
}

module.exports = { 
    getAllCities, 
    getCinemasByCityId, 
    getMoviesByCinemaId, 
    getMoviesByCityId,
    getmovieSessionsByCityId,
    getMovieSessionsByCinemaId,  
    disconnect }