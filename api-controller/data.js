'use strict';

const express = require('express');
const router = express.Router();
const sampleData = require('../sample-data/rc2.json');
var multer = require('multer');
var upload = multer();
const api = require('../npm-service-methods');

/**
 * POST /graph/burndown
 *
 * Accepts a file of json JIRA data and sprint name
 * Returns a json dataset to feed a sprint burndown chart
*/
router.post('/burndown', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.burndownReportData(request.jiradata, request.sprint));
});

/**
 * POST /graph/sprintReport
 *
 * Accepts a file of json JIRA data and sprint name
 * Returns a json dataset to feed a sprint report
*/
router.post('/sprintReport', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.sprintReport(request.jiradata, request.sprint));
});

/**
 * POST /graph/velocity
 *
 * Accepts a file of json JIRA data
 * Returns a json dataset to feed a sprint velocity chart
*/
router.post('/velocity', function (req, res) {
  const request = req.body;
  res.json(api.velocity(request.jiradata));
});

/**
 * POST /graph/averageAge
 *
 * Accepts a file of json JIRA data, start and end date
 * Returns a json dataset to feed a sprint average age chart
*/
router.post('/averageAge', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.averageAge(request.jiradata, request.start, request.end));
});

/**
 * POST /graph/createdResolved
 *
 * Accepts a file of json JIRA data, start and end date
 * Returns a json dataset to render a created vs resolved chart
*/
router.post('/createdResolved', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.createdResolved(request.jiradata, request.start, request.end));
});

/**
 * POST /data/sprintInfo
 *
 * Accepts a file of json JIRA data and a sprint name
 * Returns all sprint details
*/
router.post('/sprintInfo', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.sprintInfo(request.jiradata, request.sprint));
});

/**
 * POST /data/issueData
 *
 * Accepts a file of json JIRA data
 * Returns all relevant details on each ticket in a sprint
*/
router.post('/issueData', upload.array(), function (req, res) {
  res.json(api.issueData(request.jiradata));
});

/**
 * POST /issuesInSprint
 *
 * Accepts a file of json JIRA data and a sprint name
 * Returns an array of all issues in that sprint
*/
router.post('/issuesInSprint', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.issuesInSprint(request.jiradata, request.sprint));
});

/**
 * POST /resolvedDate
 *
 * Accepts a jira issue ticket
 * Returns the date an issue was resolved (if resolved)
*/
router.post('/resolvedDate', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.resolvedDate(request.issue));
});

/**
 * POST /resolvedDates
 *
 * Accepts a file of json JIRA data
 * Returns an array with the storypoints and resolved dates of all issues
*/
router.post('/resolvedDates', upload.array(), function (req, res) {
  const request = req.body;
  res.json(api.resolvedDates(request.jiradata));
});

module.exports = router;
