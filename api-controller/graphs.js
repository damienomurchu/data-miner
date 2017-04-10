'use strict'

const express = require('express');
const router = express.Router();
const sampleData = require('../sample-data/rc2.json');
const multer = require('multer');
const upload = multer();

function readFile(filename) {
  return JSON.parse(filename);
}

// POST /graph/burndown
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint burndown chart
router.post('/burndown', function (req, res) {
  //res.send('You have just hit the route: /graph/burndown');
  let data = require('../sample-data/rc2.json');
  let sprintTickets = data.map(function (obj) {

  });

  res.json(sampleData);
  // TODO overview - accept & validate name of sprint & return json dataset to populate a burndown chart returned
  // TODO retrieve date range for sprint
  // TODO retrieve all issues that correspond to dates in sprint
  // TODO map all issues by date and storypoint value
  // TODO take account of any issues that drop in & out of sprint
  // TODO validate name of sprint
});

// POST /graph/sprintReport
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint report
router.post('/sprintReport', function (req, res) {
  res.send('You have just hit the route: /graph/sprintReport');
  // TODO overview - accept & validate name of a sprint & return json dataset to populate a JIRA sprint reports
  // TODO return same data as for /burndown along with data table of issues in burndown
});

// POST /graph/velocity
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint velocity chart
router.post('/velocity', function (req, res) {
  res.send('You have just hit the route: /graph/velocity');
  // TODO overview - accept a team & return a json dataset to populate a JIRA velocity chart
  // TODO map all sprints that correspond to the team/ board in question
  // TODO map all sprints by total storypoints & completed storypoints; order by date of sprint
});

// POST /graph/averageAge
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint average age chart
router.post('/averageAge', function (req, res) {
  res.send('You have just hit the route: /graph/averageAge');
  // TODO overview - accept a date range, and return a json dataset to populate a JIRA average-age report
  // TODO retrieve all open issues that correspond to date range
  // TODO for each date in query range map that date to the issues that were open on that date
  // TODO for each date calculate the age of each issue, sum them all, and divide by the total number of issues on that date
  // TODO return a json dataset where each date in query range will be mapped to the average age of all open issues on that date
});

// POST /graph/createdResolved
// Analyse the received raincatchDump.json & return a json dataset to feed a sprint created vs resolved chart
router.post('/createdResolved', upload.fields([]), function (req, res) {
  //res.send('You have just hit the route: /graph/createdResolved');
  let data = require('../sample-data/rc2.json');

  const startDate = request.body.start;
  const endDate = request.body.end;

  let sprints = data;

  let sprintTickets = data.map(function (obj) {

  });

  res.send('start:  ' + startDate + '\nend: ' + endDate);
  // TODO overview - accept a date range, and produce a dataset that populate a JIRA created-vs-resolved report
  // TODO retrieve all issues which have a created or a resolved date that corresponds to the query date range
  // TODO return a json dataset that maps each date in the query range to the number of issues created that day, and also the number of issues resolved that day
});

module.exports = router;
