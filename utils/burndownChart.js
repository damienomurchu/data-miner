'use strict'

const burndown = require('./burndown');

exports.burndownReportData = function (jiraData, sprintName) {

  // guard against missing arguments
  if (!jiraData || !sprintName) {
    const reply = {};
    reply.error = 'You have not passed in valid arguments';
    return reply;
  }

  const dataSet = {};

  try {
    dataSet.report = 'Burndown report';
    dataSet.sprint = sprintName;
    dataSet.actualBurndown = burndown.actualBurndown(jiraData, sprintName);
    dataSet.expectedBurndown = burndown.theoreticalBurndownLine(jiraData, sprintName);
    dataSet.issueList = burndown.issueList(jiraData, sprintName);
  } catch (err) {
    dataSet.error = err.message;
  }

  return dataSet;
};

