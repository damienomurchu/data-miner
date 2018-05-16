'use strict'

const moment = require('moment');
const utils = require('../utils/data.js');

exports.averageAge = function (jiraData, startDate, endDate) {

  let dataset = {};

  // guard against missing arguments
  if (!jiraData || !startDate || !endDate) {
    dataset.error = 'You have not passed in valid arguments';
    return dataset;
  }

  // guard to ensure incoming dates are YYYY-MM-DD strings
  if (startDate instanceof Date)
    startDate = startDate.toISOString().substring(0, 10);
  if (endDate instanceof Date)
    endDate = endDate.toISOString().substring(0, 10);

  const dateRange = utils.datesInRange(startDate, endDate);

  try {

    // pre-process jira data to reduce
    const issues = jiraData.map(issue => {
      let iss = {};
      iss.created = issue.Created.substring(0, 10);
      iss.resolved = utils.resolvedDate(issue);
      return iss;
    });

    // get relevant issues at each date point in range
    dateRange.forEach(date => {

      // get all unresolved & open issues that exist on this date
      const relevantIssues = issues.filter(iss => {
        return ((iss.created <= date) && !(utils.resolvedNow(iss, date)));
      });
      const numIssues = relevantIssues.length; // get number of issues

      // get age of each issue & derive average age of issues
      if (relevantIssues && relevantIssues.length > 1) {
        dataset[date] = relevantIssues.map(iss => {
              const created = moment(iss.created).add(12, 'hours'); // hack as date 1 hour off
              const current = moment(date).add(12, 'hours'); // hack as date 1 hour off
              return current.diff(created, 'days');
            }).reduce((a, b) => {
              return a + b;
            }) / numIssues;
      } else if (relevantIssues && relevantIssues.length === 1) {
        dataset[date] = relevantIssues.map(iss => {
              const created = moment(iss.created).add(12, 'hours'); // hack as date 1 hour off
              const current = moment(date).add(12, 'hours'); // hack as date 1 hour off
              return current.diff(created, 'days');
            }) / numIssues;
      } else {
        dataset[date] = 0;
      }
    });
  } catch (err) {
    dataset.error = err.message;
  }

  return dataset;
};
