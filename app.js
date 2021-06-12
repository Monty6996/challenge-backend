const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const charactersRouter = require('./routes/personajes');
const moviesRouter = require('./routes/peliculas');
const authRouter = require('./routes/auth')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/characters', charactersRouter);
app.use('/movies', moviesRouter);
app.use('/auth', authRouter)

app.use(function (req, res, next) {
    res.status(404).json({ error: 'Not Found' });
});


module.exports = app;
