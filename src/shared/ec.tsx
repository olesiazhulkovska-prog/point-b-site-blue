// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import { gc } from './gc';

export const ec = n => {
  const s = 100 - gc,
    o = s * n[0] / (n[0] + n[1]);
  return [o / 2, o + gc + (s - o) / 2];
};

