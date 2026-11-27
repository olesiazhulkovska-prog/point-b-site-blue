import { ChartNoAxesCombined, GraduationCap, Workflow } from "lucide-react";
import { Vv } from "../data/data";
import "./AboutDifferences.css";

const ICONS = [ChartNoAxesCombined, Workflow, GraduationCap];
// Коротка версія заголовка: до « — » або «, а не»
const short = (t: string) => t.split(/ — |, а не /)[0];

export const AboutDifferences = () => (
  <ol className="ab-diff">
    {Vv.map((d, i) => {
      const Icon = ICONS[i] || Workflow;
      return (
        <li key={d.number} className="ab-diff__row">
          <span className="ab-diff__n">{d.number}</span>
          <div className="ab-diff__txt">
            {d.badge && <span className="ab-diff__badge">{d.badge}</span>}
            <div role="heading" aria-level={3} className="ab-diff__title">{short(d.title)}</div>
          </div>
          <span className="ab-diff__ico" aria-hidden="true">
            <Icon strokeWidth={2.2} />
          </span>
        </li>
      );
    })}
  </ol>
);
