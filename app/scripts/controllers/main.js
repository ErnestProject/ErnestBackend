'use strict';

/**
 * @ngdoc function
 * @name awsinstancesManagerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the awsinstancesManagerApp
 */
angular.module('awsinstancesManagerApp')
  .controller('MainCtrl', function (AWSInstancesMgmtService, $mdDialog, $timeout) {
  	var self = this;

  	this.selectedInstance = null;
  	this.creatingInstances = [];
  	this.deletingInstances = [];

  	// self.instances = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  	this.getInstances = function() {
  		AWSInstancesMgmtService.getAllInstances().then(function(response) {
  			self.instances = [];
  			self.deletingInstances = [];
  			self.creatingInstances = [];

  			response.data.forEach(function(instance) {
  				switch (instance.State.Code) {
  					case 16:
  						self.instances.push(instance);
  						break;
  					case 32:
  						self.deletingInstances.push(instance);
  						break;
  				}
  			});
	    });
  	};
  	this.getInstances();

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
    	}
    };

    this.listItemClass = function(item) {
    	if (this.selectedInstance && this.selectedInstance.InstanceId === item.InstanceId) {
    		return 'selected';
    	}

    	return '';
    };

    this.createInstance = function(event) {
    	var confirm = $mdDialog.confirm()
          .title('Create a new Amazon EC2 Instance?')
          .textContent('Create and leave alive an Amazon EC2 Instance may cause significant fees.')
          .ariaLabel('New instance')
          .targetEvent(event)
          .ok('Create')
          .cancel('Cancel');

	    $mdDialog.show(confirm).then(function() {
	    	var date = new Date().getTime();
	    	var tmpInstance = { InstanceId: 'tmp-' + crc32(date + ''), LaunchTime: {$date: date}, Status: 'creating...' };
	    	self.creatingInstances.push(tmpInstance);

	      AWSInstancesMgmtService.createInstance().then(function(response) {
	      	var index = self.creatingInstances.indexOf(tmpInstance);
	      	if (index > -1) {
					    self.creatingInstances.splice(index, 1);
					}
		    	self.getInstances();
		    });
	    });
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
      	var index = self.instances.indexOf(instance);
      	if (index > -1) {
				    self.instances.splice(index, 1);
				}
      	self.deletingInstances.push(instance);

      	AWSInstancesMgmtService.deleteInstance(instance).then(function(response) {
	      	var index = self.deletingInstances.indexOf(instance);
	      	if (index > -1) {
					    self.deletingInstances.splice(index, 1);
					}

		    	self.getInstances();
		    });
      });
    };
  });
