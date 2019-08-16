var express = require('express');
var router = express.Router();
var User = require('../../../models').User;
var Location = require('../../../models').Location;

/* POST new favorite */
router.post('/', function(req, res, next) {
  User.findOne({ where: { api_key: req.body.api_key } })
  .then(user => {
    if (user) {
      user.createLocation({
        name: req.body.location
      }).then(location => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({ message: `${location.name} has been added to your favorites` });
      }).catch(error => {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send({ error });
      });
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(401).send({ error: 'Unauthorized' });
  });
});

/* DELETE favorite */
router.delete('/', function(req, res, next) {
  User.findOne({ where: { api_key: req.body.api_key } })
  .then(user => {
    Location.destroy({
      where: {
        name: req.body.location,
        UserId: user.id
      }
    }).then(location => {
      res.setHeader('Content-Type', 'application/json');
      res.status(204)
    }).catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({ error });
    });
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(401).send({ error: 'Unauthorized' });
  });
});

module.exports = router;
