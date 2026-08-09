import * as React from "react";

export interface MediaFrameProps extends React.HTMLAttributes<HTMLElement> {
  /** Image URL. Omit to render the empty drop slot. */
  src?: string;
  alt?: string;
  /** Caption below the figure. */
  caption?: string;
  /** Original filename, shown inside the empty slot so the right asset can be dropped in. */
  file?: string;
  /** Height of the empty slot in px. */
  height?: number;
}

export declare function MediaFrame(props: MediaFrameProps): JSX.Element;
