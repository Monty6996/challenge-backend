const { create } = require('./schemas/usuarios');

const validateCreate = (req, res, next) => {
	const { error } = create.validate(req.body);

	error ? res.status(422).json({ message: error.details[0].message }) : next();
};

module.exports = { validateCreate };
