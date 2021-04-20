const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();

//Import Routes
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Users Routes
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);




app.use(cors({
    origin : "*",
    method: ['GET' ,'POST', 'PATCH','DELETE' ,'PUT'],
    allowedHeaders: 'Content-Type, Authorization, Origin , X-Requested-with, Accept'
} ));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', productsRoute);
// app.use('/orders', ordersRoute);

module.exports = app;
