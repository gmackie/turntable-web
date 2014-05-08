'use strict';

angular.module('angFireApp.controllers.login', ['angFireApp.services.authenticate'])
.controller('LoginCtrl', ['$scope', '$location', '$timeout', 'loginService', function($scope, $location, $timeout, loginService) {

	// Focus utility
	$scope.focusOn = function(input) {
		$(input).focus();	
	};
	
	$scope.login = function(cb) {
		$scope.loginLoading = true;	
		$scope.err = null;
		if( !$scope.email ) {
			$timeout(function() {	
				$scope.err = 'Please enter an email address';
				$scope.loginLoading = false;	
			}, 200);
		}
		else if( !$scope.pass ) {
			$timeout(function() {	
				$scope.err = 'Please enter a password';
				$scope.loginLoading = false;	
			}, 200);
		}
		else {
			loginService.login($scope.email, $scope.pass, function(err, user) {
				//console.log(err.code);
				//$scope.err = err? err + '' : null;
				if( !err ) {
					cb && cb(user);
				}
				else(err.code == 'INVALID_PASSWORD' || err.code == 'INVALID_USER')
					$timeout(function() {	
						$scope.err = "You entered an incorrect email or password. Please try again.";
						$scope.loginLoading = false;	
					}, 400);
			});
		}
	};
}]);
