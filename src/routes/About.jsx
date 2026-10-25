import { Button, Inline, SectionHeading, TimelineEntry } from "../components/index.js";
import { ABOUT, PROFILE, SITE_META, TIMELINE } from "../data/content.js";
import { usePageMeta } from "../lib/usePageMeta.js";

export default function About() {
  usePageMeta("About", SITE_META.about);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--section-y-sm)",
        paddingBlock: "var(--space-16) var(--section-y)",
      }}
    >
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "var(--space-5)",
          maxWidth: "var(--container-narrow)",
        }}
      >
        <SectionHeading index={ABOUT.intro.index} title={ABOUT.intro.title} />
        {ABOUT.intro.paragraphs.map((para, i) => (
          <p key={i} style={{ font: "var(--type-body)", color: "var(--text-body)", maxWidth: "58ch" }}>
            <Inline text={para} />
          </p>
        ))}
        <Button
          as="a"
          href={PROFILE.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          iconLeft="download"
        >
          Download full CV
        </Button>
      </section>

      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-8)", width: "100%" }}>
        <SectionHeading index={ABOUT.timeline.index} title={ABOUT.timeline.title} />
        <div style={{ width: "100%", maxWidth: "var(--container-narrow)" }}>
          {TIMELINE.map((t) => (
            <TimelineEntry key={t.title} {...t} />
          ))}
        </div>
      </section>
    </div>
  );
}
