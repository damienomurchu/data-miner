'use strict'

const burndown = require('./burndown');

var sprintName = 'IR300 Umbrella';

exports.sprintReportData = function(jiraData, sprintName) {
  var dataSet = {};
  dataSet.report = 'Sprint report';
  dataSet.sprint = sprintName;
  dataSet.actualBurndown = burndown.actualBurndown(jiraData, sprintName);
  dataSet.expectedBurndown = burndown.theoreticalBurndownLine(jiraData, sprintName);
  dataSet.issueList = burndown.issueList(jiraData, sprintName);
  return dataSet;
}

console.log(this.sprintReportData(sampleData, sprintName));
