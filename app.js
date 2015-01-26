var request = require('request')

request('http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm', function(err, res, body) {
  var datetimePosition = body.indexOf('date')
  var datetime = body.substr(datetimePosition + 5, 19)
})
