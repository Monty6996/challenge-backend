const { Sequelize } = require('sequelize');

const bd = new Sequelize('challenge_backend', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {min:0, max:10}
    
});

module.exports = bd;