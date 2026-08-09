import * as React from "react";

export interface AttachmentLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Human label, e.g. "Full report (10/10)". */
  label: string;
  /** Filename — its extension picks the icon and the type stamp. */
  file?: string;
  /** URL of the file. Omit and the row renders dashed with a FILE PENDING stamp. */
  href?: string;
}

export declare function AttachmentLink(props: AttachmentLinkProps): JSX.Element;
