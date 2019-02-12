'use strict';

const express = require('express');
const tweetFlow = require('./processor/tweet-flow.processor');

const app = express();
const port = 3011;

app.route('/')
    .get((request, resonse) => {
        tweetFlow.processTweets((error, success) => {
            if (error) {
                return response.status(500).json(error);
            }
            resonse.json(success);
        });
    });

if (process.env.NODE_ENV !== 'test') {
    app.listen(port);
    console.log('Listening on port ' + port);
}

module.exports = app;