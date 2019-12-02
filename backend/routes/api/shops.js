const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Shops = mongoose.model('Shops');

router.get('/', auth.optional, (req, res, next) => {
    return Shops.find({}, (err, shops) => {
        res.render('/', { shops: shops });
    });
});

router.post('/create', auth.required, (req, res, next) => {
    const {
        body: { shop },
        payload: { id }
    } = req;

    shop.owner = id;

    const finalShop = new Shops(shop);

    finalShop.save().then(() => res.redirect('/'));
});