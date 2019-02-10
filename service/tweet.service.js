'use strict';

const endpoints = require('../config/endpoints');
const request = require('request');

exports.getTweets = (successCallback, errorCallback) => {
    request.get(endpoints.api.endpoint + endpoints.api.path.tweet, {}, (error, response, body) => {
        const data = body ? JSON.parse(body) : null;
        if (response.statusCode >= 400) {
            return errorCallback(data);
        }
        successCallback(data);
    });
};