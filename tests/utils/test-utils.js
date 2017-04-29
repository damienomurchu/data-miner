'use strict'

var fs = require("fs");

const sampleData = require('../../sample-data/rc2.json');

// takes a complete, raw jira data file & reduces it to be used in testing
exports.generateTestData = function (jiraData) {
  let testData = jiraData.map(issue => {
    let data = {};
    data.id = issue.id;
    data.key = issue.key;
    data.Sprint = issue.Sprint;
    data.History = issue.History;
    data['Story Points'] = issue['Story Points'];
    return data;
  });
  return testData;
};

//console.log(this.generateTestData(sampleData));


/*
fs.writeFile( 'reducedJiraDump.json', JSON.stringify(this.generateTestData(sampleData)), "utf8", (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
*/


