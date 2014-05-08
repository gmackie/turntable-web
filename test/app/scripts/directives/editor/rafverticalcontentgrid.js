'use strict';

angular.module('rafteeApp')
.directive('rafVerticalContentGrid', function ($timeout, Block) {
	return {
		templateUrl: '/views/editor/_rafverticalcontentgrid.html',
		restrict: 'E',
		replace: true,
		scope: {
			domainUid: '@',
			pageUid: '@',
			block: '='	
		},
		link: function(scope, element, attrs) {
		
			/*
			 * Removes the image from the block model
			 * from the index
			 */
			scope.deleteItem = function(index) {
				if(index !== -1) {	
					scope.block.grid.splice(index, 1);	
				}	
			};

			/*
			 * Appends a new image to the model
			 * new image is a standard image we create
			 * for now
			 */
			scope.addItem = function() {
				var newItem = {
					'title':'New Item',
					'textContent':'this is a kick ass grid',
					'url':'http://unsplash.s3.amazonaws.com/batch%2011/berries.jpg'
				};
				scope.block.grid.push(newItem);	
			};

			/*
			 * Below are block
			 * agnostic functions
			 * that should be in each block
			 */

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
				scope.localBlockModel.bgType = scope.block.bgType;
				scope.localBlockModel.bg = scope.block.bg;
				scope.localBlockModel.grid = scope.block.grid;

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
					saveTimer = $timeout(function(){      
						console.log('saving the block');	
						scope.saveBlock();
						scope.saveTimerState = false;
					}, 2500);
				} else {
					console.log('Canceling save timer');                              
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
				
		} // end of link
	};
});
