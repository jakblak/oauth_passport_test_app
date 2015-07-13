var express = require('express');
var router = express.Router();
var secrets = require('../secrets');
var facebook = require('../services/facebook')(secrets.fbID, secrets.fbSecret);
var twitter = require('../services/twitter')(secrets.twitKey, secrets.twitSecret);
// Only allow access /users if logged in
// router.use('/', function(req, res, next) {
//   if(!req.user) {
//     res.redirect('/');
//   }
//   next();
// });

router.use('/', function(req, res, next) {
  if(req.user.twitter) {
    twitter.getUserTimeLine(req.user.twitter.token, req.user.twitter.tokenSecret, req.user.twitter.id, function(results) {
      req.user.twitter.lastPost = results[0].text;
      next();
    });
  }
});

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users', {
    if (req.user.facebook) {
      facebook.getImage(req.user.facebook.token, function(results) {
        req.user.facebook.image = results.url;
        res.render('users', {
          user: req.user
        });
      });
    } else {
      user: {
        user: req.user
        // name: req.user.displayName,
        // image: req.user.image
      }
    }
  });
});

module.exports = router;