// @ts-nocheck
/* pb-cases: спільне сховище кейсів (/api/cases) + чесні повідомлення про збереження */
window.__pbCases = {
  pw: function () {
    try {
      return sessionStorage.getItem("pb_admin_pw") || "";
    } catch (e) {
      return "";
    }
  },
  post: function (b) {
    return fetch("/api/cases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(b),
    })
      .then(function (r) {
        return r
          .json()
          .catch(function () {
            return {};
          })
          .then(function (j) {
            return { status: r.status, j: j };
          });
      })
      .catch(function () {
        return { status: 0, j: {} };
      });
  },
  load: function () {
    return fetch("/api/cases", { cache: "no-store" })
      .then(function (r) {
        return r.json();
      })
      .catch(function () {
        return null;
      });
  },
  save: function (cases, industries) {
    return this.post({
      action: "save",
      password: this.pw(),
      cases: cases,
      industries: industries,
    }).then(function (R) {
      if (R.status === 200) return { ok: true, msg: "Опубліковано на сайті" };
      if (R.status === 401)
        return {
          ok: false,
          msg: "Сервер не прийняв пароль. Вийдіть з адмінки та увійдіть знову.",
        };
      if (R.status === 503)
        return {
          ok: false,
          msg: "Серверне сховище ще не налаштоване — зміни видно лише в цьому браузері.",
        };
      return {
        ok: false,
        msg: "Не вдалося зберегти на сервері — зміни видно лише в цьому браузері. Спробуйте ще раз.",
      };
    });
  },
  saveOne: function (c, fallback) {
    return this.post({
      action: "saveOne",
      password: this.pw(),
      slug: c.slug,
      case: c,
    }).then(function (R) {
      if (R.status === 200) return { ok: true, msg: "Опубліковано на сайті" };
      if ((R.status === 404 || R.status === 409) && fallback) return fallback();
      if (R.status === 401)
        return {
          ok: false,
          msg: "Сервер не прийняв пароль. Вийдіть з адмінки та увійдіть знову.",
        };
      if (R.status === 503)
        return {
          ok: false,
          msg: "Серверне сховище ще не налаштоване — зміни видно лише в цьому браузері.",
        };
      return {
        ok: false,
        msg: "Не вдалося зберегти на сервері — зміни видно лише в цьому браузері. Спробуйте ще раз.",
      };
    });
  },
  toast: function (R) {
    try {
      var t = document.createElement("div");
      t.textContent = R.msg;
      t.style.cssText =
        "position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:99999;padding:12px 18px;border-radius:14px;font:600 13px/1.3 system-ui,sans-serif;max-width:90vw;color:#fff;background:" +
        (R.ok ? "#0a7a4b" : "#b3261e") +
        ";box-shadow:0 10px 30px rgba(0,0,0,.35)";
      document.body.appendChild(t);
      setTimeout(
        function () {
          t.remove();
        },
        R.ok ? 2500 : 6000,
      );
    } catch (e) {}
  },
};
