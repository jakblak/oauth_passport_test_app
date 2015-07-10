var express = require('express');
var router = express.Router();

// Only allow access /users if logged in
// router.use('/', function(req, res, next) {
//   if(!req.user) {
//     res.redirect('/');
//   }
//   next();
// });

/* GET users listing. */
router.get('/user', function(req, res) {
  res.render('users', {
    user: {
      name: req.user.displayName,
      image: req.user.image
    }
  });
});

module.exports = router;
