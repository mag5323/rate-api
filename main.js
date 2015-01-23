window.onload = function() {
  var url = 'http://query.yahooapis.com/v1/public/yql?q=select * from html where url="rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm" and xpath="//a[contains(@id, \'DownloadCsv\')]"&format=json';

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
};
