'use strict';
var chai = require('chai');
const assert = require('assert');
const request = require('supertest');
const express = require('express');
const app = express();

const expect = chai.expect();
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('GET /', () => {
  it('should return a 200 status message', () => {
    request(app)
      .get('/')
      .end(function(error, result) {
        res.should.have.status(200);
        done();
      });
  });

  it('should fail when given an invalid path', () => {
    request(app)
      .get('/foo')
      .end(function(error, result) {
        res.should.have.status(404);
        done();
      });
  });
});

describe('/question', () => {
  it('should be a valid path', () => {
    request(app)
      .get('/question')
      .end(function(error, result) {
        res.should.have.status(200);
        done();
      });
  });
});
