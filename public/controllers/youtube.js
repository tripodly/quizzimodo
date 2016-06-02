'use strict';

function init() {
    window.initGapi(); // Calls the init function defined on the window
}
angular.module('team')
    .controller('VideosCtrl', function ($scope, $window, $sce, googleService) {

        $window.initGapi = function() {
            $scope.$apply($scope.getChannel);
        };

        $scope.getChannel = function () {
            googleService.googleApiClientReady().then(function (data) {
                $scope.channel = data;
            }, function (error) {
                console.log('Failed: ' + error)
            });
        };
    });