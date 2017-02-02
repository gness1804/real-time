const jsdom = require('mocha-jsdom');

const chai = require('chai');
const assert = require('assert');
const request = require('supertest');
const express = require('express');
const app = express();
const clearInputFields = require('../public/core-functionality');

const expect = chai.expect();
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('GET /', () => {
  it('should return a 200 status message', () => {
    request(app)
      .get('/')
      .end(function(error, result) {
        result.should.have.status(200);
        done();
      });
  });

  it('should fail when given an invalid path', () => {
    request(app)
      .get('/foo')
      .end(function(error, result) {
        result.should.have.status(404);
        done();
      });
  });
});

describe('/question', () => {
  it('should be a valid path', () => {
    request(app)
      .get('/question')
      .end(function(error, result) {
        result.should.have.status(200);
        done();
      });
  });

  it('response should be a string', () => {
    request(app)
      .get('/question')
      .end(function(error, result) {
        result.should.be.a('string');
        done();
      });
  });

  it('should add a new question when the post request is made', () => {
    request(app)
      .post('/question')
      .send({
        questionId: 74874912791,
        title: 'Who is Bill Clinton?',
        firstChoice: 'A former president of the United States.',
        secondChoice: 'A Turing student.',
        thirdChoice: 'A famous football star.',
        fourthChoice: 'Batman.',
        userId: 878391738831,
      })
      .end(function(error, result) {
        result.should.have.status(200);
        result.should.be.json;
        done();
      });
  });
});

describe('clearInputFields', () => {

  it('should be a function', () => {
    assert.isFunction(clearInputFields);
  });
});
