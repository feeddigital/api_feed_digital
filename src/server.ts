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
    origin: ['https://front-feed-digital.vercel.app', 'http://localhost:5173'],   
    methods: 'GET,POST,PUT,DELETE,OPTIONS', 
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true 
}));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', ['https://front-feed-digital.vercel.app', 'http://localhost:5173']);
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     console.log('Encabezados CORS configurados');
//     next();
//   });

app.use((req, res, next) => {
    const allowedOrigins = ['https://front-feed-digital.vercel.app', 'http://localhost:5173'];
    const origin = req.headers.origin || '';
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });


const PORT = process.env.PORT || 8080;

dbConnection().then(() => console.log('Connect to MongoDB')).catch((error)=>console.log(error));

app.use(express.static('public'));
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
});

export default app;



