var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/userModel');
var secrets = require('../../secrets');

module.exports = function() {
  passport.use(new FacebookStrategy({
      clientID: secrets.fbID,
      clientSecret: secrets.fbSecret,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      if (req.user) {
        console.log('User exists');
        var query = {};
        if (req.user.google) {
          console.log('google');
          var query = {
            'google.id': req.user.google.id
          };
        } else if (req.user.twitter) {
          var query = {
            'twitter.id': req.user.twitter.id
          };
        }
        User.findOne(query, function(err, user) {
          if (user) {
            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;

            user.save();
            done(null, user);
          }
        });

      } else {

        var user = {};
        var query = {
          'facebook.id': profile.id
        };
        User.findOne(query, function(error, user) {
          if (user) {
            console.log('found');
            done(null, user);

          } else {
            console.log('not found');
            var user = new User;
            user.email = profile.emails[0].value;
            //user.image = profile._json.image.url;
            user.displayName = profile.displayName;

            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;

            user.save();
            done(null, user);
          }
        });
      }
    }));
}