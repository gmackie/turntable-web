'use strict';

angular.module('rafteeApp').directive('navbar', function () {
	return {
		templateUrl: '/views/_navbar.html',
		restrict: 'E',
		replace: true,
		scope: {
			title: '@',
			brandText: '@',
			headerurl: '@',
			showback : '=',
	 		showrightside : '=',
	 		zNone: '='
		}
	};
});
