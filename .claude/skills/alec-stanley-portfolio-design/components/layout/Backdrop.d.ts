import * as React from "react";

export interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Parallax rate relative to the page, 0–1. Defaults to 0.15. 0 pins the grid
   * to the viewport. Anything above ~0.25 reads as the page having two speeds.
   */
  drift?: number;
}

/** The page's blueprint-grid backdrop. Mount once, in the page shell. */
export declare function Backdrop(props: BackdropProps): JSX.Element;
