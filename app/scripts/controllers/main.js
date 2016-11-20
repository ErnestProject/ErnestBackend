'use strict';

/**
 * @ngdoc function
 * @name ernestBackendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ernestBackendApp
 */
angular.module('ernestBackendApp')
  .controller('MainCtrl', function (AWSInstancesMgmtService, $mdDialog, $mdToast, poller) {
    var self = this;

    var instancesPoller = poller.get(
      AWSInstancesMgmtService.getAllInstancesResources(),
      {
        action: 'query',
        delay: 5000,
        idleDelay: 20000
      }
    );
    instancesPoller.promise.then(null, null, function(response) {
      self.instances = response;
    });

    var spotInstanceRequestsPoller = poller.get(
      AWSInstancesMgmtService.getAllSpotInstanceRequestsResources(),
      {
        action: 'query',
        delay: 5000,
        idleDelay: 20000
      }
    );
    spotInstanceRequestsPoller.promise.then(null, null, function(response) {
      self.spotRequests = response;
    });

    

    this.instances = [];
    this.spotRequests = [];
  	this.selectedInstance = null;

    this.selectItem = function(event, item) {
    	if (item.Status === 'creating...') {
    		$mdDialog.show(
		      $mdDialog.alert()
		        .clickOutsideToClose(true)
		        .title('This instance is under creation')
		        .textContent('Instance details will be available as soon as the operation is complete.')
		        .ariaLabel('Instance unavailable')
		        .ok('Ok')
		        .targetEvent(event)
		    );
    	} else {
    		this.selectedInstance = item;
        this.selectedInstanceRDPFileURL = this.generateObjectURL(AWSInstancesMgmtService.getInstanceRDPFileContent(this.selectedInstance));
    	}
    };

    this.generateObjectURL = function(content) {
      var blob = new Blob([ content ], { type : 'text/plain' });
      return (window.URL || window.webkitURL).createObjectURL(blob);
    };

    this.listItemClass = function(item) {
    	if (this.selectedInstance && this.selectedInstance.InstanceId === item.InstanceId) {
    		return 'selected';
    	}

    	return '';
    };

    this.createInstance = function(event) {
      $mdDialog.show({
        controller: 'CreateInstanceDialogCtrl as dialog',
        templateUrl: 'views/dialogs/create-instance-dialog.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true,
        fullscreen: true
      })
      .then(function(instanceSettings) {
        console.log(instanceSettings);

        $mdToast.show(
          $mdToast.simple()
            .textContent('Requesting instance...')
            .position('bottom right')
            .hideDelay(0)
        );
        

        AWSInstancesMgmtService.requestInstance(instanceSettings).then(function(response) {
          self.spotRequests.push(response.data);
          $mdToast.hide();
        }, function() {
          $mdToast.hide();
        });
      });
    };

    this.getFileURL = function(reqFile) {
      switch(reqFile) {
        case 'vpn':
          break;
        case 'rdp' :
          return this.selectedInstanceRDPFileURL;
      }
    };

    this.deleteInstance = function(event, instance) {
    	var confirm = $mdDialog.confirm()
          .title('Delete this Instance?')
          .textContent('All data on this Amazon EC2 Instance will be deleted without recovery possibility.')
          .ariaLabel('Delete instance')
          .targetEvent(event)
          .ok('Delete')
          .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
      	self.selectedInstance = null;
      	var index = self.instances.running.indexOf(instance);
      	if (index > -1) {
				    self.instances.running.splice(index, 1);
				}
      	self.instances.deleting.push(instance);

      	AWSInstancesMgmtService.deleteInstance(instance).then(function() {
	      	var index = self.instances.deleting.indexOf(instance);
	      	if (index > -1) {
					    self.instances.deleting.splice(index, 1);
					}
		    });
      });
    };

    this.steamLogin = function(event, instance) {
      AWSInstancesMgmtService.steamLogin(instance);
    };

    this.steamLogout = function(event, instance) {
      AWSInstancesMgmtService.steamLogout(instance);
    };

    this.instanceIconClass = function(instance) {
      switch (instance.State.Code) {
        case 16:
          return 'md-green-500';
          break;
        case 32:
          return 'md-orange-500';
          break;
        case 48:
          return 'md-red-500';
          break;
        default:
          return '';
      }
    };

    this.requestIconClass = function(request) {
      switch (request.State) {
        case 'active':
          return 'md-green-500';
          break;
        case 'open':
          return 'md-orange-500';
          break;
        case 'cancelled':
        case 'closed':
        case 'failed':
          return 'md-red-500';
          break;
        default:
          return '';
      }
    };
  });
