const { present } = require('../../src/validators/general');
const validator = require('../../src/validator');

describe('validator', () => {
  it('rejects if a validator fails', () => {
    const instance = {
      key1: 'value1',
      key2: 'value2',
    };

    const params = {};

    const map = {
      key1: [present()],
    };

    const runner = validator(map);

    expect.assertions(1);

    return runner(params, instance).catch(error =>
      expect(error.message).toEqual('Could not validate')
    );
  });

  it('resolves  if a validator fails', () => {
    const instance = {
      key1: 'value1',
      key2: 'value2',
    };

    const params = {
      key1: 'value2',
    };

    const map = {
      key1: [present()],
    };

    const runner = validator(map);

    expect.assertions(2);

    return runner(params, instance).then(value => {
      expect(value.key1).toEqual('value2');
      expect(value.key2).toEqual('value2');
    });
  });
});
