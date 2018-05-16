'use strict'

const burndown = require('./burndown');

exports.sprintReportData = function(jiraData, sprintName) {

  // guard against missing arguments
  if (!jiraData || !sprintName) {
    let reply = {};
    reply.error = 'You have not passed in valid arguments';
    return reply;
  }

  let dataSet = {};

  try {
    dataSet.report = 'Sprint report';
    dataSet.sprint = sprintName;
    dataSet.actualBurndown = burndown.actualBurndown(jiraData, sprintName);
    dataSet.expectedBurndown = burndown.theoreticalBurndownLine(jiraData, sprintName);
    dataSet.issueList = burndown.issueList(jiraData, sprintName);
  } catch (err) {
    dataSet.error = err.message;
  }

  return dataSet;
}
