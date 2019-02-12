const async = require('async');

const authService = require('../service/auth.service');
const tweetProcessor = require('./tweet.processor');

exports.processTweets = (callback) => {
    async.waterfall([
        // authentication
        (callback) => {
            authService.authenticate((error, data) => {
                if (error) {
                    return callback(error);
                }
                callback(null, data);
            })
        },
        // tweet
        (token, callback) => {
            tweetProcessor.getSplittedTweet((error, data) => {
                if (error) {
                    return callback(error);
                }
                callback(null, data);
            });
        }
    ], (error, data) => {
        if (error) {
            return callback(error);
        }

        callback(null, data);
    });
};