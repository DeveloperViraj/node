'use strict';

const assert = require('assert');
const { MockTimers } = require('internal/test_runner/mock/mock_timers');
const { AbortSignal } = require('internal/abort_controller');

{
  const mock = new MockTimers();
  mock.enable({ apis: ['AbortSignal.timeout'] });

  try {
    const signal = AbortSignal.timeout(50);

    assert.strictEqual(
      signal.aborted,
      false,
      'signal should not be aborted initially'
    );

    mock.tick(49);
    assert.strictEqual(
      signal.aborted,
      false,
      'signal should not be aborted after 49ms'
    );

    mock.tick(1);
    assert.strictEqual(
      signal.aborted,
      true,
      'signal should be aborted after total 50ms'
    );
  } finally {
    mock.reset();
  }
}