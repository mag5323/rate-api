window.onload = function() {
  var url = 'http://query.yahooapis.com/v1/public/yql?q=select * from html where url=' +
            '"rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm" and xpath="//a[contains(@id, \'DownloadCsv\')]"&format=json';

  function ajax(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        callback.apply(xhr);
      }
    }
    xhr.send();
  }

  ajax(url, function() {
    var result = JSON.parse(this.responseText).query.results.a.href;
    var datePosition = result.indexOf('date');
    var time = result.substr(datePosition + 5, 19);
    var url = 'http://query.yahooapis.com/v1/public/yql?q=select * from html where url=' +
              '"rate.bot.com.tw/Pages/UIP003/Download.ashx%3Flang=zh-TW%26fileType=1%26date=' + time + '"&format=json';

    ajax(url, function() {
      var row = JSON.parse(this.responseText).query.results.body.p.split(",");
      row = row.map(function(column) {
        return column.trim();
      });

      var currencies = row.slice(21, 419);
      currencies.unshift('USD');

      var symbol = window.location.search.split("?").pop();
      var dis = currencies.length / 19;
      var countries = ['USD', 'HKD', 'GBP', 'AUD', 'CAD', 'SGD', 'CHF', 'JPY', 'ZAR', 'SEK', 'NZD', 'THB', 'PHP', 'IDR', 'EUR', 'KRW', 'VND', 'MYR', 'CNY'];
      var position = countries.indexOf(symbol) * dis;
    });
  });
};
