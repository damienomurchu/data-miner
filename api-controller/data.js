'use strict'

const express = require('express');
const router = express.Router();
const sampleData = require('../sample-data/rc2.json');
var multer = require('multer');
var upload = multer();
const api = require('../npm-service-methods');

// POST /graph/burndown
// takes a file of json JIRA data and sprint name, and returns a json dataset to feed a sprint burndown chart
router.post('/burndown', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.burndownReportData(request.jiradata, request.sprint));
});

// POST /graph/sprintReport
// takes a file of json JIRA data and sprint name, and returns a json dataset to feed a sprint report
router.post('/sprintReport', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.sprintReport(request.jiradata, request.sprint));
});

// POST /graph/velocity
// takes a file of json JIRA data, and returns a json dataset to feed a sprint velocity chart
router.post('/velocity', function (req, res) {
  const request = req.body;
  res.json(api.velocity(request.jiradata));
});

// POST /graph/averageAge
// takes a file of json JIRA data, start and end date, and returns a json dataset to feed a sprint average age chart
router.post('/averageAge', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.averageAge(request.jiradata, request.start, request.end));
});

// POST /graph/createdResolved
// takes a file of json JIRA data, start and end date, and returns a json dataset to render a created vs resolved chart
router.post('/createdResolved', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.createdResolved(request.jiradata, request.start, request.end));
});

// POST /data/sprintInfo
// takes a file of json JIRA data and a sprint name, and returns all sprint details
router.post('/sprintInfo', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.sprintInfo(request.jiradata, request.sprint));
});

// POST /data/issueData
// takes a file of json JIRA data and returns all relevant details on each ticket in a sprint
router.post('/issueData', upload.array(), function (req, res) {
  res.json(api.issueData(request.jiradata));
});

// POST /issuesInSprint
// takes a file of json JIRA data and a sprint name, and returns an array of all issues in that sprint
router.post('/issuesInSprint', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.issuesInSprint(request.jiradata, request.sprint));
});

// POST /resolvedDate
// takes a jira issue ticket and returns the date an issue was resolved (if resolved)
router.post('/resolvedDate', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.resolvedDate(request.issue));
});

// POST /resolvedDates
// takes a file of json JIRA data and returns an array with the storypoints and resolved dates of all issues
router.post('/resolvedDates', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.resolvedDates(request.jiradata));
});

module.exports = router;
