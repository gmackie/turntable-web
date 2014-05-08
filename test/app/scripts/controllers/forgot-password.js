'use strict';

angular.module('rafteeApp').controller('ForgotPasswordCtrl', function ($scope) {
	$scope.resetLoading = false;
	$scope.error = '';

	$scope.attemptSendReset = function() {
		$scope.resetLoading = true;
		if(!$scope.email){
			$scope.error = 'Please Enter An Email';
			$scope.resetLoading = false;
		} else {
			$scope.email = '';	
		}
	};


});

