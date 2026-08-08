import { Button, Callout, Card, SectionHeading } from "../components/index.js";
import { PROFILE } from "../data/content.js";
import { usePageMeta } from "../lib/usePageMeta.js";

const SUBJECT = encodeURIComponent("Graduate role — Alec Stanley");

function Fact({ label, value, href, external }) {
  return (
    <div className="fact">
      <span className="fact__label">{label}</span>
      {href ? (
        <a
          className="fact__value"
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {value}
        </a>
      ) : (
        <span className="fact__value">{value}</span>
      )}
    </div>
  );
}

export default function Contact() {
  usePageMeta(
    "Contact",
    "Get in touch with Alec Stanley about graduate roles, internships or any project in this portfolio.",
  );

  return (
    <div className="container container--narrow">
      <section className="section section--top">
        <SectionHeading
          index="01 / Contact"
          title="Let's talk"
          lede="Graduate roles, internships, or a question about any project here."
        />

        <div className="facts">
          <Fact label="Email" value={PROFILE.email} href={`mailto:${PROFILE.email}`} />
          <Fact label="Phone" value={PROFILE.phone} href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} />
          <Fact label="LinkedIn" value="alec-stanley" href={PROFILE.linkedin} external />
          <Fact label="Based in" value={`${PROFILE.location} · ${PROFILE.institution}`} />
        </div>

        <Card accent padding="var(--space-8)" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "var(--space-4)",
            }}
          >
            <div style={{ font: "var(--type-h2)", color: "var(--text-primary)" }}>Email is the fastest way</div>
            <p style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", maxWidth: "48ch" }}>
              I reply within a couple of days. If you're asking about a specific project, name the code — P-013, P-011
              and so on — and I'll send the report, the code and the raw data.
            </p>
            <div className="cluster cluster--actions">
              <Button as="a" href={`mailto:${PROFILE.email}?subject=${SUBJECT}`} size="lg" iconRight="mail">
                Email me
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
        </Card>

        <Callout tone="accent" title="Availability" style={{ maxWidth: 640 }}>
          {PROFILE.seeking}
        </Callout>
      </section>
    </div>
  );
}
