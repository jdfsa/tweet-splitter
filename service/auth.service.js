'use strict';

const endpoints = require('../config/endpoints');
const request = require('request');

/**
 * Gets the token to be used throughout the application
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
 *  - data - containing the access token
 * ```
 { 
     "token": "<token value>" 
  } ```
 */
function Authenticate(callback) {
    request.post(endpoints.api.endpoint + endpoints.api.path.auth, {}, (error, response, body) => {
        if (error) {
            error.statusCode = 500;
            return callback(error);
        }

        const data = body ? JSON.parse(body) : null;
        if (response.statusCode >= 400) {
            error = error || new Error('Not authenticated');
            error.statusCode = response.statusCode;
            return callback(error);
        }
        callback(null, data);
    });
};

exports.authenticate = Authenticate;