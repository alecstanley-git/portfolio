import { useSearchParams } from "react-router-dom";
import { Button, ProjectCard, SectionHeading, Select, Tag } from "../components/index.js";
import { DISCIPLINES, PROJECTS, SITE_META, TAGS, WORK, cardProps } from "../data/content.js";
import { filterProjects } from "../lib/projects.js";
import { usePageMeta } from "../lib/usePageMeta.js";

export default function Work() {
  usePageMeta("Work", SITE_META.work);

  /* Filters live in the URL so a filtered index can be linked to directly —
     project pages link their tags here as /work?tag=python. */
  const [params, setParams] = useSearchParams();
  const requestedDiscipline = params.get("discipline");
  const discipline = DISCIPLINES.includes(requestedDiscipline) ? requestedDiscipline : "all";
  // Matched ignoring case, then shown in the spelling the projects use.
  const requestedTag = (params.get("tag") || "").toLowerCase();
  const tag = TAGS.find((t) => t.toLowerCase() === requestedTag) || "all";

  const shown = filterProjects(PROJECTS, {
    discipline: discipline === "all" ? undefined : discipline,
    tag: tag === "all" ? undefined : tag,
  });
  const filtered = discipline !== "all" || tag !== "all";

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };
  const clear = () => setParams(new URLSearchParams(), { replace: true });

  return (
    <div className="container">
      <section className="section section--tight section--top">
        <SectionHeading index={WORK.index} title={WORK.title} lede={WORK.lede} />

        <div className="cluster" style={{ justifyContent: "center", alignItems: "center", gap: "var(--space-4)" }}>
          <Tag tone="data">
            {shown.length} of {PROJECTS.length}
          </Tag>
          <Select
            aria-label="Filter by discipline"
            value={discipline}
            onChange={(e) => setFilter("discipline", e.target.value)}
            style={{ width: 220 }}
            options={[
              { value: "all", label: "All disciplines" },
              ...DISCIPLINES.map((d) => ({ value: d, label: d })),
            ]}
          />
          <Select
            aria-label="Filter by tag"
            value={tag}
            onChange={(e) => setFilter("tag", e.target.value)}
            style={{ width: 220 }}
            options={[{ value: "all", label: "All tags" }, ...TAGS.map((t) => ({ value: t, label: t }))]}
          />
          {filtered ? (
            <Button variant="ghost" size="sm" iconLeft="x" onClick={clear}>
              Clear filters
            </Button>
          ) : null}
        </div>

        {shown.length ? (
          <div className="grid grid--3">
            {shown.map((p) => (
              <ProjectCard key={p.id} {...cardProps(p)} />
            ))}
          </div>
        ) : (
          <p style={{ font: "var(--type-body)", color: "var(--text-muted)", textAlign: "center" }}>
            No projects match these filters.
          </p>
        )}
      </section>
    </div>
  );
}
