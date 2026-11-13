// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import { HeroGlow } from './HeroGlow';

export const PageBackground = ({
  hero: n
}) => <div aria-hidden="true" className="pb-page-bg absolute inset-0 z-0 pointer-events-none overflow-hidden">{n && <HeroGlow />}</div>;

