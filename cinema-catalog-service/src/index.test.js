require("dotenv-safe").config();
require("./config/mongodb.test").runTest();
require("./server/server.test").runTest();