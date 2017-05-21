'use strict';

const chai = require('chai');
var expect = chai.expect;
var testData = require('../utils/test-jira-data.json');
const fixtures = require('../utils/test-fixtures.json');
var request = require('sync-request');

describe('API tests', function () {

  const sprint = fixtures.sprintName;
  const start = fixtures.startDate;
  const end = fixtures.endDate;

  beforeEach(function () {
    //
  });

  afterEach(function () {
    //
  });

  it.skip('/data/burndown should return successfully', function () {

  });

  it.skip('/data/sprintReport should return successfully', function () {

  });

  it.skip('/data/velocity should return successfully', function () {

  });

  it.skip('/data/averageAge should return successfully', function () {

  });

  it.skip('/data/createdResolved should return successfully', function () {

  });

  it.skip('/data/sprintInfo should return successfully', function () {

  });

  it.skip('/data/issueData should return successfully', function () {

  });

  it.skip('/data/issuesInSprint should return successfully', function () {

  });

  it.skip('/data/resolvedDate should return successfully', function () {

  });

  it.skip('/data/resolvedDates should return successfully', function () {

  });

});
