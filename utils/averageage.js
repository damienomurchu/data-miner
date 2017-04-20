'use strict'

var moment = require('moment');
const sampleData = require('../sample-data/rc2.json');
const utils = require('../utils/data.js');

exports.averageAge = function (startDate, endDate) {

  var dateRange = utils.datesInRange(startDate, endDate);
  //console.log(dateRange);

  // pre-process jira data to reduce
  var issues = sampleData.map(issue => {
    var iss = {};
    iss.created = issue.Created.substring(0, 10);
    iss.resolved = utils.resolvedDate(issue);
    return iss;
  });

  // get relevant issues at each date point in range
  var dataset = {};
  dateRange.forEach(date => {

    // get all unresolved & open issues that exist on this date
    var relevantIssues = issues.filter(iss => {
      return (iss.created <= date) && !utils.resolvedNow(iss, date);
    });
    var numIssues = relevantIssues.length; // get number of issues

    // get age of each issue & derive average age of issues
    dataset[date] = relevantIssues.map(iss => {
      var created = moment(iss.created).add(12, 'hours'); // hack as date 1 hour off
      var current = moment(date).add(12, 'hours'); // hack as date 1 hour off
      return current.diff(created, 'days');
    }).reduce((a, b) => {
      return a + b;
    }) / numIssues;
  });
  return dataset;
};

console.log(this.averageAge('2017-03-01', '2017-03-31'));
