'use strict';

var IMG_BLACKLIST = [0, 1, 6, 13, 17, 20, 23, 24, 28, 29, 30, 32, 34, 35, 36, 38, 39, 40, 42, 43, 46, 47, 48, 49, 51, 52, 53, 58, 59, 60, 62, 63, 66, 67, 68, 69, 70, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 84, 85, 86, 87, 88, 89, 91, 93, 94, 96, 97, 99, 100, 101, 102, 103, 104, 105, 107, 109, 110, 113, 117, 118, 119, 121, 123, 124, 125, 126, 131, 132, 133, 135, 136, 137, 138, 139, 140, 141, 142, 147, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 160, 163, 165, 167, 168, 169, 174, 175, 176, 177, 179, 180, 182, 183, 186, 188, 190, 192, 193, 195, 196, 197, 198, 199, 202, 204, 205, 206, 207, 208, 209, 210, 211, 214, 215, 216, 218, 219, 221, 222, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 248, 249, 250, 251, 252, 253, 255, 256, 257, 259, 260, 262, 264, 265, 266, 267, 268, 270, 271, 272, 273, 274, 275, 276, 277, 278, 280, 282, 283, 284, 285, 286, 287, 288, 289, 291, 292, 293, 295, 298, 300, 301, 306, 307, 308, 310, 311, 312, 313, 318, 319, 326, 331, 332, 334, 336, 337, 338, 343, 344, 345, 346, 354, 362, 370, 405, 411, 423, 426, 427, 433, 435, 442, 449, 451, 452, 454, 456, 460, 465, 477, 478, 479, 480, 481, 483, 487, 493, 494, 496, 497, 498, 499, 513, 518, 520, 522, 526, 527, 534, 542, 549, 567, 575, 576, 577, 578, 580, 586, 606, 607, 610, 629, 630, 634, 635, 636, 638, 639, 643, 645, 646, 647, 650, 652, 653, 654, 655, 656, 668, 670, 686, 690, 696, 697, 700, 701, 704, 711, 716, 721, 725, 735, 758, 759, 770, 776, 781, 783, 784, 792, 805, 806, 807, 808, 809, 818, 820, 845, 912, 950, 962, 963, 981, 994, 1003, 1016, 1022];

var in_view = function in_view(el) {
  var top = el.getBoundingClientRect().top;
  var bottom = el.getBoundingClientRect().bottom;
  return top >= 0 && bottom <= window.innerHeight;
};

document.addEventListener('DOMContentLoaded', function () {
  var MAX_NUMBER_OF_CAMERAS = 1022;
  var WAIT_TIME = 500;
  var BASE_URL = 'http://207.251.86.238/cctv';

  Array(MAX_NUMBER_OF_CAMERAS).fill(0).map(function (_, i) {
    return i;
  }).filter(function (x) {
    return !IMG_BLACKLIST.includes(x);
  }).forEach(function (i) {
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