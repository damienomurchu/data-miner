const utils = require('../utils/data.js');

var sprintName = 'IR300 Umbrella';


// returns an array of values to map the actual burndown of a sprint
exports.actualBurndown = function (jiraData, sprintName) {
  // get date range of sprint
  var sprintDates = utils.getSprintDates(jiraData, sprintName);

  // get all issues in sprint
  var sprintTickets = utils.issuesInSprint(jiraData, sprintName);

  // get dates of resolved issues
  var resolvedInfo = utils.resolvedDates(sprintTickets).filter(iss => {
    return iss.storypoints !== 0;
  }).map(tck => {
    dt = {};
    dt.resolved = tck.resolved;
    dt['Story Points'] = tck.storypoints;
    return dt;
  });

  // get total storypoints of issues in sprint
  var sprintPoints = sprintTickets.map(ticket => {
    return ticket['Story Points'] || 0; // if story points are null
  }).reduce((a, b) => {
    return a + b;
  });

  // reduces story points by points resolved - presumes dates are ordered!
  var startDate = sprintDates[0];
  var pointsResolved = 0;
  var actualBurndown = sprintDates.map(date => {
    pointsResolved = pointsResolved + utils.ptsResolved(resolvedInfo, date);
    var datapoint = {};
    datapoint.date = date;
    datapoint.points = sprintPoints - pointsResolved;
    return datapoint;
  });
  return actualBurndown;
}

// returns a dataset to map the theoretical burndown for a sprint
exports.theoreticalBurndownLine = function (jiraData, sprintName) {

  // get dates of sprint
  var sprintDates = utils.getSprintDates(jiraData, sprintName);
  var startDate = sprintDates[0];

  // get all issues that belong to sprint
  var sprintTickets = utils.issuesInSprint(jiraData, sprintName);

  // get total storypoints of issues in sprint
  var sprintPoints = sprintTickets.map(ticket => {
    return ticket['Story Points'] || 0; // if story points are null
  }).reduce((a, b) => {
    return a + b;
  });

  // calculate working days in sprint
  var workingDays = sprintDates.filter(date => {
    return !(utils.isWeekend(date));
  });

  var avgPointsPerDay = sprintPoints / workingDays.length;

  // for each working day in sprint, reduce points by theoretical amount
  var theoretical = sprintDates.map(date => {
    var datapoint = {};
    datapoint.date = date;
    var numdays = utils.workingDaysInRange(startDate, date).length;
    datapoint.points =  sprintPoints - (numdays * avgPointsPerDay);
    return datapoint;
  });

  return theoretical;
}

exports.issueList = function (jiraData, sprintName) {
  return utils.issuesInSprint(jiraData, sprintName).filter(iss => {
    return iss['Story Points'];
  }).map(issue => {
    var iss = {};
    iss.issue = issue.key;
    iss.events = JSON.stringify(issue.History); // TODO clean up event list and sort render by ascending date
    return iss;
  });
}

/*exports.burndownReportData = function(jiraData, sprintName) {
  var dataSet = {};
  dataSet.report = 'Burndown report';
  dataSet.sprint = sprintName;
  dataSet.actualBurndown = this.actualBurndown(jiraData, sprintName);
  dataSet.expectedBurndown = this.theoreticalBurndownLine(jiraData, sprintName);
  dataSet.issueList = this.issueList(jiraData, sprintName);
  return dataSet;
}*/
