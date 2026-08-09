import * as React from "react";

export interface ToastProviderProps {
  children?: React.ReactNode;
  /** How long a toast stays on screen, in ms. Defaults to 2600. */
  duration?: number;
}

/** Mounts the live region. Wrap the page shell in it once. */
export declare function ToastProvider(props: ToastProviderProps): JSX.Element;

/**
 * Returns the raise function. `icon` is any glyph in the house set — "check"
 * for a completed action, "triangle-alert" when the action was refused.
 */
export declare function useToast(): (message: string, icon?: string) => void;
