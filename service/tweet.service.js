'use strict';

const endpoints = require('../config/endpoints');
const request = require('request');

/**
 * Gets the tweets list from the mock api
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
 * ``` { "created_at": "Wed Apr 11 22:00:04 +0000 2018"... } ```
 */
function GetTweets(token, callback) {
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

exports.getTweets = GetTweets;