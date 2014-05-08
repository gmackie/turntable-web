'use strict';

angular.module('rafteeApp')
.directive('rafForm', function (Block) {
	return {
		templateUrl: '/views/editor/_rafform.html',
		restrict: 'E',
		replace: true,
		scope: {
			domainUid: '@',
			pageUid: '@',
			block: '='	
		},
		link: function(scope, element, attrs) {

		} // End of link
	};
});
