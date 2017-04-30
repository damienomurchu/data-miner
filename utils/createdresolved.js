'use strict';

const utils = require('./data.js');

// accepts a start and end date, and returns a dataset to populate a created-v-resolved chart
exports.createdResolved = function (jiraData, startDate, endDate) {

  // guard against missing arguments
  if (!jiraData || !startDate || !endDate) {
    var reply = {};
    reply.error = 'You have not passed in valid arguments';
    return reply;
  }

  // guard to ensure incoming dates are YYYY-MM-DD strings
  if (startDate instanceof Date)
    startDate = startDate.toISOString().substring(0, 10);
  if (endDate instanceof Date)
    endDate = endDate.toISOString().substring(0, 10);

  // get date range
  var dateRange = utils.datesInRange(startDate, endDate);

  // get all created issues between date range
  var issuesInRange = jiraData.filter(issue => {
    var createdDate = issue.Created.substring(0, 10);
    return (createdDate >= startDate) && (createdDate <= endDate);
  });

  var created = [];
  var resolved = [];

  // populate created and resolved arrays with all created and resolved issues
  issuesInRange.forEach(issue => {
    created.push(issue.Created.substring(0, 10));

    var dateResolved = utils.resolvedDate(issue);
    if ((dateResolved) && (dateResolved >= startDate) && (dateResolved <= endDate))
      resolved.push(dateResolved);
  });

  // check how many created and resolved issues for each date in report range
  var crt = {};
  var res = {};
  dateRange.forEach(date => {
    var c = utils.countItems(created, date);
    var r = utils.countItems(resolved, date);
    crt[date] = c;
    res[date] = r;
  });

  // build and return json dataset object
  var dataset = [];

  var c = {};
  var r = {};
  c.created = crt;
  r.resolved = res;

  dataset.push(c);
  dataset.push(r);
  return dataset;
};
