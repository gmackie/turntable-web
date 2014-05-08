'use strict';

app.directive('navbar',['$rootScope', 'loginService', function ($rootScope, loginService) {
	return {
		templateUrl: 'views/_navbar.html',
		restrict: 'E',
		replace: true,
		scope: {
			title: '@',
			brandText: '@',
			headerurl: '@',
			showback : '=',
	 		hidelogo: '=',
	 		zNone: '='
		},
		link: function (scope, element, attrs) {

			$rootScope.$watch('auth.user', function() {
				if($rootScope.auth.user === null) {
					scope.showLogout = false;
				} else {
					scope.showLogout = true;
					try {
						UserVoice.push(['identify', {
							email: $rootScope.auth.user.email,
							id: $rootScope.auth.user.uid 
						}]);
					} catch(e) {
						console.log('Could not set User Voice User Data')
					}
				}
			});
		
			scope.logout = function() {
				loginService.logout();
			};
		}
	};
}]);
