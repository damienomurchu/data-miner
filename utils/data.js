// data helper method class to facilitate things like retrieval of sprint dates, etc

'use strict'

var moment = require('moment');

// takes 2 date strings and returns an array of all the inclusive days
exports.datesInRange = function(startDate, endDate) {
  var dateRange = [];
  var st = moment(startDate.substring(0, 10)).add(12, 'hours'); // hack as date 1 hour off
  var nd = moment(endDate.substring(0, 10)).add(12, 'hours'); // hack as date 1 hour off
  while (st <= nd) {
    dateRange.push(st.toISOString().substring(0, 10));
    st.add(1, 'day');
  }
  return dateRange;
}

// takes a dateString like '2017-03-01' and returns true if day is a Saturday or Sunday
exports.isWeekend = function (dateString) {
  var day = new Date(dateString).getDay();
  return (day == 6) || (day == 0); // 6 = Saturday, 0 = Sunday
}

// takes a starting and ending datestring & returns the number of working days in the range
exports.workingDaysInRange = function (start, end) {
  return this.datesInRange(start, end).filter(day => {
    return !this.isWeekend(day);
  });
}

// helper to return array of all the full sprint value strings in a JIRA file
function getSprintDetails(jiraData) {
  // TODO get sprint details from most recently pulled file
  var unf = jiraData.map(issue => {
    return issue.Sprint;
  }).filter(sprint => {
    return (sprint.length > 0);
  });
  var fil = [].concat.apply([], unf); // flatten previous array of arrays

  return fil.filter((x, i, a) => a.indexOf(x) == i); // return only unique sprint values
};

// returns name, start and end date of sprint
exports.getSprintInfo = function(jiraData) {
  var details = getSprintDetails(jiraData);
  return details.map(detail => {
    var sprt = {};
    var spl = detail.split(',');
    sprt.sprintName = spl[3].substring(5);
    sprt.startDate = spl[4].substring(10);
    sprt.endDate = spl[5].substring(8);
    return sprt;
  });
};

// strips name of sprint from sprint string
function sprintName(longSprintString) {
  return longSprintString.split(',')[3].substring(5);
}

//returns a dataset to map the actual burndown for a sprint
exports.getSprintDates = function(jiraData, sprintName) {
  // get date range of sprint
  var sprint = this.getSprintInfo(jiraData).filter(dtl => {
    return dtl.sprintName === sprintName;
  })[0];
  var startDate = sprint.startDate;
  var endDate = sprint.endDate;
  return this.datesInRange(startDate, endDate);
}

// get all tickets in a sprint
exports.issuesInSprint = function(jiraData, sprintName) {
  var sprintTickets = jiraData.filter(issue => {
    // check there is a sprint value
    if (issue.Sprint === null || issue.Sprint.length < 1)
      return false;
    return issue.Sprint.filter(sprint => {
      return sprint.indexOf(sprintName) > -1;
    }).length;
  });
  return sprintTickets;
}

// returns the date an issue was resolved
exports.resolvedDate = function(issue) {

  if (!issue.History.Resolution)
    return 'unclosed';

  var resolvedDate = issue.History.Resolution.filter(issue => {
    return issue.to === 'Done';
  }).map(iss => {
    return iss.change;
  })[0];

  //return dayDate(resolvedDate);
  if (resolvedDate !== undefined)
    return resolvedDate.substring(0, 10);
  return undefined;
}

// get resolved dates for an array of issues
exports.resolvedDates = function (sprintTickets) {
  return sprintTickets.map(issue => {
    var iss = {};
    iss.id = issue.id;
    iss.jira = issue.key;
    iss.storypoints = issue['Story Points'] || 0;
    iss.resolved = this.resolvedDate(issue);
    return iss;
  });
}

// accepts an array of issues, and returns the number of story points from those issues that
// have been resolved by the date passed in
exports.ptsResolved = function (arr, date) {
  date = date.substring(0, 10);
  var pointsResolved = 0;
  arr.forEach(iss => {
    if (iss.date !== undefined && iss.date === date)
      pointsResolved = pointsResolved + iss.storypoints;
  });
  return pointsResolved;
}

// checks whether an issue is resolved at a certain date
exports.resolvedNow = function (iss, date) {
  if (iss.resolved === undefined)
    return false;
  return iss.resolved <= date;
}

// returns the number of times a value is in an array
exports.countItems = function (arr, what) {
  var count = 0, i;
  while ((i = arr.indexOf(what, i)) != -1) {
    ++count;
    ++i;
  }

  return count;
}

// returns pertinent details of a JIRA issue
exports.issueData = function (jiraData) {
  return jiraData.map(issue => {
    var iss = {};
    iss.id = issue.id;
    iss.jira = issue.key;
    iss.resolved = resolvedDate(issue);
    iss.resolution = issue.History.Resolution;
    iss.sprint = issue.History.Sprint; // TODO get all sprints ticket is in
    iss.assignee = issue.History.Assignee; // TODO get all assignees of ticket
    iss.status = issue.History.Status; // TODO get dates for Open, Coding in Prog, PR Sent, Dev Complete, Ready for QA, Done
    iss.storypoints = issue.History['Story Points']; // TODO dates story points are changed
    iss.description = issue.History.Description;
    iss.points = issue['Story Points'];
    return iss;
  })[5];
};

/*
iss.id
iss.jira
iss.res // Open or Done
iss.sprint // all sprints of ticket
iss.assignee // 0+ assignees
iss.open
iss.codinginprog
iss.prsent
iss.devcomplete
iss.readyforqa
iss.donedate
iss.storypoints
*/
