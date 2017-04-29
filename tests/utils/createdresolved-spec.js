'use strict';

const createdresolved = require('../../utils/createdresolved');
const chai = require('chai');
var expect = chai.expect;
const assert = chai.assert;
var testData = require('../../sample-data/test-data.json');
//const testUtils = require('./test-utils');
const fixtures = require('./test-fixtures.json');

describe('Created-vs-Resolved tests', function () {

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

  it.skip('should return error object if no jiraData passed in', function () {
    var cr = createdresolved.createdResolved(testData, start, end);
  });

  it.skip('should return error object if no start date passed in', function () {
    var cr = createdresolved.createdResolved(testData, start, end);
    // TODO
  });

  it.skip('should return error object if no end date passed in', function () {
    // TODO
  });

  it.skip('should handle a date that is passed in as a string', function () {
    // TODO
  });

  it.skip('should handle a date that is passed in as a Date object', function () {
    // TODO
  });

  it.skip('should return an object with keys of "created" and "resolved"', function () {
    // TODO
  });

  it.skip('"created" key in returned object should be an object with a number of key-value pairs equal to the date range', function () {
    // TODO
  });

  it.skip('"resolved" key in returned object should be an object with a number of key-value pairs equal to the date range', function () {
    // TODO
  });

  it.skip('key-value pairs in "created" and "resolved" object keys should contain values that are numbers', function () {
    // TODO
  });

});
