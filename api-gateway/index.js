require("dotenv-safe").config();
var jwt = require('jsonwebtoken')
var http = require('http')
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const helmet = require('helmet')
const { USERS_API_URL, PRODUCTS_API_URL } = require('./URLs');


const userServiceProxy = httpProxy(USERS_API_URL)
const productsServiceProxy = httpProxy(PRODUCTS_API_URL)


function verifyJWT(req, res, next){
    var token = req.headers['x-acess-token'];
    if(!token) return res.status(401)
        .send({ auth:false, message: 'No token provided.'});

        jwt.verify(token, process.env.SECRET,
            function(err, decoded){
                if(err) return res.status(500)
                    .send({auth:false, message: 'Failed to authenticate token'});

                    req.userId = decoded.id;
                    next();
            });
}

//Proxy request

app.get('/', (req, res) => res.send("Welcome Gateway API"))

app.get('/movies', verifyJWT,(req, res, next) => 
    userServiceProxy(req, res, next)
)

app.get('/cities', verifyJWT,(req, res, next) => 
    productsServiceProxy(req, res, next)
)

app.get('/logout', (req, res) => {
    res.status(200).send({ auth:false, token:null });
})

app.post('/login', (req, res, next) => {
    if(req.body.user === 'username' && req.body.password === 'password'){
        const id = 1;
        let token = jwt.sign({id}, process.env.SECRET,
    {
        expiresIn: 300
    });
    res.status(200).send({ auth: true, token: token
    });
    }
    res.status(500).send('Invalid login')
})

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(3000);