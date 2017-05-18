'use strict';

const sprintReport = require('../../utils/sprintReport');
const chai = require('chai');
var expect = chai.expect;
var testData = require('./test-jira-data.json');
const fixtures = require('./test-fixtures.json');

describe('SprintReport test', function () {

  const sprintName = fixtures.sprintName;

  beforeEach(function () {
    //
  });

  afterEach(function () {
    //
  });

  it('should return an error object if no jiraData is passed in', function () {
    var sr = sprintReport.sprintReportData(sprintName);
    expect(sr.error).to.exist;
  });

  it('should return error object if bad jiraData passed in', function () {
    var sr = sprintReport.sprintReportData([{}], sprintName);
    expect(sr.error).to.exist;
  });

  it('should return an error object if no sprint name is passed in', function () {
    var sr = sprintReport.sprintReportData(testData);
    expect(sr.error).to.exist;
  });

  it('returned object should contain a key "sprint" with an actual value', function () {
    var sr = sprintReport.sprintReportData(testData, sprintName);
    expect(sr.sprint).to.exist;
    expect(sr.sprint).to.be.ok;
  });

  it('returned object should contain a key "report" with an actual value', function () {
    var sr = sprintReport.sprintReportData(testData, sprintName);
    expect(sr.report).to.exist;
    expect(sr.report).to.be.ok;
  });

  it('returned object should contain a key "actualBurndown" whose value is an array', function () {
    var sr = sprintReport.sprintReportData(testData, sprintName);
    expect(sr.actualBurndown).to.exist;
    expect(sr.actualBurndown instanceof Array).to.be.true;
  });

  it('"actualBurndown" array should objects of key-value pairs with keys for "date" and "points"', function () {
    var sr = sprintReport.sprintReportData(testData, sprintName);
    sr.actualBurndown.forEach(datapoint => {
      expect(datapoint.date).to.exist;
      expect(datapoint.points).to.exist;
    });
  });

  it('values for object keys in the "actualBurndown" array should not be null or undefined', function () {
    var sr = sprintReport.sprintReportData(testData, sprintName);
    sr.actualBurndown.forEach(datapoint => {
      expect(datapoint.date).to.exist;
    });
  });

  it('values for "date" keys of objects in the "actualBurndown" array should be date strings', function () {
    var sr = sprintReport.sprintReportData(testData, sprintName);
    sr.actualBurndown.forEach(datapoint => {
      expect(typeof datapoint.date == 'string' ).to.be.true;
    });
  });

  it('values for "points" keys of objects in the "actualBurndown" array should be numbers', function () {
    var sr = sprintReport.sprintReportData(testData, sprintName);
    sr.actualBurndown.forEach(datapoint => {
      expect(typeof datapoint.points == 'number' ).to.be.true;
    });
  });

  it('returned object should contain a key "expectedBurndown" whose value is an array', function () {
    var sr = sprintReport.sprintReportData(testData, sprintName);
    expect(sr.expectedBurndown).to.exist;
    expect(sr.expectedBurndown instanceof Array).to.be.true;
  });

  it('"expectedBurndown" array should objects of key-value pairs with keys for "date" and "points"', function () {
    var sr = sprintReport.sprintReportData(testData, sprintName);
    sr.expectedBurndown.forEach(datapoint => {
      expect(datapoint.date).to.exist;
      expect(datapoint.points).to.exist;
    });
  });

  it('values for object keys in the "expectedBurndown" array should not be null or undefined', function () {
    var sr = sprintReport.sprintReportData(testData, sprintName);
    sr.expectedBurndown.forEach(datapoint => {
      expect(datapoint.date).to.exist;
    });
  });

  it('values for "date" keys of objects in the "expectedBurndown" array should be date strings', function () {
    var sr = sprintReport.sprintReportData(testData, sprintName);
    sr.expectedBurndown.forEach(datapoint => {
      expect(typeof datapoint.date == 'string' ).to.be.true;
    });
  });

  it('values for "points" keys of objects in the "expectedBurndown" array should be numbers', function () {
    var sr = sprintReport.sprintReportData(testData, sprintName);
    sr.expectedBurndown.forEach(datapoint => {
      expect(typeof datapoint.points == 'number' ).to.be.true;
    });
  });

});
