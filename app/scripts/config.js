'use strict';

angular.module('angFireApp.config', []);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/', {
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
}])
.constant('loginRedirectPath', '/login') 
.constant('FBURL', 'https://eir.firebaseio.com')
//.constant('FBURL', 'https://FIREBASE_URL.firebaseio.com')
.run(['loginService','FBURL', '$rootScope', function(loginService, FBURL, $rootScope) {
	$rootScope.auth = loginService.init('/login');	
	$rootScope.FBURL = FBURL;
}])

