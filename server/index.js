require('dotenv').config();
const express = require("express");
const session = require('express-session');

const checkForSession = require('./middlewares/checkForSession');
const swagController =  require('./controllers/swagController');
const authController = require('./controllers/authController');
const cartController = require('./controllers/cartController');
const searchController = require('./controllers/searchController');

const app = express();

const {SESSION_SECRET, SERVER_PORT} = process.env;

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
    
}))
app.use(checkForSession);
app.use(express.static(`${__dirname}/...build`));


app.get('/api/swag', swagController.read);

app.get('/api/user', authController.getUser);

app.post('/api/login', authController.login);

app.post('/api/register', authController.register);

app.post('/api/signout', authController.signout);

app.post('/api/cart/checkout', cartController.checkout);

app.post('/api/cart/:id', cartController.add);

app.delete('/api/cart/:id', cartController.delete);

app.get('/api/search', searchController.search);


app.listen(SERVER_PORT, () => {console.log(`Iam Listening ${SERVER_PORT}`)});