'use strict';

angular.module('rafteeApp')
.directive('editorMenuRow', function ($timeout) {
	return {
		templateUrl: '/views/editor/_editor-menu-row.html',
		restrict: 'E',
		replace: true,
		link: function postLink(scope, element, attrs) {
			var inputBox = element.find('input');	
		
			scope.editMenuName = function() {
				scope.block.menuNameVis = true;
				$timeout(function() {
					inputBox.focus();	
					scope.$apply();	
				});	
			};
			
			scope.hideEditMenuName = function() {
				$timeout(function() {
					scope.block.menuNameVis = false;
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

			scope.removeBlock = function(pageIndex, blockIndex) {
				console.log(pageIndex+' '+blockIndex);	
				scope.domain.pages[pageIndex].blocks.splice(blockIndex, 1);		
				//TODO: rest call to delete block	
			};

		}
	};
})
