'use strict';

angular.module('angFireApp.controllers.forgot', [])
.controller('ForgotCtrl', ['$scope', '$location', '$timeout', 'FBURL', function($scope, $location, $timeout, FBURL) {
	
	$scope.email = null;

	$scope.forgotPassword = function() {
		$scope.err = null;
		$scope.resetLoading = true;

		if($scope.email) {
			var auth = new FirebaseSimpleLogin(new Firebase(FBURL), function(){});
			console.log(auth);
			auth.sendPasswordResetEmail($scope.email, function(error, success){
				if(error) {
					$timeout(function() {	
						console.log(error);
						$scope.err = 'Seems to be an error with your email please check it agin try again';
						$scope.resetLoading = false;
					}, 400);	
				}
				if(success) {
					$timeout(function() {	
						console.log(success);
						$scope.err = null;
						$scope.resetLoading = false;
						$scope.showSuccess = true;	
					}, 400);	
				}
				
			});	
			$timeout(function() {	
				$scope.resetLoading = false;
			}, 400);	
		} else {
			
			$timeout(function() {	
				$scope.resetLoading = false;
				$scope.err = 'Please enter an email';
			}, 400);	
		}
	}; 

}]);
