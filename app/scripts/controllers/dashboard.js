'use strict';

angular.module('angFireApp.controllers.dashboard', ['angFireApp.services.users'])
.controller('DashboardCtrl', ['$scope', '$rootScope', '$firebase', 'Users', function ($scope, $rootScope, $firebase, Users) {

	// Pull users data	
	$scope.user = $firebase(Users.find($rootScope.auth.user.uid));
	$scope.user.$bind($scope, 'user');
  console.log($scope.user);

}]);
