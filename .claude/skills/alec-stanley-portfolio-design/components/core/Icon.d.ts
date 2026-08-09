import * as React from "react";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide icon name in kebab-case, e.g. "rocket", "arrow-up-right", "github". */
  name: string;
  /** Preset key or explicit pixel size. */
  size?: "sm" | "md" | "lg" | "xl" | number;
  /** Any CSS colour; defaults to currentColor. */
  color?: string;
}

export declare function Icon(props: IconProps): JSX.Element;
