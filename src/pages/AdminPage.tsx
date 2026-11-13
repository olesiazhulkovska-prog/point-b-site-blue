// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import React from 'react';
import { ArrowRight, Check, CircleAlert, ExternalLink, Eye, EyeOff, Funnel, Inbox, Key, Layers, Lock, LogOut, Mail, Phone, Plus, RotateCcw, Save, Settings, ShieldCheck, SquarePen, Trash2, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const Ks = "pointb_admin_auth_v2";

export const Ip = "pointb_admin_session_v2";

export const Zr = {
  login: "point.b.here@gmail.com",
  alternateLogin: "olesiazhulkovska@gmail.com",
  password: ""
};

export const AdminPage = () => {
  const {
      cases: n,
      industries: s,
      serviceScreenshots: o,
      contactInfo: i,
      submissions: d,
      saveCase: x,
      deleteCase: p,
      toggleShowOnHome: f,
      moveCase: pbMvc,
      addIndustryTaxonomy: b,
      deleteIndustryTaxonomy: y,
      updateServiceScreenshot: j,
      updateContactInfo: h,
      addContactChannel: A,
      deleteContactChannel: U,
      updateContactChannel: v,
      addLegalRequisite: w,
      deleteLegalRequisite: k,
      updateLegalRequisite: R,
      resetToDefaults: H,
      navigateTo: F
    } = useSite(),
    [C, ee] = React.useState(() => {
      try {
        return sessionStorage.getItem(Ip) === "true";
      } catch {
        return false;
      }
    }),
    [B, D] = React.useState(""),
    [L, $] = React.useState(""),
    [te, ae] = React.useState(false),
    [re, me] = React.useState(null),
    [Ne, ge] = React.useState(() => {
      try {
        const K = localStorage.getItem(Ks);
        if (K) return JSON.parse(K);
      } catch (K) {
        console.error(K);
      }
      return Zr;
    }),
    [_, se] = React.useState({
      currentPassword: "",
      newLogin: "",
      newPassword: "",
      confirmPassword: ""
    }),
    [ne, Se] = React.useState(false),
    [he, Re] = React.useState("cases"),
    [G, E] = React.useState(null),
    [S, O] = React.useState(false),
    [I, X] = React.useState(""),
    [Z, oe] = React.useState(""),
    [be, ue] = React.useState(null),
    [de, lt] = React.useState(null),
    Me = K => {
      ue(K), setTimeout(() => ue(null), 3e3);
    },
    _t = async K => {
      var Na, Rl;
      K.preventDefault(), me(null);
      const SR = await window.__pbCases.post({
        action: "check",
        login: B,
        password: L
      });
      if (SR.status === 401) {
        me("Невірний email або пароль. Перевірте введені дані.");
        return;
      }
      const SV = SR.status === 200;
      let ie = Zr;
      try {
        const Ja = localStorage.getItem(Ks);
        Ja && (ie = JSON.parse(Ja));
      } catch (Ja) {
        console.error(Ja);
      }
      const je = B.trim().toLowerCase(),
        ht = [(Na = ie.login) == null ? undefined : Na.trim().toLowerCase(), (Rl = ie.alternateLogin) == null ? undefined : Rl.trim().toLowerCase()].filter(Boolean).includes(je),
        hi = L === ie.password;
      if (SV) {
        try {
          sessionStorage.setItem(Ip, "true"), sessionStorage.setItem("pb_admin_pw", L), sessionStorage.setItem("pb_admin_login", B.trim());
        } catch (Ja) {
          console.error(Ja);
        }
        ee(true), me(null), Me("Успішний вхід до панелі керування!");
      } else me("Невірний email або пароль. Перевірте введені дані.");
    },
    bt = () => {
      let K = Zr;
      try {
        const ie = localStorage.getItem(Ks);
        ie && (K = JSON.parse(ie));
      } catch (ie) {
        console.error(ie);
      }
      D(K.login || "point.b.here@gmail.com"), $(""), me(null);
    },
    Ee = () => {
      try {
        sessionStorage.removeItem(Ip), sessionStorage.removeItem("pb_admin_pw"), sessionStorage.removeItem("pb_admin_login");
      } catch (K) {
        console.error(K);
      }
      ee(false), $(""), Me("Ви успішно вийшли з системи");
    },
    Ce = K => {
      K.preventDefault();
      let ie = Zr;
      try {
        const ye = localStorage.getItem(Ks);
        ye && (ie = JSON.parse(ye));
      } catch (ye) {
        console.error(ye);
      }
      if (_.currentPassword !== ie.password) {
        Me("Поточний пароль введено невірно!");
        return;
      }
      if (_.newPassword) {
        if (_.newPassword.length < 6) {
          Me("Новий пароль має містити не менше 6 символів!");
          return;
        }
        if (_.newPassword !== _.confirmPassword) {
          Me("Новий пароль та підтвердження не співпадають!");
          return;
        }
      }
      const je = {
        ...ie,
        login: _.newLogin.trim() || ie.login,
        password: _.newPassword || ie.password
      };
      try {
        localStorage.setItem(Ks, JSON.stringify(je)), ge(je), se({
          currentPassword: "",
          newLogin: "",
          newPassword: "",
          confirmPassword: ""
        }), Me("Дані входу успішно оновлено!");
      } catch (ye) {
        console.error(ye), Me("Помилка при збереженні даних");
      }
    },
    Rt = () => {
      lt({
        isOpen: true,
        title: "Скинути логін та пароль до стандартних?",
        description: "Логін повернеться до point.b.here@gmail.com (пароль на сервері не змінюється).",
        confirmText: "Скинути",
        onConfirm: () => {
          try {
            localStorage.removeItem(Ks), ge(Zr), se({
              currentPassword: "",
              newLogin: "",
              newPassword: "",
              confirmPassword: ""
            }), Me("Дані скинуто до стандартних: point.b.here@gmail.com");
          } catch (K) {
            console.error(K);
          }
        }
      });
    },
    Ca = () => {
      const K = {
        id: "case-" + Date.now(),
        slug: "case-new-" + Math.floor(Math.random() * 1e3),
        companyName: "",
        industryTag: "Оптова торгівля · 10 співробітників",
        dataIndustry: "wholesale",
        shortResultMetric: "+30%",
        shortResultCaption: "зростання швидкості обробки заявок",
        showOnHome: false,
        heroSphereTag: "Кейс · Оптова торгівля",
        companyDescription: "",
        metadata: {
          sphere: "Торгівля та дистрибуція",
          employees: "10–20 фахівців",
          geography: "Україна",
          implementationTime: "14 робочих днів"
        },
        hasClientRequest: true,
        clientRequestItems: ["Автоматизувати рутинну фіксацію заявок з месенджерів"],
        hasSituationBefore: true,
        situationBeforeItems: ["Клієнти велися в блокнотах і таблицях без єдиної воронки"],
        whatWeDidSteps: [{
          title: "Аудит та налаштування воронки keyCRM",
          description: "Спроєктували логіку статусів та призначили відповідальних менеджерів."
        }],
        resultIntro: "Компанія отримала повністю керований відділ продажів.",
        resultItems: ["Час відповіді клієнту скоротився у 3 рази"],
        clientQuote: {
          text: "Тепер кожен менеджер знає свої завдання на день.",
          author: "Керівник компанії",
          role: "СЕО"
        },
        businessValues: ["Швидкість реакції = +30% конверсії"],
        integratedSystems: ["keyCRM", "Binotel", "Telegram"]
      };
      E(K), O(true);
    },
    $t = K => {
      E(JSON.parse(JSON.stringify(K))), O(true);
    },
    $e = async K => {
      if (K.preventDefault(), !!G) {
        if (!G.companyName.trim()) {
          Me("Вкажіть назву компанії перед збереженням");
          return;
        }
        if (!G.slug.trim()) {
          Me("Вкажіть slug сторінки перед збереженням");
          return;
        }
        const RS = await x(G);
        O(false), E(null), Me(RS && RS.ok ? `Кейс «${G.companyName}» збережено й опубліковано на сайті` : `Кейс «${G.companyName}» збережено лише в цьому браузері. ${RS && RS.msg || ""}`);
      }
    };
  return C ? <div className="bg-neutral-100 min-h-screen text-neutral-900 selection:bg-emerald-100 pb-24">{be && <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-neutral-700 animate-in fade-in slide-in-from-bottom-2"><Check className="w-5 h-5 text-emerald-400" /><span className="text-xs font-semibold">{be}</span></div>}<header className="bg-neutral-900 text-white border-b border-neutral-800 sticky top-0 z-30 shadow-md"><div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-18 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm"><Settings className="w-4 h-4" /></div><div><div className="font-bold text-sm sm:text-base leading-none">Point B CMS · Адмін-панель</div><div className="text-[11px] text-neutral-400 mt-1">Керування колекцією кейсів, синхронізація на 3 рівнях та контент</div></div></div><div className="flex items-center gap-2 sm:gap-3"><button onClick={() => {
            lt({
              isOpen: true,
              title: "Скинути всі дані до вихідних?",
              description: "Це відновить початкові демонстраційні кейси, скріншоти послуг, галузеві фільтри та контакти.",
              confirmText: "Скинути демо",
              onConfirm: () => {
                H(), Me("Дані успішно скинуто до вихідних!");
              }
            });
          }} title="Скинути до стандартних значень" className="px-3 py-1.5 rounded-lg border border-neutral-700 text-neutral-300 text-xs hover:bg-neutral-800 transition-colors flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5 text-neutral-400" /><span className="hidden sm:inline">Скинути демо</span></button><button onClick={() => F("index")} className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-neutral-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"><Eye className="w-3.5 h-3.5" /><span>На сайт</span></button><button id="admin-logout-btn" onClick={Ee} title="Вийти з адмін-панелі" className="px-3 py-1.5 rounded-lg border border-red-800/80 text-red-300 text-xs hover:bg-red-950/60 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"><LogOut className="w-3.5 h-3.5 text-red-400" /><span className="hidden sm:inline">Вийти</span></button></div></div><div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex overflow-x-auto scrollbar-none gap-1 border-t border-neutral-800/80 pt-1"><button onClick={() => Re("cases")} className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${he === "cases" ? "bg-neutral-100 text-neutral-900" : "text-neutral-400 hover:text-white"}`}><Layers className="w-4 h-4 text-emerald-600" /><span>Колекція кейсів ({n.length})</span></button><button onClick={() => Re("industries")} className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${he === "industries" ? "bg-neutral-100 text-neutral-900" : "text-neutral-400 hover:text-white"}`}><Funnel className="w-4 h-4 text-sky-400" /><span>Галузі / Фільтри ({s.length})</span></button><button onClick={() => Re("contacts")} className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${he === "contacts" ? "bg-neutral-100 text-neutral-900" : "text-neutral-400 hover:text-white"}`}><Phone className="w-4 h-4 text-amber-400" /><span>Контактні дані</span></button><button onClick={() => Re("leads")} className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${he === "leads" ? "bg-neutral-100 text-neutral-900" : "text-neutral-400 hover:text-white"}`}><Inbox className="w-4 h-4 text-emerald-400" /><span>Заявки з сайту ({d.length})</span></button><button id="admin-tab-security" onClick={() => Re("security")} className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${he === "security" ? "bg-neutral-100 text-neutral-900" : "text-neutral-400 hover:text-white"}`}><Key className="w-4 h-4 text-amber-400" /><span>Безпека та пароль</span></button></div></header><main className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-8">{he === "cases" && <div className="space-y-6"><div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"><div><h2 className="text-xl font-bold text-neutral-900">Управління кейсами</h2><p className="text-xs text-neutral-600 mt-1">Зміни зберігаються на сервері й одразу з’являються на сайті: у списку кейсів, на головній (прапорець «На головній») та на сторінці кейсу.</p></div><div className="flex items-center gap-3"><button id="admin-create-case-btn" onClick={Ca} className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-sm"><Plus className="w-4 h-4 text-emerald-400" /><span>Додати новий кейс</span></button></div></div><div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs"><div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider font-semibold border-b border-neutral-200"><tr><th className="py-3.5 px-4">Компанія / Slug (порядок: ↑↓ у «Діях»)</th><th className="py-3.5 px-4">Галузь (Тег)</th><th className="py-3.5 px-4">Результат картки</th><th className="py-3.5 px-4 text-center">На головній (Топ-3)</th><th className="py-3.5 px-4 text-right">Дії</th></tr></thead><tbody className="divide-y divide-neutral-100">{n.map((K, pbi) => <tr key={K.id} className="hover:bg-neutral-50/80 transition-colors"><td className="py-4 px-4"><div className="font-bold text-neutral-950 text-sm">{K.companyName}</div><div className="text-[11px] text-neutral-500 font-mono flex items-center gap-1 mt-0.5"><span>/{K.slug}.html</span></div></td><td className="py-4 px-4"><span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200 font-medium">{K.industryTag}</span><div className="text-[10px] text-neutral-400 mt-1 font-mono">{"data-industry: "}{K.dataIndustry}</div></td><td className="py-4 px-4"><div className="font-extrabold text-neutral-900 text-sm text-emerald-700">{K.shortResultMetric}</div><div className="text-[11px] text-neutral-500 line-clamp-1">{K.shortResultCaption}</div></td><td className="py-4 px-4 text-center"><button onClick={() => f(K.id)} className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${K.showOnHome ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-neutral-100 text-neutral-500 border border-neutral-200 hover:bg-neutral-200"}`}>{K.showOnHome ? "✓ Показано на головній" : "Приховано"}</button></td><td className="py-4 px-4 text-right"><div className="flex items-center justify-end gap-1.5"><button onClick={() => pbMvc(K.id, -1)} disabled={pbi === 0} title="Перемістити вище" className="px-2 py-1 text-sm font-bold text-neutral-700 hover:bg-neutral-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed">↑</button><button onClick={() => pbMvc(K.id, 1)} disabled={pbi === n.length - 1} title="Перемістити нижче" className="px-2 py-1 text-sm font-bold text-neutral-700 hover:bg-neutral-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed">↓</button><button onClick={() => F(K.slug)} title="Переглянути публічну сторінку" className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"><ExternalLink className="w-4 h-4" /></button><button onClick={() => $t(K)} title="Редагувати кейс" className="p-2 text-neutral-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"><SquarePen className="w-4 h-4" /></button><button onClick={() => {
                        lt({
                          isOpen: true,
                          title: `Видалити кейс «${K.companyName || "Без назви"}»?`,
                          description: "Цей кейс буде вилучено з публічного списку, прев’ю на головній та його персональної сторінки.",
                          confirmText: "Видалити кейс",
                          onConfirm: () => {
                            p(K.id), Me(`Кейс «${K.companyName}» видалено`);
                          }
                        });
                      }} title="Видалити кейс" className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button></div></td></tr>)}</tbody></table></div></div></div>}{he === "industries" && <div className="max-w-3xl space-y-6"><div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs"><h3 className="text-lg font-bold text-neutral-950 mb-1">Галузеві фільтри для cases.html</h3><p className="text-xs text-neutral-600 mb-6">Пільки фільтра на сторінці кейсів. Ви можете додавати нові категорії бізнесу для класифікації ваших клієнтів.</p><div className="flex flex-col sm:flex-row gap-3 items-center mb-6 pb-6 border-b border-neutral-200"><input type="text" placeholder="Назва галузі (наприклад: Агросектор, Логістика)" value={I} onChange={K => X(K.target.value)} className="w-full sm:flex-1 px-4 py-2.5 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900" /><input type="text" placeholder="ID для data-industry (наприклад: agro, logistics)" value={Z} onChange={K => oe(K.target.value)} className="w-full sm:w-48 px-4 py-2.5 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 font-mono" /><button type="button" onClick={() => {
              I.trim() && (b(I.trim(), Z.trim() || undefined), X(""), oe(""), Me("Нову галузь додано до фільтрів!"));
            }} className="w-full sm:w-auto px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 whitespace-nowrap">Додати пільку</button></div><div className="space-y-2"><div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Активні значення фільтра</div><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{s.map(K => {
                const ie = K.id === "all" ? n.length : n.filter(je => je.dataIndustry === K.id).length;
                return <div key={K.id} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs hover:border-neutral-300 transition-colors"><div className="min-w-0 pr-2"><div className="font-bold text-neutral-900 truncate">{K.label}</div><div className="font-mono text-[10px] text-neutral-400">{"id: "}{K.id}</div></div><div className="flex items-center gap-2 shrink-0"><span className="px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700 text-[11px] font-semibold">{ie}{" кейсів"}</span>{K.id === "all" ? <span className="text-[10px] text-neutral-400 font-medium px-1">Базовий</span> : <button type="button" id={`delete-industry-${K.id}`} onClick={je => {
                      je.stopPropagation(), ie > 0 ? lt({
                        isOpen: true,
                        title: `Видалити пільку «${K.label}»?`,
                        description: `Увага: ця галузь використовується у ${ie} кейс(ах). Пілька зникне з фільтра на сторінці cases.html.`,
                        confirmText: "Видалити пільку",
                        onConfirm: () => {
                          y(K.id), Me(`Пільку «${K.label}» успішно видалено!`);
                        }
                      }) : (y(K.id), Me(`Пільку «${K.label}» успішно видалено!`));
                    }} title={`Видалити пільку «${K.label}»`} className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>}</div></div>;
              })}</div></div></div></div>}{he === "screenshots" && <div className="space-y-6 max-w-4xl"><div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs"><h3 className="text-lg font-bold text-neutral-950 mb-1">Зображення / Скріншоти для блоку «01 · Послуги» (index.html)</h3><p className="text-xs text-neutral-600 mb-6">За технічним завданням, на головній сторінці для кожної з 3 послуг передбачено скріншот (CRM, бота, дашборду). Тут ви можете оновити посилання та підписи.</p><div className="space-y-6">{o.map(K => <div key={K.id} className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4"><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-wider text-emerald-800">{K.serviceName}{" (ID: "}{K.id})</span></div><div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"><div className="md:col-span-4 aspect-16/9 rounded-xl overflow-hidden border border-neutral-300 bg-neutral-200"><img src={K.imageUrl} alt={K.serviceName} className="w-full h-full object-cover" /></div><div className="md:col-span-8 space-y-3"><div><label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">URL зображення або скріншота</label><input type="text" value={K.imageUrl} onChange={ie => j(K.id, ie.target.value)} className="w-full px-3.5 py-2 text-xs rounded-lg border border-neutral-200 bg-white font-mono" /></div><div><label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">Підпис до скріншота</label><input type="text" value={K.caption} onChange={ie => j(K.id, K.imageUrl, ie.target.value)} className="w-full px-3.5 py-2 text-xs rounded-lg border border-neutral-200 bg-white" /></div></div></div></div>)}</div></div></div>}{he === "contacts" && <div className="max-w-3xl space-y-6"><div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-6"><div><h3 className="text-lg font-bold text-neutral-950 mb-1">{"Контактні дані сайту (contact.html & Footer)"}</h3><p className="text-xs text-neutral-600">Зміна, додавання та видалення цих рядків автоматично синхронізується на всіх сторінках сайту, у формах та у футері.</p></div><div className="space-y-4"><div className="flex items-center justify-between pb-1 border-b border-neutral-100"><div className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Канали зв'язку (телефони, пошта, месенджери, графік)</div><button type="button" id="add-contact-channel-btn" onClick={() => {
                A("Номер телефону", "", "phone"), Me("Додано новий контактний рядок");
              }} className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"><Plus className="w-3.5 h-3.5" /><span>Додати контакт</span></button></div><div className="space-y-3">{(i.channels || []).map((K, ie) => <div key={K.id || `ch-${ie}`} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 transition-colors hover:border-neutral-300"><div className="sm:w-36 shrink-0"><select value={K.type || "custom"} onChange={je => {
                    const ye = je.target.value,
                      ht = {
                        phone: "Номер телефону",
                        email: "Email",
                        telegram: "Telegram контакт / бот",
                        whatsapp: "WhatsApp",
                        viber: "Viber",
                        hours: "Графік роботи",
                        custom: "Контакт / Канал"
                      };
                    v(K.id, {
                      type: ye,
                      label: (K.label === "Номер телефону" || K.label === "Email" || K.label === "Telegram контакт / бот" || K.label === "Графік роботи" || K.label === "Новий контакт") && ht[ye] || K.label
                    });
                  }} className="w-full px-2.5 py-2 text-xs rounded-lg border border-neutral-200 bg-white font-medium text-neutral-700"><option value="phone">📞 Телефон</option><option value="email">✉️ Email</option><option value="telegram">✈️ Telegram</option><option value="whatsapp">💬 WhatsApp</option><option value="viber">📱 Viber</option><option value="hours">🕒 Графік роботи</option><option value="custom">🌐 Інше / Кастом</option></select></div><div className="sm:w-44 shrink-0"><input type="text" placeholder="Підпис рядка" value={K.label} onChange={je => v(K.id, {
                    label: je.target.value
                  })} className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 bg-white text-neutral-800 font-semibold" /></div><div className="flex-1 min-w-0"><input type="text" placeholder="Значення (напр. +38 (067) ..., email@...)" value={K.value} onChange={je => v(K.id, {
                    value: je.target.value
                  })} className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 bg-white text-neutral-900 font-medium" /></div><button type="button" id={`delete-channel-${K.id}`} onClick={() => {
                  U(K.id), Me(`Рядок «${K.label || "Контакт"}» видалено`);
                }} title={`Видалити рядок «${K.label}»`} className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0 self-end sm:self-center cursor-pointer"><Trash2 className="w-4 h-4" /></button></div>)}{(i.channels || []).length === 0 && <div className="p-4 rounded-xl border border-dashed border-neutral-300 text-center text-xs text-neutral-500">Немає контактних рядків. Натисніть «Додати контакт» вище.</div>}</div><div className="pt-2"><button type="button" onClick={() => {
                A("Номер телефону", "", "phone"), Me("Додано новий контактний рядок");
              }} className="w-full py-2.5 rounded-xl border border-dashed border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"><Plus className="w-4 h-4 text-neutral-500" /><span>+ Додати ще один контактний рядок</span></button></div></div><div className="pt-4 border-t border-neutral-200 space-y-4"><div className="flex items-center justify-between pb-1 border-b border-neutral-100"><div className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Юридичні реквізити компанії</div><button type="button" id="add-requisite-btn" onClick={() => {
                w("Новий реквізит", ""), Me("Додано новий рядок реквізитів");
              }} className="px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 hover:bg-neutral-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"><Plus className="w-3.5 h-3.5" /><span>Додати реквізит</span></button></div><div className="space-y-3">{(i.requisites || []).map((K, ie) => <div key={K.id || `req-${ie}`} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 transition-colors hover:border-neutral-300"><div className="sm:w-52 shrink-0"><input type="text" placeholder="Назва реквізиту (напр. IBAN, ЄДРПОУ)" value={K.label} onChange={je => R(K.id, {
                    label: je.target.value
                  })} className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 bg-white text-neutral-800 font-semibold" /></div><div className="flex-1 min-w-0"><input type="text" placeholder="Значення реквізиту" value={K.value} onChange={je => R(K.id, {
                    value: je.target.value
                  })} className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 bg-white text-neutral-900 font-medium" /></div><button type="button" id={`delete-requisite-${K.id}`} onClick={() => {
                  k(K.id), Me(`Реквізит «${K.label || "Рядок"}» видалено`);
                }} title={`Видалити реквізит «${K.label}»`} className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0 self-end sm:self-center cursor-pointer"><Trash2 className="w-4 h-4" /></button></div>)}{(i.requisites || []).length === 0 && <div className="p-4 rounded-xl border border-dashed border-neutral-300 text-center text-xs text-neutral-500">Немає юридичних реквізитів. Натисніть «Додати реквізит» вище.</div>}</div><div className="pt-2"><button type="button" onClick={() => {
                w("Новий реквізит", ""), Me("Додано новий рядок реквізитів");
              }} className="w-full py-2.5 rounded-xl border border-dashed border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"><Plus className="w-4 h-4 text-neutral-500" /><span>+ Додати ще один рядок реквізитів (IBAN, Банк, тощо)</span></button></div></div></div></div>}{he === "leads" && <div className="space-y-6"><div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs flex items-center justify-between"><div><h3 className="text-lg font-bold text-neutral-950">Журнал отриманих заявок</h3><p className="text-xs text-neutral-600 mt-0.5">Усі ліди, заповнені через форми на contact.html, сторінках послуг або через модальне вікно.</p></div><span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">{"Всього: "}{d.length}</span></div>{d.length === 0 ? <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center text-neutral-500 text-xs">Заявок поки немає. Надішліть тестову заявку з будь-якої сторінки сайту!</div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{d.map(K => <div key={K.id} className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3"><div className="flex items-center justify-between border-b border-neutral-100 pb-2"><span className="font-bold text-neutral-950 text-sm">{K.name}</span><span className="text-[10px] text-neutral-400">{new Date(K.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}</span></div><div className="text-xs text-neutral-700 space-y-1"><div><strong>Телефон:</strong>{" "}{K.contact}</div>{K.telegram && <div><strong>Telegram:</strong>{" "}<span className="text-sky-600 font-mono">{K.telegram}</span></div>}{K.role && <div><strong>Посада:</strong>{" "}{K.role}</div>}{K.company && <div><strong>Компанія:</strong>{" "}{K.company}</div>}{K.industry && <div><strong>Сфера:</strong>{" "}{K.industry}</div>}{K.employeesCount && <div><strong>Команда:</strong>{" "}{K.employeesCount}</div>}{K.ordersCount && <div><strong>Замовлень:</strong>{" "}{K.ordersCount}</div>}{K.budget && <div><strong>Бюджет:</strong>{" "}<span className="font-semibold text-neutral-900">{K.budget}</span></div>}<div><strong>Послуга:</strong>{" "}<span className="text-emerald-700 font-semibold">{K.service}</span></div><div className="text-[11px] text-neutral-500 font-mono">{"Джерело: "}{K.sourcePage}</div></div>{(K.primaryTask || K.comment) && <div className="p-2.5 rounded-xl bg-neutral-50 text-[11px] text-neutral-700 border border-neutral-200/60 space-y-1"><div className="font-semibold text-neutral-900">Першочергова задача:</div><div className="italic text-neutral-700">«{K.primaryTask || K.comment}»</div></div>}</div>)}</div>}</div>}{he === "security" && <div className="max-w-2xl mx-auto space-y-6"><div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6"><div className="flex items-start justify-between gap-4 pb-5 border-b border-neutral-100"><div className="flex items-center gap-3.5"><div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold shrink-0"><ShieldCheck className="w-6 h-6" /></div><div><h2 className="text-lg font-bold text-neutral-950">Налаштування безпеки та входу</h2><p className="text-xs text-neutral-500 mt-0.5">Вхід в адмін-панель перевіряється на сервері</p></div></div></div><div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"><div><div className="text-neutral-500 text-[11px] font-medium">Поточний логін (email):</div><div className="text-sm font-bold text-neutral-900 font-mono mt-0.5">{(() => {
                  try {
                    return sessionStorage.getItem("pb_admin_login");
                  } catch {
                    return "";
                  }
                })() || "—"}</div></div><div><span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold"><Check className="w-3.5 h-3.5" />Панель захищена паролем</span></div></div><div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">Пароль і дозволені email адміністраторів зберігаються на сервері, а не в браузері. Щоб їх змінити, відкрийте Vercel → Settings → Environment Variables і змініть ADMIN_PASSWORD (пароль) або ADMIN_LOGINS (email через кому), потім зробіть Redeploy. Змінити їх з цієї сторінки неможливо.</div>{null}</div></div>}</main>{S && G && <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-950/70 backdrop-blur-xs overflow-y-auto"><div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto" onClick={K => K.stopPropagation()}><div className="px-6 py-4 border-b border-neutral-200 bg-neutral-900 text-white flex items-center justify-between shrink-0"><div><h3 className="font-bold text-base">{G.companyName ? `Редагування кейсу: ${G.companyName}` : "Новий кейс"}</h3><div className="text-xs text-neutral-400">Структура case-template.html (6 блоків)</div></div><button onClick={() => O(false)} className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800"><X className="w-5 h-5" /></button></div><form onSubmit={$e} className="p-6 sm:p-8 overflow-y-auto space-y-8 text-xs"><div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4"><div className="text-xs font-bold text-neutral-900 uppercase tracking-wider">1. Картка кейсу для cases.html та index.html</div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block font-semibold text-neutral-700 mb-1">Назва компанії (Заголовок)*</label><input type="text" required value={G.companyName} onChange={K => E({
                  ...G,
                  companyName: K.target.value
                })} placeholder="Наприклад: Brendy Group" className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 bg-white" /></div><div><label className="block font-semibold text-neutral-700 mb-1">Slug / URL сторінки*</label><input type="text" required value={G.slug} onChange={K => E({
                  ...G,
                  slug: K.target.value
                })} placeholder="case-brendy" className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 bg-white font-mono" /></div><div><label className="block font-semibold text-neutral-700 mb-1">Галузь / Тег для картки*</label><input type="text" required value={G.industryTag} onChange={K => E({
                  ...G,
                  industryTag: K.target.value
                })} placeholder="Оптова торгівля · 16 співробітників" className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 bg-white" /></div><div><label className="block font-semibold text-neutral-700 mb-1">Таксономія для фільтра (data-industry)*</label><select value={G.dataIndustry} onChange={K => E({
                  ...G,
                  dataIndustry: K.target.value
                })} className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 bg-white">{s.filter(K => K.id !== "all").map(K => <option key={K.id} value={K.id}>{K.label}{" ("}{K.id})</option>)}</select></div><div><label className="block font-semibold text-neutral-700 mb-1">Коротка цифра результату*</label><input type="text" required value={G.shortResultMetric} onChange={K => E({
                  ...G,
                  shortResultMetric: K.target.value
                })} placeholder="10 днів або +42%" className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 bg-white font-bold" /></div><div><label className="block font-semibold text-neutral-700 mb-1">Підпис до цифри результату*</label><input type="text" required value={G.shortResultCaption} onChange={K => E({
                  ...G,
                  shortResultCaption: K.target.value
                })} placeholder="на впровадження keyCRM під ключ" className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 bg-white" /></div></div><div className="pt-2"><label className="inline-flex items-center gap-2 cursor-pointer font-semibold text-neutral-800"><input type="checkbox" checked={G.showOnHome} onChange={K => E({
                  ...G,
                  showOnHome: K.target.checked
                })} className="w-4 h-4 rounded text-neutral-900 focus:ring-neutral-900" /><span>Показувати в топ-3 прев’ю на головній (index.html, блок 04)</span></label></div><div className="pt-3 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-4"><div className="sm:col-span-3"><label className="block font-semibold text-neutral-700 mb-1">Фонове фото для плажки кейсу (URL фото тематики сфери)</label><input type="text" value={G.coverImageUrl || ""} onChange={K => E({
                  ...G,
                  coverImageUrl: K.target.value
                })} placeholder="https://images.unsplash.com/..." className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 bg-white" /><p className="text-[11px] text-neutral-600 mt-1">Відображається на задньому плані картки з затемненим фільтром.</p></div><div><label className="block font-semibold text-neutral-700 mb-1">Сайт клієнта (URL)</label><input type="url" value={G.websiteUrl || ""} onChange={K => E({
                  ...G,
                  websiteUrl: K.target.value
                })} placeholder="https://client-domain.com.ua" className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 bg-white" /></div><div><label className="block font-semibold text-neutral-700 mb-1">Instagram клієнта (URL)</label><input type="url" value={G.instagramUrl || ""} onChange={K => E({
                  ...G,
                  instagramUrl: K.target.value
                })} placeholder="https://instagram.com/client_profile" className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 bg-white" /></div></div><div className="pt-3 border-t border-neutral-100 space-y-3"><div className="flex items-center justify-between"><div><span className="font-semibold text-neutral-800 block text-xs">Швидкі тези для картки (метрики, речення-трансформації, бейджі)</span><span className="text-[11px] text-neutral-500">Якщо не вказано — картка автоматично підтягує дані з полів результату</span></div><button type="button" onClick={() => {
                  const K = G.hooks || [];
                  E({
                    ...G,
                    hooks: [...K, {
                      type: "metric",
                      value: "×2",
                      label: "швидкість обробки"
                    }]
                  });
                }} className="text-emerald-700 font-semibold text-xs hover:underline">+ Додати тезу</button></div>{G.hooks && G.hooks.length > 0 && <div className="space-y-2">{G.hooks.map((K, ie) => <div key={ie} className="p-2.5 rounded-xl bg-white border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center gap-2"><select value={K.type || "metric"} onChange={je => {
                    const ye = [...(G.hooks || [])];
                    ye[ie] = {
                      ...ye[ie],
                      type: je.target.value
                    }, E({
                      ...G,
                      hooks: ye
                    });
                  }} className="px-2 py-1 rounded-lg border border-neutral-200 text-xs bg-neutral-50"><option value="metric">Цифра (метрика)</option><option value="sentence">Речення (зміна/фікс)</option><option value="badge">Бейдж (акцент)</option></select>{K.type === "metric" ? <div className="flex-1 grid grid-cols-2 gap-2 w-full"><input type="text" placeholder="Значення (напр. 10 днів)" value={K.value || ""} onChange={je => {
                      const ye = [...(G.hooks || [])];
                      ye[ie] = {
                        ...ye[ie],
                        value: je.target.value
                      }, E({
                        ...G,
                        hooks: ye
                      });
                    }} className="px-2.5 py-1 rounded-lg border border-neutral-200 text-xs font-bold" /><input type="text" placeholder="Підпис (напр. запуск під ключ)" value={K.label || ""} onChange={je => {
                      const ye = [...(G.hooks || [])];
                      ye[ie] = {
                        ...ye[ie],
                        label: je.target.value
                      }, E({
                        ...G,
                        hooks: ye
                      });
                    }} className="px-2.5 py-1 rounded-lg border border-neutral-200 text-xs" /></div> : <input type="text" placeholder={K.type === "badge" ? "Текст бейджа..." : "Опис зміни чи переваги..."} value={K.text || ""} onChange={je => {
                    const ye = [...(G.hooks || [])];
                    ye[ie] = {
                      ...ye[ie],
                      text: je.target.value
                    }, E({
                      ...G,
                      hooks: ye
                    });
                  }} className="flex-1 px-2.5 py-1 rounded-lg border border-neutral-200 text-xs w-full" />}<button type="button" onClick={() => {
                    const je = (G.hooks || []).filter((ye, ht) => ht !== ie);
                    E({
                      ...G,
                      hooks: je
                    });
                  }} className="text-neutral-400 hover:text-red-600 p-1 shrink-0"><Trash2 className="w-3.5 h-3.5" /></button></div>)}</div>}</div></div><div className="p-5 rounded-2xl bg-white border border-neutral-200 space-y-4 shadow-xs"><div className="text-xs font-bold text-neutral-900 uppercase tracking-wider">2. Блок Hero детальної сторінки</div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block font-semibold text-neutral-700 mb-1">Мітка в шапці (Кейс · [сфера])</label><input type="text" value={G.heroSphereTag} onChange={K => E({
                  ...G,
                  heroSphereTag: K.target.value
                })} placeholder="Кейс · Оптова торгівля" className="w-full px-3.5 py-2 rounded-xl border border-neutral-200" /></div><div className="sm:col-span-2"><label className="block font-semibold text-neutral-700 mb-1">Опис компанії (1–3 речення)</label><textarea rows={2} value={G.companyDescription} onChange={K => E({
                  ...G,
                  companyDescription: K.target.value
                })} placeholder="Короткий опис діяльності клієнта, масштаб, асортимент..." className="w-full px-3.5 py-2 rounded-xl border border-neutral-200" /></div></div><div className="pt-2"><span className="block font-semibold text-neutral-700 uppercase tracking-wider text-[11px] mb-2">Рівно 4 обов'язкові метаполя:</span><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"><div><label className="text-[10px] text-neutral-500 font-semibold uppercase">Сфера</label><input type="text" value={G.metadata.sphere} onChange={K => E({
                    ...G,
                    metadata: {
                      ...G.metadata,
                      sphere: K.target.value
                    }
                  })} className="w-full px-3 py-1.5 rounded-lg border border-neutral-200 text-xs" /></div><div><label className="text-[10px] text-neutral-500 font-semibold uppercase">Співробітники</label><input type="text" value={G.metadata.employees} onChange={K => E({
                    ...G,
                    metadata: {
                      ...G.metadata,
                      employees: K.target.value
                    }
                  })} className="w-full px-3 py-1.5 rounded-lg border border-neutral-200 text-xs" /></div><div><label className="text-[10px] text-neutral-500 font-semibold uppercase">Географія</label><input type="text" value={G.metadata.geography} onChange={K => E({
                    ...G,
                    metadata: {
                      ...G.metadata,
                      geography: K.target.value
                    }
                  })} className="w-full px-3 py-1.5 rounded-lg border border-neutral-200 text-xs" /></div><div><label className="text-[10px] text-neutral-500 font-semibold uppercase">Час впровадження</label><input type="text" value={G.metadata.implementationTime} onChange={K => E({
                    ...G,
                    metadata: {
                      ...G.metadata,
                      implementationTime: K.target.value
                    }
                  })} className="w-full px-3 py-1.5 rounded-lg border border-neutral-200 text-xs" /></div></div></div></div><div className="p-5 rounded-2xl bg-white border border-neutral-200 space-y-3 shadow-xs"><div className="flex items-center justify-between"><span className="font-bold text-neutral-900 uppercase tracking-wider text-xs">3. Блок «Запит клієнта» (Опційний)</span><label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-semibold"><input type="checkbox" checked={G.hasClientRequest} onChange={K => E({
                  ...G,
                  hasClientRequest: K.target.checked
                })} /><span>Увімкнути секцію</span></label></div>{G.hasClientRequest && <div className="space-y-2">{G.clientRequestItems.map((K, ie) => <div key={ie} className="flex items-center gap-2"><input type="text" value={K} onChange={je => {
                  const ye = [...G.clientRequestItems];
                  ye[ie] = je.target.value, E({
                    ...G,
                    clientRequestItems: ye
                  });
                }} className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs" /><button type="button" onClick={() => {
                  const je = G.clientRequestItems.filter((ye, ht) => ht !== ie);
                  E({
                    ...G,
                    clientRequestItems: je
                  });
                }} className="text-neutral-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button></div>)}<button type="button" onClick={() => {
                E({
                  ...G,
                  clientRequestItems: [...G.clientRequestItems, "Новий пункт побажань"]
                });
              }} className="text-emerald-700 font-semibold text-xs hover:underline pt-1">+ Додати пункт запиту</button></div>}</div><div className="p-5 rounded-2xl bg-white border border-neutral-200 space-y-3 shadow-xs"><div className="flex items-center justify-between"><span className="font-bold text-neutral-900 uppercase tracking-wider text-xs">4. Блок «Ситуація до впровадження» (Опційний)</span><label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-semibold"><input type="checkbox" checked={G.hasSituationBefore} onChange={K => E({
                  ...G,
                  hasSituationBefore: K.target.checked
                })} /><span>Увімкнути секцію</span></label></div>{G.hasSituationBefore && <div className="space-y-2">{G.situationBeforeItems.map((K, ie) => <div key={ie} className="flex items-center gap-2"><input type="text" value={K} onChange={je => {
                  const ye = [...G.situationBeforeItems];
                  ye[ie] = je.target.value, E({
                    ...G,
                    situationBeforeItems: ye
                  });
                }} className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs" /><button type="button" onClick={() => {
                  const je = G.situationBeforeItems.filter((ye, ht) => ht !== ie);
                  E({
                    ...G,
                    situationBeforeItems: je
                  });
                }} className="text-neutral-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button></div>)}<button type="button" onClick={() => {
                E({
                  ...G,
                  situationBeforeItems: [...G.situationBeforeItems, "Нова проблема до впровадження"]
                });
              }} className="text-emerald-700 font-semibold text-xs hover:underline pt-1">+ Додати проблему «до»</button></div>}</div><div className="p-5 rounded-2xl bg-white border border-neutral-200 space-y-4 shadow-xs"><div className="text-xs font-bold text-neutral-900 uppercase tracking-wider">5. Блок «Що ми зробили» (Обов’язковий список кроків)</div><div className="space-y-3">{G.whatWeDidSteps.map((K, ie) => <div key={ie} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2"><div className="flex items-center justify-between"><span className="font-semibold text-neutral-700">Крок #{ie + 1}</span>{G.whatWeDidSteps.length > 1 && <button type="button" onClick={() => {
                    const je = G.whatWeDidSteps.filter((ye, ht) => ht !== ie);
                    E({
                      ...G,
                      whatWeDidSteps: je
                    });
                  }} className="text-neutral-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>}</div><input type="text" placeholder="Назва кроку" value={K.title} onChange={je => {
                  const ye = [...G.whatWeDidSteps];
                  ye[ie].title = je.target.value, E({
                    ...G,
                    whatWeDidSteps: ye
                  });
                }} className="w-full px-3 py-1.5 rounded-lg border border-neutral-200 bg-white font-medium" /><textarea rows={2} placeholder="Опис виконаних дій" value={K.description} onChange={je => {
                  const ye = [...G.whatWeDidSteps];
                  ye[ie].description = je.target.value, E({
                    ...G,
                    whatWeDidSteps: ye
                  });
                }} className="w-full px-3 py-1.5 rounded-lg border border-neutral-200 bg-white" /></div>)}<button type="button" onClick={() => {
                E({
                  ...G,
                  whatWeDidSteps: [...G.whatWeDidSteps, {
                    title: "Новий крок інтеграції",
                    description: "Детальний опис налаштувань..."
                  }]
                });
              }} className="text-emerald-700 font-semibold text-xs hover:underline">+ Додати крок реалізації</button></div></div><div className="p-5 rounded-2xl bg-neutral-900 text-white space-y-4"><div className="text-xs font-bold uppercase tracking-wider text-emerald-400">6. Блок «Результат» (Темна секція)</div><div><label className="block text-neutral-300 font-semibold mb-1">Опційний вступний абзац</label><input type="text" value={G.resultIntro || ""} onChange={K => E({
                ...G,
                resultIntro: K.target.value
              })} className="w-full px-3.5 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs" /></div><div className="space-y-2"><label className="block text-neutral-300 font-semibold">Список результатів:</label>{G.resultItems.map((K, ie) => <div key={ie} className="flex items-center gap-2"><input type="text" value={K} onChange={je => {
                  const ye = [...G.resultItems];
                  ye[ie] = je.target.value, E({
                    ...G,
                    resultItems: ye
                  });
                }} className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs" /><button type="button" onClick={() => {
                  const je = G.resultItems.filter((ye, ht) => ht !== ie);
                  E({
                    ...G,
                    resultItems: je
                  });
                }} className="text-neutral-400 hover:text-red-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button></div>)}<button type="button" onClick={() => {
                E({
                  ...G,
                  resultItems: [...G.resultItems, "Новий вимірюваний результат"]
                });
              }} className="text-emerald-400 font-semibold text-xs hover:underline">+ Додати результат</button></div><div className="space-y-3 pt-3 border-t border-neutral-800"><div className="flex items-center justify-between"><label className="block text-neutral-300 font-semibold text-xs">Цитата клієнта (відгук / рекомендація)</label><label className="inline-flex items-center gap-1.5 cursor-pointer text-xs text-neutral-400"><input type="checkbox" checked={!!G.clientQuote} onChange={K => {
                    if (K.target.checked) E({
                      ...G,
                      clientQuote: {
                        text: "Впровадження системи значно оптимізувало нашу щоденну роботу.",
                        author: "Керівник компанії",
                        role: G.companyName || "CEO"
                      }
                    });else {
                      const ie = {
                        ...G
                      };
                      delete ie.clientQuote, E(ie);
                    }
                  }} /><span>Показувати цитату</span></label></div>{G.clientQuote && <div className="space-y-2 p-3 rounded-xl bg-neutral-800/80 border border-neutral-700"><div><label className="text-[10px] text-neutral-400 uppercase font-semibold block mb-1">Текст цитати</label><textarea rows={2} value={G.clientQuote.text} onChange={K => E({
                    ...G,
                    clientQuote: {
                      ...G.clientQuote,
                      text: K.target.value
                    }
                  })} className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-xs" placeholder="Текст відгуку..." /></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-2"><div><label className="text-[10px] text-neutral-400 uppercase font-semibold block mb-1">Автор (ПІБ або посада)</label><input type="text" value={G.clientQuote.author} onChange={K => E({
                      ...G,
                      clientQuote: {
                        ...G.clientQuote,
                        author: K.target.value
                      }
                    })} className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-xs" placeholder="Олександр Коваль" /></div><div><label className="text-[10px] text-neutral-400 uppercase font-semibold block mb-1">Компанія / Посада</label><input type="text" value={G.clientQuote.role} onChange={K => E({
                      ...G,
                      clientQuote: {
                        ...G.clientQuote,
                        role: K.target.value
                      }
                    })} className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-xs" placeholder="Комерційний директор" /></div></div></div>}</div><div className="space-y-2 pt-2 border-t border-neutral-800"><label className="block text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">Ключова цінність для бізнесу (1–4 пункти формату «X = Y»)*</label>{G.businessValues.map((K, ie) => <div key={ie} className="flex items-center gap-2"><input type="text" value={K} onChange={je => {
                  const ye = [...G.businessValues];
                  ye[ie] = je.target.value, E({
                    ...G,
                    businessValues: ye
                  });
                }} placeholder="Швидкість обробки = +30% конверсії" className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-emerald-300 font-mono text-xs" />{G.businessValues.length > 1 && <button type="button" onClick={() => {
                  const je = G.businessValues.filter((ye, ht) => ht !== ie);
                  E({
                    ...G,
                    businessValues: je
                  });
                }} className="text-neutral-400 hover:text-red-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button>}</div>)}{G.businessValues.length < 4 && <button type="button" onClick={() => {
                E({
                  ...G,
                  businessValues: [...G.businessValues, "Контроль процесів = +20% прибутку"]
                });
              }} className="text-emerald-400 font-semibold text-xs hover:underline">+ Додати пункт цінності (макс. 4)</button>}</div></div><div className="p-5 rounded-2xl bg-white border border-neutral-200 space-y-3 shadow-xs"><div className="text-xs font-bold text-neutral-900 uppercase tracking-wider">7. Системи, які інтегрували (перелік через крапку)</div><input type="text" value={G.integratedSystems.join(", ")} onChange={K => {
              const ie = K.target.value.split(",").map(je => je.trim()).filter(Boolean);
              E({
                ...G,
                integratedSystems: ie
              });
            }} placeholder="keyCRM, Binotel, Telegram, Нова Пошта" className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs font-medium" /><div className="text-[11px] text-neutral-500">{"Вказуйте через кому. На сторінці відображатиметься як "}<code>{G.integratedSystems.join(" · ")}</code></div></div><div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3 shrink-0"><button type="button" onClick={() => O(false)} className="px-5 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-semibold text-xs hover:bg-neutral-50">Скасувати</button><button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 flex items-center gap-2 shadow-md"><Save className="w-4 h-4" /><span>Зберегти та синхронізувати</span></button></div></form></div></div>}{de && de.isOpen && <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"><div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95"><div className="flex items-start gap-3.5"><div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0"><Trash2 className="w-5 h-5" /></div><div className="flex-1 min-w-0"><h3 className="text-base font-bold text-neutral-950">{de.title}</h3><p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">{de.description}</p></div></div><div className="mt-6 flex items-center justify-end gap-2.5"><button type="button" onClick={() => lt(null)} className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer">Скасувати</button><button type="button" id="confirm-modal-action-btn" onClick={() => {
            const K = de.onConfirm;
            lt(null), K();
          }} className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-xs cursor-pointer">{de.confirmText}</button></div></div></div>}</div> : <div className="bg-neutral-950 min-h-screen text-white flex flex-col justify-between selection:bg-emerald-500 selection:text-neutral-950">{be && <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-neutral-700 animate-in fade-in"><Check className="w-5 h-5 text-emerald-400" /><span className="text-xs font-semibold">{be}</span></div>}<header className="border-b border-neutral-800/80 px-4 sm:px-8 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold"><ShieldCheck className="w-5 h-5" /></div><div><div className="font-extrabold text-sm sm:tracking-tight text-white">POINT B · CMS</div><div className="text-[11px] text-neutral-400">Система керування сайтом</div></div></div><button onClick={() => F("index")} className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"><span>Повернутися на сайт</span><ArrowRight className="w-3.5 h-3.5" /></button></header><main className="flex-1 flex items-center justify-center px-4 py-12"><div className="w-full max-w-md"><div className="bg-neutral-900/90 rounded-3xl border border-neutral-800 p-7 sm:p-9 shadow-2xl backdrop-blur-md"><div className="text-center mb-8"><div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4"><Lock className="w-7 h-7" /></div><h1 className="text-2xl font-black sm:tracking-tight text-white">Вхід в адмін-панель</h1><p className="text-xs text-neutral-400 mt-1.5 max-w-xs mx-auto">Авторизація для керування кейсами, послугами, контактами та заявками Point B</p></div>{re && <div className="mb-6 p-3.5 rounded-2xl bg-red-950/70 border border-red-800 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in"><CircleAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /><span>{re}</span></div>}<form onSubmit={_t} className="space-y-4"><div><label className="block text-xs font-semibold text-neutral-300 mb-1.5">Електронна пошта (Логін)</label><div className="relative"><input id="admin-login-email-input" type="text" required value={B} onChange={K => D(K.target.value)} placeholder="name@company.com" className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-neutral-600" /><Mail className="w-4 h-4 text-neutral-500 absolute right-3.5 top-3.5" /></div></div><div><label className="block text-xs font-semibold text-neutral-300 mb-1.5">Пароль</label><div className="relative"><input id="admin-login-password-input" type={te ? "text" : "password"} required value={L} onChange={K => $(K.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-neutral-600 pr-10" /><button type="button" onClick={() => ae(!te)} className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-white" tabIndex={-1}>{te ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div><button type="submit" id="admin-login-submit-btn" className="w-full mt-2 py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"><Lock className="w-4 h-4" /><span>Увійти в адмінку</span></button></form></div></div></main><footer className="text-center py-4 border-t border-neutral-900 text-neutral-500 text-[11px]">Point B Group © 2025 · Захищена панель керування</footer></div>;
};

