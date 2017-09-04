const assert = require('assert');

module.exports = {
  flatten: xs => xs.reduce((p, c) => p.concat(c), []),
  isDeepEqual: (a, b) => {
    try {
      assert.deepEqual(a, b);
      return true;
    } catch (e) {
      return false;
    }
  },
};
