'use strict';

const endpoints = require('../config/endpoints');
const request = require('request');

exports.getTweets = (token, callback) => {
    request.get(endpoints.api.endpoint + endpoints.api.path.tweet, 
        {
            headers: {
                'Authorization': token
            }
        }, 
        (error, response, body) => {
            const data = body ? JSON.parse(body) : null;
            if (response.statusCode >= 400) {
                return callback(data);
            }
            callback(null, data);
        });
};