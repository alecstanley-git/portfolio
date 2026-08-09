import { Button, Card, Icon, SectionHeading } from "../components/index.js";
import { PROFILE } from "../data/content.js";
import { usePageMeta } from "../lib/usePageMeta.js";
import { useCopyEmail } from "../lib/useCopyEmail.js";

/* A fact is plain text, a link, or — for the address — a copy action. */
function Fact({ label, value, href, external, onCopy, copied }) {
  return (
    <div className="fact">
      <span className="fact__label">{label}</span>
      {onCopy ? (
        <button
          type="button"
          className="fact__value copy-email"
          onClick={onCopy}
          title={copied ? "Copied" : "Copy email address"}
        >
          {value}
          <Icon name={copied ? "check" : "copy"} size="sm" />
        </button>
      ) : href ? (
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
  const { copy, copied } = useCopyEmail();

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
          <Fact label="Email" value={PROFILE.email} onCopy={copy} copied={copied} />
          <Fact label="LinkedIn" value="alec-stanley" href={PROFILE.linkedin} external />
          <Fact label="GitHub" value="alecstanley-git" href={PROFILE.github} external />
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
              I reply within a couple of days. If you're asking about a specific project, name the code (P-013, P-011
              and so on) and I'll be happy to discuss the work further and offer more resources.
            </p>
            <div className="cluster cluster--actions">
              {/* Label stays fixed so the confirmation state does not reflow
                  the button row; the icon and the toast carry the feedback. */}
              <Button onClick={copy} size="lg" iconRight={copied ? "check" : "copy"}>
                Copy email address
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
      </section>
    </div>
  );
}
