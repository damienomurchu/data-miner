'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const api = require('../npm-service-methods');

/**
 * POST  /data/burndown
 *
 * Accepts a file of json JIRA data and sprint name
 * Returns a json dataset to feed a sprint burndown chart
*/
router.post('/burndown', upload.array(), function (req, res) {
  const request = req.body;
  const data = api.burndownReportData(request.jiradata, request.sprint);
  if (data.error)
    res.status(500).json('There was an error processing your request');
  else
    res.status(200).json(data);
});

/**
 * POST  /data/sprintReport
 *
 * Accepts a file of json JIRA data and sprint name
 * Returns a json dataset to feed a sprint report
*/
router.post('/sprintReport', upload.array(), function (req, res) {
  const request = req.body;
  const data = api.sprintReport(request.jiradata, request.sprint);
  if (data.error)
    res.status(500).json('There was an error processing your request');
  else
    res.status(200).json(data);
});

/**
 * POST  /data/velocity
 *
 * Accepts a file of json JIRA data
 * Returns a json dataset to feed a sprint velocity chart
*/
router.post('/velocity', function (req, res) {
  const request = req.body;
  const data = api.velocity(request.jiradata);
  if (data[0].error)
    res.status(500).json('There was an error processing your request');
  else
    res.status(200).json(data);
});

/**
 * POST  /data/averageAge
 *
 * Accepts a file of json JIRA data, start and end date
 * Returns a json dataset to feed a sprint average age chart
*/
router.post('/averageAge', upload.array(), function (req, res) {
  const request = req.body;
  const data = api.averageAge(request.jiradata, request.start, request.end);
  if (data.error)
    res.status(500).json('There was an error processing your request');
  else
    res.status(200).json(data);
});

/**
 * POST  /data/createdResolved
 *
 * Accepts a file of json JIRA data, start and end date
 * Returns a json dataset to render a created vs resolved chart
*/
router.post('/createdResolved', upload.array(), function (req, res) {
  const request = req.body;
  const data = api.createdResolved(request.jiradata, request.start, request.end);
  if (data[0].error)
    res.status(500).json('There was an error processing your request');
  else
    res.status(200).json(data);
});

/**
 * POST /data/sprintInfo
 *
 * Accepts a file of json JIRA data and a sprint name
 * Returns all sprint details
*/
router.post('/sprintInfo', upload.array(), function (req, res) {
  const request = req.body;
  const data = api.sprintInfo(request.jiradata, request.sprint);
  if (data[0].error)
    res.status(500).json('There was an error processing your request');
  else
    res.status(200).json(data);
});

/**
 * POST /data/issueData
 *
 * Accepts a file of json JIRA data
 * Returns all relevant details on each ticket in a sprint
*/
router.post('/issueData', upload.array(), function (req, res) {
  const request = req.body;
  const data = api.issueData(request.jiradata);
  if (data[0].error)
    res.status(500).json('There was an error processing your request');
  else
    res.status(200).json(data);
});

/**
 * POST /data/issuesInSprint
 *
 * Accepts a file of json JIRA data and a sprint name
 * Returns an array of all issues in that sprint
*/
router.post('/issuesInSprint', upload.array(), function (req, res) {
  const request = req.body;
  const data = api.issuesInSprint(request.jiradata, request.sprint);
  if (data[0].error)
    res.status(500).json('There was an error processing your request');
  else
    res.status(200).json(data);
});

/**
 * POST /data/resolvedDate
 *
 * Accepts a jira issue ticket
 * Returns the date an issue was resolved (if resolved)
*/
router.post('/resolvedDate', upload.array(), function (req, res) {
  const request = req.body;
  const data = api.resolvedDate(request.issue);
  if (data === 'no-issue-received')
    res.status(500).json('There was an error processing your request');
  else
    res.status(200).json(data);
});

/**
 * POST /data/resolvedDates
 *
 * Accepts a file of json JIRA data
 * Returns an array with the storypoints and resolved dates of all issues
*/
router.post('/resolvedDates', upload.array(), function (req, res) {
  const request = req.body;
  const data = api.resolvedDates(request.jiradata);
  if (data[0].error)
    res.status(500).json('There was an error processing your request');
  else
    res.status(200).json(data);
});

module.exports = router;
