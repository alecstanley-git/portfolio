import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Uppercase mono label above the field. */
  label?: string;
  /** Mono helper line below the field. */
  hint?: string;
  /** Replaces the hint and turns the border red. */
  error?: string;
}

export declare function Input(props: InputProps): JSX.Element;
