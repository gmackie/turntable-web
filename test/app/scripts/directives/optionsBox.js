'use strict';

angular.module('rafteeApp')
.directive('optionsBox', function (OptionBoxNodes) {
	return {
		restrict: 'A',
		link: function postLink(scope, element, attrs) {
			// Adds element to the grande editor	
			OptionBoxNodes.addNode(element[0]);
		}
	};
})
.service('OptionBoxNodes', function() {
	var nodeList = [];

	this.addNode = function(node) {
		console.log(node);
		try {
			nodeList.push(node);
			console.log(nodeList);
			grande.bind(nodeList);
		} catch (e) {
			console.log('Grande.js & CSS Files need to be installed');
		}
		return;
	};
	
	this.removeNode = function(node) {
		nodeList.splice(nodeList.indexOf(node), 1);
		grande.bind(nodeList);
		
		return;
	};
});
