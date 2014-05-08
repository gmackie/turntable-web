'use strict';

angular.module('rafteeApp')
.directive('rafBigLead', function ($timeout, Block) {
	return {
		templateUrl: '/views/editor/_rafbiglead.html',
		restrict: 'E',
		replace: true,
		scope: {
			domainUid: '@',
			pageUid: '@',
			block: '='	
		},
		link: function(scope, element, attrs) {
			var saveTimer;	

			/*
			 * Gets Block content from server 
			 * so that we can save blocks individually
			 */
			scope.localBlockModel = Block.get({
				'domainId': scope.domainUid,
				'pageId': scope.pageUid,
				'blockId': scope.block.uid
			});
			
			/*
			 * Saves Entire Block
			 * Takes domain wide data sets local
			 * and then saves to server
			 */
			scope.saveBlock = function() {
				scope.localBlockModel.menuName = scope.block.menuName;
				scope.localBlockModel.title = scope.block.title;
				scope.localBlockModel.title = scope.block.subTitle;
				scope.localBlockModel.bgType = scope.block.bgType;
				scope.localBlockModel.bg = scope.block.bg;

				scope.localBlockModel.$update({
					'domainId': scope.domainUid,
					'pageId': scope.pageUid,
					'blockId': scope.block.uid
				});	
			};
		
			/*
			 * Watchers Timer State
			 * and triggers save 
			 */
			scope.$watch('saveTimerState', function(newVal) {
				if(newVal) {
					saveTimer = $timeout(function() {      
						console.log('autosaving the big lead block');	
						scope.saveBlock();
						scope.saveTimerState = false;
					}, 2500);
				} else {
					//console.log('Canceling save timer');                              
					$timeout.cancel(saveTimer); 
				} 
			});

			/*
			 * Watches for outside vars
			 * like block.menuName
			 * and saves sets timer to save on
			 * new content
			 */
			scope.$watch('block.menuName', function(newVal, oldVal) {
				if(newVal !== oldVal && newVal) {	
					scope.saveTimerState = true;
				} else {
					scope.saveTimerState = false;
				}
			});
			
		} //end of link
	};
});
