const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

const shop = require('./routes/shop');

app.use('/shop', shop);

app.listen(5100, () => console.log("Server is up on localhost:5100"));