'use strict';

const express = require('express');
const compression = require('compression')
const bodyParser = require('body-parser');
const tweetFlow = require('./processor/tweet-flow.processor');

const app = express();
const port = 3011;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.get('/', (request, response) => {
    tweetFlow.processTweets((error, success) => {
        if (error) {
            return response.status(error.statusCode || 500).json(error);
        }
        response.json(success);
    });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port);
    console.log('Listening on port ' + port);
}

module.exports = app;