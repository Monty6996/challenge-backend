const joi = require('joi');

const schemas = {
	create: joi.object().keys({
		email: joi.string().email().required(),
		password: joi.string().min(8).required(),
	}),
};

module.exports = schemas;
