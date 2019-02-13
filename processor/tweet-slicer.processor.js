function PushTweetMessage(tweetsArray, text) {
    tweetsArray.push('Tweet #' + (tweetsArray.length + 1) + ': ' + text.trim());
}

/**
 * Slice any `tweetText` given a `numCharacters`, 
 * but taking into consideration the spaces so the outcome makes sense.
 * 
 * @param {String} tweetText the tweet text to be sliced
 * @param {Number} numCharacters the number of characters
 * @returns Array<String> containing the sliced version of the tweet
 */
function Slice(tweetText, numCharacters) {
    let tweets = [];
    let splittedText = tweetText.split(' ');

    let tweetPhrase = '';
    for (let i = 0; i < splittedText.length;) {
        const word = splittedText[i];
        const checkPhrase = tweetPhrase + (tweetPhrase.length ? ' ' : '') + word;
        if (checkPhrase.length > numCharacters) {
            PushTweetMessage(tweets, tweetPhrase);
            tweetPhrase = '';
            continue;
        }

        tweetPhrase = checkPhrase;
        i++
    }

    if (tweetPhrase) {
        PushTweetMessage(tweets, tweetPhrase);
        tweetPhrase = '';
    }

    return tweets;
};

exports.slice = Slice;