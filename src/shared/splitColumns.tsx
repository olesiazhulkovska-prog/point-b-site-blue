// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import { COLUMN_GAP } from "./COLUMN_GAP";
export const splitColumns = (n) => {
  const s = 100 - COLUMN_GAP,
    o = (s * n[0]) / (n[0] + n[1]);
  return [o / 2, o + COLUMN_GAP + (s - o) / 2];
};
