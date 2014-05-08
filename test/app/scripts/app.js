'use strict';

angular.module('rafteeApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'rafteeApp.Api',
	'rafteeApp.Session',
	'htmlSortable',
	'ui.bootstrap'
])
.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/dashboard.html',
		requireLogin: true,
		controller: 'MainCtrl'
	})
	.when('/login', {
		templateUrl: 'views/login.html',
		requireLogin: false,
		controller: 'LoginCtrl'
	})
	.when('/signup', {
		templateUrl: 'views/signup.html',
		requireLogin: false,
		controller: 'SignupCtrl'
	})
	.when('/new-website', {
		templateUrl: 'views/new-website.html',
		requireLogin: false,
		controller: 'NewWebsiteCtrl'
	})
	.when('/forgot-password', {
		templateUrl: 'views/forgot-password.html',
		requireLogin: false,
		controller: 'ForgotPasswordCtrl'
	})
	.when('/reset-password/:rid', {
		templateUrl: 'views/reset-password.html',
		requireLogin: false,
		controller: 'ResetPasswordCtrl'
	})
	.when('/verify-account/:vid', {
		templateUrl: 'views/verify-account.html',
		requireLogin: false,
		controller: 'VerifyAccountCtrl'
	})
	.when('/settings', {
		templateUrl: 'views/settings.html',
		requireLogin: true,
		controller: 'SettingsCtrl'
	})
	.when('/editor/:siteId', {
		templateUrl: 'views/editor.html',
		requireLogin: true,
		controller: 'EditorCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
})
.run(function($rootScope, $routeParams, $route, $http, Session, CookieManager){
	$rootScope.$on('$locationChangeStart', function(event, next) {
		
		// Check for Cookie and change auth status if  
		if(!Session.getUserAuthenticated() && CookieManager.getAuthCookieData()) {
			console.log('sesson not authed & cookie true');
			var data = CookieManager.getAuthCookieData();
			if(data.email && data.token){
				Session.setUserAuthenticated(true);		
				// Set User headers
				$http.defaults.headers.common['API-Email'] = data.email;
				$http.defaults.headers.common['API-Token'] = data.token;
				//$http.defaults.headers.common['API-Client'] = 'Web';
			}
		}
		
		//console.log('Next Page: '+next+', Current: '+current);	
		var a = next.split('#');	
		//console.log(a);	
		var b = '';	
		if(a[1]){	
			b = a[1].split('/');
			b = b[1];
		} else {
			b = 'dashboard';
		}

		if(b === 'editor'){b = 'editor/:siteId';} 
		if(b === 'reset-password'){b='reset-password/:rid';} 
		if(b === 'verify-account'){b = 'verify-account/:vid';}
		if(b === 'dashboard'){b = '/';}

		//var parsedUrl
		//console.log($route.routes['/'+b].requireLogin);	
		console.log('User Authed: ' + Session.getUserAuthenticated());	
		
		if($route.routes['/'+b].requireLogin && !Session.getUserAuthenticated()){
			//user is not authenticated
			//window.alert('You are not authed to see this');	
			window.location = '/#/login';
			event.preventDefault();	
		} else {
			//User is authenticated 
		}

	});
});

