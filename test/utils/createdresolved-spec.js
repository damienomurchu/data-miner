'use strict';

const createdresolved = require('../../utils/createdresolved');
const chai = require('chai');
const expect = chai.expect;
const testData = require('./test-jira-data.json');
const fixtures = require('./test-fixtures.json');

describe('Created-vs-Resolved test', function () {

  const start = fixtures.startDate;
  const end = fixtures.endDate;

  beforeEach(function () {
    //
  });

  afterEach(function () {
    //
  });

  it('should return error object if no jiraData passed in', function () {
    const cr = createdresolved.createdResolved(start, end);
    expect(cr[0].error).to.exist;
  });

  it('should return error object if bad jiraData passed in', function () {
    const cr = createdresolved.createdResolved([{}], start, end);
    expect(cr[0].error).to.exist;
  });

  it('should return error object if no start date passed in', function () {
    const cr = createdresolved.createdResolved(testData, end);
    expect(cr[0].error).to.exist;
  });

  it('should return error object if no end date passed in', function () {
    const cr = createdresolved.createdResolved(testData, start);
    expect(cr[0].error).to.exist;
  });

  it('should handle a date that is passed in as a string', function () {
    const cr = createdresolved.createdResolved(testData, start, end);
    expect(cr).to.exist;
  });

  it('should handle a date that is passed in as a Date object', function () {
    const cr = createdresolved.createdResolved(testData, new Date(start), new Date(end));
    expect(cr).to.exist;
  });

  it('should return an array with two objects', function () {
    const cr = createdresolved.createdResolved(testData, start, end);
    expect(cr.length).to.equal(2);
  });

  it('should return an array of objects with the keys of "created" and "resolved"', function () {
    const cr = createdresolved.createdResolved(testData, start, end);
    expect(cr[0]).to.contain.any.keys(['created', 'resolved']);
    expect(cr[1]).to.contain.any.keys(['created', 'resolved']);
  });

  it('"created" key in returned object should be an object with a number of key-value pairs equal to the date range', function () {
    const cr = createdresolved.createdResolved(testData, start, end);
    expect(Object.keys(cr[0].created).length).to.equal(7);
  });

  it('"resolved" key in returned object should be an object with a number of key-value pairs equal to the date range', function () {
    const cr = createdresolved.createdResolved(testData, start, end);
    expect(Object.keys(cr[1].resolved).length).to.equal(7);
  });

  it('key-value pairs in "created" and "resolved" object keys should contain values that are numbers', function () {
    const cr = createdresolved.createdResolved(testData, start, end);

    const createdValues = Object.keys(cr[0].created).map(key => cr[0].created[key]);
    createdValues.forEach(value => {
      expect(typeof value == 'number').to.be.true;
    });

    const resolvedValues = Object.keys(cr[1].resolved).map(key => cr[1].resolved[key]);
    resolvedValues.forEach(value => {
      expect(typeof value == 'number').to.be.true;
    });
  });

});
