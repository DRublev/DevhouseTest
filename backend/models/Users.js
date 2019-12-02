const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: String,
    hash: String,
    salt: String,
});

const generateHash = (password) => {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = generateHash(password);
};

UserSchema.methods.valideatePassword = function (password) {
    const hash = generateHash(password);

    return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
    const today = Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, config.secret);
};

UserSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

mongoose.model('Users', UserSchema);