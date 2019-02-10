'use strict';

const endpoints = require('../config/endpoints');
const sinon = require('sinon');
const path = require('path');
const chai = require('chai');
const proxyquire = require('proxyquire').noCallThru();
const nock = require('nock');
const request = require('request');

const expect = chai.expect;
const assert = chai.assert;

describe('/service/tweet.service.js', () => {
    let servicePath;
    let service;
    let spyRequestGet;

    before(() => {
        servicePath = path.join(process.cwd(), 'service', 'tweet.service');
        service = proxyquire(servicePath, {
            'request': request
        });
    });

    beforeEach(() => {
        spyRequestGet = sinon.spy(request, 'get');
    });

    afterEach(() => {
        request.get.restore();
    });

    it('should return valid tweets', (end) => {

        // response mocking
        nock(endpoints.api.endpoint).get(endpoints.api.path.tweet).reply(200, [{"created_at": "Wed Apr 11 22:15:17 +0000 2018" }]);

        service.getTweets(
            (success) => {
                assert(spyRequestGet.calledOnce);
                assert.equal(spyRequestGet.getCall(0).args[0], endpoints.api.endpoint + endpoints.api.path.tweet);
                assert.deepEqual(spyRequestGet.getCall(0).args[1], {});
                expect(success).to.deep.eql([{"created_at": "Wed Apr 11 22:15:17 +0000 2018" }]);
                end();
            }, 
            (error) => {
                assert.fail('an error response was not expected');
            });
    });

    it('should return 403 error', (end) => {

        // response mocking
        nock(endpoints.api.endpoint).get(endpoints.api.path.tweet).reply(403, {"message": "Invalid JWT token." });

        service.getTweets(
            (success) => {
                assert.fail('a success response was not expected');
            }, 
            (error) => {
                assert(spyRequestGet.calledOnce);
                assert.equal(spyRequestGet.getCall(0).args[0], endpoints.api.endpoint + endpoints.api.path.tweet);
                assert.deepEqual(spyRequestGet.getCall(0).args[1], {});
                expect(error).to.be.eql({"message": "Invalid JWT token." });
                end();
            });
    });

    it('should return 500 error', (end) => {

        // response mocking
        nock(endpoints.api.endpoint).get(endpoints.api.path.tweet).reply(500);

        service.getTweets(
            (success) => {
                assert.fail('a success response was not expected');
            }, 
            (error) => {
                assert(spyRequestGet.calledOnce);
                assert.equal(spyRequestGet.getCall(0).args[0], endpoints.api.endpoint + endpoints.api.path.tweet);
                assert.deepEqual(spyRequestGet.getCall(0).args[1], {});
                assert(!error);
                end();
            });
    });
});