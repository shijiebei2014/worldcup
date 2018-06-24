var Sequelize = require('sequelize')
var db = require('./db')
/**
 * 分组
 */
const Group = db.define('groups', {
  name: {type: Sequelize.STRING}
}, {
	freezeTableName: true,
})

module.exports = Group
