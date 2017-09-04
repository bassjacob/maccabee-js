const defaultBuilder = value => ({ where: { id: value } });

function exists(model, builder = defaultBuilder) {
  return (key, params) =>
    model.find(builder(params[key])).then(instance => {
      if (!instance) return Promise.reject('Must exist in db');
      return Promise.resolve();
    });
}

module.exports = {
  exists,
};
