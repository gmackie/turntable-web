'use strict';

angular.module('angFireApp.services.authenticate', [])
.factory('loginService', ['$rootScope', '$firebaseSimpleLogin', 'FBURL', 'profileCreator', '$timeout',
	function($rootScope, $firebaseSimpleLogin, FBURL, profileCreator, $timeout) {
		var auth = null;
      return {
			init: function() {
				return auth = $firebaseSimpleLogin(new Firebase(FBURL));
         },
			/**
			 * @param {string} email
			 * @param {string} pass
			 * @param {Function} [callback]
			 * @returns {*}
			 */
			login: function(email, pass, callback) {
				assertAuth();
				auth.$login('password', {
					email: email,
					password: pass,
					rememberMe: true
				}).then(function(user) {
					if(callback) {
						//todo-bug https://github.com/firebase/angularFire/issues/199
						$timeout(function() {
							callback(null, user);
						});
					}
				}, callback);
			},
			logout: function() {
				assertAuth();
				auth.$logout();
			},
         changePassword: function(opts) {
				console.log('loginservicefhangepassword'); 
				console.log(opts);
				assertAuth();
				var cb = opts.callback || function() {};
				if( !opts.oldpass || !opts.newpass ) {
					$timeout(function(){ cb('Please enter a password'); });
				}
               else if( opts.newpass !== opts.confirm ) {
                  $timeout(function() { cb('Passwords do not match'); });
               }
               else {
						console.log(auth);
                  auth.$changePassword(auth.user.email, opts.oldpass, opts.newpass).then(function() { cb && cb(null) }, cb);
               }
            },
            createAccount: function(email, pass, callback) {
               assertAuth();
               auth.$createUser(email, pass).then(function(user) { callback && callback(null, user) }, callback);
            },
            createProfile: profileCreator
         };

         function assertAuth() {
            if(auth === null) { throw new Error('Must call loginService.init() before using its methods'); }
         }
}])
.factory('profileCreator', ['FBURL', '$timeout', function(FBURL, $timeout) {
      return function(id, email, name, callback) {
			var fireRef = new Firebase(FBURL+'/users/'+id) 
			fireRef.set({
				email: email,
				name: name,
			}, function(err) {
            //err && console.error(err);
            if( callback ) {
               $timeout(function() {
                  callback(err);
               })
            }
         });

         function firstPartOfEmail(email) {
            return ucfirst(email.substr(0, email.indexOf('@'))||'');
         }

         function ucfirst (str) {
            // credits: http://kevin.vanzonneveld.net
            str += '';
            var f = str.charAt(0).toUpperCase();
            return f + str.substr(1);
         }
      }
}]);
