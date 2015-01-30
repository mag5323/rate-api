var request = require('request');
var app = require('express')();

request('http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm', function(err, res, body) {
  var datetimePosition = body.indexOf('date');
  var datetime = body.substr(datetimePosition + 5, 19);

  var url = 'http://rate.bot.com.tw/Pages/UIP003/Download.ashx?lang=zh-TW&fileType=1&date=' + datetime;
  request(url, function(err, res, body) {
    var result = body.split(',').map(function(column) {
      return column.trim();
    });

    var currencies = result.slice(21, 419);
    currencies.unshift('USD');

    app.get('/:symbol', function(req, res) {
      var rateModel = new RateModel(req.param('symbol'), currencies);
      res.json({ rate: rateModel.getJson() });
    })
  })
})

function RateModel(symbol, currencies) {
  this.currencies = currencies;
  this.symbol = symbol;
  this.countries = ['USD', 'HKD', 'GBP', 'AUD', 'CAD', 'SGD', 'CHF', 'JPY', 'ZAR', 'SEK', 'NZD', 'THB', 'PHP', 'IDR', 'EUR', 'KRW', 'VND', 'MYR', 'CNY'];
}

RateModel.prototype.getCountryIndex = function() {
  return countryIndex = this.countries.indexOf(this.symbol);
};

RateModel.prototype.getCurrencyIndex = function() {
  return currencyIndex = this.getCountryIndex() * this.currencies.length / this.countries.length;
};

RateModel.prototype.isInputAvailable = function() {
  return this.getCountryIndex() >= 0 ? true : false;
};

RateModel.prototype.getStates= function() {
  var states = {
    state: 'ok',
    msg: 'success'
  };

  if (!this.isInputAvailable()) {
    states.state = 'error';
    states.msg = this.symbol + ' is not an available currency.';
  }
  return states;
};

RateModel.prototype.getJson = function() {
  var i = this.getCurrencyIndex();
  var states = this.getStates();

  var result = {
    state: states.state,
    msg: states.msg,
    rate: {
      to: this.symbol,
      cash: {
        buy: this.currencies[i + 2],
        sell: this.currencies[i + 12]
      },
      spot: {
        buy: this.currencies[i + 3],
        sell: this.currencies[i + 13]
      }
    }
  }

  return result;
}

var port = process.env.PORT || 5000;
app.listen(port);
