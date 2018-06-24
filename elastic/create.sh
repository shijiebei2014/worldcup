#!/usr/bin/env bash
#curl -X PUT "localhost:9200/twitter/_doc/1" -H 'Content-Type: application/json' -d'
##{
#    "user" : "kimchy",
#    "post_date" : "2009-11-15T14:12:12",
#    "message" : "trying out Elasticsearch"
#}
#'

curl -X POST "localhost:9200/_bulk" -H 'Content-Type: application/json' -d'
{ "create" : { "_index" : "twitter", "_type" : "_doc", "_id" : "2" } }
{ "user" : "close", "post_date": "2018-06-24T10:49:00", "message": "elastic" }
{ "create" : { "_index" : "twitter", "_type" : "_doc", "_id" : "3" } }
{ "user" : "Klose", "post_date": "2018-06-24T10:50:00", "message": "elastic2" }
'
