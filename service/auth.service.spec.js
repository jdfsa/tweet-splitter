'use strict';

const endpoints = require('../config/endpoints');
const sinon = require('sinon');
const path = require('path');
const chai = require('chai');
const proxyquire = require('proxyquire').noCallThru();

const expect = chai.expect;
const assert = chai.assert;

describe('/service/auth.service.js', () => {
    let servicePath;
    let service;
    let spyRequestPost;

    before(() => {
        servicePath = path.join(process.cwd(), 'service', 'auth.service');
    });

    beforeEach(() => {
        const requestMockStub = {
            post: (url, options, callback) => {
                callback({
                    token: 'test_token'
                });
            }
        };

        service = proxyquire(servicePath, {
            'request': requestMockStub
        });

        spyRequestPost = sinon.spy(requestMockStub, 'post');
    });

    it('should authenticate next to the remote api', (end) => {
        service.authenticate((data) => {
            assert(spyRequestPost.calledOnce);
            assert.equal(spyRequestPost.getCall(0).args[0], endpoints.api.auth);
            assert.deepEqual(spyRequestPost.getCall(0).args[1], {});
            expect(data).to.be.eql({
                token: 'test_token'
            });
            end();
        });
    });
});