import * as React from "react";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLElement> {
  /** Mono eyebrow, conventionally "01 / PROJECTS". */
  index?: string;
  title: string;
  /** One-sentence supporting line. */
  lede?: string;
  /** Trailing node, usually a Button. */
  action?: React.ReactNode;
  /** Centred by default; "left" puts the action inline on the right. */
  align?: "left" | "center";
}

export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
