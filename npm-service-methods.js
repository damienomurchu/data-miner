// all method calls to code when required as an npm

'use strict'

const burndown = require('./utils/burndown');
const velocity = require('./utils/velocity');
const createdresolved = require('./utils/createdresolved');
const averageage = require('./utils/averageage');
const sprintReport = require('./utils/sprintReport');

exports.burndownReportData = burndown.burndownReportData;

exports.velocity = velocity.velocity;

exports.createdResolved = createdresolved.createdResolved;

exports.averageAge = averageage.averageAge;

exports.sprintReport = sprintReport.sprintReportData;
