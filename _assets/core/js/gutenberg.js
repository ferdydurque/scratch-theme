(function(window, document) {
  'use strict';

  // 2. THE JAVASCRIPT WAY
  // Construct the function
  function fixImgHeight() {

    // Get all images
    var images = document.querySelectorAll('img');

    // Get line-height
    var element = document.getElementsByTagName('body')[0];
    var style = window.getComputedStyle(element);
    var lineHeight = parseInt(style.getPropertyValue('line-height'));
    var i;
    var length = images.length;
    var imgOriginalHeight;
    var div;
    var imgNewHeight;

    // For each image in images get original height, calculate height rounded to baseline grid, set new height
    for (i = 0; i < length; ++i) {

      //Reset height first
      images[i].style.height = 'auto';

      // Get original height
      imgOriginalHeight = images[i].offsetHeight;

      // Calculate new height
      div = Math.floor(imgOriginalHeight / lineHeight);
      imgNewHeight = lineHeight * div;

      // Set new height
      images[i].style.height = imgNewHeight + 'px';
    }
  }

  //Fix once on first page load
  fixImgHeight();

  //Make sure that we fix images on each window resize (add debounce for performance)
  window.addEventListener('resize', debounce(fixImgHeight, 50), true);


  //helper: debounce
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

}(window, document));
