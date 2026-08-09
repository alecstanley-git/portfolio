import * as React from "react";

export interface NavItem {
  id: string;
  label: string;
}

export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Wordmark text — there is no logo mark in this system. */
  brand?: string;
  items?: NavItem[];
  activeId?: string;
  onNavigate?: (id: string) => void;
  /** Trailing node, usually a Button or IconButton row. */
  action?: React.ReactNode;
}

export declare function NavBar(props: NavBarProps): JSX.Element;
