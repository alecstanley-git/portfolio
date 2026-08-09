import * as React from "react";

export interface CalloutProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  title?: string;
  /** note = context. accent = headline result. warn = limitation or caveat. */
  tone?: "note" | "accent" | "warn";
  /** Override the default Lucide glyph. */
  icon?: string;
}

export declare function Callout(props: CalloutProps): JSX.Element;
