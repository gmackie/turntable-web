'use strict';

angular.module('angFireApp.controllers.dashboard', ['angFireApp.services.users'])
.controller('DashboardCtrl', ['$scope', '$rootScope', '$firebase', 'Users', function ($scope, $rootScope, $firebase, Users) {

	// Pull users data	
	//$scope.data = $firebase(Users.find($rootScope.auth.user.uid));
	//$scope.data.$bind($scope, 'user');

}]);
