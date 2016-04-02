"use strict";

/* globals window document */

var hashNum = function hashNum() {
    var max = 826;
    var z = window.location.hash.split("#");
    var n = z.length > 1 ? z[1] : max;

    n = parseInt(n, 10);
    if (!n) {
        return max;
    }
    return n;
};

var load = function load(n) {
    var URL = "http://207.251.86.238/cctv";
    for (var i = 0; i < n; i++) {
        var src = URL + i;
        var title = "Camera " + i;
        var img = "<img src='" + src + ".jpg'" + "title='" + title + "'>";
        document.getElementById("main").insertAdjacentHTML('beforeend', img);
    }
};

var addLoadListen = function addLoadListen(el) {
    el.addEventListener("load", function () {
        el.src = el.src.split("?")[0] + "?" + new Date().getTime();
    });
};

document.addEventListener("DOMContentLoaded", function () {
    var n = hashNum();
    load(n);

    var imgs = document.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
        addLoadListen(imgs[i]);
    }
});