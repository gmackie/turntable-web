'use strict';

var app = angular.module('angFireApp', [
	'ngRoute',
	'ngCookies',
	'ngSanitize',
	'angFireApp.config',
	
	'angFireApp.controllers.dashboard',
	'angFireApp.controllers.login',
	'angFireApp.controllers.register',
	'angFireApp.controllers.forgot',
	'angFireApp.controllers.newpassword',
	'angFireApp.controllers.users',
	
	'angFireApp.services.authenticate',
	'angFireApp.services.users',
	
	'waitForAuth',
	'routeSecurity',	
	'ui.bootstrap',	
	'firebase'
]);

