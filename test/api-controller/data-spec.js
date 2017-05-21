'use strict';

const chai = require('chai');
var expect = chai.expect;
var testData = require('../utils/test-jira-data.json');
const fixtures = require('../utils/test-fixtures.json');
var request = require('sync-request');

describe('API tests', function () {

  const baseUrl = 'http://localhost:8000';
  const sprint = fixtures.sprintName;
  const issue = fixtures.sampleIssues[1];
  const start = fixtures.startDate;
  const end = fixtures.endDate;

  beforeEach(function () {
    //
  });

  afterEach(function () {
    //
  });

  it('/data/burndown should return successfully', function () {
    var obj = {};
    obj.jiradata = testData;
    obj.sprint = sprint;
    var res = request('POST', baseUrl + '/data/burndown', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/sprintReport should return successfully', function () {
    var obj = {};
    obj.jiradata = testData;
    obj.sprint = sprint;
    var res = request('POST', baseUrl + '/data/sprintReport', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/velocity should return successfully', function () {
    var obj = {};
    obj.jiradata = testData;
    var res = request('POST', baseUrl + '/data/velocity', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/averageAge should return successfully', function () {
    var obj = {};
    obj.jiradata = testData;
    obj.start = start;
    obj.end = end;
    var res = request('POST', baseUrl + '/data/averageAge', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/createdResolved should return successfully', function () {
    var obj = {};
    obj.jiradata = testData;
    obj.start = start;
    obj.end = end;
    var res = request('POST', baseUrl + '/data/createdResolved', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/sprintInfo should return successfully', function () {
    var obj = {};
    obj.jiradata = testData;
    obj.sprint = sprint;
    var res = request('POST', baseUrl + '/data/sprintInfo', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/issueData should return successfully', function () {
    var obj = {};
    obj.jiradata = testData;
    var res = request('POST', baseUrl + '/data/issueData', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/issuesInSprint should return successfully', function () {
    var obj = {};
    obj.jiradata = testData;
    obj.sprint = sprint;
    var res = request('POST', baseUrl + '/data/issuesInSprint', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/resolvedDate should return successfully', function () {
    var obj = {};
    obj.issue = issue;
    var res = request('POST', baseUrl + '/data/resolvedDate', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/resolvedDates should return successfully', function () {
    var obj = {};
    obj.jiradata = testData;
    var res = request('POST', baseUrl + '/data/resolvedDates', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

});
