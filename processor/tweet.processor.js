'use strict';

const tweetService = require('../service/tweet.service');
const tweetSlicer = require('./tweet-slicer.processor');

exports.getSplittedTweet = (token, callback) => {
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