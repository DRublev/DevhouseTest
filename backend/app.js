const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const config = require('./config.json');

mongoose.promise = global.Promise;

const isProd = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: config.secret,
    cookie: { maxAge: 60000 }, 
    resave: false,
    saveUninitialized: false
}));

if (!isProd) {
    app.use(errorHandler());
}

mongoose.connect(config.mongoConnect);
mongoose.set('debug', true);

require('./models/Users');
require('./config/passport');
app.use(require('./routes'));


app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: (!isProd) ? err : {},
        },
    });
});

app.listen(8000, () => console.debug('Server is running on http://localhost:8000/'));