const test = require('tape');
const repository = require('./repository');
const { response } = require('express');

function runTest(){

    let id = null;

    test('Repository GetAllMovies', (t) => {
        repository.getAllMovies((err, movies) => {
            if(movies && movies.length > 0) id = movies[0]._id;

            t.assert(!err && movies && movies.length > 0, "All Movies Returned");
            t.end();
        })
    })

    test('Repository GetMovieById', (t) => {
        if(!id){
            t.assert(false, "Movie by Id Returned");
            t.end();
            return;
        }

        repository.getMovieById(id, (err, movie) => {
            t.assert(!err && movie, "Movie by Id Returned");
            t.end();
        });
    })

    test('Repository GetMoviePremiers', (t) => {
        repository.getMoviePremiers((err, movies) => 
        {
            t.assert(!err && movies && movies.length > 0, "Movie Premiers Returned");
            t.end()
        });
    })

    test('Repository getMoviesByCinemaId', (t) => {
        repository.getMoviesByCinemaId(cinemaId, (err, movies) => {
            t.assert(!err && movies && movies.length > 0, "Movies By Cinemas Id Returned");
            t.end();
        });
    })

    test('Repository getMoviesByCityId', (t) => {
        repository.getMoviesByCityId(cityId, (err, movies) => {
            if(movies && movies.length > 0) movieId = movies[0]._idFilme;
            t.assert(!err && movies && movies.length > 0, "Movies By City Id Returned");
            t.end();
        })
    })

    test('Repository getMoviesSessionsByCityId', (t) => {
        repository.getMoviesSessionsByCityId(movieId, cityId, (err, sessions) => {
            t.assert(!err && sessions && sessions.length > 0, "Movie Sessions By City Id Returned");
            t.end();
        });
    })

    test('Repository getMovieSessionsByCinemaId', (t) => {
        repository.getMoviesSessionsByCinemaId(movieId, cinemaId, (err, sessions) => {
            t.assert(!err && sessions && sessions.length > 0, "Movie Sessions By Cinema Id Returned");
            t.end();
        });
    })

    test('Repository Disconnect', (t) => {
        t.assert(repository.disconnect(), "Disconnect Ok");
        t.end();
    })
}

module.exports = { runTest }