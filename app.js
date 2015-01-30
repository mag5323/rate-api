var request = require('request')
var app = require('express')()
var currencies

request('http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm', function(err, res, body) {
  var datetimePosition = body.indexOf('date')
  var datetime = body.substr(datetimePosition + 5, 19)

  var url = 'http://rate.bot.com.tw/Pages/UIP003/Download.ashx?lang=zh-TW&fileType=1&date=' + datetime;
  request(url, function(err, res, body) {
    var result = body.split(',').map(function(column) {
      return column.trim()
    })

    currencies = result.slice(21, 419)
    currencies.unshift('USD')
  })
})

app.get('/:symbol', function(req, res) {
  var symbol = req.param('symbol')
  var countries = ['USD', 'HKD', 'GBP', 'AUD', 'CAD', 'SGD', 'CHF', 'JPY', 'ZAR', 'SEK', 'NZD', 'THB', 'PHP', 'IDR', 'EUR', 'KRW', 'VND', 'MYR', 'CNY'];
  var dis = currencies.length / countries.length
  var position = countries.indexOf(symbol) * dis

  var rate = {
    to: symbol,
    cash: {
      buy: currencies[position + 2],
      sell: currencies[position + 12]
    },
    spot: {
      buy: currencies[position + 3],
      sell: currencies[position + 13]
    }
  };
  res.json({rate: rate})
})

var port = process.env.PORT || 5000
app.listen(port)
