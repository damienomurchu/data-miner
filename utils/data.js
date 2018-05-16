// data helper method class to facilitate things like retrieval of sprint dates, etc

'use strict'

const moment = require('moment');

// takes 2 date strings and returns an array of all the inclusive days
exports.datesInRange = function (startDate, endDate) {
  let dateRange = [];
  const st = moment(startDate.substring(0, 10)).add(12, 'hours'); // hack as date 1 hour off
  const nd = moment(endDate.substring(0, 10)).add(12, 'hours'); // hack as date 1 hour off
  while (st <= nd) {
    dateRange.push(st.toISOString().substring(0, 10));
    st.add(1, 'day');
  }

  return dateRange;
};

// takes a dateString like '2017-03-01' and returns true if day is a Saturday or Sunday
exports.isWeekend = function (dateString) {
  const day = new Date(dateString).getDay();
  return (day == 6) || (day == 0); // 6 = Saturday, 0 = Sunday
};

// takes a starting and ending datestring & returns the number of working days in the range
exports.workingDaysInRange = function (start, end) {
  return this.datesInRange(start, end).filter(day => {
    return !this.isWeekend(day);
  });
};

// helper to return array of all the full sprint value strings in a JIRA file
function getSprintDetails(jiraData) {
  const unf = jiraData.map(issue => {
    return issue.Sprint;
  }).filter(sprint => {
    return (sprint.length > 0);
  });
  const fil = [].concat.apply([], unf); // flatten previous array of arrays

  return fil.filter((x, i, a) => a.indexOf(x) == i); // return only unique sprint values
}

// returns name, start and end date of sprint
exports.getSprintInfo = function (jiraData) {
  let sprintInfo = [];

  try {
    const details = getSprintDetails(jiraData);
    sprintInfo = details.map(detail => {
      let sprt = {};
      const spl = detail.split(',');
      sprt.sprintName = spl[3].substring(5);
      sprt.startDate = spl[4].substring(10);
      sprt.endDate = spl[5].substring(8);
      return sprt;
    });
  } catch (err) {
    let error = {};
    error.error = err.message;
    sprintInfo.push(error);
  }

  return sprintInfo;
};

// strips name of sprint from sprint string
function sprintName(longSprintString) {
  return longSprintString.split(',')[3].substring(5);
}

//returns a dataset to map the actual burndown for a sprint
exports.getSprintDates = function (jiraData, sprintName) {
  // get date range of sprint
  const sprint = this.getSprintInfo(jiraData).filter(dtl => {
    return dtl.sprintName === sprintName;
  })[0];
  const startDate = sprint.startDate;
  const endDate = sprint.endDate;
  return this.datesInRange(startDate, endDate);
};

// get all tickets in a sprint
exports.issuesInSprint = function (jiraData, sprintName) {
  let returnedIssues = [];

  try {
    returnedIssues = jiraData.filter(issue => {
      // check there is a sprint value
      if (issue.Sprint === null || issue.Sprint.length < 1)
        return false;
      return issue.Sprint.filter(sprint => {
        return sprint.indexOf(sprintName) > -1;
      }).length;
    });
  } catch (err) {
    let error = {};
    error.error = err.message;
    returnedIssues.push(error);
  }

  return returnedIssues;
};

// returns the date an issue was resolved
exports.resolvedDate = function (issue) {

  if (!issue)
    return 'no-issue-received';

  if (!issue.History.Resolution)
    return 'unclosed';

  var resolvedDate = issue.History.Resolution.filter(issue => {
    return issue.to === 'Done';
  }).map(iss => {
    return iss.change;
  })[0];

  if (resolvedDate !== undefined)
    return resolvedDate.substring(0, 10);
  return 'unclosed';
};

// get resolved dates for an array of issues
exports.resolvedDates = function (sprintTickets) {

  var returnedData = [];

  try {
    returnedData = sprintTickets.map(issue => {
      var iss = {};
      iss.id = issue.id;
      iss.jira = issue.key;
      iss.storypoints = issue['Story Points'] || 0;
      iss.resolved = this.resolvedDate(issue);
      return iss;
    });
  } catch (err) {
    var error = {};
    error.error = err.message;
    returnedData.push(error);
  }

  return returnedData;

};

// accepts an array of issues, and returns the number of story points from those issues that
// have been resolved by the date passed in
exports.ptsResolved = function (arr, date) {
  date = date.substring(0, 10);
  var pointsResolved = 0;
  arr.forEach(iss => {
    if (iss.resolved !== undefined && iss.resolved !== 'unclosed' && iss.resolved === date)
      pointsResolved = pointsResolved + iss['Story Points'];
  });
  return pointsResolved;
};

// checks whether an issue is resolved at a certain date
exports.resolvedNow = function (iss, date) {
  if (iss.resolved === undefined)
    return false;
  return iss.resolved <= date;
};

// returns the number of times a value is in an array
exports.countItems = function (arr, what) {
  var count = 0, i;
  while ((i = arr.indexOf(what, i)) != -1) {
    ++count;
    ++i;
  }

  return count;
};

// returns pertinent details of a JIRA issue
exports.issueData = function (jiraData) {
  var returnedIssues = [];

  try {
    returnedIssues = jiraData.map(issue => {
      var iss = {};
      iss.id = issue.id;
      iss.jira = issue.key;
      iss.resolution = issue.History.Resolution || [];
      iss.sprint = issue.History.Sprint || [];
      iss.assignee = issue.History.Assignee || [];
      iss.status = issue.History.Status || [];
      iss.storypoints = issue.History['Story Points'] || [];
      iss.description = issue.History.Description || [];
      iss.points = issue['Story Points'] || [];
      return iss;
    });
  } catch (err) {
    var error = {};
    error.error = err.message;
    returnedIssues.push(error);
  }

  return returnedIssues;
};
