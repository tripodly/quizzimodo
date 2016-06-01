angular.module('quizzimodo.user', [])

.controller('UserController', function($scope, State, User) {
  console.log('State is : ',State);
  $scope.$watch('State.user',function(){
    console.log('State.user has changed');
  })
  $scope.profileUser = State.user.username;
  $scope.profileName = State.user.name;
  $scope.profilePic = State.user.profilePic;
  $scope.profileEmail = State.user.email;
  $scope.profileBio = State.user.bio;
  $scope.profileQuizzesMade = State.user.quizzes;
  $scope.profileQuizzesTaken = State.user.attempts;
  // Following scope properties to be used for editing user info
  $scope.edit = false;
  $scope.name = $scope.profileName;
  $scope.email = $scope.profileEmail;
  $scope.pic = $scope.profilePic;
  $scope.status = "public";
  $scope.bio = $scope.profileBio;

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
      e.preventDefault();
      var newcontent = $(this).attr('href');
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

  $scope.updateInfo = function(){
    if(State.user){
      var user = { id: State.user.id, name: $scope.name, email: $scope.email, bio: $scope.bio, profilePic: $scope.pic };
      User.updateUser(user)
      .then(function(data){
        console.log('User.updateUser returned data : ',data);
        if(!data.error){
          $('section#editInfo').addClass('hidden');
          $('section#currentInfo').removeClass('hidden');
          $scope.profileName = State.user.name;
          $scope.profilePic = State.user.profilePic;
          $scope.profileEmail = State.user.email;
          $scope.profileBio = State.user.bio;
          $scope.edit = false;
        }
      })    
    }
  }
});
