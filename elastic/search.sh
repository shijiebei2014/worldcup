#!/usr/bin/env bash
curl -X POST "localhost:9200/gisiclouds/CollTask/_count" -H 'Content-Type: application/json' -d'
{
  "query" : {
      "match_all" : {}
  }
}
'
