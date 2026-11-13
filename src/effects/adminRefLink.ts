// @ts-nocheck
(function () {
  function add() {
    var out = document.getElementById("admin-logout-btn");
    if (!out || document.getElementById("pb-ref-link")) return;
    var box = out.parentElement;
    if (!box) return;
    var ref = box.firstElementChild;
    var a = document.createElement("a");
    a.id = "pb-ref-link";
    a.href = "/ref";
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Реферальні посилання ↗";
    a.setAttribute(
      "style",
      "display:inline-flex;align-items:center;padding:10px 16px;border-radius:999px;border:1px solid rgba(255,255,255,.25);color:#fff;font-size:14px;text-decoration:none;white-space:nowrap;margin-right:8px",
    );
    box.insertBefore(a, ref);
  }
  new MutationObserver(add).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  add();
})();
