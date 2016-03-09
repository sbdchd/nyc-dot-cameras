/* globals document */

var load = function(el) {
    'use strict';
    el.addEventListener("load", function() {
        el.src = el.src.split("?")[0] + "?" + new Date().getTime();
    });

};

var main = function() {
    'use strict';
    var imgs = document.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
        load(imgs[i]);
    }
};

document.addEventListener("DOMContentLoaded", function() {
    'use strict';
    main();
});
