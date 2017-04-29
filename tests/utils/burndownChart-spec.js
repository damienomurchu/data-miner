'use strict';

const burndownChart = require('../../utils/burndownChart');
const chai = require('chai');
var expect = chai.expect;
const assert = chai.assert;
var testData = require('../../sample-data/test-data.json');
//const testUtils = require('./test-utils');
const fixtures = require('./test-fixtures.json');

describe('BurndownChart tests', function () {

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

  it('should return an error object if no jiraData is passed in', function () {

  });

  it('should return an error object if no sprint name is passed in', function () {

  });

  it('should return error object if no sprint data present in jiraData passed in', function () {

  });

  it('returned object should not contain a null or undefined value for the "sprint" key', function () {

  });

  it('returned object should not contain a null or undefined value for the "report" key', function () {

  });

  it('returned object should contain a key "actualBurndown" whose value is an array', function () {

  });

  it('"actualBurndown" array should objects of key-value pairs with keys for "date" and "points"', function () {

  });

  it('keys for objects in the "actualBurndown" array should not be null or undefined', function () {

  });

  it('values for "date" keys of objects in the "actualBurndown" array should be date strings', function () {

  });

  it('values for "points" keys of objects in the "actualBurndown" array should be numbers', function () {

  });

  it('returned object should contain a key "expectedBurndown" whose value is an array', function () {

  });

  it('"expectedBurndown" array should objects of key-value pairs with keys for "date" and "points"', function () {

  });

  it('keys for objects in the "expectedBurndown" array should not be null or undefined', function () {

  });

  it('values for "date" keys of objects in the "expectedBurndown" array should be date strings', function () {

  });

  it('values for "points" keys of objects in the "expectedBurndown" array should be numbers', function () {

  });

});
