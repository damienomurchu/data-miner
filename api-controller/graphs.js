//var User = require('../models/user');
const express = require('express');
const router = express.Router();
//const sampleData = JSON.parse(require("../rc2.json"));
const sampleData = require("../rc2.json");



function readFile(filename) {
  return JSON.parse(filename);
}

// POST /graph/burndown
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint burndown chart
router.post('/burndown', function (req, res) {
  //TODO process received file & return a json dataset to populate a burndown chart
  //res.send('You have just hit the route: /graph/burndown');
  res.json(sampleData);
});

// POST /graph/sprintReport
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint report
router.post('/sprintReport', function (req, res) {
  //TODO process received file & return a json dataset to populate a burndown chart
  res.send('You have just hit the route: /graph/sprintReport');
});

// POST /graph/velocity
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint velocity chart
router.post('/velocity', function (req, res) {
  //TODO process received file & return a json dataset to populate a burndown chart
  res.send('You have just hit the route: /graph/velocity');
});

// POST /graph/averageAge
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint average age chart
router.post('/averageAge', function (req, res) {
  //TODO process received file & return a json dataset to populate a burndown chart
  res.send('You have just hit the route: /graph/averageAge');
});

// POST /graph/createdResolved
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint created vs resolved chart
router.post('/createdResolved', function (req, res) {
  //TODO process received file & return a json dataset to populate a burndown chart
  res.send('You have just hit the route: /graph/createdResolved');
});

module.exports = router;
