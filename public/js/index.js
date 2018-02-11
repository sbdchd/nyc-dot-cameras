'use strict';

var in_view = function in_view(el) {
  var top = el.getBoundingClientRect().top;
  var bottom = el.getBoundingClientRect().bottom;
  return top >= 0 && bottom <= window.innerHeight;
};

document.addEventListener('DOMContentLoaded', function () {
  var MAX_NUMBER_OF_CAMERAS = 826;
  var WAIT_TIME = 500;
  var BASE_URL = 'http://207.251.86.238/cctv';

  Array(MAX_NUMBER_OF_CAMERAS).fill(0).forEach(function (_, i) {
    var img = document.createElement('img');
    img.src = '' + BASE_URL + i + '.jpg';
    img.title = 'Camera ' + i;
    document.querySelector('body').insertAdjacentElement('beforeend', img);
  });

  document.querySelectorAll('img').forEach(function (el) {
    el.addEventListener('load', function () {
      var lastFetched = new Date();

      var refetch = function refetch() {
        var currentTime = new Date();
        var notRecentlyFetched = currentTime - lastFetched > WAIT_TIME;

        var imageLoaded = el.complete;
        if (!document.hidden && notRecentlyFetched && in_view(el) && imageLoaded) {
          lastFetched = currentTime;
          el.src = el.src.split('?')[0] + '?' + new Date().getTime();
        }
        setTimeout(refetch, WAIT_TIME);
      };

      setTimeout(refetch, WAIT_TIME);
    }, { once: true });
  });
});