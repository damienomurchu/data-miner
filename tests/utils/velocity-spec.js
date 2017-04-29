'use strict';

const velocity = require('../../utils/velocity');
const chai = require('chai');
var expect = chai.expect;
const assert = chai.assert;
var testData = require('../../sample-data/test-data.json');
//const testUtils = require('./test-utils');
const fixtures = require('./test-fixtures.json');

describe('Velocity tests', function () {

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

  it('should return error object if no jiraData passed in', function () {

  });

  it('should return error object if no sprint data present in jiraData passed in', function () {

  });

  it('should return an object with one or more key-value pairs', function () {

  });

  it('each key-value pair in the returned object should have keys for "sprint", "expected", and "actual"', function () {

  });

  it('each key-value pair in the returned object should have values that are numbers', function () {

  });

  it('', function () {

  });

});
