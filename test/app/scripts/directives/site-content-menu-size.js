'use strict';

angular.module('rafteeApp')
.directive('siteContentMenuSize', function ($timeout) {
	return {
		restrict: 'A',
		link: function postLink(scope, element, attrs) {
		
			var resizeMenu = function() {
				var divHeight = $(window).height() - 243;
				element.css('height', divHeight);
			};
	
			$(window).resize(function () {
				resizeMenu();
			});

			//resize onload
			resizeMenu();

		}
	};
})
