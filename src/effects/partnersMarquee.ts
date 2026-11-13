// @ts-nocheck
(function () {
  var LOGOS = [
    [
      "nomi",
      "./assets/6236e8a91d.png",
      "https://nomi.tools/auth/signup/?c=lpylbkes",
    ],
    [
      "Holaris Marketing",
      "./assets/b527db1215.png",
      "https://marketing.holaris.group/?utm_source=pointb&utm_medium=partner&utm_campaign=site&utm_id=pointb",
    ],
    [
      "Ringostat",
      "./assets/4bd3fa3a6a.png",
      "https://ringostat.com/uk/?utm_campaign=partner&utm_medium=referral&utm_source=pointb&utm_term=partner-pointb-promocode",
    ],
    ["Svitli Digital Agency", "./assets/ea0b4890c9.png", ""],
    [
      "dntrade",
      "./assets/bc2d19c4fc.png",
      "https://dntrade.com.ua/?partner=X83R54FV",
    ],
    [
      "Dilovod",
      "./assets/deeccea7b8.png",
      "http://dilovod.ua/?utm_campaign=4410",
    ],
    ["Finmap", "./assets/finmap.svg", "https://an.finmap.online/s/bE4WJD"],
  ];
  function build() {
    var lab = [].slice
      .call(document.querySelectorAll("footer *"))
      .find(function (x) {
        return !x.children.length && /^Партнери$/i.test(x.textContent.trim());
      });
    if (!lab) return;
    var row = lab.parentElement.parentElement;
    if (row.querySelector(".pbx-marquee")) return;
    var box = row.children[1];
    if (!box || !box.querySelector("img")) return;
    var items = [].slice
      .call(box.children)
      .filter(function (n) {
        var im = n.querySelector("img");
        return !(im && im.alt === "Bimp");
      })
      .map(function (n) {
        return n.cloneNode(true);
      });
    LOGOS.forEach(function (l) {
      var s = document.createElement(l[2] ? "a" : "span");
      s.className = "pbx-logo";
      if (l[2]) {
        s.href = l[2];
        s.target = "_blank";
        s.rel = "noopener noreferrer sponsored";
        s.setAttribute("aria-label", l[0]);
      }
      var i = document.createElement("img");
      i.src = l[1];
      i.alt = l[0];
      i.loading = "eager";
      i.decoding = "sync";
      s.appendChild(i);
      items.push(s);
    });
    var mq = document.createElement("div");
    mq.className = "pbx-marquee";
    var tr = document.createElement("div");
    tr.className = "pbx-track";
    for (var k = 0; k < 6; k++) {
      var g = document.createElement("div");
      g.className = "pbx-group";
      if (k) g.setAttribute("aria-hidden", "true");
      items.forEach(function (n) {
        g.appendChild(n.cloneNode(true));
      });
      tr.appendChild(g);
    }
    mq.appendChild(tr);
    box.style.display = "none";
    row.appendChild(mq);
    (function () {
      var imgs = [].slice.call(tr.querySelectorAll("img")),
        left = imgs.length;
      function done() {
        if (--left > 0) return;
        tr.style.animation = "none";
        void tr.offsetWidth;
        tr.style.animation = "";
      }
      imgs.forEach(function (im) {
        if (im.complete && im.naturalWidth) {
          done();
        } else {
          im.addEventListener("load", done, { once: true });
          im.addEventListener("error", done, { once: true });
        }
      });
    })();
  }
  __pbxTick(build);
})();
