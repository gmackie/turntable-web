'use strict';

angular.module('angFireApp.controllers.cover', [])
.controller('CoverCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  console.log(Object.getOwnPropertyNames($scope));
  console.log(Object.getOwnPropertyNames($rootScope));
  console.log(Object.getOwnPropertyNames($rootScope.auth));
	// Pull users data	
	//$scope.data = $firebase(Users.find($rootScope.auth.user.uid));
	//$scope.data.$bind($scope, 'user');
  $rootScope.user = {};
  $rootScope.user.loggedin = ($rootScope.auth && $rootScope.auth.user &&
    $rootScope.auth.user !== "null");
  if($rootScope.user.loggedin)
  {
    console.log(Object.getOwnPropertyNames($rootScope.auth.user));
    console.log($rootScope.auth.user.email);
    console.log($rootScope.auth.user.id);
    console.log($rootScope.user.loggedin);
  }
}]);
