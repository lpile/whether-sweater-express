require('dotenv').config()
const fetch = require('node-fetch');
var express = require('express');
var router = express.Router();
var User = require('../../../models').User;

/* GET forecast */
router.get('/', function(req, res, next) {
  User.findOne({ where: { api_key: req.body.api_key } })
  .then(forecast => {
    let locationQuery = req.query.location
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?&address=${locationQuery}&key=${process.env.googleApiKey}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      let location = data.results[0].geometry.location
      return location
    })
    .then(location => {
      fetch(`https://api.darksky.net/forecast/${process.env.darkskyApiKey}/${location.lat}, ${location.lng}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        forecast_data = {};
        forecast_data['location'] = locationQuery
        forecast_data['currently'] = data.currently
        forecast_data['hourly'] = data.hourly.data.slice(0,8)
        forecast_data['daily'] = data.daily.data.slice(1,8)
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(forecast_data));
      })
    })
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(401).send({ error: 'Unauthorized' });
  });
});

module.exports = router;
