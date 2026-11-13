// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import * as l from 'react/jsx-runtime';
import React from 'react';

export const C_ii = ({
  text: n
}) => {
  if (!n) return null;
  const s = n.split(/(keyCRM)/g);
  return <l.Fragment>{s.map((o, i) => o === "keyCRM" ? <span key={i} className="normal-case">keyCRM</span> : <React.Fragment key={i}>{o}</React.Fragment>)}</l.Fragment>;
};

