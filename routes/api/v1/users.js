var express = require('express');
var router = express.Router();
var User = require('../../../models').User;
var bcrypt = require('bcrypt');
var saltRounds = 12;
var uuidv5 = require('uuid/v5')

/*POST new user*/
router.post('/', function(req, res, next) {
  if (req.body.password != req.body.password_confirmation) {
    return res.status(500).json({ errors: 'Passwords Do Not Match' });
  }
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    User.create({
      email: req.body.email,
      password: hash,
      api_key: uuidv5(req.body.email, uuidv5.DNS)
    })
    .then(user => {
      res.setHeader('Content-Type', 'application/json');
      res.status(201).send(JSON.stringify({ api_key: user.api_key }));
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({ error });
    });
  });
});

module.exports = router;
