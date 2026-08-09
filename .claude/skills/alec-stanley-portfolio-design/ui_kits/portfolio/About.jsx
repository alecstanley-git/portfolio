const DSA = window.AlecStanleyPortfolioDesignSystem_9e359a;
const CVA = window.CV;

function About() {
  const { SectionHeading, TimelineEntry, SkillMeter, Card, Callout, Button, Tag } = DSA;
  return (
    <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--space-16) var(--gutter-lg) var(--section-y)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--section-y-sm)" }}>
      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "var(--space-5)", maxWidth: "var(--container-narrow)" }}>
        <SectionHeading index="01 / About" title="Perth to Melbourne, hardware to data" />
        <p style={{ font: "var(--type-body)", color: "var(--text-body)", maxWidth: "58ch" }}>
          I'm studying a Bachelor of Engineering (Honours) and Bachelor of Science at Monash University, Clayton — specialising in aerospace engineering and astrophysics, with completed minors in physics and mathematics.
        </p>
        <p style={{ font: "var(--type-body)", color: "var(--text-body)", maxWidth: "58ch" }}>
          I grew up in Perth, Western Australia and moved east at 18 to study in Melbourne. Alongside my degree I've led a residential community as a Resident Advisor and supervised teams at Coles — both of which taught me to stay composed and communicate clearly under pressure.
        </p>
        <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", justifyContent: "center" }}>
          {window.INTERESTS.map((i) => <Tag key={i}>{i}</Tag>)}
        </div>
        <Button as="a" href={CVA.cvUrl} target="_blank" rel="noopener" variant="secondary" iconLeft="download">Download full CV</Button>
      </section>

      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-8)", width: "100%" }}>
        <SectionHeading index="02 / Education & experience" title="Study, leadership and work" />
        <div style={{ width: "100%", maxWidth: "var(--container-narrow)" }}>
          {window.TIMELINE.map((t) => <TimelineEntry key={t.title} {...t} />)}
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-8)", width: "100%" }}>
        <SectionHeading index="03 / Skills" title="Tools I actually use" lede="Levels are self-assessed against real coursework and project work." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-6)", width: "100%" }}>
          {window.SKILLS.map((g) => (
            <Card key={g.group}>
              <div style={{ font: "var(--type-label)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)", color: "var(--ignition-500)", marginBottom: "var(--space-5)", textAlign: "center" }}>{g.group}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                {g.items.map((s) => <SkillMeter key={s.label} {...s} />)}
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

function Contact() {
  const { SectionHeading, Input, Textarea, Select, Button, Card } = DSA;
  const [sent, setSent] = React.useState(false);
  return (
    <section style={{ maxWidth: "var(--container-narrow)", margin: "0 auto", padding: "var(--space-16) var(--gutter-lg) var(--section-y)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-10)" }}>
      <SectionHeading index="04 / Contact" title="Let's talk" lede="Graduate roles, internships, or a question about any project here." />
      <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-12)", font: "var(--type-mono)", color: "var(--text-faint)", lineHeight: 2, textAlign: "center", flexWrap: "wrap" }}>
        <span>EMAIL<br /><a href={`mailto:${CVA.email}`} style={{ color: "var(--text-link)" }}>{CVA.email}</a></span>
        <span>PHONE<br /><a href={`tel:${CVA.phone.replace(/\s/g, "")}`} style={{ color: "var(--text-link)" }}>{CVA.phone}</a></span>
        <span>LINKEDIN<br /><a href={CVA.linkedin} target="_blank" rel="noopener" style={{ color: "var(--text-link)" }}>ALEC STANLEY</a></span>
        <span>CV<br /><a href={CVA.cvUrl} target="_blank" rel="noopener" style={{ color: "var(--text-link)" }}>DOWNLOAD PDF</a></span>
      </div>
      <Card accent padding="var(--space-8)" style={{ width: "100%", maxWidth: 560 }}>
        {sent ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", padding: "var(--space-8) 0", textAlign: "center" }}>
            <span style={{ font: "var(--type-h2)", color: "var(--text-primary)" }}>Message sent</span>
            <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>I'll get back to you within a couple of days.</span>
            <Button variant="ghost" onClick={() => setSent(false)} style={{ alignSelf: "center", marginTop: "var(--space-4)" }}>Send another</Button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <Input label="Name" placeholder="Your name" required />
              <Input label="Email" type="email" placeholder="you@company.com" required />
            </div>
            <Select label="Enquiry" options={[{ value: "grad", label: "Graduate role" }, { value: "intern", label: "Internship" }, { value: "project", label: "Question about a project" }, { value: "other", label: "Something else" }]} />
            <Textarea label="Message" rows={5} placeholder="What are you working on?" />
            <Button type="submit" fullWidth iconRight="send">Send message</Button>
          </form>
        )}
      </Card>
    </section>
  );
}

Object.assign(window, { About, Contact });
