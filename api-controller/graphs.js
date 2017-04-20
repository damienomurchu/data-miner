'use strict'

const express = require('express');
const router = express.Router();
const sampleData = require('../sample-data/rc2.json');
var multer = require('multer');
var upload = multer();
const utils = require('../utils/data.js');
const burndown = require('../utils/burndown');
const velocity = require('../utils/velocity');
const createdresolved = require('../utils/createdresolved');
const averageage = require('../utils/averageage');


router.post('/issue', upload.array(), function (req, res) {
  /*var issue = sampleData.filter(issue => {
    issue.id === request.body.id;
  });
  console.log(issue);*/
  //console.log('request: ' + request);
  console.log('req: ' + req);
  res.json(req.body);
});


// POST /graph/burndown
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint burndown chart
router.post('/burndown', upload.array(), function (req, res) {
  res.json(burndown.burndownReportData(req.body.sprint));
});

// POST /graph/sprintReport
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint report
router.post('/sprintReport', upload.array(), function (req, res) {
  res.json(burndown.burndownReportData(req.body.sprint));
});

// POST /graph/velocity
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint velocity chart
router.post('/velocity', function (req, res) {
  res.json(velocity.velocity());
});

// POST /graph/averageAge
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint average age chart
router.post('/averageAge', upload.array(), function (req, res) {
  /*console.log(req.body.start);
  console.log(req.body.end);
  req.body.start = '2017-01-01';
  req.body.end = '2017-03-31';*/
  var start = req.body.start;
  var end = req.body.end;
  res.json(averageage.averageAge(start, end));
  //res.json(averageage.averageAge('2017-01-01', '2017-03-31'));
});

// POST /graph/createdResolved
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint created vs resolved chart
router.post('/createdResolved', upload.array(), function (req, res) {
  //res.send('You have just hit the route: /graph/createdResolved');
  res.json(createdresolved.createdResolved(req.body.start, req.body.end));
});

module.exports = router;
