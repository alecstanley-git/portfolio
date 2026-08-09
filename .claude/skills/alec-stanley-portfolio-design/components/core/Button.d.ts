import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  /** primary = one per view. secondary = neutral. ghost = in-content. danger = destructive. */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  /** Lucide icon name shown before the label. */
  iconLeft?: string;
  /** Lucide icon name shown after the label. */
  iconRight?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  /** Render as another element, e.g. "a" for a link-button. */
  as?: "button" | "a";
  href?: string;
}

export declare function Button(props: ButtonProps): JSX.Element;
