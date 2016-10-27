'use strict';

/**
 * @ngdoc overview
 * @name awsinstancesManagerApp
 * @description
 * # awsinstancesManagerApp
 *
 * Main module of the application.
 */
angular
  .module('awsinstancesManagerApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial'
  ])
  .config(function ($routeProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette('blue').warnPalette('red');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
