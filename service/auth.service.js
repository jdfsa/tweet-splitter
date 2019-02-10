'use strict';

const endpoints = require('../config/endpoints');
const request = require('request');

exports.authenticate = (callback) => {
    request.post(endpoints.auth, {}, (data) => {
        callback(data);
    });
};