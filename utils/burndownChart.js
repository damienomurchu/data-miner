'use strict'

const burndown = require('./burndown');

exports.burndownReportData = function(jiraData, sprintName) {
  var dataSet = {};
  dataSet.report = 'Burndown report';
  dataSet.sprint = sprintName;
  dataSet.actualBurndown = burndown.actualBurndown(jiraData, sprintName);
  dataSet.expectedBurndown = burndown.theoreticalBurndownLine(jiraData, sprintName);
  dataSet.issueList = burndown.issueList(jiraData, sprintName);
  return dataSet;
};

