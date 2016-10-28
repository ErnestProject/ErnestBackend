'use strict';

describe('Service: Poller', function () {

  // load the service's module
  beforeEach(module('awsinstancesManagerApp'));

  // instantiate service
  var Poller;
  beforeEach(inject(function (_Poller_) {
    Poller = _Poller_;
  }));

  it('should do something', function () {
    expect(!!Poller).toBe(true);
  });

});
