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
        nock(endpoints.api.endpoint, {
            reqheaders: {
                'Authorization': 'test_token'
            }
        })
        .get(endpoints.api.path.tweet)
        .reply(200, [{"created_at": "Wed Apr 11 22:15:17 +0000 2018" }]);

        service.getTweets('test_token', (error, data) => {
            assert(!error, 'an error response was not expected');
            assert(spyRequestGet.calledOnce);
            assert.equal(spyRequestGet.getCall(0).args[0], endpoints.api.endpoint + endpoints.api.path.tweet);
            assert.deepEqual(spyRequestGet.getCall(0).args[1], {
                headers: {
                    'Authorization': 'test_token'
                }
            });
            expect(data).to.deep.eql([{"created_at": "Wed Apr 11 22:15:17 +0000 2018" }]);
            end();
        });
    });

    it('should return 403 error', (end) => {

        // response mocking
        nock(endpoints.api.endpoint, {
            reqheaders: {
                'Authorization': 'test_token'
            }
        })
        .get(endpoints.api.path.tweet)
        .reply(403, {"message": "Invalid JWT token." });

        service.getTweets('test_token', (error, data) => {
            assert(!data, 'a success response was not expected');
            assert(spyRequestGet.calledOnce);
            assert.equal(spyRequestGet.getCall(0).args[0], endpoints.api.endpoint + endpoints.api.path.tweet);
            assert.deepEqual(spyRequestGet.getCall(0).args[1], {
                headers: {
                    'Authorization': 'test_token'
                }
            });
            expect(error).to.be.eql({"message": "Invalid JWT token.", "statusCode": 403 });
            end();
        });
    });

    it('should return 500 error', (end) => {

        // response mocking
        nock(endpoints.api.endpoint, {
            reqheaders: {
                'Authorization': 'test_token'
            }
        }).get(endpoints.api.path.tweet).reply(500);

        service.getTweets('test_token', (error, data) => {
            assert(!data, 'a success response was not expected');
            assert(spyRequestGet.calledOnce);
            assert.equal(spyRequestGet.getCall(0).args[0], endpoints.api.endpoint + endpoints.api.path.tweet);
            assert.deepEqual(spyRequestGet.getCall(0).args[1], {
                headers: {
                    'Authorization': 'test_token'
                }
            });
            expect(error.message).to.be.equal('Server error');
            expect(error.statusCode).to.be.eql(500);
            end();
        });
    });

    it('should return 500 when something bad happen', (end) => {

        // response mocking
        nock(endpoints.api.endpoint).get(endpoints.api.path.tweet).replyWithError('error test');

        service.getTweets('test_token', (error, data) => {
            assert(!data, 'a success response was not exected');
            assert.equal(error.message, 'error test');
            assert.equal(error.statusCode, 500);
            end();
        });
    });
});