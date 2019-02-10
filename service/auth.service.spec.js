'use strict';

const path = require('path');
const chain = require('chai');
const proxyquire = require('proxyquire').noCallThru();

const expect = chain.expect;

describe('/service/auth.service.js', () => {
    let servicePath;
    let service;

    before(() => {
        servicePath = path.join(process.cwd(), 'service', 'auth.service');
    });

    beforeEach(() => {
        service = proxyquire(servicePath, {
            'request': {
                post: (url, options, callback) => {
                    callback({
                        token: 'test_token'
                    });
                }
            }
        });
    });

    it('should authenticate next to the remote api', (end) => {
        service.authenticate((data) => {
            expect(data).to.be.eql({
                token: 'test_token'
            });
            end();
        });
    });
});