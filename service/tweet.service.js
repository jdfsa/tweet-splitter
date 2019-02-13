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
            if (error) {
                error.statusCode = 500;
                return callback(error);
            }

            const data = body ? JSON.parse(body) : new Error("Server error");
            if (response.statusCode >= 400) {
                data.statusCode = response.statusCode;
                return callback(data);
            }
            callback(null, data);
        });
};