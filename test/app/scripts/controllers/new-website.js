'use strict';

angular.module('rafteeApp').controller('NewWebsiteCtrl', function ($scope) {
	
	$scope.showThemes = true;
	$scope.showPword = false;
	
	$scope.themes = ['Theme 1', 'Theme 2', 'Theme 3',
							'Theme 4', 'Theme 5', 'Theme 6'];	

	$scope.attemptSignup = function() {
		$scope.signupLoading = true;
		
		/*	
		$scope.email
		$scope.password
		$scope.siteTheme
		$scope.rafteeUrl
		*/	
	};

	$scope.toggleShowThemes = function() {
		$scope.showThemes = !$scope.showThemes;
	};

	$scope.selectTheme = function(name) {
		$scope.siteTheme = name;	
		$scope.toggleShowThemes();	
	};

});

