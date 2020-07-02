const test = require("tape");
const repository = require("./repository");

function runTest(){

    let cityId = null;
    let cinemaId = null;
    let movieId = null;

    test('Repository getAllCities', (t) => {
        repository.getAllCities((err, cities) => {
            if(cities && cities.length > 0) cityId = 
            cities[1]._id;

            t.assert(!err && cities && cities.length > 0, "All Cities Returned");
            t.end();
        });
    })

    test('Repository getCinemasByCityId', (t) => {
        repository.getCinemasByCityId(cityId, (err, cinemas) => {
            if(cinemas && cinemas.length > 0)
            cinemaId = cinemas[0]._id;

            t.assert(!err && cinemas && cinemas.length > 0, "All Cinemas Returned By City Id");
            t.end();
        });
    })

    test('Repository Disconnect', (t) => {
        t.assert(repository.disconnect(), "Disconnect Ok");
        t.end();
    });
}


module.exports = { runTest }