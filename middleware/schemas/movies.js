const joi = require('joi');

const schemas = {
	create: joi.object().keys({
		imagen: joi.string().required(),
		titulo: joi.string().required(),
		generoId: joi.number().integer().required(),
		fecha_creacion: joi.date().required(),
		calificacion: joi.number().integer().required(),
	}),
    update: joi.object().keys({
        id: joi.number().integer().required(),
		imagen: joi.string().optional(),
		titulo: joi.string().optional(),
		generoId: joi.number().integer().optional(),
		fecha_creacion: joi.date().optional(),
		calificacion: joi.number().integer().optional(),
	}),
};

module.exports = schemas;