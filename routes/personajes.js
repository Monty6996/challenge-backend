/* eslint-disable no-unused-expressions */
const express = require('express');

const router = express.Router();
const { personajes, peliculas } = require('../models/dataBaseModels');
const {validateCreate, validateUpdate} = require('../middleware/characters')

router.get('/', async (req, res) => {
	try {
		let resultado = {};
		if (req.query.movies) {
			resultado = await personajes.findAll({
				attributes: ['imagen', 'nombre'],
				include: {
					model: peliculas,
					attributes: [],
					where: { id: req.query.movies },
				},
			});
		} else {
			resultado = await personajes.findAll({
				attributes: ['imagen', 'nombre'],
				where: req.query,
			});
		}
		res.status(200).json(resultado)
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const result = await personajes.findAll({
			where: { id: req.params.id },
			include: { model: peliculas, through: { attributes: [] } },
		});

		result
			? res.status(200).json(result)
			: res.status(404).json({ error: 'Not Found' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.post('/', validateCreate, async (req, res) => {
	try {
		const { nombre, imagen, edad, peso, historia } = req.body;
		const [obj] = await personajes.findAll({ where: { nombre, imagen, edad, peso, historia } })
		if (obj) {
			res.status(409).json({ error: 'Already Exists!' });
		} else {
			const mensaje = await personajes.create({
				nombre,
				imagen,
				edad,
				peso,
				historia,
			});
			res.status(201).json(mensaje);
		}
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error'});
	}
});

router.put('/', validateUpdate, async (req, res) => {
	try {
		const [character] = await personajes.findAll({ where: { id: req.body.id } });

		if (character) {
			const result = await personajes.update(req.body, {
				where: { id: req.body.id },
			});
			res.status(200).json(result);
		} else {
			res.status(404).json({ error: 'Not Found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.delete('/', async (req, res) => {
	try {
		const result = await personajes.destroy({ where: { id: req.body.id } });
		result === 1
			? res.sendStatus(204)
			: res.status(404).json({ error: 'Not Found' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
