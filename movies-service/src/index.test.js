require("dotenv-safe").config();
require("./config/mongodb.test").runTests();
require("./repository/repository.test").runTest();
require("./server/server.test").runTest();
require("./api/movies.test").runTest();