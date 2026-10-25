import { Button, Card, Icon, SectionHeading } from "../components/index.js";
import { CONTACT, PROFILE, PROJECTS, SITE_META, STARRED } from "../data/content.js";
import { exampleCodes, handleFromUrl } from "../lib/projects.js";
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

  usePageMeta("Contact", SITE_META.contact);

  return (
    <div className="container container--narrow">
      <section className="section section--top">
        <SectionHeading
          index={CONTACT.index}
          title={CONTACT.title}
          lede={CONTACT.lede}
        />

        <div className="facts">
          <Fact label="Email" value={PROFILE.email} onCopy={copy} copied={copied} />
          <Fact label="LinkedIn" value={handleFromUrl(PROFILE.linkedin)} href={PROFILE.linkedin} external />
          <Fact label="GitHub" value={handleFromUrl(PROFILE.github)} href={PROFILE.github} external />
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
            <div style={{ font: "var(--type-h2)", color: "var(--text-primary)" }}>{CONTACT.noteTitle}</div>
            <p style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", maxWidth: "48ch" }}>
              {CONTACT.note.replace("{codes}", exampleCodes(STARRED, PROJECTS))}
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
