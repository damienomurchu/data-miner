'use strict'

const express = require('express');
const router = express.Router();
const sampleData = require("../sample-data/rc2.json");
const multer = require('multer');
const upload = multer();


function readFile(filename) {
  return JSON.parse(filename);
}

// POST /graph/burndown
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint burndown chart
router.post('/burndown', function (req, res) {
  //TODO process received file & return a json dataset to populate a burndown chart
  //res.send('You have just hit the route: /graph/burndown');
  let data = require("../sample-data/rc2.json");
  let sprintTickets = data.map(function(obj) {
    
  });
  
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
router.post('/createdResolved', upload.fields([]), function (req, res) {
  //TODO process received file & return a json dataset to populate a burndown chart
  //res.send('You have just hit the route: /graph/createdResolved');
  let data = require("../sample-data/rc2.json");
  
  const startDate = request.body.start;
  const endDate = request.body.end;
  
  // TODO get all names of sprints
  // TODO for each sprint name add story points of ticket to sprint label =>
  // TODO
  // TODO dataset = [ {}, {}, {} ]
  
  
  let sprints = data;
  
  let sprintTickets = data.map(function(obj) {
    
  });

  res.send('start:  ' + startDate + '\nend: ' + endDate);
});

module.exports = router;
