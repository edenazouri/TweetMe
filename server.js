const express = require('express');
const TwitterService = require('./services/twitter-service');
const localPort = require('./config').port;
const credentials = require('./config').credentials;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const twitterService = new TwitterService({
    apiKey: credentials.apiKey,
    appSecretKey: credentials.appSecretKey,
    accessTokenKey: credentials.accessTokenKey,
    accessTokenSecret: credentials.accessTokenSecret
});

const moduleName = 'Server:';

app.get('/', function(req, res){
    console.log('%s Homepage send to user: Start', moduleName);
    res.sendFile('index.html', { root: __dirname + "/static" });
    console.log('%s Homepage send to user: Completed successfully', moduleName);
});

app.post('/twitter/tweet',  function (req, res) {
  const status = req.body.status;
  const reqName = 'Tweet request:';
  console.log('%s %s Start', moduleName, reqName);
  twitterService.tweet(status).then(function (tweet) {
      res.sendStatus(200);
      //TODO: send text
      console.log('%s %s Completed successfully', moduleName, reqName);
  }).catch(function (err) {
        console.error('%s % s Failure: ', moduleName, reqName, err);
        res.status(500);
        res.send('Failed to tweet');
  });
});

app.get('/twitter/list', function (req,res)  {
    const reqName = 'Tweet list request:';
    console.log('%s %s Start. Requested tweets count = %s', moduleName, reqName, req.query.count);
    try {
        twitterService.list(req.query.count).then(function (tweets) {
            res.status(200);
            res.send(tweets);
            console.log('%s %s Completed successfully', moduleName, reqName);
        }).catch(function (err) {
            console.error('%s %s Failure: ', moduleName, reqName, err);
            res.status(500);
            res.send('Failed to retrieve list of tweets');
        });
    }
    catch(e){
    // cases are all bad requests: count is NAN / not an Integer / Negative integer
        res.status(400);
        res.send('Failed to retrieve list of tweets. Error: ' + e);
    }
});

app.get('/twitter/search_keyword', function (req,res)  {
    twitterService.searchKeyword(req.query.keyword).then(function (tweets) {
        res.send(tweets);
    }).catch(function (err) {
        res.status(500);
        //fix indicative.
        res.send(err);
    });
})

app.delete('/twitter/delete_last_tweet', function(req, res) {
    console.log('Starting last tweet deletion');
    twitterService.deleteLastTweet().then((response) => {
        if (typeof(response) == 'string') {
            console.log('Finished last tweet deletion');
            res.status(200);
            res.send(response);
        }
        else { //Promise
                res.status(200);
                res.send ('Last tweet deleted');
        }
    }).catch(function (err)  {
                console.error('Delete last tweet failed: ' ,err);
                res.status(500);
                //fix indicative message
                res.send('indic');
    });
})


var port = process.env.PORT || localPort;
app.listen(port, () => {
    console.log('App listening on port', port);
})