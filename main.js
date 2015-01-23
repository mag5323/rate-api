window.onload = function() {
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
