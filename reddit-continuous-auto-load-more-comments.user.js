// ==UserScript==
// @name        reddit continuous auto load more comments
// @namespace   reddit
// @include     https://www.reddit.com/r/*/comments/*
// @include     https://old.reddit.com/r/*/comments/*
// @version     1.2
// @grant       none
// ==/UserScript==

(function(){
  var checkInterval = 1000; //in milliseconds. 1000ms = 1 second
  var linkCSS = '#auto-load-more-comments { background-color: lightblue; cursor: pointer; } #auto-load-more-comments.clicked { background-color: darkorange; cursor: not-allowed; }';

  var morechildrenOrg = window.morechildren;

  window.morechildren = function(ele) {
    ele.clicked = true;
    return morechildrenOrg.apply(this, arguments);
  };

  function process() {
    var eles = document.querySelectorAll(".morecomments > .button"), i, ele;
    for (i = 0, ele = eles[i]; i < eles.length; i++) {
      if (!ele.clicked) {
        ele.click();
      }
    }
    setTimeout(process, checkInterval);
  }

  var panel = document.querySelector("div.panestack-title span.title");
  panel.insertAdjacentHTML("afterend", '<style>' + linkCSS + '</style><a id="auto-load-more-comments" class="pretty-button">Auto load comments</a>');
  var link = document.getElementById("auto-load-more-comments");
  link.onclick = function(event) {
    if (link.classList.contains("clicked")) return false;
    link.classList.add("clicked");
    link.textContent = "Auto load comments ACTIVED";
    process();
    return false;
  };

})();
