var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var secrets = require('../../secrets');

module.exports = function() {
  passport.use(new GoogleStrategy({
    clientID: secrets.ID,
    clientSecret: secrets.secret,
    callbackURL: 'https://localhost:3000/auth/google/callback',
  }, function(req, accessToken, refreshToken, profile, done) {
    done(null, profile);
  }));
}