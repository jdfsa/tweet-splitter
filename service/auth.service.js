'use strict';

const endpoints = require('../config/endpoints');
const request = require('request');

exports.authenticate = (callback) => {
    request.post(endpoints.api.endpoint + endpoints.api.path.auth, {}, (error, success, body) => {
        if (error) {
            callback(error)
        }
        callback(error, JSON.parse(body));
    });
};