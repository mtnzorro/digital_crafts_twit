var app = angular.module('Twitter', ['ui.router']);

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
  service.tweet = function(text, user_id) {
    return $http({
      url: '/tweet',
      method: "POST",
      data: {
        text: text,
        user_id: user_id
      }
    });
  };
  service.signup = function(user_id, password, first_name, last_name, avatar_url) {
    return $http({
      url: '/signup',
      method: "POST",
      data: {
        user: user_id,
        avatar_url: avatar_url,
        password: password,
        first_name: first_name,
        last_name: last_name
      }
    });
  };
  return service;
});

app.controller('WorldController', function($scope, $stateParams, $state, Twitter_api) {

  Twitter_api.worldTweets()
  .then(function(resp) {
    $scope.results = resp.data;
    console.log("World results: ", $scope.results);
  })
  .catch(function(err) {
    console.log(err.message);
  });
});

app.controller('ProfileController', function($scope, $stateParams, $state, Twitter_api) {
  $scope.name = $stateParams.name;
  // $scope.user_id = 'theAsshole';
  Twitter_api.loadProfile($scope.name)
  .then(function(resp) {
    console.log(resp);
    $scope.profile_data = resp.data[0];
    $scope.profile_tweets = resp.data[1];
    console.log("World results: ", $scope.profile_data);
    console.log("World results: ", $scope.profile_tweets);
  })
  .catch(function(err) {
    console.log(err.message);
  });
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
     url: '/timeline',
     templateUrl: 'templates/timeline.html',
     controller: 'worldController'
   });

   $urlRouterProvider.otherwise('/');

});
