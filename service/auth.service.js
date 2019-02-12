'use strict';

const endpoints = require('../config/endpoints');
const request = require('request');

exports.authenticate = (callback) => {
    request.post(endpoints.api.endpoint + endpoints.api.path.auth, {}, (error, response, body) => {
        const data = body ? JSON.parse(body) : null;
        if (response.statusCode >= 400) {
            return callback(new Error('Not authenticated'));
        }
        callback(null, data);
    });
};