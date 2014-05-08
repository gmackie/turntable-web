'use strict';

angular.module('angFireApp.controllers.register', [])
.controller('RegisterCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'loginService', function ($scope, $rootScope, $location, $timeout, loginService) {

	// If logged in you can not create a new user
	// only done on load of controller 
	if($rootScope.auth.user) {
		$location.path('/dashboard');
	};

	$scope.login = function(cb) {
		loginService.login($scope.email, $scope.pass, function(err, user) {
			$scope.err = err? err + '' : null;
			if(!err) {cb && cb(user);}
		});
	};

	$scope.createAccount = function() {

		$scope.err = null;
		$scope.newAcctLoading = true;

		if(assertValidLoginAttempt()) {
			loginService.createAccount($scope.email, $scope.pass, function(err, user) {
				if(err) {
					$scope.err = err? err + '' : null;
				} else {
					// must be logged in before I can write to my profile
					$scope.login(function() {
						loginService.createProfile(user.uid, user.email, $scope.name);
						$location.path('/dashboard');
					});
				}
			});
		}
	};
	
	function assertValidLoginAttempt() {
		if(!$scope.name || !$scope.email || !$scope.pass || $scope.pass !== $scope.confirm || !$scope.companyName) {
			$timeout(function(){
				$scope.err = 'Please fill out the entire form';
				$scope.newAcctLoading = false;
			},400);	
			return false;	
		}
		return !$scope.err;
	}     

}]);
