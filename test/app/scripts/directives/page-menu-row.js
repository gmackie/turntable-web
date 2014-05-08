'use strict';

angular.module('rafteeApp')
.directive('pageMenuRow', function ($timeout) {
	return {
		templateUrl: '/views/editor/_page-menu-row.html',
		restrict: 'E',
		replace: true,
		link: function postLink(scope, element, attrs) {
			var inputBox = element.find('input');	

			scope.editPage = function() {
				if(scope.$parent.visiblePage === scope.$index) {
					scope.page.nameVis = true;
					$timeout(function() {
						inputBox.focus();	
						scope.$apply();	
					});	
				} else {
					scope.$parent.visiblePage = scope.$index;
				}
			};
			
			scope.hideEditMenuName = function() {
				$timeout(function() {
					scope.page.nameVis = false;
					scope.$apply();	
				});	
			};

			inputBox.bind('blur', function() {
				scope.hideEditMenuName();
			});
			
			inputBox.bind('keyup', function(e) {
				if (e.keyCode == 13) {
					scope.hideEditMenuName();
				}
			});

			scope.removePage = function(pageIndex) {
				scope.domain.pages.splice(pageIndex, 1);	
			};

		}
	};
})
