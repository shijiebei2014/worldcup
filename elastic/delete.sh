#!/usr/bin/env bash
#https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete.html
#curl -X DELETE "localhost:9200/twitter/_doc/1"


#curl -X POST "localhost:9200/twitter/_delete_by_query" -H 'Content-Type: application/json' -d'
##{
#  "query": {
#    "match": {
#      "message": "elasticsearch"
#    }
#  }
#}
#'

curl -X POST "localhost:9200/gisiclouds/CollTask/_delete_by_query?conflicts=proceed" -H 'Content-Type: application/json' -d'
{
  "query": {
    "match_all": {}
  }
}
'
