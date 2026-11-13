// @ts-nocheck
(function () {
  try {
    var K = "pointb_ref",
      m = /^[A-Za-z0-9_-]{2,40}$/;
    var q = new URLSearchParams(location.search),
      r = q.get("ref"),
      d = parseInt(q.get("disc"), 10);
    if (!(d > 0 && d <= 100)) d = 0;
    if (r && m.test(r)) {
      localStorage.setItem(K, JSON.stringify({ c: r, d: d, t: Date.now() }));
    }
    var o = JSON.parse(localStorage.getItem(K) || "null");
    if (o && o.c && m.test(o.c)) {
      window.__pbRef = o.c;
      window.__pbDisc = o.d || 0;
    } else if (o) {
      localStorage.removeItem(K);
    }
  } catch (e) {}
})();
