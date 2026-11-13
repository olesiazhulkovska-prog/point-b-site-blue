// @ts-nocheck
(function () {
  function fix() {
    document.querySelectorAll(".sv3-h3").forEach(function (h) {
      var w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT),
        n;
      while ((n = w.nextNode())) {
        if (n.nodeValue.indexOf(" — ") > -1)
          n.nodeValue = n.nodeValue.replace(/ — /g, " — ");
      }
    });
  }
  __pbxTick(fix);
})();
