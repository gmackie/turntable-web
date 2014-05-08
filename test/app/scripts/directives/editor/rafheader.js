'use strict';

angular.module('rafteeApp')
.directive('rafHeader', function () {
	return {
		templateUrl: '/views/editor/_rafheader.html',
		restrict: 'E',
		replace: true,
		link: function(scope, element, attrs) {
	
			scope.saveHeader = function() {
				console.log ('saved header');
				scope.$parent.saveSite();
			};
		} //end of link
	};
});
