const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

app.use((req,res,next)=> {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header','*');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Method','*');
        return res.status(200).json({});
    }
    next();
});

//routes
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

//connecting mongoose
mongoose.connect('mongodb+srv://siddhant:siddhant@cluster0-cwdsl.mongodb.net/test?retryWrites=true');

//using default promise
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', userRoutes);

app.use((req,res,next)=> {
    const error = new Error('NOT FOUND');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=> {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;
