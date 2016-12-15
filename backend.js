const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/twit');

app.use(express.static('public'));
app.use(bodyParser.json());

const User = mongoose.model('User', {
  _id: String, // actually the username
  first_name: String,
  last_name: String,
  password: String,
  avatar_url: String,
  following: [String],
  // followers: [ObjectId]  // do not need it for now
});

const Tweet = mongoose.model('Tweet', {
  text: String,
  date: Date,
  user_id: String
});

//signup
app.post('/signup', function(req, res) {
  var user_id = req.body.user_id;
  var password = req.body.password;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var avatar_url = req.body.avatar_url;
  console.log(user_id);
  function newUser() {
    var newUser = new User({
      _id: user_id,
      avatar_url: avatar_url,
      password: password,
      first_name: first_name,
      last_name: last_name
    });

    newUser.save()
      .then(function(user) {
        res.send(user);
        console.log("Added user ", user);
      })
      .catch(function(err) {
        console.log("Error: ", err.stack);
      });
  }
  newUser();
});

// newTweet();

app.post('/tweet', function(req, res) {
  var text = req.body.text;
  var user_id = req.body.user_id;
  function newTweet() {
    var tweet = new Tweet({
      text: text,
      date: new Date(),
      user_id: user_id
    });

    tweet.save()

    .then(function(tweet) {
      console.log("Tweet was added");
      res.send(tweet);
    })
    .catch(function(err) {
      console.log("Error: ", err.stack);
    });
  }
  newTweet();
});

// World Timeline
app.get('/world-timeline', function (req, res) {
  Tweet.find().sort({date:-1}).limit(20)
    .then(function(results) {
      console.log(results);
      res.send(results);
    });
});



// User Profile page
app.get('/profile-info', function (req, res) {
  var user_id = req.query.user_id;
  console.log(user_id);
  var profile_results = [];
  bluebird.all([
    Tweet.find({ userID: user_id }).sort({date:-1}).limit(20),
    User.findById(user_id)
  ])
  .spread(function(tweets, user) {
    var tweets_arr = [];
    profile_results.push(user);
    // console.log(users
    tweets.forEach(function(tweet){
    console.log(tweet.text);
    tweets_arr.push(tweet);
  });
    profile_results.push(tweets_arr);
    console.log(profile_results);
    res.send(profile_results);
  });
});



// My timeline
app.get('/timeline-info', function(req, res) {
  var user_id = req.query.user_id;
  var tweet_results = [];
  User.findById(user_id)
    .then(function(user) {
      return Tweet.find({
        userID: {
          $in: user.following.concat([user._id])
        }
      }).sort({date:-1}).limit(20);
    })
    .then(function(tweets) {
      tweets.forEach(function(tweet) {
        tweet_results.push(tweet);
      });
      res.send(tweet_results);
    });
});




  app.listen(3000, function() {
    console.log('listening on 3000');
  });
