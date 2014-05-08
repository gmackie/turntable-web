'use strict';

angular.module('rafteeApp').controller('SignupCtrl', function ($scope, User) {
	
	$scope.showPword = false;

	$scope.attemptSignup = function() {
		$scope.signupLoading = true;
	
		$scope.user = User;
		$scope.user.email = $scope.email;
		$scope.user.password =  $scope.password;

		$scope.user.save(function(u, putResponseHeaders) {
			
			$scope.signupLoading = false;	
			console.log(u);
			//TODO shit after we create an account 
			//TODO massive error handling
			//TODO Set user token and send to main page 
		});
		
	};

});

