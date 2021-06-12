const fs = require('fs');

const jwt = require('jsonwebtoken');

const publickey = fs.readFileSync('./private/public.pem');

const isUser = (req, res, next) => {
	try {
		const { authorization } = req.headers;
        const { id } = jwt.verify(authorization, publickey);
        req.id = id;
		next();
	} catch (error) {
		res.sendStatus(401);
	}
};

module.exports = isUser;
