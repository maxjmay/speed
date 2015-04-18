'use strict';
/**
 * The main MaxJMay app module
 *
 * @type {angular.Module}
 */

// create the app, and take any angular modules as parameters
var Speed = angular.module('SpeedApp', ['ngRoute', 'LocalStorageModule', 'ngResource']);

Speed.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		}).
		when('/mail', {
			templateUrl: 'views/mail.html',
			controller: 'HomeController'
		}).
		when('/domain', {
			templateUrl: 'views/domain.html',
			controller: 'HomeController'
		}).
		otherwise({
			redirectTo: '/'
		});

		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}
]);
