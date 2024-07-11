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
    origin: config.ENV === 'prod' ? 'https://front-feed-digital.onrender.com' : 'http://localhost:5173',   
    methods: 'GET,POST,PUT,DELETE,OPTIONS', 
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true 
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.ENV === 'prod' ? 'https://front-feed-digital.onrender.com' : 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    console.log('Encabezados CORS configurados');
    next();
  });


const PORT = process.env.PORT || 8080;

dbConnection().then(() => console.log('Connect to MongoDB')).catch((error)=>console.log(error));

app.use(cookieParser());
app.use(session(storeConfig));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.send("Server OK"));
app.use('/api', apiRouter);

app.use(errorHandler); 

app.listen(PORT, ()=>{
    console.log(`Server OK on port: ${PORT}`);
    console.log(`ENVIRONMENT SERVER => ${config.ENV}`)
})



