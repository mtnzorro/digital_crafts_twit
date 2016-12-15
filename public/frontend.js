var app = angular.module('Twitter', ['ui.router', 'ngCookies']);

app.factory("Twitter_api", function factoryFunction($http) {
  var service = {};
  service.worldTweets = function() {
    return $http({
      url: '/world-timeline'
    });
  };
  service.loadProfile = function(user_id) {
    return $http({
      url: '/profile-info',
      params: {
        user_id: user_id
      }
    });
  };
  service.loadTimeline = function(user_id) {
    return $http({
      url: '/timeline-info',
      params: {
        user_id: user_id
      }
    });
  };
  service.tweet = function(text, user_id, name, avatar_url) {
    return $http({
      url: '/tweet',
      method: "POST",
      data: {
        text: text,
        user_id: user_id,
        name: name,
        avatar_url: avatar_url
      }
    });
  };
  service.userSignup = function(user_id, password, first_name, last_name, avatar_url) {
    return $http({
      url: '/signup',
      method: "POST",
      data: {
        user_id: user_id,
        avatar_url: avatar_url,
        password: password,
        first_name: first_name,
        last_name: last_name
      }
    });
  };
  service.userLogin = function(user_id, password) {
    return $http({
      url: '/userLogin',
      data: {
        user_id: user_id,
        password: password
      }
    });
  };



  return service;
});

app.controller('WorldController', function($scope, $stateParams, $state, Twitter_api) {
$scope.signupShow = false;
$scope.signupShowShow = function() {
  $scope.signupShow = true;
};
$scope.timeline_go = function(){
  $state.go('timeline', {name: $scope.name});
};
  Twitter_api.worldTweets()
  .then(function(resp) {
    $scope.results = resp.data;
    console.log("World results: ", $scope.results);
  })
  .catch(function(err) {
    console.log(err.message);
  });
  $scope.submitSignup = function() {
    if ($scope.password2 === $scope.password1){
      Twitter_api.userSignup($scope.user_id, $scope.password1, $scope.first_name, $scope.last_name, $scope.avatar_url)
        .then(function() {
          console.log("signup successful");
          $scope.signupShow = false;
          $state.go('world');
        })
        .catch(function(err) {
          console.log("error: ", err.message);
        });
    }
  };
  $scope.submitLogin = function() {
    Twitter_api.userLogin($scope.user_id, $scope.password)
    .then(function() {
      $cookies.put('token', resp.data[1]);
      $cookies.put('user_id', resp.data[0].user_id);
      $scope.user_name = resp.data[0].user_id;

    });
    console.log($scope.user_name);
    console.log("Login?");
    $state.go('timeline', {name: $scope.user_name});
  };
});

app.controller('ProfileController', function($scope, $stateParams, $state, Twitter_api) {
  $scope.name = $stateParams.name;
  $scope.timeline_go = function(){
    $state.go('timeline', {name: $scope.name});
  };
  // $scope.user_id = 'theAsshole';
  Twitter_api.loadProfile($scope.name)
  .then(function(resp) {
    console.log(resp);
    $scope.profile_data = resp.data[0];
    $scope.profile_tweets = resp.data[1];
    console.log("World results: ", $scope.profile_data);
    console.log("World results tweets: ", $scope.profile_tweets);
  })
  .catch(function(err) {
    console.log(err.message);
  });
});

app.controller('TimelineController', function($scope, $stateParams, $state, Twitter_api) {
  $scope.name = $stateParams.name;
  $scope.profile_go = function(){
    $state.go('profile', {name: $scope.name});
  };
  $scope.tweeting = function(){
    Twitter_api.tweet($scope.makeTweet, $scope.profile_data._id, $scope.profile_data.name, $scope.profile_data.avatar_url)
  .then(function(res){
    console.log(res);
  })
  .catch(function(err){
    console.log("Error in posting tweet:", err.stack);
  });
  Twitter_api.loadTimeline($scope.name)
  .then(function(resp) {
    console.log(resp);
    $scope.profile_data = resp.data[0];
    $scope.results = resp.data[1];
  })
  .catch(function(err) {
    console.log(err.message);
  });
};

  // $scope.user_id = 'theAsshole';
  Twitter_api.loadTimeline($scope.name)
  .then(function(resp) {
    console.log(resp);
    $scope.profile_data = resp.data[0];
    $scope.results = resp.data[1];
  })
  .catch(function(err) {
    console.log(err.message);
  });
});

app.controller('LoginController', function($scope, $state, Twitter_api) {
  Twitter_api.userLogin($scope.user_id, $scope.password).then(function() {
    $cookies.put('token', resp.data[1]);
    $cookies.put('user_id', resp.data[0].user_id);
    $scope.user_name = resp.data[0].user_id;
  });
  console.log("Login?");
  $state.go('timeline', {name: $scope.user_name});
});




app.config(function($stateProvider, $urlRouterProvider) {
 $stateProvider

   .state({
     name : 'world',
     url: '/',
     templateUrl: 'templates/world.html',
     controller: 'WorldController'
   })

   .state({
     name : 'profile',
     url: '/profile/{name}',
     templateUrl: 'templates/profile.html',
     controller: 'ProfileController'
   })

   .state({
     name : 'timeline',
     url: '/timeline/{name}',
     templateUrl: 'templates/timeline.html',
     controller: 'TimelineController'
   });

   $urlRouterProvider.otherwise('/');

});