var Nth = require('./nth')
var Country = require('./country')
var Group = require('./group')
var Nth = require('./nth')
var CountryInGroup = require('./countryInGroup')
var countryInNth = require('./countryInNth')

var init_county = require('../utils/spy_country').init_county
var update_zh_name = require('../utils/spy_country').update_zh_name

// Group.hasMany(Country)
Country.belongsToMany(Group, {through: 'countryInGroup'})
Country.belongsToMany(Nth, {through: 'countryInNth'})

async function init() {
  await Promise.all([
    Nth.sync({force: false}),
    Country.sync({force: false}),
    Group.sync({force: false}),
  ]).then(()=> {
    Promise.all([
      CountryInGroup.sync({force: false}),
      countryInNth.sync({force: false})
    ])
  })
}

async function test() {
  var db = require('./db')
  db
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}

init().then(()=> init_county()).then(()=>update_zh_name()).catch((err)=>console.log('err:', err))
// init()
// init_county()
// update_zh_name().then(()=>console.log('翻译完成')).catch((err)=>{
//   console.log('err:', err)
// })
