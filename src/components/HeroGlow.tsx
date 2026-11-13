// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import { useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ke } from '../shared/ke';

export const HeroGlow = () => {
  const n = useReducedMotion(),
    {
      scrollY: s
    } = useScroll(),
    o = useTransform(s, [0, 900], n ? [0, 0] : [0, 360]);
  return <ke.div className="absolute right-0 top-0 h-[760px] w-[min(980px,100%)]" style={{
    y: o,
    background: "radial-gradient(ellipse 70% 75% at 100% 0%, var(--glow-peach) 0%, rgba(255,180,94,0) 70%)"
  }} />;
};

