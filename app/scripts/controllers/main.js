'use strict';

/**
 * @ngdoc function
 * @name awsinstancesManagerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the awsinstancesManagerApp
 */
angular.module('awsinstancesManagerApp')
  .controller('MainCtrl', function (AWSInstancesMgmtService, $mdDialog, poller) {
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
      self.parseInstances(response);
    });

    this.instances = {
      running: [],
      creating: [],
      deleting: [],
      unknown:[]
    };

  	this.selectedInstance = null;

  	// self.instances = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    this.parseInstances = function(instances) {
      self.instances = {
        running: [],
        creating: [],
        deleting: [],
        unknown:[]
      };

      instances.forEach(function(instance) {
        switch (instance.State.Code) {
          case 16:
            self.instances.running.push(instance);
            break;
          case 32:
            self.instances.deleting.push(instance);
            break;
          default:
            self.instances.unknown.push(instance);
        }
      });
    };

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
    	var confirm = $mdDialog.confirm()
          .title('Create a new Amazon EC2 Instance?')
          .textContent('Create and leave alive an Amazon EC2 Instance may cause significant fees.')
          .ariaLabel('New instance')
          .targetEvent(event)
          .ok('Create')
          .cancel('Cancel');

	    $mdDialog.show(confirm).then(function() {
	    	var date = new Date().getTime();
        /*jshint undef:false */
	    	var tmpInstance = { InstanceId: 'tmp-' + crc32(date + ''), LaunchTime: {$date: date}, Status: 'creating...' };
        /*jshint undef:true */
	    	self.instances.creating.push(tmpInstance);

	      AWSInstancesMgmtService.createInstance().then(function() {
	      	var index = self.instances.creating.indexOf(tmpInstance);
	      	if (index > -1) {
					    self.instances.creating.splice(index, 1);
					}
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
  });
