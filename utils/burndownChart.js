'use strict'

const burndown = require('./burndown');

exports.burndownReportData = function (jiraData, sprintName) {

  // guard against missing arguments
  if (!jiraData || !sprintName) {
    var reply = {};
    reply.error = 'You have not passed in valid arguments';
    return reply;
  }

  var dataSet = {};
  dataSet.report = 'Burndown report';
  dataSet.sprint = sprintName;
  dataSet.actualBurndown = burndown.actualBurndown(jiraData, sprintName);
  dataSet.expectedBurndown = burndown.theoreticalBurndownLine(jiraData, sprintName);
  dataSet.issueList = burndown.issueList(jiraData, sprintName);
  return dataSet;
};

