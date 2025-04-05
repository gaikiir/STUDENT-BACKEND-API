const express = require('express');
const app = express();
app.use(express.json());// Use express.json() to parse JSON request bodies
require('dotenv').config() //import dotenv to use the environment variables
const createError = require('http-errors')
require('./helpers/Init_mongodb');

const rateLimit = require('express-rate-limit');



//importing routes
const routes = require('./Routes/Student_Route');
const authRoute = require('./Routes/auth_route');
const lectRoutes = require('./Routes/Lecturer_routes');
const helmet = require('helmet');

app.use(helmet());
const Limiter = rateLimit({
    max:1050,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP Address please try again later'
});

app.use('/limit',Limiter);

const Cors = require('cors');
const AllowedOrigin = ['http://localhost:3000'];
app.use(Cors({
    origin:function(origin,callback){
        if(!origin || AllowedOrigin.includes(origin)){
            return callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    }
}))

app.use('/limit/auth',authRoute)
app.use('/limit/routes',routes)
app.use('/limit/lectroute',lectRoutes);



app.use(async (request, respond, next) => {
    //next(createError(404, "Page Not Found"));
    next(createError.NotFound());
})

app.use((err, request, respond, next) => {
    respond.status(err.status || 500);
    respond.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(process.env.port || 4000,()=>{
    console.log(`Now listening for requests on port: http://localhost:4000`);
});

