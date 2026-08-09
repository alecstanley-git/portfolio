import * as React from "react";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** neutral = tech stack. accent = highlighted skill. data = measurement/quantity. */
  tone?: "neutral" | "accent" | "data";
  size?: "sm" | "md";
}

export declare function Tag(props: TagProps): JSX.Element;
