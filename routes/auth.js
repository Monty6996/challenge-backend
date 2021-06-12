const express = require('express');

const router = express.Router();
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { usuarios } = require('../models/dataBaseModels');

const privateKey = fs.readFileSync('./private/private.pem');
const singOptions = { algorithm: 'RS512' }
const createToken = (payload) => jwt.sign(payload, privateKey, singOptions);

const {send} = require('../services/mail')

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [obj] = await usuarios.findAll({ where: { email } });
        if (obj) {
            res.status(409).json({ error: 'User Already Registered!' });
        } else {
            const user = {
                email,
                password: sha1(password)
            }
            
            await usuarios.create(user);
            
            const respuesta = await send({ to: email });

            res.status(201).json(respuesta);
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [user] = await usuarios.findAll({ where: { email }, atributes: ['id', 'email', 'password'] });
        if (user && user.password === sha1(password)) {
            const token = createToken({ id: user.id })
            res.status(200).json({JWT: token})
        }else {
            res.status(401).json({error:'email or password incorrect'})
        }

    } catch (err) {
        res.status(500).send({error:'Internal Server Error'})
    }
})

module.exports = router;