import * as React from "react";

export interface VideoEmbedProps extends React.HTMLAttributes<HTMLElement> {
  /** YouTube URL or bare video id. Omit to render the empty embed slot. */
  youtube?: string;
  caption?: string;
  /** Original video filename, shown in the empty slot. */
  source?: string;
}

export declare function VideoEmbed(props: VideoEmbedProps): JSX.Element;
