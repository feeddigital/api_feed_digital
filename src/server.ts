import express from 'express';
import passport from 'passport';
import './passport/google-strategy';
import cookieParser from "cookie-parser";
import session from "express-session";
import { dbConnection, storeConfig } from './config/db.connection';
import { errorHandler } from './middlewares/error.handler';
import apiRouter from './routes/index';
import cors from 'cors';

import config from './config/config';

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',   
    methods: 'GET,POST,PUT,DELETE', 
    allowedHeaders: 'Content-Type,Authorization' 
}));

const PORT = process.env.PORT || 8080;

dbConnection().then(() => console.log('Connect to MongoDB')).catch((error)=>console.log(error));

app.use(cookieParser());
app.use(session(storeConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

app.use(errorHandler); 

app.listen(PORT, ()=>{
    console.log(`Server OK on port: ${PORT}`);
    console.log(`ENVIRONMENT SERVER => ${config.ENV}`)
})



