'use strict';

describe('Service: AWSInstancesMgmtService', function () {

  // load the service's module
  beforeEach(module('awsinstancesManagerApp'));

  // instantiate service
  var AWSInstancesMgmtService;
  beforeEach(inject(function (_AWSInstancesMgmtService_) {
    AWSInstancesMgmtService = _AWSInstancesMgmtService_;
  }));

  it('should do something', function () {
    expect(!!AWSInstancesMgmtService).toBe(true);
  });

});
