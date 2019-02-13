const tweetFlow = require('./processor/tweet-flow.processor');

(() => {
    tweetFlow.processTweets((error, success) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(success);
        }
    });
})();
