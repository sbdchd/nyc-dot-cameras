/* globals window document */

var hashNum = function() {
    'use strict';
    var max = 826;
    var z = window.location.hash.split("#");
    var n = z.length > 1 ? z[1] : max;

    n = parseInt(n, 10);
    if (!n) {
        return max;
    }
    return n;
};

var load = function(n) {
    'use strict';
    var URL = "http://207.251.86.238/cctv";
    for (var i = 0; i < n; i++) {
        var img = "<img src='" + URL + i + ".jpg'>";
        document.getElementById("main").insertAdjacentHTML('beforeend', img);
    }
};

var addLoadListen = function(el) {
    'use strict';
    el.addEventListener("load", function() {
        el.src = el.src.split("?")[0] + "?" + new Date().getTime();
    });
};

document.addEventListener("DOMContentLoaded", function() {
    'use strict';
    var n = hashNum();
    load(n);

    var imgs = document.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
        addLoadListen(imgs[i]);
    }
});
