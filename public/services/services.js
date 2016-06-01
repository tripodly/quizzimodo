angular.module('quizzimodo.services', [])

.factory('Auth', function($http, $location, $window, State) {
  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function(resp) {
      State.topics = resp.data.data.topics;
      State.user = resp.data.data.user;
      return resp.data;
    });
  };

  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function(resp) {
      State.topics = resp.data.data.topics;
      State.user = resp.data.data.user;
      return resp.data;
    });
  };

  var signout = function(State) {
    $window.localStorage.removeItem('com.quizzimodo');
    // clear State
    State = {};
    $location.path('/');
  };

  var isAuth = function() {
    return !!$window.localStorage.getItem('com.quizzimodo');
  };

  return {
    signin: signin,
    signup: signup,
    signout: signout,
    isAuth: isAuth
  }
})

.factory('User', function($http, $location, State) {
  var updateUser = function(user) {
    console.log('User.updateUser called with user object of : ',user);
    var url = '/api/users/' + user.id;
    console.log('url inside User.updateUser is : ',url);
    return $http({
      method: 'PUT',
      url: url,
      data: user
    })
    .then(function(resp) {
      console.log('resp.data from updateUser factory is : ',resp.data);
      State.user.name = resp.data.user.name;
      State.user.bio = resp.data.user.bio;
      State.user.email = resp.data.user.email;
      State.user.profilePic = resp.data.user.profilePic;
      return resp.data;
    });
  };

  return {
    updateUser: updateUser
  }
})

.factory('State', function() {
  var state = {};

  return state;
})

.factory('Quiz', function($http, $location) {
  var persistedData = {};

  var setData = function(data){
    persistedData = data;
  }

  var getData = function(data){
    return persistedData;
  }

  var getQuizzes = function() {
    return $http({
      method: 'GET',
      url: '/api/quizzes'
    })
    .then(function(resp) {
      return resp.data
    });
  };

  var getQuiz = function(quizID) {
    return $http({
      method: 'GET',
      url: '/api/quizzes/' + quizID
    })
    .then(function(resp) {
      return resp.data
    });
  };

  var postResults = function(quizResult) {
    return $http({
      method: 'POST',
      url: '/api/quizzes/submit',
      data: quizResult
    })
    .then(function(resp) {
      return resp.data
    });
  };

  var postQuiz = function(quiz) {
    return $http({
      method: 'POST',
      url: '/api/quizzes/',
      data: quiz 
    })
    .then(function(resp) {
      return resp.data
    });
  };

  return {
    getQuizzes: getQuizzes,
    getQuiz: getQuiz,
    postResults: postResults,
    postQuiz: postQuiz,
    setData: setData,
    getData: getData
  }
});


