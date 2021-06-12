const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const isUser = require('./middleware/isUser');
const { validateCreate } = require('./middleware/usuarios');

const charactersRouter = require('./routes/personajes');
const moviesRouter = require('./routes/peliculas');
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/characters', isUser, charactersRouter);
app.use('/movies', isUser, moviesRouter);
app.use('/auth', validateCreate, authRouter);

app.use((req, res) => {
	res.status(404).json({ error: 'Not Found' });
});

module.exports = app;
