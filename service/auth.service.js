'use strict';

const endpoints = require('../config/endpoints');
const request = require('request');

exports.authenticate = (successCallback, errorCallback) => {
    request.post(endpoints.api.endpoint + endpoints.api.path.auth, {}, (error, response, body) => {
        if (response.statusCode >= 400) {
            return errorCallback(error);
        }
        successCallback(JSON.parse(body));
    });
};