const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('collectorManager', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

try {
  sequelize.authenticate();
  console.log('Conectamos com sucesso');
} catch (error) {
  console.log(`Não foi possível conectar: ${error}`);
}

module.exports = sequelize;
