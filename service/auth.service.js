'use strict';

const endpoints = require('../config/endpoints');
const request = require('request');

exports.authenticate = (successCallback, errorCallback) => {
    request.post(endpoints.api.endpoint + endpoints.api.path.auth, {}, (error, response, body) => {
        const data = body ? JSON.parse(body) : null;
        if (response.statusCode >= 400) {
            return errorCallback(data);
        }
        successCallback(data);
    });
};