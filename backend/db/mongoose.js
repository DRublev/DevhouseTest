const mongoose = require('mongoose');
const config = require('../config.js');

const Schema = mongoose.Schema;

mongoose.connect(config.mongo.url, config.mongo.options);

mongoose.connection.on('error', console.error.bind(console, 'Mongo connection error:'));
mongoose.connection.once('open', (err) => {
    console.log('Mongo connection opened');
});

mongoose.Promise = global.Promise;
module.exports = mongoose;