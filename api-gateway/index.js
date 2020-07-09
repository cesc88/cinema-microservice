var http = require('http')
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const helmet = require('helmet')
const { USERS_API_URL, PRODUCTS_API_URL } = require('./URLs')

const userServiceProxy = httpProxy(USERS_API_URL)
const productsServiceProxy = httpProxy(PRODUCTS_API_URL)

//Proxy request

app.get('/', (req, res) => res.send("Welcome Gateway API"))

app.get('/movies', (req, res, next) => 
    userServiceProxy(req, res, next)
)

app.get('/cities', (req, res, next) => 
    productsServiceProxy(req, res, next)
)

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(3000);