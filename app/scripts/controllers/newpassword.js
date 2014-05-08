'use strict';

angular.module('angFireApp.controllers.newpassword', ['angFireApp.services.authenticate'])
.controller('NewPasswordCtrl', ['$scope', '$routeParams', '$location', '$timeout', 'loginService', function($scope, $routeParams, $location, $timeout, loginService) {
	$scope.email = $routeParams.euid;
	$scope.hiddenPass = $routeParams.puid;
	//console.log($scope.email + ' ' + $scope.hiddenPass);

	var validateForm = function() {
		if($scope.email && $scope.hiddenPass && $scope.pass === $scope.passConf && $scope.pass) {
			return true;
		} else {
			return false;
		}
	};

	$scope.setNewPassword = function() {
		$scope.chngPLoading = true;
		if(validateForm()) {
			console.log('form valid');	
			$scope.login($scope.changePassword);			
		} else {
			$timeout(function() {
				$scope.err = 'Please fill out the form correctly';
				$scope.chngPLoading = false;
			}, 400);
		}
	};

	$scope.changePassword = function(user) {
		console.log('change password function');	
		var opts = {};
		opts.oldpass = $scope.hiddenPass;
		opts.newpass = $scope.pass;
		opts.confirm = $scope.passConf;
		opts.callback = function(val) {
			if(val) {
				//console.log(val);
				$timeout(function() {
					$scope.err = val; 
					$scope.chngPLoading = false;
				}, 400);
			} else {
				$location.path('/dashboard');
			}
		};
		loginService.changePassword(opts);
	};

	$scope.login = function(cb) {
		console.log('logging in');	
		$scope.loginLoading = true;	
		$scope.err = null;
		loginService.login($scope.email, $scope.hiddenPass, function(err, user) {
			console.log(err);	
			if( !err ) {
				cb && cb(user);
			}
			else(err.code == 'INVALID_PASSWORD' || err.code == 'INVALID_USER')
				$timeout(function() {	
					$scope.err = "You entered an incorrect email or password. Please try again.";
					$scope.loginLoading = false;	
				}, 400);
		});
	};

}]);
