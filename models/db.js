const Sequelize = require('sequelize')
var nconf = require('nconf');

nconf.file({ file: __dirname + '/../db.json' })

function getConfig() {
  return nconf.get(process.env.NODE_ENV === 'production' ? 'prd' : 'dev')
}
const sequelize = new Sequelize('worldcup', 'root', '', {
  host: getConfig().host,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

module.exports = sequelize
