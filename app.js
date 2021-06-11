const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const charactersRouter = require('./routes/personajes');
const moviesRouter = require('./routes/peliculas');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/characters', charactersRouter);
app.use('/movies', moviesRouter);



module.exports = app;
