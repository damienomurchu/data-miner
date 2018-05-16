'use strict';

const utils = require('./data.js');

// accepts a start and end date, and returns a dataset to populate a created-v-resolved chart
exports.createdResolved = function (jiraData, startDate, endDate) {

  const dataset = [];

  // guard against missing arguments
  if (!jiraData || !startDate || !endDate) {
    const error = {};
    error.error = 'You have not passed in valid arguments';
    dataset.push(error);
    return dataset;
  }

  // guard to ensure incoming dates are YYYY-MM-DD strings
  if (startDate instanceof Date)
    startDate = startDate.toISOString().substring(0, 10);
  if (endDate instanceof Date)
    endDate = endDate.toISOString().substring(0, 10);

  // get date range
  const dateRange = utils.datesInRange(startDate, endDate);

  try {
    // get all created issues between date range
    const issuesInRange = jiraData.filter(issue => {
      const createdDate = issue.Created.substring(0, 10);
      return (createdDate >= startDate) && (createdDate <= endDate);
    });

    const created = [];
    const resolved = [];

    // populate created and resolved arrays with all created and resolved issues
    issuesInRange.forEach(issue => {
      created.push(issue.Created.substring(0, 10));

      const dateResolved = utils.resolvedDate(issue);
      if ((dateResolved) && (dateResolved >= startDate) && (dateResolved <= endDate))
        resolved.push(dateResolved);
    });

    // check how many created and resolved issues for each date in report range
    const crt = {};
    const res = {};
    dateRange.forEach(date => {
      const c = utils.countItems(created, date);
      const r = utils.countItems(resolved, date);
      crt[date] = c;
      res[date] = r;
    });

    // build and return json dataset object
    const c = {};
    const r = {};
    c.created = crt;
    r.resolved = res;

    dataset.push(c);
    dataset.push(r);
  } catch (err) {
    const errormessage = {};
    errormessage.error = err.message;
    dataset.push(errormessage);
  }

  return dataset;
};
