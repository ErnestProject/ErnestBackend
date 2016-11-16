'use strict';

/**
 * @ngdoc service
 * @name ernestBackendApp.AWSInstancesMgmtService
 * @description
 * # AWSInstancesMgmtService
 * Service in the ernestBackendApp.
 */
angular.module('ernestBackendApp')
  .service('AWSInstancesMgmtService', function ($http, $q, $resource) {
  	//this.apiEndpoint = 'http://localhost:5000';
    this.apiEndpoint = 'http://52.57.135.219';
    

    this.ping = function() {
      var defer = $q.defer();

      $http.get(this.apiEndpoint + '/').then(function(response) {
        defer.resolve(response);
      }, function(error) {
        defer.reject(error);
      });

      return defer.promise;
    };

    this.getAllInstancesResources = function() {
      return $resource(this.apiEndpoint + '/instances');
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

    this.requestInstance = function() {
      var defer = $q.defer();

      $http.post(this.apiEndpoint + '/spot_instance_requests').then(function(response) {
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

    this.steamLogin = function(instance) {
      $http.get('http://alpha12.me/test/login.php?iip=' + instance.PublicIpAddress);
    };

    this.steamLogout = function(instance) {
      $http.get('http://alpha12.me/test/logout.php?iip=' + instance.PublicIpAddress);
    };

    this.getInstanceRDPFileContent = function(instance) {
      return 'screen mode id:i:2\n' + 
      'use multimon:i:0\n' + 
      'session bpp:i:32\n' + 
      'winposstr:s:0,3,0,0,800,600\n' + 
      'compression:i:1\n' + 
      'keyboardhook:i:2\n' + 
      'audiocapturemode:i:0\n' + 
      'videoplaybackmode:i:1\n' + 
      'connection type:i:6\n' + 
      'networkautodetect:i:0\n' + 
      'bandwidthautodetect:i:1\n' + 
      'displayconnectionbar:i:1\n' + 
      'enableworkspacereconnect:i:0\n' + 
      'disable wallpaper:i:0\n' + 
      'allow font smoothing:i:1\n' + 
      'allow desktop composition:i:1\n' + 
      'disable full window drag:i:0\n' + 
      'disable menu anims:i:0\n' + 
      'disable themes:i:0\n' + 
      'disable cursor setting:i:0\n' + 
      'bitmapcachepersistenable:i:1\n' + 
      'full address:s:' + instance.PublicIpAddress + '\n' + 
      'audiomode:i:0\n' + 
      'redirectprinters:i:1\n' + 
      'redirectcomports:i:0\n' + 
      'redirectsmartcards:i:1\n' + 
      'redirectclipboard:i:1\n' + 
      'redirectposdevices:i:0\n' + 
      'autoreconnection enabled:i:1\n' + 
      'authentication level:i:0\n' + 
      'prompt for credentials:i:0\n' + 
      'negotiate security layer:i:1\n' + 
      'remoteapplicationmode:i:0\n' + 
      'alternate shell:s:\n' + 
      'shell working directory:s:\n' + 
      'gatewayhostname:s:\n' + 
      'gatewayusagemethod:i:4\n' + 
      'gatewaycredentialssource:i:4\n' + 
      'gatewayprofileusagemethod:i:0\n' + 
      'promptcredentialonce:i:0\n' + 
      'gatewaybrokeringtype:i:0\n' + 
      'use redirection server name:i:0\n' + 
      'rdgiskdcproxy:i:0\n' + 
      'kdcproxyname:s:\n' + 
      'drivestoredirect:s:\n';
    };
  });
