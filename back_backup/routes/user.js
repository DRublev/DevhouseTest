const router = require('express').Router();

const User = require('../db/models/User.js');

const passport = require('passport');
require('../passport')(passport);
let jwt = require('jsonwebtoken');

const config = require('../config.js');

router.post('/session', function (req, res) {
    let q = req.body;
    User.findOne({
        email: q.email
    }, function (err, user) {
        if (err) {
            console.log('Error exist user/session', err);
            res.json({ status: '904', data: {} });
        } else {
            if (!user) {
                res.json({ status: 'not user', data: {} });
            } else {
                user.comparePasswords(q.password, function (err, isMatch) {
                    let day = 60 * 60 * 24;
                    let token = jwt.sign(user.toJSON(), config.passport.secret, {
                        expiresIn: q.remember ? 30 * day : 3 * day
                    });
                    res.json({ status: '200', data: { auth: token } });
                })
            }
        }
    })
});

router.post('/register', function (req, res) {
    let q = req.body;

    let newUser = new User({
        email: q.email,
        password: q.password
    });

    newUser.save().then(() => res.json({ user: newUser.toJSON() }));
})

router.get('/session', function (req, res) {
    let newUser = new User({
        email: "aringai09@gmail.com",
        password: "1234"
    });
    newUser.save().then(() => res.json({ status: '202', data: {} }));
});

module.exports = router;