angular.module('quizzimodo.user', [])

.controller('UserController', function($scope, $rootScope, User) {
  $scope.profileUser = $rootScope.user.username;
  $scope.profileEmail = $rootScope.user.email;
  $scope.profileBio = $rootScope.user.bio;
  $scope.profileQuizzesMade = $rootScope.user.quizzes;
  $scope.profileQuizzesTaken = $rootScope.user.attempts;
  // Following scope properties to be used for editing user info
  $scope.edit = false;
  $scope.email = $rootScope.user.email;
  $scope.status = "public";
  $scope.bio = $rootScope.user.bio;

  $(function(){
    $('#profiletabs ul li a').on('click', function(e){
      
      e.preventDefault();
      var newcontent = $(this).attr('href');
      
      $('#profiletabs ul li a').removeClass('sel');
      $(this).addClass('sel');
      $('#content > section').each(function(){
        if(!$(this).hasClass('hidden')) { $(this).addClass('hidden'); }
      });

      $(newcontent).removeClass('hidden');
    });

    $('.settingTitle span .md-icon-button').on('click', function(e){
      console.log('md-button clicked!');
      e.preventDefault();
      var newcontent = $(this).attr('href');
      console.log('scope.edit is : ',$scope.edit);
      if(!$scope.edit){
        $('#settings section').each(function(){
          if(!$(this).hasClass('hidden')) { $(this).addClass('hidden'); }
        })
        $(newcontent).removeClass('hidden');
        $scope.edit = true;
      } else {
        $('section#editInfo').addClass('hidden');
        $('section#currentInfo').removeClass('hidden');
        $scope.edit = false;
      }

      
    });
  });
});
