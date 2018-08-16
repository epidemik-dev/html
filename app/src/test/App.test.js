import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import NetworkAPI from "../js/network_api/NetworkAPI"
const chai = require("chai");
var expect = chai.expect;

it('should turn the address to coordinated', (done) => {
  NetworkAPI.network_get_location("1 Main St New York NY", (lat, long) => {
    expect(lat).to.be.a('number');
    expect(long).to.be.a('number');
    done()
  }, (error) => {
    throw error;
  })
});
