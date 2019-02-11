function PushTweetMessage(tweetsArray, text) {
    tweetsArray.push('Tweet #' + (tweetsArray.length + 1) + ': ' + text);
}

exports.slice = (tweetText, numCharacters) => {
    let tweets = [];
    let splittedText = tweetText.split(' ');

    let tweetPhrase = '';
    for (let i = 0; i < splittedText.length;) {
        const word = splittedText[i];
        const checkPhrase = tweetPhrase + (tweetPhrase.length ? ' ' : '') + word;
        if (checkPhrase.length >= numCharacters) {
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