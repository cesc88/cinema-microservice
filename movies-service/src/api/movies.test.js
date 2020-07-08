const test = require('tape');
const supertest = require('supertest');
const movies = require('./movies');
const server = require("../server/server");
const repository = require("../repository/repository");

function runTest(){

    var app = null;
    server.start(movies, repository, (err, app) => {
        let id = null;
        test('GET /movies', (t) => {
            supertest(app)
            .get('/movies')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if(res.body && res.body.length > 0)
                id = res.body[0].id;
                t.error(err, 'No erros')
                t.assert(res.body && res.body.length > 0, "All Movies returned")
                t.end()
            })
        })

        test('GET /movies/:id', (t) => {
            if(!id){
                t.assert(false, "Movie By Id Returned");
                t.end();
                return;
            }

            supertest(app)
             .get('/movies/'+id)
             .expect('Content-Type', /json/)
             .expect(200)
             .end((err, res) => {
                 t.error(err, 'No erros')
                 t.assert(res.body, "Movie By Id returned")
                 t.end()
             })
        })

        test('GET /movies/premieres', (t) => {
            supertest(app)
            .get('/movies/premieres')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                t.error(err, "No erros")
                t.assert(res.body && res.body.length > 0, "Premiere Movies Returned")
                t.end()
            })
        })
        server.stop();
    })
}

module.exports = { runTest }