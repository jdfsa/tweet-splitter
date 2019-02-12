const async = require('async');

const authService = require('../service/auth.service');
const tweetProcessor = require('./tweet.processor');

exports.processTweets = (successCallback, errorCallback) => {
    async.waterfall([
        // authentication
        (callback) => {
            authService.authenticate(
                (data) => {
                    callback(null, data.token);
                },
                (error) => {
                    callback(new Error("Not authenticate"));
                }
            )
        },
        // tweet
        (token, callback) => {
            tweetProcessor.getSplittedTweet(
                (data) => {
                    callback(null, data);
                },
                (error) => {
                    callback(error)
                }
            )
        }
    ], (error, data) => {
        if (error) {
            return errorCallback(error);
        }

        successCallback(data);
    });
};