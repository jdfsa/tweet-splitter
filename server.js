'use strict';

const express = require('express');
const compression = require('compression')
const bodyParser = require('body-parser');
const tweetFlow = require('./processor/tweet-flow.processor');

const app = express();

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
    const port = 8080;
    const host = '0.0.0.0';
    app.listen(port, host);
    console.log('Listening on port ' + port);
}

module.exports = app;