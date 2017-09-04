const { present, immutable } = require('../../../src/validators/general');

describe('generalValidators', () => {
  describe('present', () => {
    it('rejects if the value is not in the params', () => {
      const params = {};
      const key = 'foo';

      expect.assertions(1);

      return expect(present()(key, params)).rejects.toEqual('Can not be null');
    });

    it('resolves if the value is in the params', () => {
      const params = { foo: 'bar' };
      const key = 'foo';

      expect.assertions(1);

      return expect(present()(key, params)).resolves.toEqual(undefined);
    });
  });

  describe('immutable', () => {
    it('rejects if the value is in params and instance and has changed', () => {
      const instance = { foo: 'bar' };
      const params = { foo: 'baz' };
      const key = 'foo';

      expect(immutable()(key, params, instance)).rejects.toEqual(
        'Can not change'
      );
    });

    it('rejects if the value is not in params and is in instance', () => {
      const instance = { foo: 'bar' };
      const params = {};
      const key = 'foo';

      expect(immutable()(key, params, instance)).rejects.toEqual(
        'Can not change'
      );
    });

    it('rejects if the value is in params and is not in instance', () => {
      const instance = {};
      const params = { foo: 'bar' };
      const key = 'foo';

      expect(immutable()(key, params, instance)).rejects.toEqual(
        'Can not change'
      );
    });

    it('resolves if the value is the same in params and instance', () => {
      const instance = { foo: 'bar' };
      const params = { foo: 'bar' };
      const key = 'foo';

      expect(immutable()(key, params, instance)).resolves.toEqual(undefined);
    });

    it('resolves if the value is not in params or instance', () => {
      const instance = {};
      const params = {};
      const key = 'foo';

      expect(immutable()(key, params, instance)).resolves.toEqual(undefined);
    });
  });
});
