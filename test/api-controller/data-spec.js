"use strict";

process.env.NODE_ENV = "test";
let app = require("../../app");
let request = require("supertest").agent(app);

var testData = require("../utils/test-jira-data.json");
const fixtures = require("../utils/test-fixtures.json");

describe("API tests", function() {
  const sprint = fixtures.sprintName;
  const issue = fixtures.sampleIssues[1];
  const start = fixtures.startDate;
  const end = fixtures.endDate;

  it("/data/burndown should return successfully on good data", function(done) {
    var obj = {};
    obj.jiradata = testData;
    obj.sprint = sprint;

    request
      .post("/data/burndown")
      .send(obj)
      .expect(200)
      .end(done);
  });

  it("/data/burndown should return unsuccessfully when no jiradata passed", function(done) {
    var obj = {};
    obj.sprint = sprint;

    request
      .post("/data/burndown")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/burndown should return unsuccessfully when no sprint name passed", function(done) {
    var obj = {};
    obj.jiradata = testData;

    request
      .post("/data/burndown")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/sprintReport should return successfully on good data", function(done) {
    var obj = {};
    obj.jiradata = testData;
    obj.sprint = sprint;

    request
      .post("/data/sprintReport")
      .send(obj)
      .expect(200)
      .end(done);
  });

  it("/data/sprintReport should return successfully when no jiradata passed", function(done) {
    var obj = {};
    obj.sprint = sprint;

    request
      .post("/data/sprintReport")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/sprintReport should return unsuccessfully when no sprint name passed", function(done) {
    var obj = {};
    obj.jiradata = testData;

    request
      .post("/data/sprintReport")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/velocity should return successfully on good data", function(done) {
    var obj = {};
    obj.jiradata = testData;

    request
      .post("/data/velocity")
      .send(obj)
      .expect(200)
      .end(done);
  });

  it("/data/velocity should return unsuccessfully when no jira data passed", function(done) {
    var obj = {};

    request
      .post("/data/velocity")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/averageAge should return successfully on good data", function(done) {
    var obj = {};
    obj.jiradata = testData;
    obj.start = start;
    obj.end = end;

    request
      .post("/data/averageAge")
      .send(obj)
      .expect(200)
      .end(done);
  });

  it("/data/averageAge should return unsuccessfully when no jiradata passed", function(done) {
    var obj = {};
    obj.start = start;
    obj.end = end;

    request
      .post("/data/averageAge")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/averageAge should return unsuccessfully when no start date passed", function(done) {
    var obj = {};
    obj.jiradata = testData;
    obj.end = end;

    request
      .post("/data/averageAge")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/averageAge should return unsuccessfully when no end date passed", function(done) {
    var obj = {};
    obj.jiradata = testData;
    obj.start = start;

    request
      .post("/data/averageAge")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/createdResolved should return successfully on good data", function(done) {
    var obj = {};
    obj.jiradata = testData;
    obj.start = start;
    obj.end = end;

    request
      .post("/data/createdResolved")
      .send(obj)
      .expect(200)
      .end(done);
  });

  it("/data/createdResolved should return unsuccessfully when no jiradata passed", function(done) {
    var obj = {};
    obj.start = start;
    obj.end = end;

    request
      .post("/data/createdResolved")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/createdResolved should return unsuccessfully when no start date passed", function(done) {
    var obj = {};
    obj.jiradata = testData;
    obj.end = end;

    request
      .post("/data/createdResolved")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/createdResolved should return unsuccessfully when no end date passed", function(done) {
    var obj = {};
    obj.jiradata = testData;
    obj.start = start;

    request
      .post("/data/createdResolved")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/sprintInfo should return successfully on good data", function(done) {
    var obj = {};
    obj.jiradata = testData;

    request
      .post("/data/sprintInfo")
      .send(obj)
      .expect(200)
      .end(done);
  });

  it("/data/sprintInfo should return unsuccessfully when no jiradata passed", function(done) {
    var obj = {};

    request
      .post("/data/sprintInfo")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/issueData should return successfully on good data", function(done) {
    var obj = {};
    obj.jiradata = testData;

    request
      .post("/data/issueData")
      .send(obj)
      .expect(200)
      .end(done);
  });

  it("/data/issueData should return unsuccessfully when no jiradata passed", function(done) {
    var obj = {};

    request
      .post("/data/issueData")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/issuesInSprint should return successfully on good data", function(done) {
    var obj = {};
    obj.jiradata = testData;
    obj.sprint = sprint;

    request
      .post("/data/issuesInSprint")
      .send(obj)
      .expect(200)
      .end(done);
  });

  it("/data/issuesInSprint should return unsuccessfully when no jiradata passed", function(done) {
    var obj = {};
    obj.sprint = sprint;

    request
      .post("/data/issuesInSprint")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/issuesInSprint should return unsuccessfully when no sprint name passed", function(done) {
    var obj = {};
    obj.jiradata = testData;

    request
      .post("/data/issuesInSprint")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/resolvedDate should return successfully on good data", function(done) {
    var obj = {};
    obj.issue = issue;

    request
      .post("/data/resolvedDate")
      .send(obj)
      .expect(200)
      .end(done);
  });

  it("/data/resolvedDate should return unsuccessfully when no issue data passed", function(done) {
    var obj = {};

    request
      .post("/data/resolvedDate")
      .send(obj)
      .expect(500)
      .end(done);
  });

  it("/data/resolvedDates should return successfully on good data", function(done) {
    var obj = {};
    obj.jiradata = testData;

    request
      .post("/data/resolvedDates")
      .send(obj)
      .expect(200)
      .end(done);
  });

  it("/data/resolvedDates should return unsuccessfully when no jira data passed", function(done) {
    var obj = {};

    request
      .post("/data/resolvedDates")
      .send(obj)
      .expect(500)
      .end(done);
  });
});
