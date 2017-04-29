// stub for future data.js tests

'use strict';

const data = require('../../utils/data');
const chai = require('chai');
var expect = chai.expect;
const assert = chai.assert;
var testData = require('../../sample-data/test-data.json');
//const testUtils = require('./test-utils');
const fixtures = require('./test-fixtures.json');

describe('Utils-Data.js tests', function () {

  const sampleWeek = fixtures.sampleWeek;

  const start = fixtures.startDate;
  const end = fixtures.endDate;

  const sprintName = fixtures.sprintName;
  const sprintStart = fixtures.sprintStart;
  const sprintEnd = fixtures.sprintEnd;

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
    // TODO implement
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

  it.skip('resolvedDate returns correct date', function () {

  });

});
