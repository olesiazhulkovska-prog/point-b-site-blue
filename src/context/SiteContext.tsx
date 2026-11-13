// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import React from 'react';
import { X } from 'lucide-react';
import { Bt, Pr, eb } from '../data/data';
import { $A, gv, yp } from '../utils/utm';
import { E1 } from '../shared/E1';

export const Ct = n => n && n.replace(/\bKeyCRM\b/g, "keyCRM").replace(/\bКЕЙ СРМ\b/g, "кей СРМ").replace(/\bКейCRM\b/g, "кейCRM").replace(/\bКЕЙCRM\b/g, "кейCRM").replace(/\bКей СРМ\b/g, "кей СРМ").replace(/\bKey CRM\b/gi, "key CRM");

export const Eo = n => ({
  ...n,
  companyName: Ct(n.companyName || ""),
  heroSphereTag: Ct(n.heroSphereTag || ""),
  companyDescription: Ct(n.companyDescription || ""),
  shortResultCaption: Ct(n.shortResultCaption || ""),
  resultIntro: Ct(n.resultIntro || ""),
  clientRequestItems: (n.clientRequestItems || []).map(Ct),
  situationBeforeItems: (n.situationBeforeItems || []).map(Ct),
  whatWeDidSteps: (n.whatWeDidSteps || []).map(s => ({
    ...s,
    title: Ct(s.title || ""),
    description: Ct(s.description || "")
  })),
  resultItems: (n.resultItems || []).map(Ct),
  businessValues: (n.businessValues || []).map(Ct),
  integratedSystems: (n.integratedSystems || []).map(Ct),
  clientQuote: n.clientQuote ? {
    ...n.clientQuote,
    text: Ct(n.clientQuote.text || ""),
    author: Ct(n.clientQuote.author || ""),
    role: Ct(n.clientQuote.role || "")
  } : n.clientQuote
});

export const SiteProvider = ({
  children: n
}) => {
  const [s, o] = React.useState(() => {
      try {
        let S = location.hash.replace(/^#\/?/, "").replace(/^\//, "");
        S.endsWith(".html") && (S = S.replace(".html", ""));
        if (!S || S === "index") return "index";
        if (S === "case-template") return "cases";
        if (S.startsWith("case-") || S.startsWith("case/")) return "case-detail";
        if (["about", "keycrm", "ai-bots", "analytics", "cases", "contact", "privacy", "thank-you", "admin"].includes(S)) return S;
      } catch {}
      return "index";
    }),
    [i, d] = React.useState(() => {
      try {
        let S = location.hash.replace(/^#\/?/, "").replace(/^\//, "");
        S.endsWith(".html") && (S = S.replace(".html", ""));
        if (S.startsWith("case/")) return S.replace("case/", "");
        if (S.startsWith("case-") && S !== "case-template") return S;
      } catch {}
    }),
    [x, p] = React.useState(() => {
      try {
        const E = localStorage.getItem(Bt.CASES) || localStorage.getItem("pointb_cases_v5") || localStorage.getItem("pointb_cases_v4") || localStorage.getItem("pointb_cases_v3");
        if (E) {
          const S = JSON.parse(E);
          if (Array.isArray(S) && S.length > 0) return [...S.map(O => {
            const I = yp.find(X => X.slug === O.slug);
            return I != null && I.coverImageUrl && (!O.coverImageUrl || /unsplash\.com|cloudinary\.com/.test(O.coverImageUrl)) && (O.slug === "case-ukrainian-solar" || O.slug === "case-milo" || O.slug === "case-brendy" || O.slug === "case-kms") ? Eo({
              ...O,
              coverImageUrl: I.coverImageUrl
            }) : Eo(O);
          }), ...yp.filter(X => !S.some(O => O.slug === X.slug)).map(Eo)];
        }
      } catch {}
      return yp.map(Eo);
    }),
    [f, b] = React.useState(() => {
      try {
        const E = localStorage.getItem(Bt.INDUSTRIES);
        if (E) return JSON.parse(E);
      } catch {}
      return $A;
    }),
    [y, j] = React.useState(() => {
      try {
        const E = localStorage.getItem(Bt.SCREENSHOTS);
        if (E) return JSON.parse(E);
      } catch {}
      return eb;
    }),
    [h, A] = React.useState(() => {
      try {
        const E = localStorage.getItem(Bt.CONTACT);
        if (E) {
          const S = JSON.parse(E);
          if (!(S.companyLegalName === "ТОВ «ПОІНТ БІ ГРУП»" || S.edrpou === "44589214" || Array.isArray(S.requisites) && S.requisites.some(I => I.value === "ТОВ «ПОІНТ БІ ГРУП»" || I.value === "44589214"))) {
            const I = Array.isArray(S.channels) && S.channels.length > 0 ? S.channels : [...(S.phone ? [{
                id: "ch-phone-1",
                type: "phone",
                label: "Номер телефону",
                value: S.phone
              }] : []), ...(S.email ? [{
                id: "ch-email-1",
                type: "email",
                label: "Email",
                value: S.email
              }] : []), ...(S.telegram ? [{
                id: "ch-telegram-1",
                type: "telegram",
                label: "Telegram контакт / бот",
                value: S.telegram
              }] : []), ...(S.workingHours ? [{
                id: "ch-hours-1",
                type: "hours",
                label: "Графік роботи",
                value: S.workingHours
              }] : [])],
              X = Array.isArray(S.requisites) && S.requisites.length > 0 ? S.requisites : [...(S.companyLegalName ? [{
                id: "req-name",
                label: "Юридична назва",
                value: S.companyLegalName
              }] : []), ...(S.edrpou ? [{
                id: "req-edrpou",
                label: "Код ЄДРПОУ",
                value: S.edrpou
              }] : []), ...(S.address ? [{
                id: "req-address",
                label: "Юридична адреса",
                value: S.address
              }] : [])];
            return {
              ...Pr,
              ...S,
              channels: I.length > 0 ? I : Pr.channels,
              requisites: X.length > 0 ? X : Pr.requisites
            };
          }
        }
      } catch {}
      return Pr;
    }),
    [U, v] = React.useState(() => {
      try {
        const E = localStorage.getItem(Bt.SUBMISSIONS);
        if (E) return JSON.parse(E);
      } catch {}
      return [];
    }),
    [w, k] = React.useState(false),
    [R, H] = React.useState("Впровадження keyCRM");
  React.useEffect(() => {
    window.__pbCases.load().then(E => {
      E && Array.isArray(E.cases) && E.cases.length > 0 && (p(E.cases.map(Eo)), Array.isArray(E.industries) && E.industries.length > 0 && b(E.industries));
    });
  }, []), React.useEffect(() => {
    try {
      localStorage.setItem(Bt.CASES, JSON.stringify(x));
    } catch (E) {
      console.error(E);
    }
  }, [x]), React.useEffect(() => {
    try {
      localStorage.setItem(Bt.INDUSTRIES, JSON.stringify(f));
    } catch (E) {
      console.error(E);
    }
  }, [f]), React.useEffect(() => {
    try {
      localStorage.setItem(Bt.SCREENSHOTS, JSON.stringify(y));
    } catch (E) {
      console.error(E);
    }
  }, [y]), React.useEffect(() => {
    try {
      localStorage.setItem(Bt.CONTACT, JSON.stringify(h));
    } catch (E) {
      console.error(E);
    }
  }, [h]), React.useEffect(() => {
    try {
      localStorage.setItem(Bt.SUBMISSIONS, JSON.stringify(U));
    } catch (E) {
      console.error(E);
    }
  }, [U]);
  const F = E => {
      let S = E.replace(/^#\/?/, "").replace(/^\//, "");
      if (!S || S === "index" || S === "index.html") return {
        page: "index",
        slug: undefined
      };
      if (S.endsWith(".html") && (S = S.replace(".html", "")), S === "case-template") return {
        page: "cases",
        slug: undefined
      };
      if (S.startsWith("case-") && S !== "case-template") return {
        page: "case-detail",
        slug: S
      };
      if (S.startsWith("case/")) return {
        page: "case-detail",
        slug: S.replace("case/", "")
      };
      if (["about", "keycrm", "ai-bots", "analytics", "cases", "contact", "privacy", "thank-you", "admin"].includes(S)) return {
        page: S,
        slug: undefined
      };
      const O = x.find(I => I.slug === S || I.id === S);
      return O ? {
        page: "case-detail",
        slug: O.slug
      } : {
        page: "404",
        slug: S
      };
    },
    C = E => {
      const {
        page: S,
        slug: O
      } = F(E);
      o(S), d(O), S === s && O === i && window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      try {
        window.history.pushState({}, "", `#/${E.replace(/^\//, "")}`);
      } catch {}
    };
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [s, i]), React.useEffect(() => {
    const E = () => {
      const S = window.location.hash,
        {
          page: O,
          slug: I
        } = F(S);
      o(O), d(I);
    };
    return window.location.hash && E(), window.addEventListener("hashchange", E), window.addEventListener("popstate", E), () => {
      window.removeEventListener("hashchange", E), window.removeEventListener("popstate", E);
    };
  }, [x]);
  const ee = (E = "Впровадження keyCRM") => {
      H(E), k(true);
    },
    B = () => {
      k(false);
    },
    D = E => {
      const S = Eo(E),
        ex = x.find(X => X.id === S.id || X.slug === S.slug),
        nx = ex ? x.map(X => X.id === S.id || X.slug === S.slug ? S : X) : [S, ...x];
      p(nx);
      let ni = f,
        nw = false;
      if (S.dataIndustry && !f.some(X => X.id === S.dataIndustry)) {
        ni = [...f, {
          id: S.dataIndustry,
          label: S.industryTag.split("·")[0].trim() || S.dataIndustry
        }];
        b(ni);
        nw = true;
      }
      return ex && ex.slug === S.slug && !nw ? window.__pbCases.saveOne(S, () => window.__pbCases.save(nx, ni)) : window.__pbCases.save(nx, ni);
    },
    L = E => {
      const nx = x.filter(S => S.id !== E && S.slug !== E);
      p(nx), window.__pbCases.save(nx, f).then(window.__pbCases.toast);
    },
    $ = E => {
      const nx = x.map(O => O.id === E ? {
        ...O,
        showOnHome: !O.showOnHome
      } : O);
      p(nx), window.__pbCases.save(nx, f).then(window.__pbCases.toast);
    },
    pbMv = (E, d) => {
      const i = x.findIndex(O => O.id === E),
        j = i + d;
      if (i < 0 || j < 0 || j >= x.length) return;
      const nx = [...x];
      [nx[i], nx[j]] = [nx[j], nx[i]];
      const nn = nx.map((O, k) => ({
        ...O,
        orderPriority: k + 1
      }));
      p(nn), window.__pbCases.save(nn, f).then(window.__pbCases.toast);
    },
    te = (E, S) => {
      let O = S != null && S.trim() ? S.trim().toLowerCase().replace(/[^a-z0-9_-]/gi, "") : "";
      if (!O) {
        const I = {
          а: "a",
          б: "b",
          в: "v",
          г: "h",
          ґ: "g",
          д: "d",
          е: "e",
          є: "ye",
          ж: "zh",
          з: "z",
          и: "y",
          і: "i",
          ї: "yi",
          й: "y",
          к: "k",
          л: "l",
          м: "m",
          н: "n",
          о: "o",
          п: "p",
          р: "r",
          с: "s",
          т: "t",
          у: "u",
          ф: "f",
          х: "kh",
          ц: "ts",
          ч: "ch",
          ш: "sh",
          щ: "shch",
          ь: "",
          ю: "yu",
          я: "ya"
        };
        O = E.toLowerCase().split("").map(Z => I[Z] !== undefined ? I[Z] : Z).join("").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "") || "tax-" + Date.now();
      }
      b(I => I.some(X => X.id === O) ? I : [...I, {
        id: O,
        label: E
      }]);
    },
    ae = E => {
      E !== "all" && b(S => S.filter(O => O.id !== E));
    },
    re = (E, S, O) => {
      j(I => I.map(X => X.id === E ? {
        ...X,
        imageUrl: S,
        ...(O ? {
          caption: O
        } : {})
      } : X));
    },
    me = (E, S) => {
      var de, lt, Me, _t, bt, Ee, Ce, Rt, Ca, $t;
      const O = ((de = E.find($e => $e.type === "phone" || /телефон|phone/i.test($e.label))) == null ? undefined : de.value) || "",
        I = ((lt = E.find($e => $e.type === "email" || /email|пошта/i.test($e.label))) == null ? undefined : lt.value) || "",
        X = ((Me = E.find($e => $e.type === "telegram" || /telegram|тг/i.test($e.label))) == null ? undefined : Me.value) || "",
        Z = ((_t = E.find($e => $e.type === "hours" || /графік|годин/i.test($e.label))) == null ? undefined : _t.value) || "",
        oe = ((bt = S.find($e => /назва|компанія/i.test($e.label))) == null ? undefined : bt.value) || ((Ee = S[0]) == null ? undefined : Ee.value) || "",
        be = ((Ce = S.find($e => /єдрпоу|код/i.test($e.label))) == null ? undefined : Ce.value) || ((Rt = S[1]) == null ? undefined : Rt.value) || "",
        ue = ((Ca = S.find($e => /адрес/i.test($e.label))) == null ? undefined : Ca.value) || (($t = S[2]) == null ? undefined : $t.value) || "";
      return {
        phone: O,
        email: I,
        telegram: X,
        workingHours: Z,
        companyLegalName: oe,
        edrpou: be,
        address: ue
      };
    },
    Ne = E => {
      A(S => {
        const O = {
            ...S,
            ...E
          },
          I = me(O.channels || [], O.requisites || []);
        return {
          ...O,
          ...I
        };
      });
    },
    ge = (E = "Новий контакт", S = "", O = "custom") => {
      A(I => {
        const X = {
            id: "ch-" + Date.now(),
            type: O,
            label: E,
            value: S
          },
          Z = [...I.channels, X],
          oe = me(Z, I.requisites);
        return {
          ...I,
          ...oe,
          channels: Z
        };
      });
    },
    _ = E => {
      A(S => {
        const O = S.channels.filter(X => X.id !== E),
          I = me(O, S.requisites);
        return {
          ...S,
          ...I,
          channels: O
        };
      });
    },
    se = (E, S) => {
      A(O => {
        const I = O.channels.map(Z => Z.id === E ? {
            ...Z,
            ...S
          } : Z),
          X = me(I, O.requisites);
        return {
          ...O,
          ...X,
          channels: I
        };
      });
    },
    ne = (E = "Реквізит", S = "") => {
      A(O => {
        const I = {
            id: "req-" + Date.now(),
            label: E,
            value: S
          },
          X = [...O.requisites, I],
          Z = me(O.channels, X);
        return {
          ...O,
          ...Z,
          requisites: X
        };
      });
    },
    Se = E => {
      A(S => {
        const O = S.requisites.filter(X => X.id !== E),
          I = me(S.channels, O);
        return {
          ...S,
          ...I,
          requisites: O
        };
      });
    },
    he = (E, S) => {
      A(O => {
        const I = O.requisites.map(Z => Z.id === E ? {
            ...Z,
            ...S
          } : Z),
          X = me(O.channels, I);
        return {
          ...O,
          ...X,
          requisites: I
        };
      });
    },
    Re = () => {
      p(yp), b($A), j(eb), A(Pr);
      try {
        localStorage.removeItem(Bt.CASES), localStorage.removeItem(Bt.INDUSTRIES), localStorage.removeItem(Bt.SCREENSHOTS), localStorage.removeItem(Bt.CONTACT);
      } catch {}
    },
    G = async E => {
      const S = {
        ...E,
        id: "lead-" + (typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : Date.now() + "-" + Math.random().toString(36).slice(2, 8)),
        createdAt: new Date().toISOString(),
        utm: gv(),
        ref: window.__pbRef || undefined,
        disc: window.__pbDisc || undefined
      };
      v(O => [S, ...O]);
      try {
        const O = await fetch("/api/lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(S)
        });
        O.ok || console.warn("Заявку не вдалося передати в CRM:", O.status);
      } catch (O) {
        console.warn("Заявку не вдалося передати в CRM", O);
      }
      return true;
    };
  return <E1.Provider value={{
    currentPage: s,
    currentSlug: i,
    currentPath: i || s,
    navigateTo: C,
    cases: x,
    industries: f,
    serviceScreenshots: y,
    contactInfo: h,
    submissions: U,
    isLeadModalOpen: w,
    openLeadModal: ee,
    closeLeadModal: B,
    selectedServiceForModal: R,
    saveCase: D,
    deleteCase: L,
    toggleShowOnHome: $,
    moveCase: pbMv,
    addIndustryTaxonomy: te,
    deleteIndustryTaxonomy: ae,
    updateServiceScreenshot: re,
    updateContactInfo: Ne,
    addContactChannel: ge,
    deleteContactChannel: _,
    updateContactChannel: se,
    addLegalRequisite: ne,
    deleteLegalRequisite: Se,
    updateLegalRequisite: he,
    resetToDefaults: Re,
    submitLead: G
  }}>{n}</E1.Provider>;
};

export const useSite = () => {
  const n = React.useContext(E1);
  if (!n) throw new Error("useSite must be used within a SiteProvider");
  return n;
};

