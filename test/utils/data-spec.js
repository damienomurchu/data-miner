'use strict';

const data = require('../../utils/data');
const chai = require('chai');
var expect = chai.expect;
var testData = require('./test-jira-data.json');
const fixtures = require('./test-fixtures.json');
const _ = require('underscore');

describe('Utils-Data.js test', function () {

  const sampleWeek = fixtures.sampleWeek;

  const start = fixtures.startDate;
  const end = fixtures.endDate;

  const sprintName = fixtures.sprintName;

  const sampleIssues = fixtures.sampleIssues;
  const unresolvedIssue = fixtures.sampleIssues[0];
  const resolvedIssue = fixtures.sampleIssues[1];

  beforeEach(function () {
    //
  });

  afterEach(function () {
    //
  });

  it('datesInRange returns correct range size', function () {
    const dates = data.datesInRange(start, end);
    expect(dates.length).to.equal(7);
  });

  it('datesInRange returns correct start date', function () {
    const dates = data.datesInRange(start, end);
    expect(dates[0]).to.equal('2017-04-17');
  });

  it('datesInRange returns correct end date', function () {
    const dates = data.datesInRange(start, end);
    expect(dates[6]).to.equal('2017-04-23');
  });

  it('isWeekend returns true for weekend day', function () {
    expect(data.isWeekend(sampleWeek.Saturday)).to.be.true;
    expect(data.isWeekend(sampleWeek.Sunday)).to.be.true;
  });

  it('isWeekend returns false for week day', function () {
    expect(data.isWeekend(sampleWeek.Monday)).to.be.false;
    expect(data.isWeekend(sampleWeek.Friday)).to.be.false;
  });

  it('workingDaysInRange returns correct number of working days', function () {
    expect(data.workingDaysInRange(start, end).length).to.equal(5);
  });

  it('getSprintInfo returns correct number of unique sprints', function () {
    const sprintDetails = data.getSprintInfo(testData);
    expect(sprintDetails.length).to.equal(6);
  });

  it('sprintDetails does not return duplicate sprint names', function () {
    const sprintDetails = data.getSprintInfo(testData);
    expect(_.uniq(sprintDetails).length === sprintDetails.length).to.be.true;
  });

  it('getSprintDates returns the correct start and end date', function () {
    const sprintDates = data.getSprintDates(testData, sprintName);
    expect(sprintDates[0]).to.equal('2017-03-24');
    expect(sprintDates[14]).to.equal('2017-04-07');
  });

  it('getSprintDates returns the correct date range length', function () {
    const sprintDates = data.getSprintDates(testData, sprintName);
    expect(sprintDates.length).to.equal(15);
  });

  it('issuesInSprint returns correct number of issues contained in sprint', function () {
    const issuesInSprint = data.issuesInSprint(testData, sprintName);
    expect(issuesInSprint.length).to.equal(12);
  });

  it('resolvedDate returns correct date for a resolved issue', function () {
    var resolvedData = data.resolvedDate(resolvedIssue);
    expect(resolvedData).to.equal('2017-03-28');
  });

  it('resolvedDate returns "unclosed" for a resolved issue', function () {
    var resolvedData = data.resolvedDate(unresolvedIssue);
    expect(resolvedData).to.equal('unclosed');
  });

  it('resolvedDates returns an array of issues with a property "resolved" that has a value', function () {
    var resolvedData = data.resolvedDates(sampleIssues);
    resolvedData.forEach(issue=> {
      expect(issue.resolved).to.exist;
      expect(issue.resolved).to.be.ok;
    });
  });

  it('ptsResolved returns correctly the number of issue points that have been resolved by the specified date', function () {
    var ptsResolvedBy = data.ptsResolved(sampleIssues, '2017-03-28');
    expect(ptsResolvedBy).to.equal(5);
  });

  it('resolvedNow(issue, date) returns correctly that an issue is resolved by the specified date', function () {
    expect(data.resolvedNow(sampleIssues[1], '2017-03-27')).to.be.false;
    expect(data.resolvedNow(sampleIssues[1], '2017-03-28')).to.be.true;
  });

  it('test countItems returns correctly the number of times an element is in an array', function () {
    expect(data.countItems([1,2,3,1,2,2,8,2], 2)).to.equal(4);
    expect(data.countItems(sampleIssues, sampleIssues[1])).to.equal(1);
  });

  it('issueData returns an object with the expected keys', function () {
    var issues = data.issueData(testData);
    issues.forEach(iss => {
      expect(iss.id).to.exist;
      expect(iss.jira).to.exist;
      expect(iss.resolution).to.exist;
      expect(iss.sprint).to.exist;
      expect(iss.assignee).to.exist;
      expect(iss.status).to.exist;
      expect(iss.storypoints).to.exist;
      expect(iss.description).to.exist;
      expect(iss.points).to.exist;
    });
  });

});
