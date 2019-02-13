'use strict';

const tweetService = require('../service/tweet.service');
const tweetSlicer = require('./tweet-slicer.processor');

/**
 * Gets a random tweet from the api and slice in many parts based on N characters
 * 
 * @param {String} token the authorization token
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
function GetSplittedTweet(token, callback) {
    tweetService.getTweets(token, (error, data) => {
        if (error) {
            return callback(error);
        }
        
        const randomTweetPosition = Math.floor(Math.random() * data.length);
        const tweetText = data[randomTweetPosition].text;
        const tweets = tweetSlicer.slice(tweetText, 45);
        callback(null, tweets);
    });
};

exports.getSplittedTweet = GetSplittedTweet;