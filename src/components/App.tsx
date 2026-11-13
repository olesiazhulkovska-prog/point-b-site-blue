// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import { SiteProvider } from "../context/SiteContext";
import { AppContent } from "./AppContent";

export function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
}
