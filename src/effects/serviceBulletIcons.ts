// @ts-nocheck
(function () {
  var MAP = [
    ["layers", "zap", "cap"],
    ["chat", "user", "clock"],
    ["shield", "grid", "link"],
  ];
  function run() {
    document.querySelectorAll(".sv3-card").forEach(function (c, i) {
      var m = MAP[i % 3];
      c.querySelectorAll(".sv3-list li").forEach(function (li, j) {
        var v = m[j % 3];
        if (li.getAttribute("data-ic") !== v) li.setAttribute("data-ic", v);
      });
    });
  }
  __pbxTick(run);
})();
