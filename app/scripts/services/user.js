'use strict';

angular.module('angFireApp.services.users', [])
.factory('Users', ['FBURL', function(FBURL) {
	return {
		find: function(uid) {
			return new Firebase(FBURL+'/users/'+uid);	
		}
	}
}])
