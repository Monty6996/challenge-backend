const express = require('express');
const router = express.Router();
const { personajes, peliculas } = require('../models/dataBaseModels');

/* GET home page. */
router.get('/', async (req, res) => {
	try {
		
		console.log(req.query);
		let resultado = {};
		if (req.query.movies) {
			resultado = await personajes.findAll({
				attributes: ['imagen', 'nombre'],
				include: {
					model: peliculas,
					attributes: [],
					where: { id: req.query.movies },
				}
			});
		} else {
			resultado = await personajes.findAll({
				attributes: ['imagen', 'nombre'],
				where: req.query,
			});
		}
		res.status(200).json(resultado);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		let result = await personajes.findAll({
			where: { id: req.params.id },
			include: { model: peliculas, through: { attributes: [] } },
		});
		
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error)
	}
	
});

router.post('/', async (req, res) => {
	try {
		const { nombre, imagen, edad, peso, historia } = req.body;
		if(personajes.findAll({ where: { nombre, imagen, edad, peso, historia } })){
			res.status(400).json({ error: 'Already Exists!' })
		} else {
		const mensaje = await personajes.create({
			nombre,
			imagen,
			edad,
			peso,
			historia,
		});
		res.status(200).json(mensaje);
		}
	} catch (err) {
		res.status(500).json(error);
	}
});

router.put('/:id', async (req, res) => {
	try {
		if ((personajes.findAll({ where: { id: req.params.id } })) === 0) {
			const result = await personajes.update(req.body, {
				where: { id: req.params.id },
			});
			res.status(200).json(result);
		} else {
			res.status(404).json({ error:'Not Found' });
		}
		
	} catch (error) {
		res.status(500).json(error);
	}
});


router.delete('/:id', async (req, res) => {
	try {
		const result = await personajes.destroy({ where: { id: req.params.id }})
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
