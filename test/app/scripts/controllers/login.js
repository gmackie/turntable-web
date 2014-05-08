'use strict';

angular.module('rafteeApp').controller('LoginCtrl', function ($scope, $http, Authenticate, Session, CookieManager) {
	$scope.showPword = false;
	$scope.loginLoading = false;
	$scope.error = '';

	$scope.togglePasswordShow = function() {
		$scope.showPword = !$scope.showPword;
	};

	$scope.attemptLogin = function() {
		$scope.loginLoading = true;
		if($scope.username && $scope.password) {
			var auth = Authenticate.login($scope.username, $scope.password);
			
			auth.success(function(data){
				// console.log(data.token);
				$scope.loginLoading = false;
				$scope.password = null;
				Session.setUserAuthenticated(true);	
				CookieManager.setAuthCookies($scope.username, data.token);	

				// Set User headers
				$http.defaults.headers.common['API-Email'] = $scope.username;
				$http.defaults.headers.common['API-Token'] = data.token;
				$http.defaults.headers.common['API-Client'] = 'Web';
				
				// Load the dashboard
				window.location = '/#/';
				event.preventDefault();	
			});
			
			auth.error(function(data){
				console.log(data);		
				$scope.loginLoading = false;
			});

		} else {
			$scope.error = 'Please enter a valid email and password';		
			$scope.loginLoading = false;
		}
	};

});
