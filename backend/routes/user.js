const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config.js');

const VerifyToken = require('./VerifyToken.js');

const User = require('../db/models/User.js');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/register', (req, res) => {
    let body = req.body;

    let hashedPass = bcrypt.hashSync(body.password, 8);

    User.create({
        email: body.email,
        password: hashedPass
    }, (err, user) => {
        if (err) {
            res.status(500).send('Smth went wrong registering new user');
        }

        let token = jwt.sign({ id: user._id }, config.token.secret, { expiresIn: config.token.expiresIn });

        User.findById(decoded.id,
            {
                password: 0
            },
            (err, user) => {
                if (err) {
                    return res.status(500).send('Problem to find the user');
                }
                if (!user) {
                    return res.status(404).send('User not found');
                }

                res.status(200).send({ auth: true, token: token });
            });

    });
});

router.get('/me', VerifyToken, (req, res) => {
    User.findById(req.userId, { password: 0 }, (err, user) => {
        if (err) {
            return res.status(500).send('There was a problem finding the user');
        }

        if (!user) {
            return res.status(404).send('No user found');
        }

        res.status(200).send(user);
    });
});

router.use((user, req, res, next) => {
    res.status(200).send(user);
});

router.post('/login', (req, res) => {
    let body = req.body;

    User.findOne({ email: body.email }, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Server error. Sorry T_T');
        }

        if (!user) {
            return res.status(404).send('No user with this email found');
        }
        console.log(req.body);
        let passIsValid = bcrypt.compareSync(body.password, user.password);
        if (!passIsValid) {
            return res.status(401).send({ auth: false, token: null });
        }

        let token = jwt.sign({ id: user._id }, config.token.secret, { expiresIn: config.token.expiresIn });
        console.log('login');
        res.status(200).send({ auth: true, token: token });
    });
});

router.get('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;