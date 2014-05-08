'use strict';

angular.module('angFireApp.controllers.users.settings', ['angFireApp.services.users','angFireApp.services.authenticate'])
.controller('UserSettingsCtrl', ['$scope', '$rootScope', '$firebase', 'Users', 'loginService', function ($scope, $rootScope, $firebase, Users, loginService) {

	// Pull users data
	$scope.data = $firebase(Users.find($rootScope.auth.user.uid));
	$scope.data.$bind($scope, 'user');
	$scope.pass = {};

	var changeCallback = function(data) {
		console.log(data);
		if(data === null) {
			//success
			$scope.err = 'success';
			$scope.pass.oldpass = '';	
			$scope.pass.newpass = '';	
			$scope.pass.confirm = '';	
			$scope.changeLoading = false;	
		} else {
			$scope.err = data;
			$scope.changeLoading = false;	
		}
	};

	$scope.changePassword = function() {
		$scope.err = null;

		if($scope.pass.oldpass && $scope.pass.newpass && $scope.pass.newpass === $scope.pass.confirm) {
			$scope.changeLoading = true;	
			$scope.pass.callback = changeCallback;	
			loginService.changePassword($scope.pass);
		} else {
			$scope.err = 'Please make sure your old password and new passwords are filled in correctly';
			$scope.changeLoading = false;	
		}
	};


}]);


