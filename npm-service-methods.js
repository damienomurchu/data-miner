// all method calls to code when required as an npm

'use strict'

const burndown = require('./utils/burndownChart');
const velocity = require('./utils/velocity');
const createdresolved = require('./utils/createdresolved');
const averageage = require('./utils/averageage');
const sprintReport = require('./utils/sprintReport');
const utils = require('./utils/data');

// graph data-set handlers
exports.burndownReportData = burndown.burndownReportData;
exports.velocity = velocity.velocity;
exports.createdResolved = createdresolved.createdResolved;
exports.averageAge = averageage.averageAge;
exports.sprintReport = sprintReport.sprintReportData;

// supplementary utils methods
exports.sprintInfo = utils.getSprintInfo; // returns all sprint details in a jira dump
exports.issueData = utils.issueData; // returns all relevant info on each ticket in a sprint
exports.issuesInSprint = utils.issuesInSprint; // returns an array of all issues in a sprint
exports.resolvedDate = utils.resolvedDate; // returns the date an issue was resolved (if resolved)
exports.resolvedDates = utils.resolvedDates; // returns an array with the storypoints and resolved dates of all issues
