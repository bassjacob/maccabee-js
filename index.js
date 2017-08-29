const validator = require('./validator');

const generalValidators = require('./validators/general');
const numericalValidators = require('./validators/numerical');
const sequelizeValidators = require('./validators/sequelize');

module.exports = {
  validator,
  validators: {
    general: generalValidators,
    numerical: numericalValidators,
    sequelize: sequelizeValidators,
  },
};
