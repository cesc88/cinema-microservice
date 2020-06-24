const test = require('tape');
const server = require('./server');

function apiMock(app, repo){
    console.log("do nothing");
}

function runTest(){

    test('Server Start', (t) => {
        server.start(apiMock, null, (err, srv) => {
            t.assert(!err && srv, "Server started");
            t.end()
        });
    })

    test('Server stop', (t) => {
        t.assert(server.stop(), "Server stopped");
        t.end();
    })
}

module.exports = { runTest }