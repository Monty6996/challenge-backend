const { Sequelize } = require('sequelize');
const db = require('../utils/bd');

const personajes = db.define('personajes', {
	nombre: { type: Sequelize.STRING },
	imagen: { type: Sequelize.STRING },
	edad: { type: Sequelize.FLOAT },
	peso: { type: Sequelize.INTEGER },
	historia: { type: Sequelize.STRING(512) },
});

const generos = db.define('generos', {
	nombre: { type: Sequelize.STRING },
	imagen: { type: Sequelize.STRING },
});

const peliculas = db.define('peliculas', {
	imagen: { type: Sequelize.STRING },
	titulo: { type: Sequelize.STRING },
	generoId: { type: Sequelize.INTEGER, foreignKey: true },
	fecha_creacion: { type: Sequelize.DATE },
	calificacion: { type: Sequelize.INTEGER(1, 5) },
});

const personajesAsociados = db.define('personajes_asociados', {
	peliculaId: {
		type: Sequelize.INTEGER,
		references: {
			model: peliculas,
			key: 'id',
		},
	},
	personajeId: {
		type: Sequelize.INTEGER,
		references: {
			model: personajes,
			key: 'id',
		},
	},
});

const usuarios = db.define('usuarios', {
	email: { type: Sequelize.STRING },
	password: { type: Sequelize.STRING },
});

generos.hasMany(peliculas);
peliculas.belongsTo(generos);
peliculas.belongsToMany(personajes, { through: 'personajes_asociados' });
personajes.belongsToMany(peliculas, { through: 'personajes_asociados' });

module.exports = { personajes, personajesAsociados, peliculas, generos, usuarios };
