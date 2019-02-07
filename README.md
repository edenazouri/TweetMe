#### Are you ready for this?

Welcome to TweetMe!
Tired of having to connect directly to the Twitter App every time you want to use your account?
We are here for you! Let us do the hard work for you!

#### How do I use TweetMe?
Great question!

Go now to:    https://tweetme-eden.herokuapp.com/
where you'll find the html file that will let you use all of TweetMe's features.

Github repository: https://github.com/edenazouri/TweetMe
Current test account: @Eden4S

Want to access our API directly? No problem!
This is what we offer and what we expect:

    * Tweet a message! we expect:
        * POST HTTP request to    /tweeter/tweet
        * BODY of request should contain a JSON object with the status.
              Example: {status: 'Hey ironSource!'}
          Note: Twitter's API blocks attempts to tweet the same status twice within a short period of time.

    * Get a list of your recent tweets:
        * GET HTTP request to    /twitter/list
        * If you wish to get an exact amount of tweets just let us know!
          We accept a query parameter: 'count' exactly for that.
              Example: /twitter/list?count=20
          Note: following Twitter's API, count=0 will return tweets if they exist.
          Note: Twitter's API allows to retrieve up to a max. of 200 tweets per distinct http request. So that's the max.
          Note: Oops! Forgot to specify how many tweets you want? We will give you the max. Because you deserve it.

    * Search for tweets which match a keyword:
        * GET HTTP request to    /twitter/search
        * We expect a query parameter: 'keyword' to search tweets.
              Example:    /twitter/search_keyword?keyword=Aura

    * Delete your last tweet:
      We all sometimes wish we could take back something we've just said.
        * DELETE HTTP request to    /twitter/delete_last_tweet


#### How do I switch accounts?

Please find the configuration file: 'config.js'.
There you will see the current credentials for our test account.
Feel free to change the account's keys to keys of another Twitter account.

## Happy tweeting!