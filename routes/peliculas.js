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

		[result] ? res.status(200).json(result) : res.status(404).json({ error: 'Not Found' });

	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/', async (req, res) => {
	try {
		const { titulo, imagen, generoId, fecha_creacion, calificacion } = req.body;
		if(await peliculas.findAll({ where: { titulo, imagen, generoId, fecha_creacion, calificacion } })) { return res.status(409).json({ error:'Already Exists!'}) }
        const mensaje = await peliculas.create({
					imagen,
					titulo,
					generoId,
					fecha_creacion,
					calificacion,
				});
		res.status(201).json(mensaje);
	} catch (err) {
		res.end(500);
	}
});

router.put('/', async (req, res) => {
	try {
		const [movie] = await peliculas.findAll({ where: { id: req.body.id } });

		if (movie) {
			const result = await peliculas.update(req.body, {
				where: { id: req.body.id },
			});
			res.status(200).json(result);
		} else {
			res.status(404).json({ error: 'Not Found' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

router.delete('/', async (req, res) => {
	try {
		const result = await peliculas.destroy({ where: { id: req.body.id } });
		(result === 1)
			? res.sendStatus(204)
			: res.status(404).json({ error: 'Not Found' });
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
