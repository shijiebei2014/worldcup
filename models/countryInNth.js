var Sequelize = require('sequelize')
var db = require('./db')

module.exports = db.define('countryInNth', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
}, {
	freezeTableName: true,
})
