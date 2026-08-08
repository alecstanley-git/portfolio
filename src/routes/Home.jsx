import { Link } from "react-router-dom";
import { Button, Callout, Icon, ProjectCard, SectionHeading, StatBlock, Tag } from "../components/index.js";
import { APPROACH, FEATURED, PROFILE, PROJECTS } from "../data/content.js";
import { usePageMeta } from "../lib/usePageMeta.js";

const HERO_TAGS = ["Aerospace engineering", "Astrophysics", "python", "MATLAB", "C++", "SolidWorks", "CFD"];

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__inner reveal">
          <img className="hero__portrait" src={PROFILE.portraitUrl} alt="" width="132" height="132" />
          <span
            style={{
              font: "var(--type-label)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-caps)",
              color: "var(--ignition-500)",
            }}
          >
            Melbourne, VIC — Monash University
          </span>
          <h1 className="hero__title">{PROFILE.name}</h1>
          <p
            style={{
              font: "var(--weight-regular) var(--text-xl) / 1.55 var(--font-body)",
              color: "var(--text-body)",
              maxWidth: "46ch",
              margin: 0,
            }}
          >
            {PROFILE.intro}
          </p>
          <div className="cluster">
            {HERO_TAGS.map((t, i) => (
              <Tag key={t} tone={i < 2 ? "accent" : "neutral"}>
                {t}
              </Tag>
            ))}
          </div>
          <div className="cluster cluster--actions">
            <Button as={Link} to="/work" size="lg" iconRight="arrow-right">
              See the work
            </Button>
            <Button
              as="a"
              href={PROFILE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="secondary"
              iconLeft="download"
            >
              Download CV
            </Button>
          </div>
        </div>
        <div className="stat-rail">
          <StatBlock value="4" label="Year of 5" />
          <StatBlock value={PROJECTS.length} label="Technical projects" tone="accent" />
          <StatBlock value="2" label="Majors" />
          <StatBlock value="98.65" label="ATAR" />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta(
    null,
    "Technical portfolio of Alec Stanley — aerospace engineering (Honours) and astrophysics at Monash University. CFD, orbital mechanics, simulation and robotics projects.",
  );

  return (
    <>
      <Hero />

      <div className="container">
        <section className="section">
          <SectionHeading
            index="01 / Selected work"
            title="Featured projects"
            lede="Some of my best work, where I learnt the most."
          />
          <div className="grid grid--2 grid--cap">
            {FEATURED.map((p) => (
              <ProjectCard key={p.id} {...p} to={`/work/${p.slug}`} />
            ))}
          </div>
          <Button as={Link} to="/work" variant="ghost" iconRight="arrow-right">
            All projects
          </Button>
        </section>

        <section className="section section--flush">
          <SectionHeading index="02 / Approach" title="How I work" />
          <div className="grid grid--3 grid--wide grid--cap" style={{ textAlign: "center" }}>
            {APPROACH.map((a) => (
              <div
                key={a.title}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)" }}
              >
                <Icon name={a.icon} size="xl" color="var(--ignition-500)" />
                <div style={{ font: "var(--type-h3)", color: "var(--text-primary)" }}>{a.title}</div>
                <div style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", maxWidth: "30ch" }}>
                  {a.description}
                </div>
              </div>
            ))}
          </div>
          <Callout tone="accent" title="Right now" style={{ maxWidth: 640 }}>
            {PROFILE.seeking}
          </Callout>
        </section>
      </div>
    </>
  );
}
