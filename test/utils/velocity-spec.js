'use strict';

const velocity = require('../../utils/velocity');
const chai = require('chai');
var expect = chai.expect;
var testData = require('./test-jira-data.json');
const fixtures = require('./test-fixtures.json');

describe('Velocity test', function () {

  beforeEach(function () {
    //
  });

  afterEach(function () {
    //
  });

  it('should return error object if no jiraData passed in', function () {
    var vc = velocity.velocity();
    expect(vc[0].error).to.exist;
  });

  it('should return an array of one or more objects', function () {
    var vc = velocity.velocity(testData);
    expect(vc.length).to.be.at.least(1);
  });

  it('each key-value pair in the returned object should have keys for "sprint", "expected", and "actual"', function () {
    var vc = velocity.velocity(testData);
    vc.forEach(obj => {
      expect(obj.sprint).to.exist;
      expect(obj.expected).to.exist;
      expect(obj.actual).to.exist;
    });
  });

  it('each key-value pair in the returned object should have values that are numbers', function () {
    var vc = velocity.velocity(testData);
    vc.forEach(obj => {
      expect(typeof obj.sprint == 'string' ).to.be.true;
      expect(typeof obj.expected == 'number' ).to.be.true;
      expect(typeof obj.actual == 'number' ).to.be.true;
    });
  });

});
