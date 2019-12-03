var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('./db/models/User.js');
var config = require('./config.js');

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromExtractors(
        [ExtractJwt.fromAuthHeaderWithScheme('jwt'), ExtractJwt.fromUrlQueryParameter('auth')]);
    opts.secretOrKey = config.passport.secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({
            _id: jwt_payload._id
        }).populate({
            path: 'position'
        }).then(function (user) {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }, function (err) {
            return done(err, false);
        });
    }));
};
