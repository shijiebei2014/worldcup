#!/usr/bin/env bash
#curl -X GET "localhost:9200/twitter/_doc/1?_source=user,message"
#_source是没有定义的时候可以project字段,store_fields是定义了严格的字段,可以project字段#
#curl -X GET "localhost:9200/twitter/_doc/1/_source"
#curl -X GET "localhost:9200/twitter/_doc/1?_source=false"


#curl -X GET "localhost:9200/twitter/_mget" -H 'Content-Type: application/json' -d'
##{
#    "docs" : [
#        {
#            "_type": "_doc",
#            "_id" : "1",
#            "_source": true
#        }
#    ]
#}
#'
#_index: twitter, _type: _doc
#curl -X GET "localhost:9200/twitter/_doc/_mget" -H 'Content-Type: application/json' -d'
##{
#    "docs" : [
#        {
#            "_id" : "1"
#        }
#    ]
#}
#'

curl -X GET "localhost:9200/twitter/_doc/_mget" -H 'Content-Type: application/json' -d'
{
   "ids" : ["1", "2", "3"]
}
'
