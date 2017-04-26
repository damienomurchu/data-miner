'use strict'

var moment = require('moment');
const utils = require('../utils/data.js');

exports.averageAge = function (jiraData, startDate, endDate) {

  //console.log('start: ' + startDate);
  //console.log('end: ' + endDate);

  var dateRange = utils.datesInRange(startDate, endDate);
  //console.log('dateRange: ' + dateRange);

  // pre-process jira data to reduce
  var issues = jiraData.map(issue => {
    var iss = {};
    iss.created = issue.Created.substring(0, 10);
    iss.resolved = utils.resolvedDate(issue);
    return iss;
  });
  //console.log('issues: ' + issues);

  // get relevant issues at each date point in range
  var dataset = {};
  dateRange.forEach(date => {

    //console.log('date: ' + date);

    // get all unresolved & open issues that exist on this date
    var relevantIssues = issues.filter(iss => {
      //console.log('iss.created <= date :' + (iss.created <= date));
      //console.log('!utils.resolvedNow(iss, date) : ' + !utils.resolvedNow(iss, date));
      var relevant = ((iss.created <= date) && !(utils.resolvedNow(iss, date)));
      //console.log('relevant: ' + relevant);
      return relevant;
    });
    //console.log('relevant issues: ' + relevantIssues);
    var numIssues = relevantIssues.length; // get number of issues
    //console.log('numIssues: ' + numIssues);

    // get age of each issue & derive average age of issues
    if (relevantIssues && relevantIssues.length > 1) {
      //console.log('date: ' + date);
      dataset[date] = relevantIssues.map(iss => {
        //console.log('iss.created: ' + iss.created);
        var created = moment(iss.created).add(12, 'hours'); // hack as date 1 hour off
        var current = moment(date).add(12, 'hours'); // hack as date 1 hour off
        return current.diff(created, 'days');
      }).reduce((a, b) => {
        return a + b;
      }) / numIssues;
    } else if (relevantIssues && relevantIssues.length === 1) {
      dataset[date] = relevantIssues.map(iss => {
        var created = moment(iss.created).add(12, 'hours'); // hack as date 1 hour off
        var current = moment(date).add(12, 'hours'); // hack as date 1 hour off
        return current.diff(created, 'days');
      }) / numIssues;
    } else {
      dataset[date] = 0;
    }
  });
  return dataset;
};

//console.log(this.averageAge(sampleData, '2017-03-01', '2017-03-31'));
