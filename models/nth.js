var Sequelize = require('sequelize')
var db = require('./db')
/**
 * 哪一届世界杯,如2018
 */
const Nth = db.define('nth', {
  year: {type: Sequelize.STRING}
}, {
	freezeTableName: true,
})

module.exports = Nth
