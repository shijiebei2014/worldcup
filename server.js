var express = require('express')

var router = require('./routers')
var app = express()

router(app)

app.listen(2018, function() {
  console.log('World cup server listening on port ' + 2018);
})
