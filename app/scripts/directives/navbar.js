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
				}
			});
		
			scope.logout = function() {
				loginService.logout();
			};
		}
	};
}]);
