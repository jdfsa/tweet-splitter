const async = require('async');

const authService = require('../service/auth.service');
const tweetProcessor = require('./tweet.processor');

/**
 * Takes the whole process of authenticating and returning the tweets list
 * 
 * @callback
 * called with two parameters:
 * 
 *  - error - whenever an error occurs
 * ``` 
 { 
     "message": "<error message>",
     "stack": "<stack trace (optional)>",
     "statusCode": "<status code>"
 } ```
 * 
 *  - data - object containing the tweets list
```
 [ 
    "tweet slice 1", 
    "tweet slice 2", 
    ..., 
    "tweet slice n" 
] ```
 */
function ProcessTweets (callback) {
    async.waterfall([
        // authentication
        (callback) => {
            authService.authenticate((error, data) => {
                if (error) {
                    return callback(error);
                }
                callback(null, data.token);
            })
        },
        // tweet
        (token, callback) => {
            tweetProcessor.getSplittedTweet(token, (error, data) => {
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

exports.processTweets = ProcessTweets;