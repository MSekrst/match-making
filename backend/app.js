import express from 'express';
import http from 'http';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './mongo';

import routes from './routes';
import passport from 'passport'

const app = express();
const server = http.Server(app);

// load environment variables from .env file
dotenv.config();

// connects to the database
connectDb();

// middleware used
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// use routes defined in an index file
app.use('/', routes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// server static files from 'public' folder
app.use(express.static('public'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res) => {
        res.status(err.status || 500);
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
    res.status(err.status || 500);
});

export default app;
