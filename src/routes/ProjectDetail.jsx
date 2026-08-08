import { Link, Navigate, useParams } from "react-router-dom";
import {
  AttachmentLink,
  Badge,
  Button,
  Callout,
  Card,
  MediaFrame,
  PdfEmbed,
  Tag,
  VideoEmbed,
} from "../components/index.js";
import { PROFILE, PROJECTS, findProject } from "../data/content.js";
import { usePageMeta } from "../lib/usePageMeta.js";

const sectionLabel = {
  font: "var(--type-label)",
  textTransform: "uppercase",
  letterSpacing: "var(--tracking-caps)",
  color: "var(--ignition-500)",
  textAlign: "center",
};

function ProjectPager({ project }) {
  const i = PROJECTS.indexOf(project);
  const newer = PROJECTS[i - 1];
  const older = PROJECTS[i + 1];
  return (
    <nav
      aria-label="Adjacent projects"
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "var(--space-4)",
        paddingTop: "var(--space-6)",
        borderTop: "1px solid var(--border-hairline)",
      }}
    >
      {newer ? (
        <Button as={Link} to={`/work/${newer.slug}`} variant="ghost" size="sm" iconLeft="arrow-left">
          {newer.id}
        </Button>
      ) : (
        <span />
      )}
      {older ? (
        <Button as={Link} to={`/work/${older.slug}`} variant="ghost" size="sm" iconRight="arrow-right">
          {older.id}
        </Button>
      ) : (
        <span />
      )}
    </nav>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = findProject(slug);

  usePageMeta(project?.title, project?.summary);

  if (!project) return <Navigate to="/work" replace />;

  const [leadVideo, ...restVideos] = project.videos;
  const [leadImage, ...restImages] = project.images;
  const figures = leadVideo ? project.images : restImages;

  return (
    <article
      className="container container--narrow"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-10)",
        paddingBlock: "var(--space-12) var(--section-y)",
      }}
    >
      <Button as={Link} to="/work" variant="ghost" size="sm" iconLeft="arrow-left" style={{ alignSelf: "flex-start" }}>
        Back to index
      </Button>

      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "var(--space-4)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "var(--space-4)",
            font: "var(--type-mono)",
            letterSpacing: "var(--tracking-wide)",
            color: "var(--text-faint)",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "var(--ignition-500)" }}>{project.id}</span>
          <span>{project.discipline}</span>
          <span>{project.date}</span>
          {project.grade ? (
            <Badge tone="accent" dot={false}>
              {project.grade}
            </Badge>
          ) : null}
        </div>
        {/* Styling left to base.css so the small-screen step down the type scale
            applies — an inline `font` would out-specify the media query. */}
        <h1>{project.title}</h1>
        <p
          style={{
            font: "var(--weight-regular) var(--text-lg) / 1.6 var(--font-body)",
            color: "var(--text-muted)",
            maxWidth: "56ch",
          }}
        >
          {project.summary}
        </p>
        <div className="cluster">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </header>

      {leadVideo ? (
        <VideoEmbed youtube={leadVideo.youtube} caption={leadVideo.caption} source={leadVideo.source} />
      ) : leadImage ? (
        <MediaFrame
          src={leadImage.src}
          file={leadImage.file}
          caption={leadImage.caption}
          width={leadImage.width}
          imageHeight={leadImage.height}
          height={280}
        />
      ) : null}

      {project.body.length ? (
        <div className="stack">
          {project.body.map((para) => (
            <p key={para.slice(0, 40)} style={{ font: "var(--type-body)", color: "var(--text-body)" }}>
              {para}
            </p>
          ))}
        </div>
      ) : null}

      {project.result ? (
        <Callout tone="accent" title="Result">
          {project.result}
        </Callout>
      ) : null}
      {project.caveat ? (
        <Callout tone="warn" title="Limitation">
          {project.caveat}
        </Callout>
      ) : null}

      {figures.length ? (
        <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
          <h2 style={sectionLabel}>Figures</h2>
          <div className={figures.length > 3 ? "grid grid--2" : "grid"}>
            {figures.map((im) => (
              <MediaFrame
                key={im.file + im.caption}
                src={im.src}
                file={im.file}
                caption={im.caption}
                width={im.width}
                imageHeight={im.height}
                height={200}
              />
            ))}
          </div>
        </section>
      ) : null}

      {restVideos.length ? (
        <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
          <h2 style={sectionLabel}>Video</h2>
          <div className={restVideos.length > 2 ? "grid grid--2" : "grid"}>
            {restVideos.map((v) => (
              <VideoEmbed key={v.source} youtube={v.youtube} caption={v.caption} source={v.source} />
            ))}
          </div>
        </section>
      ) : null}

      {project.attachments.length ? (
        <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <h2 style={sectionLabel}>Reports and files</h2>
          {project.attachments.map((a) =>
            /* Only PDFs get an inline viewer; the source-code zip has nothing to preview. */
            a.file.toLowerCase().endsWith(".pdf") ? (
              <PdfEmbed key={a.file + a.label} label={a.label} file={a.file} href={a.href} />
            ) : (
              <AttachmentLink key={a.file + a.label} label={a.label} file={a.file} href={a.href} />
            ),
          )}
        </section>
      ) : null}

      <Card
        padding="var(--space-8)"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "var(--space-4)",
        }}
      >
        <div>
          <div style={{ font: "var(--type-h3)", color: "var(--text-primary)" }}>Want the detail?</div>
          <div style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>
            Happy to share methodology, code and raw data.
          </div>
        </div>
        <Button
          as="a"
          href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(`${project.id} — ${project.title}`)}`}
          iconRight="mail"
        >
          Get in touch
        </Button>
      </Card>

      <ProjectPager project={project} />
    </article>
  );
}
