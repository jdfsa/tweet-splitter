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
        tempAuthenticateImpl = (successCallback, errorCallback) => {};
        tempGetSplittedTweetImpl = (successCallback, errorCallback) => {};

        processor = proxyquire(processorPath, {
            '../service/auth.service': {
                authenticate: (successCallback, errorCallback) => {
                    tempAuthenticateImpl(successCallback, errorCallback);
                }
            },
            './tweet.processor': {
                getSplittedTweet: (successCallback, errorCallback) => {
                    tempGetSplittedTweetImpl(successCallback, errorCallback);
                }
            }
        });
    });

    it('should return error when authenticating', (end) => {
        tempAuthenticateImpl = (successCallback, errorCallback) => {
            errorCallback(null);
        };

        processor.processTweets(
            (data) => {
                assert.fail('an success response was not expeted');
            },
            (error) => {
                assert.equal(error.message, new Error("Not authenticate").message);
                end();
            }
        );
    });

    it('should return error when getting tweets', (end) => {
        tempAuthenticateImpl = (successCallback, errorCallback) => {
            successCallback({ 'token': 'test_token' });
        };

        tempGetSplittedTweetImpl = (successCallback, errorCallback) => {
            errorCallback({"message": "Invalid JWT token." });
        };

        processor.processTweets(
            (data) => {
                assert.fail('an success response was not expeted');
            },
            (error) => {
                assert.deepEqual(error, {"message": "Invalid JWT token." });
                end();
            }
        );
    });

    it('should autenticate and get any tweet message', (end) => {
        tempAuthenticateImpl = (successCallback, errorCallback) => {
            successCallback({ 'token': 'test_token' });
        };

        tempGetSplittedTweetImpl = (successCallback, errorCallback) => {
            successCallback([
                "Tweet #1: 🚧 Das 23h30 às 4h30, Túnel Max Feffer estará",
                "Tweet #2: interditado, em ambos os sentidos, para",
                "Tweet #3: realização de serviços de limp…",
                "Tweet #4: https://t.co/RCOr8Wqrlg"
            ]);
        };

        processor.processTweets(
            (data) => {
                assert.deepEqual(data, [
                    "Tweet #1: 🚧 Das 23h30 às 4h30, Túnel Max Feffer estará",
                    "Tweet #2: interditado, em ambos os sentidos, para",
                    "Tweet #3: realização de serviços de limp…",
                    "Tweet #4: https://t.co/RCOr8Wqrlg"
                ]);
                end();
            },
            (error) => {
                assert.fail('an error response was not expeted');
            }
        );
    });
});