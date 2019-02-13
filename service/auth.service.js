'use strict';

const endpoints = require('../config/endpoints');
const request = require('request');

exports.authenticate = (callback) => {
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