'use strict';

const averageage = require('../../utils/averageage');
const chai = require('chai');
var expect = chai.expect;
const assert = chai.assert;
var testData = require('../../sample-data/test-data.json');
//const testUtils = require('./test-utils');
const fixtures = require('./test-fixtures.json');

describe('Average-Age tests', function () {

  const sampleWeek = fixtures.sampleWeek;

  const start = fixtures.startDate;
  const end = fixtures.endDate;
  const datesInWeek = fixtures.datesInWeek;

  const sprintName = fixtures.sprintName;
  const sprintStart = fixtures.sprintStart;
  const sprintEnd = fixtures.sprintEnd;

  beforeEach(function () {
    //
  });

  afterEach(function () {
    //
  });

  it('should return error object if no jiraData passed in', function () {
    var aa = averageage.averageAge(start, end);
    expect(aa.error).to.exist;
  });

  it('should return error object if no start date passed in', function () {
    var aa = averageage.averageAge(testData, end);
    expect(aa.error).to.exist;
  });

  it('should return error object if no end date passed in', function () {
    var aa = averageage.averageAge(testData, start);
    expect(aa.error).to.exist;
  });

  it('should handle a date that is passed in as a string', function () {
    var aa = averageage.averageAge(testData, start, end);
    expect(aa).to.exist;
  });

  it('should handle a date that is passed in as a Date object', function () {
    var aa = averageage.averageAge(testData, new Date(start), new Date(end));
    expect(aa).to.exist;
  });

  it('should return an object with a number of key-value pairs equal to the date range', function () {
    var aa = averageage.averageAge(testData, start, end);
    expect(Object.keys(aa).length).to.equal(7);
  });

  it('each key-value pair in the returned object should have a key for each date in the range', function () {
    var aa = averageage.averageAge(testData, datesInWeek[0], datesInWeek[6]);
    expect(aa).to.have.all.keys(datesInWeek);
  });

  it('each key-value pair in the returned object should have values that are numbers', function () {
    var aa = averageage.averageAge(testData, start, end);
    const values = Object.keys(aa).map(key => aa[key]);
    values.every(value => {
      expect(typeof value == 'number').to.be.true;
    });
  });

});
