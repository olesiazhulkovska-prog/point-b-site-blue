// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { C_ig } from '../shared/C_ig';
import { C_cg } from '../shared/C_cg';
import { C_og } from '../shared/C_og';
import { C_ii } from '../shared/C_ii';
import { Ir } from '../shared/Ir';

export const Zp = {
  crm: {
    svc: "#F98513",
    tint: "#FFFFFF",
    deep: "#111144"
  },
  bots: {
    svc: "#F98513",
    tint: "#FFFFFF",
    deep: "#111144"
  },
  analytics: {
    svc: "#F98513",
    tint: "#FFFFFF",
    deep: "#111144"
  }
};

export const Sc = n => {
  var s, o, i;
  return {
    "--svc": (s = Zp[n]) == null ? undefined : s.svc,
    "--svc-tint": (o = Zp[n]) == null ? undefined : o.tint,
    "--svc-deep": (i = Zp[n]) == null ? undefined : i.deep
  };
};

export const Uc = "#111144";

export const bm = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--focus)]";

export const Uq = n => {
  const [s, o] = React.useState(() => typeof window < "u" && window.matchMedia(n).matches);
  return React.useEffect(() => {
    const i = window.matchMedia(n),
      d = () => o(i.matches);
    return d(), i.addEventListener("change", d), () => i.removeEventListener("change", d);
  }, [n]), s;
};

export const J1 = ({
  service: n,
  openLeadModal: s,
  className: o = "",
  ghost: i = false
}) => {
  const d = `group mt-4 flex h-[52px] w-full items-center justify-center gap-2 rounded-full px-5 text-center font-manrope text-[15px] font-bold leading-tight ${bm}`,
    x = {
      background: "var(--svc)",
      color: Uc
    };
  return <div className={`${i ? "" : "svc-open"} ${o}`} style={Sc(n.id)}><p className="max-w-2xl font-manrope text-base font-medium leading-relaxed text-[color:var(--ink)]">{n.description}</p>{i ? <div className={d} style={x}><span>{n.ctaText}</span></div> : <button type="button" id={`svc-cta-${n.number}`} data-cursor-label="Обговорити →" onClick={() => s(n.leadSource)} className={`${d} cursor-pointer`} style={x}><span>{n.ctaText}</span><ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" /></button>}</div>;
};

export const Sv3 = ({
  services: n,
  openLeadModal: lead
}) => {
  const m = Uq("(max-width: 1099px)"),
    root = React.useRef(null),
    E = React.createElement,
    DG = [C_ig, C_cg, C_og];
  React.useEffect(() => {
    const r = root.current;
    if (!r) return;
    const fit = () => {
      const st = window.matchMedia("(min-width: 1100px)").matches;
      r.querySelectorAll("[data-sv3-diag]").forEach(c => {
        const i = c.firstElementChild;
        if (!i) return;
        if (!st) {
          i.style.cssText = "";
          return;
        }
        const W = c.clientWidth,
          H = c.clientHeight;
        i.style.cssText = "position:absolute;left:0;top:0;transform-origin:top left;width:" + W + "px;height:auto;transform:none";
        const h = i.offsetHeight;
        if (!h) return;
        const k = Math.min(1, H / h),
          w2 = W / k;
        i.style.width = (k < 1 ? w2 : W) + "px";
        i.style.transform = "scale(" + k + ")";
        const hh = h * k;
        i.style.top = hh < H ? (H - hh) / 2 + "px" : "0px";
      });
    };
    fit();
    const t1 = setTimeout(fit, 400),
      t2 = setTimeout(fit, 1500);
    window.addEventListener("resize", fit);
    document.fonts && document.fonts.ready && document.fonts.ready.then(fit);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", fit);
    };
  }, [m]);
  React.useEffect(() => {
    const r = root.current;
    if (!r) return;
    const cs = [...r.querySelectorAll(".sv3-card")];
    let io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(es => es.forEach(e => {
        e.isIntersecting && (e.target.dataset.on = "true");
      }), {
        threshold: 0.2
      });
      cs.forEach(c => io.observe(c));
    } else cs.forEach(c => c.dataset.on = "true");
    let q = 0;
    const run = () => {
        q = 0;
        const st = window.matchMedia("(min-width: 1100px) and (min-height: 760px)").matches;
        cs.forEach((c, i) => {
          if (!st || i === cs.length - 1) {
            c.style.setProperty("--cov", "0");
            return;
          }
          const a = c.getBoundingClientRect(),
            b = cs[i + 1].getBoundingClientRect(),
            v = Math.min(1, Math.max(0, 1 - (b.top - a.top - 16) / Math.max(1, a.height)));
          c.style.setProperty("--cov", v.toFixed(3));
        });
      },
      on = () => {
        q || (q = requestAnimationFrame(run));
      };
    run();
    window.addEventListener("scroll", on, {
      passive: true
    });
    window.addEventListener("resize", on);
    return () => {
      io && io.disconnect();
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      q && cancelAnimationFrame(q);
    };
  }, [m]);
  return E("div", {
    className: "sv3",
    ref: root
  }, E("div", {
    className: "sv3-stack"
  }, n.map((s, k) => E("article", {
    key: s.id,
    className: "sv3-card",
    "data-n": k,
    "data-on": "false",
    "aria-label": s.title,
    style: {
      "--i": k
    }
  }, E("div", {
    className: "sv3-copy"
  }, E("span", {
    className: "sv3-num"
  }, s.number), E("h3", {
    className: "sv3-h3"
  }, E(C_ii, {
    text: s.title
  })), E("p", {
    className: "sv3-desc"
  }, s.description), E("ul", {
    className: "sv3-list"
  }, s.bullets.map((t, i) => E("li", {
    key: i
  }, t))), E("button", {
    type: "button",
    "data-cursor-label": "Обговорити →",
    onClick: () => lead(s.leadSource),
    className: "sv3-cta"
  }, E("span", null, s.ctaText), E(ArrowRight, {
    className: "sv3-arr",
    "aria-hidden": "true"
  }))), E("div", {
    className: "sv3-viz svc-viz"
  }, E("div", {
    "data-sv3-diag": "",
    className: "sv3-dg"
  }, E("div", {
    className: "sv3-dgi"
  }, E(DG[k]))))))));
};

export const ServicesList = ({
  services: n,
  openLeadModal: s
}) => {
  const o = Uq("(max-width: 767px)"),
    [i, d] = React.useState(0),
    x = React.useRef([]),
    p = React.useRef(null),
    f = React.useCallback(() => {
      const A = p.current;
      if (!A) return;
      const U = 0.86,
        v = Array.from(A.querySelectorAll("[data-svc-diag]")),
        w = R => {
          const H = R.firstElementChild;
          if (!H) return 0;
          const F = R.clientWidth,
            C = R.clientHeight;
          H.style.width = `${F}px`, H.style.height = "auto", H.style.transform = "none", H.style.top = "0px";
          const ee = H.offsetHeight;
          if (!ee) return 0;
          const B = Math.max(U, Math.min(1, C / ee)),
            D = ee * B;
          return H.style.transform = `scale(${B})`, H.style.top = D < C ? `${(C - D) / 2}px` : "0px", Math.max(0, D - C);
        };
      A.style.setProperty("--svc-extra", "0px");
      let k = 0;
      v.forEach(R => {
        k = Math.max(k, w(R));
      }), A.style.setProperty("--svc-extra", `${Math.ceil(k)}px`), k > 0 && v.forEach(R => w(R));
    }, []);
  React.useLayoutEffect(() => {
    var v, w;
    f();
    const A = window.setTimeout(f, 400),
      U = window.setTimeout(f, 1500);
    return window.addEventListener("resize", f), (w = (v = document.fonts) == null ? undefined : v.ready) == null || w.then(f), () => {
      window.clearTimeout(A), window.clearTimeout(U), window.removeEventListener("resize", f);
    };
  }, [f, o]);
  const b = [<C_ig key={"diag-0"} />, <C_cg key={"diag-1"} />, <C_og key={"diag-2"} />],
    y = A => {
      var w;
      const U = n.length;
      let v = -1;
      A.key === "ArrowDown" || A.key === "ArrowRight" ? v = (i + 1) % U : A.key === "ArrowUp" || A.key === "ArrowLeft" ? v = (i - 1 + U) % U : A.key === "Home" ? v = 0 : A.key === "End" && (v = U - 1), !(v < 0) && (A.preventDefault(), d(v), (w = x.current[v]) == null || w.focus());
    },
    j = (A, U) => <div {...U ? {
      role: "tablist",
      "aria-orientation": "vertical",
      "aria-label": "Послуги",
      onKeyDown: y
    } : {}} className="flex flex-col">{n.map((v, w) => {
        const k = w === A;
        return <div key={v.id} role={U ? "presentation" : undefined} style={{
          ...Sc(v.id),
          background: k ? "#FFFFFF" : "transparent",
          boxShadow: k ? "inset 0 0 0 1px #111144" : "inset 0 0 0 1px transparent"
        }} className="my-1 rounded-2xl"><button {...U ? {
            ref: R => {
              x.current[w] = R;
            },
            role: "tab",
            id: `svc-tab-${v.id}`,
            "aria-selected": k,
            "aria-controls": `svc-panel-${v.id}`,
            tabIndex: k ? 0 : -1,
            onClick: () => d(w)
          } : {
            tabIndex: -1
          }} type="button" className={`relative block w-full cursor-pointer rounded-2xl py-4 pl-4 pr-4 text-left font-manrope ${bm}`}><span className={`block text-[20px] font-bold leading-tight xl:text-[24px] ${k ? "text-[color:var(--ink)]" : "text-[color:var(--ink-soft)]"}`}><span className="mr-2">{v.number}</span><C_ii text={v.title} /></span></button>{k && <J1 service={v} openLeadModal={s} ghost={!U} className="px-5 pb-5 pl-4 pt-1" />}</div>;
      })}</div>,
    h = <p className="mt-3 max-w-2xl font-manrope text-base font-normal leading-relaxed text-[color:var(--ink)] sm:mt-5 lg:text-lg">Від першого контакту з клієнтом до керованих продажів і аналітики.</p>;
  return <section ref={p} id="services-section" className="relative mx-auto max-w-[1680px] px-5 py-20 sm:px-6 sm:py-28 lg:px-12 lg:py-36 xl:px-16"><div className="pb-rv mb-8 max-w-4xl sm:mb-12"><div className="mb-3 flex items-center gap-2 font-mono text-[14px] font-normal uppercase tracking-wider text-[color:var(--accent-green)] sm:mb-4"><span>Послуги</span></div><h2 id="services-main-heading" className="pb-h2 font-namu text-2xl font-extrabold uppercase leading-[1.08] text-[color:var(--ink)] sm:text-4xl sm:tracking-tight lg:text-5xl"><Ir>Три напрямки<br />цифрової трансформації</Ir></h2>{h}</div><Sv3 services={n} openLeadModal={s} /></section>;
};

