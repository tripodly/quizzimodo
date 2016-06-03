angular.module('quizzimodo.results', [])

.controller('ResultsController', function($scope, $location, Quiz) {
  
  $scope.quizID = Quiz.getData();

  $scope.getResults = function(){
    Quiz.getQuiz($scope.quizID).then(function(data){
      console.log('The retrieved data', data);
      $scope.quizName = data.data.quiz;
      $scope.quizResult = data.data.attempts[0].result;
// RATING LOGIC HERE
      // $scope.quizRating = data.
    }).catch(function(err){
      $scope.loadError = 'Error loading results';
      console.log(err);
    });
  };
  $scope.getResults();
  $scope.retake = function(){
    Quiz.setData($scope.quizID);
    $location.path('/take_quiz');
  };
   $scope.rating = 5;
   $scope.rateFunction = function( rating ) {
       console.log('rating ', rating);
  }
})
  .directive('starRating',function() {
    return {
      restrict : 'A',
      template : '<ul class="rating">'
           + '  <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
           + '\u2605'
           + '</li>'
           + '</ul>',
      scope : {
        ratingValue : '=',
        max : '=',
        onRatingSelected : '&'
      },
      link : function(scope, elem, attrs) {
        var updateStars = function() {
          scope.stars = [];
          for ( var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled : i < scope.ratingValue
            });
          }
        };
        
        scope.toggle = function(index) {
          scope.ratingValue = index + 1;
          scope.onRatingSelected({
            rating : index + 1
          });
        };
        
        scope.$watch('ratingValue',
          function(oldVal, newVal) {
            if (newVal) {
              updateStars();
            }
          }
        );
      }
    };
  });