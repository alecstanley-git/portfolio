const DSW = window.AlecStanleyPortfolioDesignSystem_9e359a;
const DISCIPLINES = ["Aerospace", "Astrophysics", "Engineering", "Physics", "Software"];

function Work({ onOpenProject }) {
  const { SectionHeading, ProjectCard, Select, Tag } = DSW;
  const [discipline, setDiscipline] = React.useState("all");
  const all = window.PROJECTS;
  const shown = discipline === "all" ? all : all.filter((p) => p.discipline === discipline);
  return (
    <section style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--space-16) var(--gutter-lg) var(--section-y)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-8)" }}>
      <SectionHeading index="01 / Index" title="All technical projects"
        lede="Coursework, competition builds and independent work, newest first." />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-4)" }}>
        <Tag tone="data">{shown.length} of {all.length}</Tag>
        <Select value={discipline} onChange={(e) => setDiscipline(e.target.value)} style={{ width: 220 }}
          options={[{ value: "all", label: "All disciplines" }, ...DISCIPLINES.map((d) => ({ value: d, label: d }))]} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-6)", width: "100%" }}>
        {shown.map((p) => <ProjectCard key={p.id} {...p} onOpen={() => onOpenProject(p.id)} />)}
      </div>
    </section>
  );
}

function ProjectDetail({ id, onBack }) {
  const { Button, Badge, Tag, Card, Callout, MediaFrame, VideoEmbed, AttachmentLink } = DSW;
  const p = window.PROJECTS.find((x) => x.id === id) || window.PROJECTS[0];
  return (
    <article style={{ maxWidth: "var(--container-narrow)", margin: "0 auto", padding: "var(--space-12) var(--gutter-lg) var(--section-y)", display: "flex", flexDirection: "column", gap: "var(--space-10)" }}>
      <Button variant="ghost" size="sm" iconLeft="arrow-left" onClick={onBack} style={{ alignSelf: "flex-start" }}>Back to index</Button>

      <header style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "var(--space-4)" }}>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center", gap: "var(--space-4)", font: "var(--type-mono)", letterSpacing: "var(--tracking-wide)", color: "var(--text-faint)", textTransform: "uppercase" }}>
          <span style={{ color: "var(--ignition-500)" }}>{p.id}</span><span>{p.discipline}</span><span>{p.date}</span>
          {p.grade ? <Badge tone="accent" dot={false}>{p.grade}</Badge> : null}
        </div>
        <h1 style={{ font: "var(--type-h1)", letterSpacing: "var(--tracking-tight)", color: "var(--text-primary)" }}>{p.title}</h1>
        <p style={{ font: "var(--weight-regular) var(--text-lg) / 1.6 var(--font-body)", color: "var(--text-muted)", maxWidth: "56ch" }}>{p.summary}</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "var(--space-2)" }}>{p.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      </header>

      {p.videos.length ? (
        <VideoEmbed youtube={p.videos[0].youtube} caption={p.videos[0].caption} source={p.videos[0].source} />
      ) : p.images.length ? (
        <MediaFrame src={p.images[0].src} file={p.images[0].file} caption={p.images[0].caption} height={280} />
      ) : null}

      {p.body.length ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          {p.body.map((para, i) => <p key={i} style={{ font: "var(--type-body)", color: "var(--text-body)" }}>{para}</p>)}
        </div>
      ) : null}

      {p.result ? <Callout tone="accent" title="Result">{p.result}</Callout> : null}
      {p.caveat ? <Callout tone="warn" title="Limitation">{p.caveat}</Callout> : null}

      {p.images.length > (p.videos.length ? 0 : 1) ? (
        <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
          <h2 style={{ font: "var(--type-label)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)", color: "var(--ignition-500)", textAlign: "center" }}>Figures</h2>
          <div style={{ display: "grid", gridTemplateColumns: p.images.length > 3 ? "1fr 1fr" : "1fr", gap: "var(--space-6)" }}>
            {p.images.slice(p.videos.length ? 0 : 1).map((im) => (
              <MediaFrame key={im.file} src={im.src} file={im.file} caption={im.caption} height={200} />
            ))}
          </div>
        </section>
      ) : null}

      {p.videos.length > 1 ? (
        <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
          <h2 style={{ font: "var(--type-label)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)", color: "var(--ignition-500)", textAlign: "center" }}>Video</h2>
          <div style={{ display: "grid", gridTemplateColumns: p.videos.length > 2 ? "1fr 1fr" : "1fr", gap: "var(--space-6)" }}>
            {p.videos.slice(1).map((v) => <VideoEmbed key={v.source} youtube={v.youtube} caption={v.caption} source={v.source} />)}
          </div>
        </section>
      ) : null}

      {p.attachments.length ? (
        <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <h2 style={{ font: "var(--type-label)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)", color: "var(--ignition-500)", textAlign: "center" }}>Reports &amp; files</h2>
          {p.attachments.map((a) => <AttachmentLink key={a.file} label={a.label} file={a.file} href={a.href} />)}
        </section>
      ) : null}

      <Card padding="var(--space-8)" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "var(--space-4)" }}>
        <div>
          <div style={{ font: "var(--type-h3)", color: "var(--text-primary)" }}>Want the detail?</div>
          <div style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>Happy to share methodology, code and raw data.</div>
        </div>
        <Button as="a" href={`mailto:${window.CV.email}`} iconRight="mail">Get in touch</Button>
      </Card>
    </article>
  );
}

Object.assign(window, { Work, ProjectDetail });
