// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import React from "react";
import { X } from "lucide-react";
import { useSite } from "../context/SiteContext";
import { LeadForm } from "./LeadForm";
import { WhyChoosePointB } from "./WhyChoosePointB";
import { AboutPage } from "../pages/AboutPage";
import { ServicePage } from "../pages/ServicePage";
import { CasesPage } from "../pages/CasesPage";
import { ContactPage } from "../pages/ContactPage";
import { ThankYouPage } from "../pages/ThankYouPage";
import { CaseDetailPage } from "../pages/CaseDetailPage";
import { NotFoundPage } from "../pages/NotFoundPage";
const PrivacyPage = React.lazy(() =>
  import("../pages/PrivacyPage").then((m) => ({ default: m.PrivacyPage })),
);
const AdminPage = React.lazy(() =>
  import("../pages/AdminPage").then((m) => ({ default: m.AdminPage })),
);
import { PageBackground } from "./PageBackground";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileTabBar } from "./MobileTabBar";
import { CookieBanner } from "./CookieBanner";

export const C_tq = () => {
  const {
    isLeadModalOpen: n,
    closeLeadModal: s,
    selectedServiceForModal: o,
    currentPage: i,
  } = useSite();
  return n ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[color:var(--card)] backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={s}
    >
      <div
        className="relative w-full max-w-5xl lg:max-w-6xl max-h-[92vh] bg-[color:var(--card)] rounded-3xl shadow-2xl overflow-y-auto animate-in zoom-in-95 duration-200 my-auto border border-[color:var(--card-border)]"
        onClick={(d) => d.stopPropagation()}
      >
        <button
          id="close-lead-modal-btn"
          onClick={s}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full text-[color:var(--muted)] hover:text-[color:var(--ink)] hover:bg-[color:var(--card)] transition-colors z-20 bg-[color:var(--card)] backdrop-blur-xs shadow-xs"
          aria-label="Закрити"
        >
          <X className="w-5 h-5" />
        </button>
        <LeadForm
          title="Заявка на консультацію"
          subtitle="Розкажіть коротко про ваш бізнес і задачу — підготуємо персональний план та розрахуємо орієнтовну вартість."
          submitButtonText="Отримати план автоматизації"
          defaultService={o}
          sourcePage={`modal-${i}`}
          className="border-0 shadow-none bg-transparent p-6 sm:p-10 md:p-14"
        />
      </div>
    </div>
  ) : null;
};

export const AppContent = () => {
  const { currentPage: n, currentPath: s, cases: o } = useSite(),
    i = () => {
      switch (n) {
        case "index":
          return <WhyChoosePointB />;
        case "about":
          return <AboutPage />;
        case "keycrm":
          return <ServicePage serviceType="keycrm" />;
        case "ai-bots":
          return <ServicePage serviceType="ai-bots" />;
        case "analytics":
          return <ServicePage serviceType="analytics" />;
        case "cases":
          return <CasesPage />;
        case "contact":
          return <ContactPage />;
        case "privacy":
          return <PrivacyPage />;
        case "thank-you":
          return <ThankYouPage />;
        case "admin":
          return <AdminPage />;
        case "case-detail":
          return <CaseDetailPage slug={s || ""} />;
        default: {
          const x = s || n,
            p = o.find(
              (f) =>
                f.slug === x ||
                f.slug === n ||
                f.id === x ||
                f.slug === `case-${x}` ||
                f.id === `case-${x}` ||
                f.slug === x.replace(/^case-/, ""),
            );
          return p ? <CaseDetailPage slug={p.slug} /> : <NotFoundPage />;
        }
      }
    },
    d = n === "admin";
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[color:var(--ink)] font-sans antialiased selection:bg-[#F98513] selection:text-[#1111a1] relative">
      <PageBackground hero={n === "index"} />
      {!d && <Header />}
      <main className="flex-grow relative z-10">
        <React.Suspense fallback={null}>{i()}</React.Suspense>
      </main>
      {!d && <Footer />}
      <C_tq />
      {!d && <MobileTabBar />}
      <CookieBanner />
    </div>
  );
};
