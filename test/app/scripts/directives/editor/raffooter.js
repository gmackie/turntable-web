'use strict';

angular.module('rafteeApp')
.directive('rafFooter', function () {
	return {
		templateUrl: '/views/editor/_raffooter.html',
		restrict: 'E',
		replace: true,
		link: function(scope, element, attrs) {
		
			scope.saveFooter = function() {
				console.log ('saved footer');
				scope.$parent.saveSite();
			};
		
		} //end of link
	};
});
