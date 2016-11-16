'use strict';

/**
 * @ngdoc overview
 * @name ernestBackendApp
 * @description
 * # ernestBackendApp
 *
 * Main module of the application.
 */
angular
  .module('ernestBackendApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'emguo.poller'
  ])
  .config(function ($routeProvider, $compileProvider, $mdThemingProvider, pollerConfig) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);

    $mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette('blue').warnPalette('red');
    
    pollerConfig.smart = true;
    pollerConfig.resetOn = '$routeChangeStart';

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
