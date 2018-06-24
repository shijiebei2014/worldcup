#!/usr/bin/env bash
#https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update.html
#curl -X POST "localhost:9200/twitter/_doc/1/_update" -H 'Content-Type: application/json' -d'
##{
#    "doc": {
#      "post_date" : "2019-11-15T14:12:12",
#      "message" : "trying out Elasticsearch2"
#    }
#}
#'

#curl -X POST "localhost:9200/twitter/_doc/1/_update" -H 'Content-Type: application/json' -d'
##{
#    "script" : "ctx._source.message = \u0027Elasticsearch\u0027"
#}
#'

#curl -X POST "localhost:9200/twitter/_doc/1/_update" -H 'Content-Type: application/json' -d'
##{
#    "script" : "ctx._source.remove(\u0027post_date\u0027)"
#}
#'

#curl -X POST "localhost:9200/twitter/_update_by_query?conflicts=proceed"

#curl -X POST "localhost:9200/twitter/_update_by_query?conflicts=proceed" -H 'Content-Type: application/json' -d'
##{
#  "query": {
#    "term": {
#      "user": "kimchy"
#    }
#  }
#}
#'

curl -X POST "localhost:9200/twitter/_update_by_query" -H 'Content-Type: application/json' -d'
{
  "script": "ctx._source.message = \u0027Elasticsearch\u0027",
  "query": {
    "term": {
      "user": "kimchy"
    }
  }
}
'
