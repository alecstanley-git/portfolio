import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** ok = shipped/complete. warn = in progress. fail = blocked. idle = archived. accent = featured. */
  tone?: "ok" | "warn" | "fail" | "idle" | "accent";
  /** Show the glowing signal dot. */
  dot?: boolean;
}

export declare function Badge(props: BadgeProps): JSX.Element;
