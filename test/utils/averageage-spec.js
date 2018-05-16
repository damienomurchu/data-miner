'use strict';

const averageage = require('../../utils/averageage');
const chai = require('chai');
const expect = chai.expect;
const testData = require('./test-jira-data.json');
const fixtures = require('./test-fixtures.json');

describe('Average-Age test', function () {

  const start = fixtures.startDate;
  const end = fixtures.endDate;
  const datesInWeek = fixtures.datesInWeek;

  beforeEach(function () {
    //
  });

  afterEach(function () {
    //
  });

  it('should return error object if no jiraData passed in', function () {
    const aa = averageage.averageAge(start, end);
    expect(aa.error).to.exist;
  });

  it('should return error object if bad jiraData passed in', function () {
    const aa = averageage.averageAge([{}], start, end);
    expect(aa.error).to.exist;
  });

  it('should return error object if no start date passed in', function () {
    const aa = averageage.averageAge(testData, end);
    expect(aa.error).to.exist;
  });

  it('should return error object if no end date passed in', function () {
    const aa = averageage.averageAge(testData, start);
    expect(aa.error).to.exist;
  });

  it('should handle a date that is passed in as a string', function () {
    const aa = averageage.averageAge(testData, start, end);
    expect(aa).to.exist;
  });

  it('should handle a date that is passed in as a Date object', function () {
    const aa = averageage.averageAge(testData, new Date(start), new Date(end));
    expect(aa).to.exist;
  });

  it('should return an object with a number of key-value pairs equal to the date range', function () {
    const aa = averageage.averageAge(testData, start, end);
    expect(Object.keys(aa).length).to.equal(7);
  });

  it('each key-value pair in the returned object should have a key for each date in the range', function () {
    const aa = averageage.averageAge(testData, datesInWeek[0], datesInWeek[6]);
    expect(aa).to.have.all.keys(datesInWeek);
  });

  it('each key-value pair in the returned object should have values that are numbers', function () {
    const aa = averageage.averageAge(testData, start, end);
    const values = Object.keys(aa).map(key => aa[key]);
    values.forEach(value => {
      expect(typeof value == 'number').to.be.true;
    });
  });

});
