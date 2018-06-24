var request = require('request')
var cheerio = require('cheerio')
var async = require('async')

var Group = require('../models/group')
var Country = require('../models/country')
var Nth = require('../models/nth')

var translate = require('node-google-translate-skidz');

async function init_county() {
  return new Promise((resolve, reject)=>{
    async.auto({
      groups: function(done) {
        request({
          uri: 'https://www.fifa.com/worldcup/groups/',
          timeout: 60 * 1000}, (e, r, body)=> {
            done(e, body)
          })
      },
      update: ['groups', function(results, done) {
        const body = results.groups;

        const $ = cheerio.load(body)
        const groups = $('.fi-standings')

        async.waterfall([
          function(cb) {
            Nth.findOrCreate({
              where: {year: '2018'},
            }).spread((data, created)=> {
              cb(null, data)
            }).catch(cb)
          },
          function(nth, cb) {
            async.timesSeries(groups.length, function(n, next) {
              var group = String.fromCharCode(64 + n + 1)
              // 先新建分组
              async.waterfall([
                function(callback) {
                  Group.findOrCreate({
                    where: {name: group}
                  }).spread((group, created)=> {
                    const teams = 4;
                    async.timesSeries(teams, function(m, mext) {
                      const $this = groups.eq(n);
                      const country = {
                        flag: $this.find('.fi-t__i img').eq(m).attr('src'),
                        en_name: $this.find('.fi-t__n .fi-t__nText').eq(m).text().trim(),
                        abbr: $this.find('.fi-t__n .fi-t__nTri').eq(m).text().trim()
                      }

                      // mext(null)
                      console.log(country.en_name)
                      async.waterfall([
                        function(done) {
                          Country.findOrCreate({
                            where: {en_name: country.en_name},
                            defaults: country
                          }).spread((country, created)=> {
                            console.log('addGroups:', !!country.addGroup, !!country.addGrousp, !!country.setGroup, !!country.setGroups)
                            country.addGroup(group)
                            // console.log(country.get({plain: true}))
                          }).then(data=>done(null, data)).catch(done)
                        }
                      ], mext)
                    } , callback)
                  }).catch(callback)
                }
              ], next)
            }, cb)
          }
        ], done)
      }]
    }, function(err, data) {
      if (err) {
        console.log(err)
        return reject(err)
      }
      resolve(data)
    })
  })
}

async function update_zh_name() {
  const counties = await Country.findAll()
  const promises = counties.map((country)=> {
    return new Promise((resolve, reject)=>{
      var en_name = country.en_name
      translate({
        text: en_name,
        source: 'en',
        target: 'zh-CN'
      }, function(result) {
        var zh_name = result.sentences[0].trans
        switch (en_name) {
          case 'Peru':
            zh_name = '秘鲁'
            break;
          case 'Korea Republic':
            zh_name = '韩国'
            break;
          default:
            break;
        }
        country.zh_name = zh_name
        country.save()
      });
    })
  })
  // console.log(promises.slice(0,1).length)
  Promise.all(promises)
}
module.exports = {
  init_county,
  update_zh_name
}
