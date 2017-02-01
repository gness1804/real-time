'use strict';
const assert = require('assert');
const request = require('supertest');
const express = require('express');
const app = express();

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('dummy test', () => {
  it('tests should work', () => {

    assert(true)
  });
});

describe('GET', () => {
  it('', () => {


  });
});
