"use strict";

/* global document console */

// Note: this is intended to be run via the console at `http://dotsignals.org/multiview2.php`
// to generate camera data

var manhattan = Array.from(document.querySelectorAll("tbody > tr > td > table#tableCam > tbody > tr#repCam__ctl0_trCam"));
var bronx = Array.from(document.querySelectorAll("tbody > tr > td > table#tableCam1 > tbody > tr#repCam__ctl0_trCam"));
var brooklyn = Array.from(document.querySelectorAll("tbody > tr > td > table#tableCam2 > tbody > tr#repCam__ctl0_trCam"));
var queens = Array.from(document.querySelectorAll("tbody > tr > td > table#tableCam3 > tbody > tr#repCam__ctl0_trCam"));
var statenIsland = Array.from(document.querySelectorAll("tbody > tr > td > table#tableCam4 > tbody > tr#repCam__ctl0_trCam"));

var query = function query(elements, area) {
    var result = {};
    elements.forEach(function (x) {
        var cameraRaw = x.querySelectorAll("tr > td > input")[0];
        if (!cameraRaw) {
            // this will return when the camera is inactive
            return;
        }

        // get local e.g. queens
        var locale = x.querySelectorAll("tr > td > span")[0].innerText;
        if (!locale) {
            locale = "unknown";
        }

        var camera = cameraRaw.value;
        result[camera] = {
            "locale": locale,
            "area": area
        };
    });
    return result;
};

var join = function join() {
    var obj = {};
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        for (var key in arg) {
            if (arg.hasOwnProperty(key)) {
                obj[key] = arg[key];
            }
        }
    }
    return obj;
};

var r1 = query(manhattan, "manhattan");
var r2 = query(bronx, "bronx");
var r3 = query(brooklyn, "brooklyn");
var r4 = query(queens, "queens");
var r5 = query(statenIsland, "statenIsland");

var x = join(r1, r2, r3, r4, r5);

console.log(JSON.stringify(x));