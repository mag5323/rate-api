var request = require('request')

request('http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm', function(err, res, body) {
  var datetimePosition = body.indexOf('date')
  var datetime = body.substr(datetimePosition + 5, 19)

  var url = 'http://rate.bot.com.tw/Pages/UIP003/Download.ashx?lang=zh-TW&fileType=1&date=' + datetime;
  request(url, function(err, res, body) {
    var result = body.split(',').map(function(column) {
      return column.trim()
    })

    var currencies = result.slice(21, 419)
    currencies.unshift('USD')
  })
})
