import * as React from "react";

export interface TimelineEntryProps extends React.HTMLAttributes<HTMLElement> {
  /** Mono date range, e.g. "2023 — NOW". */
  period: string;
  title: string;
  /** Organisation or institution, rendered in the accent colour. */
  org?: string;
  description?: string;
  tags?: string[];
  /** Lights the marker dot for the present role. */
  current?: boolean;
}

export declare function TimelineEntry(props: TimelineEntryProps): JSX.Element;
