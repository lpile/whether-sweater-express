var express = require('express');
var router = express.Router();
var User = require('../../../models').User;
var bcrypt = require('bcrypt');

/* POST login */
router.post('/', function(req, res, next) {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    var password_check = bcrypt.compareSync(req.body.password, user.password);
    if (password_check) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify({ api_key: user.api_key }));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({ errors: 'Incorrect Email/Password Combination' });
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({ error });
  });
});

module.exports = router;
