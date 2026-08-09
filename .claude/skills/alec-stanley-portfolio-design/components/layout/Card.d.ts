import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Adds hover lift + border brightening. Use for anything clickable. */
  interactive?: boolean;
  /** CSS padding value; defaults to var(--space-6). */
  padding?: string;
  /** Draws the 2px ignition rule across the top edge — reserve for featured surfaces. */
  accent?: boolean;
}

export declare function Card(props: CardProps): JSX.Element;
