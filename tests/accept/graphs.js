var logger = require('winston');// jscs:ignore validateLineBreaks
var server = require('../../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var seed = require('../../seed/seed');
var User = require('../../models/user');
var expect = require('chai').expect;

chai.should();
chai.use(chaiHttp);

var url = 'http://127.0.0.1:8001';

describe('Users', function () {

  // Before our test suite
  before(function (done) {
    // Start our app on an alternative port for acceptance tests
    server.listen(8001, function () {
      logger.info('Listening at http://localhost:8001 for acceptance tests');

      // Seed the DB with our users
      seed(function (err) {
        done(err);
      });
    });
  });

  describe('/GET users', function () {
    it('should return a list of users', function (done) {
      chai.request(url)
          .get('/users')
          .end(function (err, res) {
            res.body.should.be.a('array');
            res.should.have.status(200);
            res.body.length.should.be.eql(100);
            done();
          });
    });
  });

  describe('/GET users/:id', function () {
    it('should return a single user', function (done) {
      // Find a user in the DB
      User.findOne({}, function (err, user) {
        var id = user._id;

        // Read this user by id
        chai.request(url)
            .get('/users/' + id)
            .end(function (err, res) {
              res.should.have.status(200);
              expect(res.body).to.be.a('object');
              expect(res.body.name.first).to.be.a('string');
              done();
            });
      });
    });
  });

  // should be pretty similar to get/:id
  describe('/DELETE users/:id', function () {
    it('should return a single user', function (done) {
      // Find a user in the DB
      User.findOne({}, function (err, user) {
        var id = user._id;

        // delete this user by id
        chai.request(url)
            .delete('/users/' + id)
            .end(function (err, res) {
              res.should.have.status(200);
              expect(res.body).to.be.a('object');
              done();
            });
      });
    });
  });

  //checking the returns, should be pretty similar to /GET
  describe('/POST users', function () {
    it('should create a new user', function (done) {
      chai.request(url)
          .post('/users')
          .end(function (err, res) {
            res.body.should.be.a('object');
            res.should.have.status(200);
            done();
          });
    });
  });

  // not sure how these test work so will check the returns
  describe('/PUT users/:id', function () {
    it('should return a single user', function (done) {
      User.findOne({}, function (err, user) {
        // find a single user in DB
        var id = user._id;

        //update user with put
        chai.request(url)
            .put('/users/' + id)
            .end(function (err, res) {
              res.should.have.status(200);
              expect(res.body).to.be.a('object');
              done();
            });
      });
    });
  });
});
