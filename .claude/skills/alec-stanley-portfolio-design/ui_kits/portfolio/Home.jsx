const DS = window.AlecStanleyPortfolioDesignSystem_9e359a;
const CV = window.CV;

function Hero({ onNavigate }) {
  const { Button, Tag, StatBlock } = DS;
  return (
    <section style={{ padding: "var(--space-24) var(--gutter-lg) var(--space-16)", borderBottom: "1px solid var(--border-hairline)", background: "var(--surface-page)" }}>
      <div style={{ maxWidth: "var(--container-narrow)", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "var(--space-6)" }}>
        <img src="../../assets/portrait-alec.png" alt="Alec Stanley" style={{ width: 132, height: 132, borderRadius: "50%", border: "1px solid var(--border-line)", filter: "saturate(0.85)" }} />
        <span style={{ font: "var(--type-label)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)", color: "var(--ignition-500)" }}>
          Melbourne, VIC — Monash University
        </span>
        <h1 style={{ font: "var(--type-display)", letterSpacing: "var(--tracking-tight)", color: "var(--text-primary)", margin: 0 }}>
          {CV.name}
        </h1>
        <p style={{ font: "var(--weight-regular) var(--text-xl) / 1.55 var(--font-body)", color: "var(--text-body)", maxWidth: "46ch", margin: 0 }}>
          {CV.intro}
        </p>
        <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", justifyContent: "center" }}>
          <Tag tone="accent">Aerospace Engineering</Tag><Tag tone="accent">Astrophysics</Tag><Tag>Python</Tag><Tag>MATLAB</Tag><Tag>C++</Tag><Tag>SolidWorks</Tag><Tag>CFD</Tag>
        </div>
        <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
          <Button size="lg" iconRight="arrow-right" onClick={() => onNavigate("work")}>See the work</Button>
          <Button as="a" href={CV.cvUrl} target="_blank" rel="noopener" size="lg" variant="secondary" iconLeft="download">Download CV</Button>
        </div>
      </div>
      <div style={{ maxWidth: "var(--container-max)", margin: "var(--space-16) auto 0", display: "flex", justifyContent: "center", gap: "var(--space-20)", paddingTop: "var(--space-8)", borderTop: "1px solid var(--border-hairline)", textAlign: "center" }}>
        <StatBlock value="4" label="Year of 5" style={{ alignItems: "center" }} />
        <StatBlock value={window.PROJECTS.length} label="Technical projects" tone="accent" style={{ alignItems: "center" }} />
        <StatBlock value="2" label="Majors" style={{ alignItems: "center" }} />
        <StatBlock value="98.65" label="ATAR" style={{ alignItems: "center" }} />
      </div>
    </section>
  );
}

function Home({ onNavigate, onOpenProject }) {
  const { SectionHeading, ProjectCard, Button, Callout, Icon } = DS;
  const featured = window.PROJECTS.filter((p) => p.featured);
  return (
    <div>
      <Hero onNavigate={onNavigate} />
      <section style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--section-y) var(--gutter-lg)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-10)" }}>
        <SectionHeading index="01 / Selected work" title="Featured projects"
          lede="Some of my best work, where I learnt the most." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--space-6)", width: "100%", maxWidth: 900 }}>
          {featured.map((p) => <ProjectCard key={p.id} {...p} onOpen={() => onOpenProject(p.id)} />)}
        </div>
        <Button variant="ghost" iconRight="arrow-right" onClick={() => onNavigate("work")}>All projects</Button>
      </section>
      <section style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--gutter-lg) var(--section-y)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-10)" }}>
        <SectionHeading index="02 / Approach" title="How I work" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-10)", width: "100%", maxWidth: 900, textAlign: "center" }}>
          {[["ruler", "Model it", "An analytical first pass before any solver runs."],
            ["cpu", "Simulate it", "CAD, numerical modelling or code — with a sanity check."],
            ["gauge", "Measure it", "Test the real thing and close the loop on the model."]].map(([icon, t, d]) => (
            <div key={t} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)" }}>
              <Icon name={icon} size="xl" color="var(--ignition-500)" />
              <div style={{ font: "var(--type-h3)", color: "var(--text-primary)" }}>{t}</div>
              <div style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", maxWidth: "30ch" }}>{d}</div>
            </div>
          ))}
        </div>
        <Callout tone="accent" title="Right now" style={{ maxWidth: 640 }}>
          Fourth year of five, looking for graduate roles in aerospace design, simulation or test from 2027.
        </Callout>
      </section>
    </div>
  );
}

Object.assign(window, { Home, Hero });
