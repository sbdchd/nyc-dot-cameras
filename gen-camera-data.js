#!/usr/bin/env node

/* global require console */

var jsdom = require("jsdom");

var URL = "http://dotsignals.org/multiview2.php";

jsdom.env(
    URL,
    function(err, window) {
        'use strict';
        var document = window.document;

        var manhattan = Array.from(document.querySelectorAll("tbody > tr > td > table#tableCam > tbody > tr#repCam__ctl0_trCam"));
        var bronx = Array.from(document.querySelectorAll("tbody > tr > td > table#tableCam1 > tbody > tr#repCam__ctl0_trCam"));
        var brooklyn = Array.from(document.querySelectorAll("tbody > tr > td > table#tableCam2 > tbody > tr#repCam__ctl0_trCam"));
        var queens = Array.from(document.querySelectorAll("tbody > tr > td > table#tableCam3 > tbody > tr#repCam__ctl0_trCam"));
        var statenIsland = Array.from(document.querySelectorAll("tbody > tr > td > table#tableCam4 > tbody > tr#repCam__ctl0_trCam"));

        var query = function(elements, area) {
            var result = {};
            elements.forEach(function(x) {
                var cameraRaw = x.querySelectorAll("tr > td > input")[0];
                if (!cameraRaw) {
                    // this will return when the camera is inactive
                    return;
                }
                var camera = cameraRaw.value;

                var locale = x.querySelectorAll("tr > td > span.OTopTitle")[0].innerText;

                result[camera] = {
                    locale: locale,
                    area: area
                };
            });
            return result;
        };

        var join = function(o1, o2) {
            for (var key in o2) {
                if (o2.hasOwnProperty(key)) {
                    o1[key] = o2[key];
                }
            }
            return o1;
        };

        var r1 = query(manhattan, "manhattan");
        var r2 = query(bronx, "bronx");
        var r3 = query(brooklyn, "brooklyn");
        var r4 = query(queens, "queens");
        var r5 = query(statenIsland, "statenIsland");

        var x = join(r1, r2);
        x = join(x, r3);
        x = join(x, r4);
        x = join(x, r5);

        console.log(JSON.stringify(x));
    }
);
