const express = require('express');
const router = express.Router();
const { usuarios } = require('../models/dataBaseModels');
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        [obj] = await usuarios.findAll({ where: { email } });
        if (obj) {
            res.status(409).json({ error: 'User Already Registered!' });
        } else {
            const user = {
                email,
                password: sha1(password)
            }
            const result = await usuarios.create({ email: user.email });
            res.status(201).json(result);
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [user] = await usuarios.findAll({ where: { email } });
        if (user && user.password === sha1(password)) {

        }else {
            res.status(403).json({error:'email or password incorrect'})
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({error:'Internal Server Error'})
    }
})

module.exports = router;