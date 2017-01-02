const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const uuidV4 = require('uuid/v4');
mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/twit');

mongoose.set('debug', true)
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
  user_id: String,
  name: String,
  avatar_url: String
});

//signup
app.post('/signup', function(req, res) {
  var user_id = req.body.user_id;
  var password = req.body.password;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var avatar_url = 'twit_ninja.png';
  bcrypt.hash(password, saltRounds)
    .then(function(hash) {
      return hash;
    })
    .then(function(hash) {
      function newUser() {
        var newUser = new User({
          _id: user_id,
          avatar_url: avatar_url,
          password: hash,
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
    })
    .catch(function(err) {
      console.log("Failed to create user: ", err.message);
    });
  });



app.get('/userLogin', function(req, res) {
  var user_id = req.query.user_id;
  var password = req.query.password;
  var loginInfo = [];
  console.log(user_id);
  console.log(password);
  User.findById(user_id)
    .then(function(user) {
      console.log(user);
      bcrypt.compare(password, user.password)
      .then(function(success) {
        console.log(success);
        if (success){
         return success;
        }
        else{
          return 401;
        }
      })
      // create token, send over
      .then(function(){
        var token = uuidV4();
        loginInfo.push(user_id);
        loginInfo.push(token);
          res.send(loginInfo);
      });

      })
        .catch(function(err){
          console.log('wtf', err.stack);
          res.status(400);
          res.send({error: err.message});
        });

      });



// newTweet();

app.post('/tweet', function(req, res) {
  var text = req.body.text;
  var user_id = req.body.user_id;
  var name = req.body.name;
  var avatar_url = 'twit_ninja.png';
  function newTweet() {
    var tweet = new Tweet({
      text: text,
      date: new Date(),
      user_id: user_id,
      name: name,
      avatar_url: avatar_url
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
    Tweet.find({ user_id: user_id }).sort({date:-1}).limit(20),
    User.findById(user_id)
  ])
  .spread(function(tweets, user) {
    console.log(tweets);
    var tweets_arr = [];
    profile_results.push(user);
    profile_results.push(tweets);
      res.send(profile_results);
  });
});

app.post('/follow', function(req, res) {
  var user_id = req.body.user_id;
  var followee_id= req.body.followee_id;
  User.update(
    {_id : user_id},
    {
      $addToSet:{
        following: followee_id
      }

  })

.then(function(){
    res.send(followee_id);
  });
});



// My timeline
app.get('/timeline-info', function(req, res) {
  var user_id = req.query.user_id;
  var tweet_results = [];
  User.findById(user_id)
    .then(function(user) {
      tweet_results.push(user);
      return Tweet.find({
        user_id: {
          $in: user.following.concat([user._id])
        }
      }).sort({date:-1}).limit(20);
    })
    .then(function(tweets) {

        tweet_results.push(tweets);

      console.log(tweets);
      res.send(tweet_results);
    })
    .catch(function(err) {
      res.send({error: err.message});
    });
});



  app.listen(3010, function() {
    console.log('listening on 3010');
  });
