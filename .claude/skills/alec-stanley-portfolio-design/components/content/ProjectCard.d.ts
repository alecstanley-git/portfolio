import * as React from "react";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Mono project code, e.g. "P-004". */
  id?: string;
  title: string;
  summary: string;
  /** e.g. "Aerospace", "Astrophysics", "Software". */
  discipline?: string;
  year?: string | number;
  status?: { label: string; tone?: "ok" | "warn" | "fail" | "idle" | "accent" };
  /** Tech stack chips, max ~6. */
  tags?: string[];
  /** Image URL for the header band; falls back to the grid backdrop. */
  image?: string;
  onOpen?: () => void;
}

export declare function ProjectCard(props: ProjectCardProps): JSX.Element;
