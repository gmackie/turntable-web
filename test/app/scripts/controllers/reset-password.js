'use strict';

angular.module('rafteeApp').controller('ResetPasswordCtrl', function ($scope) {
	$scope.error = '';
	$scope.savingLoading = false;

	$scope.attemptSavePassword = function() {
		$scope.savingLoading = true;

		if ($scope.password === $scope.passwordConfirm){
			$scope.error = 'attempting to set new password';	
		} else {
			$scope.error = 'Passwords do not match';
			$scope.savingLoading = false;	
		}
	};

});
