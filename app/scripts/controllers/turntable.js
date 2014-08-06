'use strict';

angular.module('angFireApp.controllers.turntable', [])
.controller('TurntableCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.djs = [{name:'gmackie'}, {name:'dru'}];
  $scope.listeners = [{name:'suroi'}, {name:'cbgbt'}];
  
	// Pull users data	
	//$scope.data = $firebase(Users.find($rootScope.auth.user.uid));
	//$scope.data.$bind($scope, 'user');

}]);
