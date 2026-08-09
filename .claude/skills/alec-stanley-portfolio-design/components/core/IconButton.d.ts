import * as React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon name. */
  icon: string;
  /** Required accessible label — also used as the tooltip. */
  label: string;
  variant?: "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export declare function IconButton(props: IconButtonProps): JSX.Element;
