'use strict';

/**
 * @ngdoc service
 * @name awsinstancesManagerApp.AWSInstancesMgmtService
 * @description
 * # AWSInstancesMgmtService
 * Service in the awsinstancesManagerApp.
 */
angular.module('awsinstancesManagerApp')
  .service('AWSInstancesMgmtService', function ($http, $q) {
  	this.apiEndpoint = 'http://localhost:5000';

    this.ping = function() {
      var defer = $q.defer();

      $http.get(this.apiEndpoint + '/').then(function(response) {
        defer.resolve(response);
      }, function(error) {
        defer.reject(error);
      });

      return defer.promise;
    };

    this.getAllInstances = function() {
    	var defer = $q.defer();

      $http.get(this.apiEndpoint + '/instances').then(function(response) {
        defer.resolve(response);
      }, function(error) {
        defer.reject(error);
      });

      return defer.promise;
    };

    this.createInstance = function() {
    	var defer = $q.defer();

      $http.post(this.apiEndpoint + '/instances').then(function(response) {
        defer.resolve(response);
      }, function(error) {
        defer.reject(error);
      });

      return defer.promise;
    };

    this.deleteInstance = function(instance) {
    	var defer = $q.defer();

    	if (instance.PublicIpAddress) {
    		$http.delete(this.apiEndpoint + '/instances/' + instance.PublicIpAddress).then(function(response) {
	        defer.resolve(response);
	      }, function(error) {
	        defer.reject(error);
	      });
    	} else {
    		defer.reject('Invalid instance supplied');
    	}
      

      return defer.promise;
    };
  });
