'use strict';

angular.module('angFireApp.config', []);

app.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/cover.html',
		controller:'CoverCtrl'
	})
	.when('/turntable', {
		templateUrl: 'views/turntable.html',
		authRequired: true,
		controller:'TurntableCtrl'
	})
	.when('/dashboard', {
		templateUrl: 'views/dashboard.html',
		authRequired: true,
		controller:'DashboardCtrl'
	})
	.when('/login', {
		templateUrl: 'views/login.html',
		controller:'LoginCtrl'
	})
	.when('/register', {
		templateUrl: 'views/register.html',
		controller:'RegisterCtrl'
	})
	.when('/forgot', {
		templateUrl: 'views/forgot.html',
		controller:'ForgotCtrl'
	})
	.when('/new-password/:euid/:puid', {
		templateUrl: 'views/new-password.html',
		controller:'NewPasswordCtrl'
	})
	.when('/user/settings', {
		templateUrl: 'views/user/settings.html',
		authRequired: true,
		controller:'UserSettingsCtrl'
	})
	.otherwise({redirectTo: '/'});

	//Remove # from URL
	$locationProvider.html5Mode(true);

}])
.constant('loginRedirectPath', '/login') 
.constant('FBURL', 'https://popping-fire-9217.firebaseio.com/')
.run(['loginService','FBURL', '$rootScope', function(loginService, FBURL, $rootScope) {
	$rootScope.auth = loginService.init('/login');	
	$rootScope.FBURL = FBURL;
}])

