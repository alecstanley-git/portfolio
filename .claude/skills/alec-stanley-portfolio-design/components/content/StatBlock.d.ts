import * as React from "react";

export interface StatBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  /** Uppercase mono caption below the figure. */
  label: string;
  /** Small trailing unit, e.g. "kN", "yrs", "%". */
  unit?: string;
  tone?: "default" | "accent";
}

export declare function StatBlock(props: StatBlockProps): JSX.Element;
