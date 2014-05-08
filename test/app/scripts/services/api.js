'use strict';

angular.module('rafteeApp.Api', ['ngResource'])
.factory('ApiUrl', function () {
	return 'http://api.raftee.com/v1';	
	// Mock server with Apiary below	
	//return 'http://private-2f6af-raftee.apiary.io/v1';
})
.service('Authenticate', function($http, ApiUrl){
	// Allow cross site API 
	$http.defaults.useXDomain = true;
	this.login = function(username, password) {
		return $http.get(ApiUrl+'/login', {
			headers: {
				'API-Email': username,
				'API-Password': password
			}
		});
	};
})
.factory('User', function ($resource, $http, ApiUrl) {
	$http.defaults.useXDomain = true;
	return $resource(ApiUrl+'/user', {
		update: {method: 'PUT'}
	});
})
.factory('Domain', function ($resource, $http, ApiUrl) {
	$http.defaults.useXDomain = true;
	return $resource(ApiUrl+'/domain/:domainId',
		{
			domainId: '@id'
		}, 
		{
			update: {
				method:'PUT',
				params: {
					domainId: '@id'
				}
			}
		}
	);
})
.factory('Page', function($resource, $http, ApiUrl) {
	$http.defaults.useXDomain = true;
	return $resource(ApiUrl+'/domain/:domainId/:pageId',
		{
			domainId:'@id',
			pageId:'@id'
		}, 
		{
			update: {
				method:'PUT',
				params: {
					domainId: '@id',
					pageId: '@id'
				}
			}
		}
	);
})
.factory('Block', function($resource, $http, ApiUrl) {
	$http.defaults.useXDomain = true;
	return $resource(ApiUrl+'/domain/:domainId/:pageId/:blockId', 
		{
			domainId: '@id',
			pageId: '@id',
			blockId: '@id'
		},
		{
			update: {
				method:'PUT',
				params: {
					domainId: '@id',
					pageId: '@id',
					blockId: '@id'
				}
			}
		}
	);
});


