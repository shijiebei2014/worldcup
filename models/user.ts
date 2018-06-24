import * as Sequelize from 'sequelize'
import db from '../db'

export default db.define('user', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: Sequelize.STRING,
}, {
	freezeTableName: true,
})
