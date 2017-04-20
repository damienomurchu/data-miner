'use strict';

const data = require('./data');
const sampleData = require('../sample-data/rc2.json');
const utils = require('../utils/data.js');

// accepts a start and end date, and returns a dataset to populate a created-v-resolved chart
exports.createdResolved = function (startDate, endDate) {

  // get date range
  var dateRange = utils.datesInRange(startDate, endDate);

  // get all created issues between date range
  var issuesInRange = sampleData.filter(issue => {
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

console.log(this.createdResolved('2017-03-01', '2017-03-31'));
