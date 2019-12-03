const mongoose = require('mongoose');
const config = require('../config.js');

mongoose.set("useFindAndModiy", false);

const db = mongoose.createConnection(config.mongo.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

db.on('error', console.error.bind(console, 'Mongo connection error:'));

db.once('open', function callback() {
    console.log('Mongo ' + config.mongo.url + ' connected!');
});
mongoose.Promise = global.Promise;

module.exports = mongoose;