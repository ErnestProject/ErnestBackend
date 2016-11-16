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
      { value: 'eu-central-1', name: 'Frankfurt (default)' },
      { value: 'eu-west-1', name: 'Ireland' }
    ];

    this.instance = { type: 'g2.2xlarge' ,location: 'eu-central-1', price: .50 };

    this.createInstance = function() {
      $mdDialog.hide(this.instance);
    };
  });
