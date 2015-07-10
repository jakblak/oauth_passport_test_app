var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var secrets = require('../../secrets');

module.exports = function() {
  passport.use(new TwitterStrategy({
      consumerKey: secrets.twitKey,
      consumerSecret: secrets.twitSecret,
      callbackURL: 'http://localhost:3000/auth/twitter/callback',
      passReqToCallback: true
    },
    function(req, token, tokenSecret, profile, done) {
      var user = {};

      //user.email = profile.emails[0].value;
      user.image = profile._json.image.url;
      user.displayName = profile.displayName;

      user.twitter = {};
      user.twitter.id = profile.id;
      user.twitter.token = token;
      done(null, user);
    }));
}