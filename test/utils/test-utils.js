/*
'use strict'

var fs = require("fs");

const sampleData = require('../../sample-data/rc2.json');

// takes a complete, raw jira data file & reduces it to be used in testing
exports.generateTestData = function (jiraData) {
  let testData = jiraData.map(issue => {
    let data = {};
    data.id = issue.id;
    data.key = issue.key;
    data.Created = issue.Created;
    data.Updated = issue.Updated;
    data.Resolution = issue.Resolution;
    data.Sprint = issue.Sprint;
    data.History = issue.History;
    data['Story Points'] = issue['Story Points'];
    return data;
  });
  return testData;
};

var dta = this.generateTestData(sampleData);
dta.forEach(issue => {
  delete issue.History.Assignee;
  delete issue.History.Status;
  delete issue.History.Description;
  delete issue.History['Linked Issues'];
  delete issue.History['Rank (Obsolete)'];
  delete issue.History.Rank;
  delete issue.History['Epic Link'];
  delete issue.History.Priority;
  delete issue.History.Summary;
  delete issue.History.Project;
  delete issue.History.Key;
  delete issue.History.Labels;
  delete issue.History['Git Pull Request'];
  delete issue.History['Release Notes Text'];
  delete issue.History.Environment;
  delete issue.History.Workaround;
  delete issue.History['Steps to Reproduce'];
  delete issue.History.Attachment;
  delete issue.History['Component Fix Version(s)'];
  delete issue.History['Security Level'];
  delete issue.History.Tester;
  delete issue.History['Component/s'];
  delete issue.History['Security Sensitive Issue'];
  delete issue.History['Fix Version/s'];
  delete issue.History.Comment;
});

fs.writeFile( 'test-jira-data.json', JSON.stringify(dta), "utf8", (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
*/
