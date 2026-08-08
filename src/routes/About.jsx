import { Button, Callout, Card, SectionHeading, SkillMeter, Tag, TimelineEntry } from "../components/index.js";
import { INTERESTS, PROFILE, SKILLS, TIMELINE } from "../data/content.js";
import { usePageMeta } from "../lib/usePageMeta.js";

export default function About() {
  usePageMeta(
    "About",
    "Alec Stanley — fourth-year aerospace engineering and astrophysics student at Monash University. Education, work history and the tools I actually use.",
  );

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
        <SectionHeading index="01 / About" title="Perth to Melbourne, hardware to data" />
        <p style={{ font: "var(--type-body)", color: "var(--text-body)", maxWidth: "58ch" }}>
          I'm studying a Bachelor of Engineering (Honours) and Bachelor of Science at Monash University, Clayton —
          specialising in aerospace engineering and astrophysics, with completed minors in physics and mathematics.
        </p>
        <p style={{ font: "var(--type-body)", color: "var(--text-body)", maxWidth: "58ch" }}>
          I grew up in Perth, Western Australia and moved east at 18 to study in Melbourne. Alongside my degree I've led
          a residential community as a Resident Advisor and supervised teams at Coles — both of which taught me to stay
          composed and communicate clearly under pressure.
        </p>
        <div className="cluster">
          {INTERESTS.map((i) => (
            <Tag key={i}>{i}</Tag>
          ))}
        </div>
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
        <SectionHeading index="02 / Education & experience" title="Study, leadership and work" />
        <div style={{ width: "100%", maxWidth: "var(--container-narrow)" }}>
          {TIMELINE.map((t) => (
            <TimelineEntry key={t.title} {...t} />
          ))}
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-8)", width: "100%" }}>
        <SectionHeading
          index="03 / Skills"
          title="Tools I actually use"
          lede="Levels are self-assessed against real coursework and project work."
        />
        <div className="grid grid--3">
          {SKILLS.map((g) => (
            <Card key={g.group}>
              <div
                style={{
                  font: "var(--type-label)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-caps)",
                  color: "var(--ignition-500)",
                  marginBottom: "var(--space-5)",
                  textAlign: "center",
                }}
              >
                {g.group}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                {g.items.map((s) => (
                  <SkillMeter key={s.label} {...s} />
                ))}
              </div>
            </Card>
          ))}
        </div>
        <Callout title="Referees" style={{ maxWidth: 640 }}>
          Available on request, and listed in full on the CV.
        </Callout>
      </section>
    </div>
  );
}
