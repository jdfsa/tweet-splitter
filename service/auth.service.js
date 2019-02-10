'use strict';

const endpoints = require('../config/endpoints');
const request = require('request');

exports.authenticate = (callback) => {
    request.post(endpoints.api.auth, {}, (data) => {
        callback(data);
    });
};