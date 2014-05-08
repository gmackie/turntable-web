'use strict';

angular.module('rafteeApp.Session', [])
.service('Session', function(){
	var userIsAuthenticated = false;

	this.setUserAuthenticated = function(value){
		//console.log(value);	
		userIsAuthenticated = value;
	};

	this.getUserAuthenticated = function(){
		return userIsAuthenticated;
	};

})
.service('CookieManager', function(){
	
	/*
	* Cookie Library From Mozilla:
	* docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
	* docCookies.getItem(name)
	* docCookies.removeItem(name[, path], domain)
	* docCookies.hasItem(name)
	* docCookies.keys()
	*/	

	var docCookies = {
		getItem: function (sKey) {
			return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
		},
		setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
			if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
			var sExpires = '';
			if (vEnd) {
				switch (vEnd.constructor) {
				case Number:
					sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
					break;
				case String:
					sExpires = '; expires=' + vEnd;
					break;
				case Date:
					sExpires = '; expires=' + vEnd.toUTCString();
					break;
				}
			}
			document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
			return true;
		},
		removeItem: function (sKey, sPath, sDomain) {
			if (!sKey || !this.hasItem(sKey)) { return false; }
			document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + ( sDomain ? '; domain=' + sDomain : '') + ( sPath ? '; path=' + sPath : '');
			return true;
		},
		hasItem: function (sKey) {
			return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
		}
	};

	/* Angular Js Public Cookie Functions */
	this.setAuthCookies = function(email, token){
		console.log('Attempting to Set Cookies');	
		console.log(email +' : '+token);	
		try {	
			docCookies.setItem('Email', email, 7.88923e6);	
			docCookies.setItem('Token', token, 7.88923e6);	
		} catch(err) {
			return err;
		}
		return true;
	};

	this.getAuthCookieData = function(){
		var email = docCookies.getItem('Email');
		var token = docCookies.getItem('Token');

		if(email && token){
			return {
				email: email,
				token: token
			};
		} else {
			return false;
		}
	};

});
