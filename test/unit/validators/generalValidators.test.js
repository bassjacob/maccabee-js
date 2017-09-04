const {
  present,
  immutable,
} = require('../../../src/validators/general');

describe('generalValidators', function () {
  describe('present', function () {
    it('rejects if the value is not in the params', function () {
      const params = {};
      const key = 'foo';

      expect.assertions(1);

      return expect(present()(key, params)).rejects.toEqual('Can not be null');
    });

    it('resolves if the value is in the params', function () {
      const params = { foo: 'bar' };
      const key = 'foo';

      expect.assertions(1);

      return expect(present()(key, params)).resolves.toEqual(undefined);
    });
  });

  describe('immutable', function () {
    it('rejects if the value is in params and instance and has changed', function () {
      const instance = { foo: 'bar' };
      const params = { foo: 'baz' };
      const key = 'foo';

      expect(immutable()(key, params, instance)).rejects.toEqual('Can not change');
    });

    it('rejects if the value is not in params and is in instance', function () {
      const instance = { foo: 'bar' };
      const params = {};
      const key = 'foo';

      expect(immutable()(key, params, instance)).rejects.toEqual('Can not change');
    });

    it('rejects if the value is in params and is not in instance', function () {
      const instance = {};
      const params = { foo: 'bar' };
      const key = 'foo';

      expect(immutable()(key, params, instance)).rejects.toEqual('Can not change');
    });

    it('resolves if the value is the same in params and instance', function () {
      const instance = { foo: 'bar' };
      const params = { foo: 'bar' };
      const key = 'foo';

      expect(immutable()(key, params, instance)).resolves.toEqual(undefined);
    });

    it('resolves if the value is not in params or instance', function () {
      const instance = {};
      const params = {};
      const key = 'foo';

      expect(immutable()(key, params, instance)).resolves.toEqual(undefined);
    });
  });
});
