'use strict';

angular.module('rafteeApp')
.controller('EditorCtrl', function ($scope, $location, Domain, Page, Block) {	
	
	$scope.menuSortableOpts = {
		handle: '.fa-bars',
		placeholder : '<div class="block block-row menu-row-placeholder"></div>'
	};

	var domainName = $location.url().split('/editor/')[1];		
	$scope.domain = Domain.get({domainId:domainName}, function(domain) {
		// Shows home page on load	
		$scope.visiblePage = 0;
		$scope.siteName = domain.domain;	
	});

	$scope.saveSite = function() {
		// below causes errors	
		$scope.domain.published = false;
		$scope.domain.$update({'domainId': $scope.siteName});	
		console.log('save btn pressed');	
	};
	
	$scope.publishSite = function() {
		$scope.domain.published = true;
		$scope.domain.$update({'domainId': $scope.siteName});	
	};

	$scope.showDomainSettings = function() {
		console.log('show settings');	
	};

	$scope.addPage = function() {
		//$scope.domain = Domain.get({domainId:domainName}, function(domain) {
			// Shows home page on load	
			//$scope.visiblePage = 0;
			//$scope.siteName = domain.domain;	
		//});
		
		//console.log('Add Page: '+page);
		//var newPage = {'name': 'New Page'};
		//Domain.save({'domainId':$scope.sitName}, newPage):
		
		//$scope.domain.pages.push(newPage);
	};

	$scope.addBlock = function(type) {
		console.log(type);		
		var newBlock = {
			'type': 'raf-big-lead',
			'menuName':'Welcome To My Site',
			'bgType':'image',
			'bg':'http://666a658c624a3c03a6b2-25cda059d975d2f318c03e90bcf17c40.r92.cf1.rackcdn.com/unsplash_523b2af0710a7_1.JPG',
			'title':'This is Magical',
			'subTitle':'A phone an iPod an internet connected device.'
		};
			
		//$scope.domain.published = false;
		$scope.domain.$save({'domainId': $scope.siteName});	
		console.log('save btn pressed');	
		
		//REST Call to add
		$scope.domain.pages[$scope.visiblePage].blocks.push(newBlock);
		$scope.addBlockModalVis = false;	
	};

});

