'use strict';

angular.module('rafteeApp')
.controller('MainCtrl', function ($scope, Domain) {
	// Silence is golden
	$scope.domains = Domain.query(); 
});
