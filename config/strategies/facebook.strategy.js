var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var secrets = require('../../secrets');

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: secrets.fbID,
    clientSecret: secrets.fbSecret,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    user.email = profile.emails[0].value;
    //user.image = profile._json.image.url;
    user.displayName = profile.displayName;

    user.facebook = {};
    user.facebook.id = profile.id;
    user.facebook.token = accessToken;
    done(null, user);
  }));
}