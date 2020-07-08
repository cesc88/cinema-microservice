const repository = require("../repository/repository");

module.exports = (app, repository) => {

    app.get('/cities', (req, res, next) => {
        repository.getAllCities((err, cities) => {
            if(err) return next(err);
            res.json(cities)
        });
    })

    app.get('/cities/:city/movies', (req, res, next) => {
        repository.getMoviesByCityId(req.params.city, (err, movies) => {
            if(err) return next(err);
            res.json(movies)
        });
    })

    app.get('/cities/:city/cinemas', (req, res, next) => {
        repository.getCinemaByCityId(req.params.city, (err, cinemas) => {
            if(err) return next(err);
            res.json(cinemas)
        });
    })

    app.get('/cities/:city/movies/:movie', (req, res, next) => {
        repository.getMovieSessionsByCityId(req.params.movie, req.params.city, (err, sessions) => {
            if(err) return next(err);
            res.json(sessions)
        });
    })

    app.get('/cities/:city/cinemas', (req, res, next) => {
        repository.getCinemaByCityId(req.params.city, (err, cinemas) => {
            if(err) return next(err);
            res.json(cinemas)
        });
    })

    app.get('/cinemas/:cinema/movies', (req, res, next) => {
        repository.getMoviesByCinemaId(req.params.cinema, (err, movies) => {
            if(err) return next(err);
            res.json(movies)
        });
    })

    app.get('/cinemas/:cinema/movies/:movie', (req, res, next) => {
        repository.getMoviesSessionsByCinemaId(req.params.cinema, req.params.movie, (err, sessions) => {
            if(err) return next(err);
            res.json(sessions)
        });
    })
}