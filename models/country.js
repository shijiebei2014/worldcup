var Sequelize = require('sequelize')
var db = require('./db')
/**
 * 国家
 */
const Country = db.define('country', {
  zh_name: {type: Sequelize.STRING},
  en_name: {type: Sequelize.STRING},
  abbr: {type: Sequelize.STRING}, // 缩写
  flag: {type: Sequelize.STRING}, // 国旗
}, {
	freezeTableName: true,
})

module.exports = Country
