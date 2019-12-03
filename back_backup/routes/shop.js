const router = require('express').Router();

const Shop = require('../db/models/Shop.js');

let jwt = require('jsonwebtoken');

const config = require('../config.js');

router.get('/', function (req, res) {
    console.log('shop');
    res.json({
        status: 200,
        data: {
            shops: JSON.stringify(Shop.find({ name: 'asdasd' }).json) || { name: 'asd' }
        }
    });
});

router.post('/', function (req, res) {
    const newShop = new Shop({
        name: req.body.name || 'Default',
        address: req.body.address || 'default'
    });

    try {
        newShop.save();
        res.redirect('/');
    }
    catch (err) {
        res.redirect('/');
    }

    console.log(req.body);
})

module.exports = router;