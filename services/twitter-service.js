
const Twitter = require('twitter');
const moduleName = 'Twitter-service:';

class TwitterService {

    constructor(tokens) {
        this.client = new Twitter({
            consumer_key: tokens.apiKey,
            consumer_secret: tokens.appSecretKey,
            access_token_key: tokens.accessTokenKey,
            access_token_secret: tokens.accessTokenSecret
        });
    }

    tweet(status) {
        return this.client.post('statuses/update', {status});
    }
    
    list(count) {
        const reqName = 'Tweet list request:'
        console.log('%s %s Start', moduleName, reqName);
        if (count == undefined)
            count = 200; // If the user forgot to define count we will choose for them the maximum value of tweets. Explanation on value 200 below.

        if (isNaN(count) || count % 1 != 0){
            console.error('%s %s Failure: Illegal argument', moduleName, reqName);
            throw "Illegal argument: count is not an integer number";
            }

        if (count < 0){
            console.error('%s %s Failure: count is negative', moduleName, reqName);
            throw "Illegal argument: Cannot return tweet list of negative length";
            }

        if (count > 200)
            count = 200;
        console.log('%s %s valid count value', moduleName, reqName);
        // Twitter allows to retrieve up to a maximum of 200 tweets per distinct request.

        return this.client.get('statuses/user_timeline', {'count': count});
    }

    deleteTweetById(id) {
    ///change
        console.log('going to delete status with id ' + id);
        return this.client.post('statuses/destroy/' + id, {});
    }

    searchKeyword(keyword) {
        return this.client.get('search/tweets', {q: keyword});
    }

    deleteLastTweet() {
        return this.list(1).then((tweetArray) => {
            if (tweetArray.length == 0) {
                return 'No tweets deleted: There are no tweets to delete';
            }
            else {
                console.log('Starting last status deletion');
                return this.deleteTweetById(tweetArray[0].id_str);
            }
    });
  }

}

module.exports = TwitterService;
