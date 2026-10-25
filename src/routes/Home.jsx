import { Link } from "react-router-dom";
import { Button, Callout, ProjectCard, SectionHeading, StatBlock } from "../components/index.js";
import { HOME, PROFILE, SITE_META, STARRED, STUDY_AREAS, cardProps } from "../data/content.js";
import { usePageMeta } from "../lib/usePageMeta.js";

/** Discipline chip that swaps its label for "Major"/"Minor" on hover. Both
    labels are stacked in one grid cell so the chip never changes width.
    The swap is a visual affordance only — it is not a control, so the chip is
    not focusable, and the kind is carried to assistive tech (and to anyone who
    cannot separate the two tints) by the off-screen text instead of by colour. */
function DisciplineTag({ label, kind }) {
  return (
    <span className={`disc-tag disc-tag--${kind}`}>
      <span className="disc-tag__swap">
        <span className="disc-tag__label">{label}</span>
        <span className="disc-tag__kind" aria-hidden="true">
          {kind}
        </span>
      </span>
      <span className="sr-only"> — {kind}</span>
    </span>
  );
}

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
            {HOME.eyebrow}
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
            {STUDY_AREAS.map((d) => (
              <DisciplineTag key={d.label} {...d} />
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
          {/* The rail keeps the full-width rule; the row inside it is what
              carries the equal columns. */}
          <div className="stat-rail__row">
            {HOME.stats.map((s) => (
              <StatBlock key={s.label} value={s.value} label={s.label} tone={s.tone} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta(null, SITE_META.home);

  return (
    <>
      <Hero />

      <div className="container">
        <section className="section">
          <Callout tone="accent" title="Availability" style={{ maxWidth: 640 }}>
            {PROFILE.seeking}
          </Callout>
          {/* Nothing starred: no heading over an empty grid, just the link below. */}
          {STARRED.length ? (
            <>
              <SectionHeading
                index={HOME.starred.index}
                title={HOME.starred.title}
                lede={HOME.starred.lede}
              />
              <div className="grid grid--2 grid--cap grid--starred">
                {STARRED.map((p) => (
                  <ProjectCard key={p.id} {...cardProps(p)} />
                ))}
              </div>
            </>
          ) : null}
          <Button as={Link} to="/work" variant="ghost" iconRight="arrow-right">
            All projects
          </Button>
        </section>
      </div>
    </>
  );
}
