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

describe('/service/auth.service.js', () => {
    let servicePath;
    let service;
    let spyRequestPost;

    before(() => {
        servicePath = path.join(process.cwd(), 'service', 'auth.service');
        service = proxyquire(servicePath, {
            'request': request
        });
    });

    beforeEach(() => {
        spyRequestPost = sinon.spy(request, 'post');
    });

    afterEach(() => {
        request.post.restore();
    });

    it('should return valid a valid token', (end) => {

        // response mocking
        nock(endpoints.api.endpoint).post(endpoints.api.path.auth).reply(200, { token: 'test_token' });

        service.authenticate(
            (success) => {
                // assertions
                assert(spyRequestPost.calledOnce);
                assert.equal(spyRequestPost.getCall(0).args[0], endpoints.api.endpoint + endpoints.api.path.auth);
                assert.deepEqual(spyRequestPost.getCall(0).args[1], {});
                expect(success).to.be.eql({
                    token: 'test_token'
                });
                end();
            }, 
            (error) => {
                assert.fail('an error response was not expected');
            });
    });

    it('should return 500 error', (end) => {
        
        // response mocking
        nock(endpoints.api.endpoint).post(endpoints.api.path.auth).reply(500, null);

        service.authenticate(
            (success) => {
                assert.fail('a success response was not expected');
            },
            (error) => {
                // assertions
                assert(spyRequestPost.calledOnce);
                assert.equal(spyRequestPost.getCall(0).args[0], endpoints.api.endpoint + endpoints.api.path.auth);
                assert.deepEqual(spyRequestPost.getCall(0).args[1], {});
                assert(!error);
                end();
            });
    });
});