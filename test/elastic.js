const elasticsearch = require('elasticsearch')
const mongoose = require('mongoose')

const elasticClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})

mongoose.connect('mongodb://localhost/gisiclouds')
// const db = mongoose.createConnection('mongodb://localhost/gisiclouds')
const db = mongoose.connection
db.on('open', () => {
  console.log('mongo db 连接成功')
})

db.on('error', (error) => {
  console.log('mongo db 连接失败:', error)
})
/*elasticClient.ping({
  requestTimeout: 1000
}, (err) => {
  if (err) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well')
  }
})*/

/*elasticClient.search({
  index: 'twitter',
  type: '_doc'
}).then(resp=>{
  console.log(resp.hits.hits)
}).catch(err=>{
  console.trace(err.message)
})
*/

/*elasticClient.mget({
  body: {
    docs: [
      {_index: 'twitter', _type: '_doc', _id: '2'},
      {_index: 'twitter', _type: '_doc', _id: '3'}
    ]
  }
}).then(resp => {
  console.log(resp.docs.map(doc => {return doc._source}))
}).catch(err => {
  console.log('err:', err)
})*/


function getMappingType(type) {
  // https://www.elastic.co/guide/en/elasticsearch/reference/6.2/mapping.html
  var types = ['text', 'keyword', 'date', 'long', 'double', 'boolean', 'ip']
  if (!~types.indexOf(type)) {
    throw new Error('类型' + type + '不存在哦...')
  }
  var obj = {
    type: type
  }
  if (type === 'text') {
    obj.analyzer = "ik_max_word"
    obj.search_analyzer = "ik_max_word"
  }

  return obj
}

function init_data() {
  const async = require('async')

  const CollTask = require('../mongo/models').CollTask
  /*require('../mongo/models').CollTask
  const CollTask = db.model('CollTask')*/

  const indexName = 'gisiclouds'
  const type = 'CollTask'
  async.auto({
    index_exists: function(done) {
      elasticClient.indices.exists({index: indexName}, function(err, resp) {
        done(err, resp)
      })
    },
    create_index: ['index_exists', function(done, result) {
      if (result.index_exists) {
        console.log('已经存在index喽')
        done(null)
      } else {
        console.log('新建index')
        elasticClient.indices.create({
          index: indexName,
          body: {
            mappings: {
              "CollTask": {
                properties: {
                  "task_name": getMappingType("text"),
                  "task_descrpt": getMappingType("text"),
                  "sub_task_num": getMappingType("long"),
                  "allday": getMappingType("boolean"),
                  "start": getMappingType("date"),
                  "end": getMappingType("date"),
                  "progress": getMappingType("long"),
                  "isfinished": getMappingType("boolean"),

                  "dof": getMappingType("date"),
                  "cp_name": getMappingType("text"),
                  "lock_remove": getMappingType("boolean"),
                  "need_accept": getMappingType("boolean"),
                  "did_accepted": getMappingType("boolean"),
                  "importance": getMappingType("text"),
                  "urgency": getMappingType("text"),
                  "score": getMappingType("long"),

                  "final_judgement": getMappingType("text"),
                  "filed": getMappingType("boolean"),
                  "order": getMappingType("long"),
                  "wh_open": getMappingType("boolean")
                }
              }
            }
          }
        }, done)
      }
    }],
    bulk: ['create_index', function(done, result) {
      async.waterfall([
        function(cb) {
          CollTask.count({}, cb)
        },
        function(total, cb) {
          const ROWS = 100
          var PAGE = Math.ceil(total / ROWS)
          async.timesSeries(PAGE, function(n, next) {
            var len = ROWS;
            if (PAGE - 1 === n) {
              len = total - (PAGE - 1) * ROWS
            }
            console.log((n + 1) + '/' + PAGE + '开始')
            CollTask.find().skip(n * ROWS).limit(len).exec(function(err, tasks) {
              if (err) {
                console.trace('err:', err)
              }
              var datas = []
              tasks.forEach((task, index) => {
                datas.push({ "create" : { "_index" : indexName, "_type" : type, "_id" : task._id } })
                var data = task.toJSON()
                delete data._id
                datas.push(data)
              })
              elasticClient.bulk({
                body: datas
              }, function(err, resp) {
                if (err) {
                  console.trace(err)
                } else {
                  console.log(resp)
                }
                console.log((n + 1) + '/' + PAGE + '结束')
                next(null)
              })
            })
          }, cb)
        }
      ], done)
    }]
  }, (err, results) => {
    if (err) {
      console.log('err:', err)
    } else {
      // console.log(results.create_index)
      console.log('done')
    }
  })

}

init_data()
