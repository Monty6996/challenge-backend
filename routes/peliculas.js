const express = require('express');
const router = express.Router();
const { personajes, peliculas, categorias, generos } = require('../models/dataBaseModels');

/* GET home page. */
router.get('/', async (req, res) => {
	try {
		let parametros = {};

		req.query ? (parametros = { where: req.query }) : null;

		req.query.genre
			? (parametros = {
					include: {
						model: generos,
						attributes: [],
						where: { id: req.query.genre },
					},
			  })
			: null;

		req.query.order
			? (parametros = { order: [['fecha_creacion', req.query.order]] })
			: null;

		const result = await peliculas.findAll({
			attributes: ['imagen', 'titulo', 'fecha_creacion'],
			...parametros,
		});

		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		let result = await peliculas.findAll({
			where: { id: req.params.id },
			include: [
				{ model: personajes, attributes: ['id','nombre'], through: { attributes: [] } },
			],
		});

		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/', async (req, res) => {
	try {
		const { nombre, imagen, edad, peso, historia } = req.body;
		const mensaje = await personaje.create({
			nombre,
			imagen,
			edad,
			peso,
			historia,
		});
		res.status(200).json(mensaje);
	} catch (err) {
		console.log(err);
		res.end(500);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const result = await personajes.update(req.body, {
			where: { id: req.params.id },
		});
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const result = await personajes.destroy({ where: { id: req.params.id } });
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

module.exports = router;
