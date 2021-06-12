const joi = require('joi');

const schemas = {
	create: joi.object().keys({
		nombre: joi.string().required(),
		imagen: joi.string().required(),
		edad: joi.number().integer().required(),
		peso: joi.number().positive().required(),
		historia: joi.string().required(),
	}),
	update: joi.object().keys({
		id: joi.number().integer().required(),
		nombre: joi.string().optional(),
		imagen: joi.string().optional(),
		edad: joi.number().integer().optional(),
		peso: joi.number().positive().optional(),
		historia: joi.string().optional(),
	}),
};

module.exports = schemas;
