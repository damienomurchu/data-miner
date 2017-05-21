'use strict';

const chai = require('chai');
var expect = chai.expect;
var testData = require('../utils/test-jira-data.json');
const fixtures = require('../utils/test-fixtures.json');
var request = require('sync-request');
let app = require('../../app');

describe('API tests', function () {

  const baseUrl = 'http://127.0.0.1:8000';
  const sprint = fixtures.sprintName;
  const issue = fixtures.sampleIssues[1];
  const start = fixtures.startDate;
  const end = fixtures.endDate;

  before(function (done) {
    //var server = require('../../server');
    app.listen(8000, done);
  });

  afterEach(function (done) {
    app.close(done);
  });

  it('/data/burndown should return successfully on good data', function () {
    var obj = {};
    obj.jiradata = testData;
    obj.sprint = sprint;
    var res = request('POST', baseUrl + '/data/burndown', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/burndown should return unsuccessfully when no jiradata passed', function () {
    var obj = {};
    obj.sprint = sprint;
    var res = request('POST', baseUrl + '/data/burndown', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/burndown should return unsuccessfully when no sprint name passed', function () {
    var obj = {};
    obj.jiradata = testData;
    var res = request('POST', baseUrl + '/data/burndown', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/sprintReport should return successfully on good data', function () {
    var obj = {};
    obj.jiradata = testData;
    obj.sprint = sprint;
    var res = request('POST', baseUrl + '/data/sprintReport', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/sprintReport should return successfully when no jiradata passed', function () {
    var obj = {};
    obj.sprint = sprint;
    var res = request('POST', baseUrl + '/data/sprintReport', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/sprintReport should return unsuccessfully when no sprint name passed', function () {
    var obj = {};
    obj.jiradata = testData;
    var res = request('POST', baseUrl + '/data/sprintReport', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/velocity should return successfully on good data', function () {
    var obj = {};
    obj.jiradata = testData;
    var res = request('POST', baseUrl + '/data/velocity', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/velocity should return unsuccessfully when no jira data passed', function () {
    var obj = {};
    var res = request('POST', baseUrl + '/data/velocity', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/averageAge should return successfully on good data', function () {
    var obj = {};
    obj.jiradata = testData;
    obj.start = start;
    obj.end = end;
    var res = request('POST', baseUrl + '/data/averageAge', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/averageAge should return unsuccessfully when no jiradata passed', function () {
    var obj = {};
    obj.start = start;
    obj.end = end;
    var res = request('POST', baseUrl + '/data/averageAge', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/averageAge should return unsuccessfully when no start date passed', function () {
    var obj = {};
    obj.jiradata = testData;
    obj.end = end;
    var res = request('POST', baseUrl + '/data/averageAge', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/averageAge should return unsuccessfully when no end date passed', function () {
    var obj = {};
    obj.jiradata = testData;
    obj.start = start;
    var res = request('POST', baseUrl + '/data/averageAge', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/createdResolved should return successfully on good data', function () {
    var obj = {};
    obj.jiradata = testData;
    obj.start = start;
    obj.end = end;
    var res = request('POST', baseUrl + '/data/createdResolved', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/createdResolved should return unsuccessfully when no jiradata passed', function () {
    var obj = {};
    obj.start = start;
    obj.end = end;
    var res = request('POST', baseUrl + '/data/createdResolved', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/createdResolved should return unsuccessfully when no start date passed', function () {
    var obj = {};
    obj.jiradata = testData;
    obj.end = end;
    var res = request('POST', baseUrl + '/data/createdResolved', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/createdResolved should return unsuccessfully when no end date passed', function () {
    var obj = {};
    obj.jiradata = testData;
    obj.start = start;
    var res = request('POST', baseUrl + '/data/createdResolved', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/sprintInfo should return successfully on good data', function () {
    var obj = {};
    obj.jiradata = testData;
    var res = request('POST', baseUrl + '/data/sprintInfo', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/sprintInfo should return unsuccessfully when no jiradata passed', function () {
    var obj = {};
    var res = request('POST', baseUrl + '/data/sprintInfo', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/issueData should return successfully on good data', function () {
    var obj = {};
    obj.jiradata = testData;
    var res = request('POST', baseUrl + '/data/issueData', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/issueData should return unsuccessfully when no jiradata passed', function () {
    var obj = {};
    var res = request('POST', baseUrl + '/data/issueData', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/issuesInSprint should return successfully on good data', function () {
    var obj = {};
    obj.jiradata = testData;
    obj.sprint = sprint;
    var res = request('POST', baseUrl + '/data/issuesInSprint', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/issuesInSprint should return unsuccessfully when no jiradata passed', function () {
    var obj = {};
    obj.sprint = sprint;
    var res = request('POST', baseUrl + '/data/issuesInSprint', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/issuesInSprint should return unsuccessfully when no sprint name passed', function () {
    var obj = {};
    obj.jiradata = testData;
    var res = request('POST', baseUrl + '/data/issuesInSprint', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/resolvedDate should return successfully on good data', function () {
    var obj = {};
    obj.issue = issue;
    var res = request('POST', baseUrl + '/data/resolvedDate', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/resolvedDate should return unsuccessfully when no issue data passed', function () {
    var obj = {};
    var res = request('POST', baseUrl + '/data/resolvedDate', { json: obj });

    expect(res.statusCode).to.equal(500);
  });

  it('/data/resolvedDates should return successfully on good data', function () {
    var obj = {};
    obj.jiradata = testData;
    var res = request('POST', baseUrl + '/data/resolvedDates', { json: obj });

    expect(res.statusCode).to.equal(200);
  });

  it('/data/resolvedDates should return unsuccessfully when no jira data passed', function (done) {
    var obj = {};
    var res = request('POST', baseUrl + '/data/resolvedDates', { json: obj });

    expect(res.statusCode).to.equal(500);
    done();
  });

});
