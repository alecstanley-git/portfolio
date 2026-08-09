import * as React from "react";

export interface FooterLink {
  icon: string;
  label: string;
  href?: string;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  email?: string;
  location?: string;
  links?: FooterLink[];
  /** Mono line across the bottom, e.g. a build stamp. */
  note?: string;
}

export declare function Footer(props: FooterProps): JSX.Element;
