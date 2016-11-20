'use strict';

/**
 * @ngdoc function
 * @name ernestBackendApp.controller:CreateInstanceDialogCtrl
 * @description
 * # CreateInstanceDialogCtrl
 * Controller of the ernestBackendApp
 */
angular.module('ernestBackendApp')
  .controller('CreateInstanceDialogCtrl', function ($mdDialog) {
    this.types = [
      { value: 'g2.2xlarge', name: 'g2.2xlarge (default)' },
      { value: 'm3.medium', name: 'm3.medium' }
    ];

    this.locations = [
      { value: 'eu-central-1a', name: 'Frankfurt - Zone A' },
      { value: 'eu-central-1b', name: 'Frankfurt - Zone B (default)' },
      { value: 'eu-west-1a', name: 'Ireland - Zone A' },
      { value: 'eu-west-1b', name: 'Ireland - Zone B' },
      { value: 'eu-west-1c', name: 'Ireland - Zone C' }
    ];

    this.instance = { type: 'g2.2xlarge' ,location: 'eu-central-1b', price: .50 };

    this.createInstance = function() {
      $mdDialog.hide(this.instance);
    };
  });
