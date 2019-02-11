'use strict';

const tweetService = require('../service/tweet.service');
const tweetSlicer = require('./tweet-slicer.processor');

exports.getSplittedTweet = (successCallback, errorCallback) => {
    tweetService.getTweets(
        (data) => {
            const randomTweetPosition = Math.floor(Math.random() * data.length);
            const tweetText = data[randomTweetPosition].text;
            const tweets = tweetSlicer.slice(tweetText, 45);
            successCallback(tweets);
        },
        (error) => {
            errorCallback(error);
        }
    )
};