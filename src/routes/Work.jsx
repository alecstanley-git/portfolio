import { useSearchParams } from "react-router-dom";
import { ProjectCard, SectionHeading, Select, Tag } from "../components/index.js";
import { DISCIPLINES, PROJECTS, SITE_META, WORK, cardProps } from "../data/content.js";
import { usePageMeta } from "../lib/usePageMeta.js";

export default function Work() {
  usePageMeta("Work", SITE_META.work);

  /* The filter lives in the URL so a filtered index can be linked to directly. */
  const [params, setParams] = useSearchParams();
  const requested = params.get("discipline") || "all";
  const discipline = requested === "all" || DISCIPLINES.includes(requested) ? requested : "all";
  const shown = discipline === "all" ? PROJECTS : PROJECTS.filter((p) => p.discipline === discipline);

  const setDiscipline = (value) => {
    const next = new URLSearchParams(params);
    if (value === "all") next.delete("discipline");
    else next.set("discipline", value);
    setParams(next, { replace: true });
  };

  return (
    <div className="container">
      <section className="section section--tight section--top">
        <SectionHeading
          index={WORK.index}
          title={WORK.title}
          lede={WORK.lede}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-4)" }}>
          <Tag tone="data">
            {shown.length} of {PROJECTS.length}
          </Tag>
          <Select
            aria-label="Filter by discipline"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
            style={{ width: 220 }}
            options={[
              { value: "all", label: "All disciplines" },
              ...DISCIPLINES.map((d) => ({ value: d, label: d })),
            ]}
          />
        </div>

        <div className="grid grid--3">
          {shown.map((p) => (
            <ProjectCard key={p.id} {...cardProps(p)} />
          ))}
        </div>
      </section>
    </div>
  );
}
