'use strict';

const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai');
const sinon = require('sinon');
const path = require('path');

const assert = chai.assert;

describe('/processor/tweet-flow.processor.js', () => {
    let processorPath = null;
    let processor = null;
    let tempAuthenticateImpl = null;
    let tempGetSplittedTweetImpl = null;

    before(() => {
        processorPath = path.join(process.cwd(), 'processor', 'tweet-flow.processor');
    });

    beforeEach(() => {
        tempAuthenticateImpl = (callback) => {};
        tempGetSplittedTweetImpl = (token, callback) => {};

        processor = proxyquire(processorPath, {
            '../service/auth.service': {
                authenticate: (callback) => {
                    tempAuthenticateImpl(callback);
                }
            },
            './tweet.processor': {
                getSplittedTweet: (token, callback) => {
                    tempGetSplittedTweetImpl(token, callback);
                }
            }
        });
    });

    it('should return error when authenticating', (end) => {
        tempAuthenticateImpl = (callback) => {
            callback(new Error('Not authenticated'));
        };

        processor.processTweets((error, data) => {
            assert(!data, 'an success response was not expeted');
            assert.equal(error.message, new Error("Not authenticated").message);
            end();
        });
    });

    it('should return error when getting tweets', (end) => {
        tempAuthenticateImpl = (callback) => {
            callback(null, { 'token': 'test_token' });
        };

        tempGetSplittedTweetImpl = (token, callback) => {
            callback({"message": "Invalid JWT token." });
        };

        processor.processTweets((error, data) => {
            assert(!data, 'an success response was not expeted');
            assert.deepEqual(error, {"message": "Invalid JWT token." });
            end();
        });
    });

    it('should autenticate and get any tweet message', (end) => {
        tempAuthenticateImpl = (callback) => {
            callback(null, { 'token': 'test_token' });
        };

        tempGetSplittedTweetImpl = (token, callback) => {
            callback(null, [
                "Tweet #1: 🚧 Das 23h30 às 4h30, Túnel Max Feffer estará",
                "Tweet #2: interditado, em ambos os sentidos, para",
                "Tweet #3: realização de serviços de limp…",
                "Tweet #4: https://t.co/RCOr8Wqrlg"
            ]);
        };

        processor.processTweets((error, data) => {
            assert(!error, 'an error response was not expeted');
            assert.deepEqual(data, [
                "Tweet #1: 🚧 Das 23h30 às 4h30, Túnel Max Feffer estará",
                "Tweet #2: interditado, em ambos os sentidos, para",
                "Tweet #3: realização de serviços de limp…",
                "Tweet #4: https://t.co/RCOr8Wqrlg"
            ]);
            end();
        });
    });
});