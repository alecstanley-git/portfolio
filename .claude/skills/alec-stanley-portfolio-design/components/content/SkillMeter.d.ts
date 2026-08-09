import * as React from "react";

export interface SkillMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  /** Filled segments. */
  level?: number;
  /** Total segments; keep at 5. */
  max?: number;
  /** Mono qualifier on the right, e.g. "3 yrs" or "coursework". */
  note?: string;
}

export declare function SkillMeter(props: SkillMeterProps): JSX.Element;
