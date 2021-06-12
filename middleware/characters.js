const { create, update } = require('./schemas/characters');

const validateCreate = (req, res, next) => {
	const { error } = create.validate(req.body);

	error ? res.status(422).json({ message: error.details[0].message }) : next();
};

const validateUpdate = (req, res, next) => {
	const { error } = update.validate(req.body);

	error ? res.status(422).json({ message: error.details[0].message }) : next();
};

module.exports = { validateCreate, validateUpdate };
