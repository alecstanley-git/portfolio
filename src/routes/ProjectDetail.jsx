import { Link, Navigate, useParams } from "react-router-dom";
import {
  AttachmentLink,
  Badge,
  Button,
  Callout,
  Card,
  MediaFrame,
  PdfEmbed,
  RichBody,
  SectionHeading,
  Tag,
  VideoEmbed,
} from "../components/index.js";
import { PROJECTS, findProject, isRetired } from "../data/content.js";
import { inlineAttachmentFiles } from "../lib/projects.js";
import { usePageMeta } from "../lib/usePageMeta.js";
import { useCopyEmail } from "../lib/useCopyEmail.js";

const sectionLabel = {
  font: "var(--type-label)",
  textTransform: "uppercase",
  letterSpacing: "var(--tracking-caps)",
  color: "var(--ignition-500)",
  textAlign: "center",
};

/* Only PDFs get an inline viewer; a zip or other file has nothing to preview. */
function AttachmentRow({ attachment: a }) {
  return a.file.toLowerCase().endsWith(".pdf") ? (
    <PdfEmbed label={a.label} file={a.file} href={a.href} />
  ) : (
    <AttachmentLink label={a.label} file={a.file} href={a.href} />
  );
}

/** Shown at the URL of a deleted project, so old links explain themselves. */
function RetiredProject({ slug }) {
  usePageMeta("Retired project");
  return (
    <div className="container container--narrow">
      <section className="section section--top">
        <SectionHeading
          index={`${slug.toUpperCase()} / Retired`}
          title="This project has been retired"
          lede="It has been removed from the portfolio."
        />
        <div className="cluster cluster--actions">
          <Button as={Link} to="/work" iconRight="arrow-right">
            All projects
          </Button>
          <Button as={Link} to="/" variant="secondary">
            Back to home
          </Button>
        </div>
      </section>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = findProject(slug);
  if (project) return <Project project={project} />;
  if (isRetired(slug)) return <RetiredProject slug={slug} />;
  return <Navigate to="/work" replace />;
}

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

function Project({ project }) {
  const { copy: copyEmail, copied: emailCopied } = useCopyEmail();

  usePageMeta(project.title, project.summary);

  const inline = inlineAttachmentFiles(project.body);
  const bottomAttachments = project.attachments.filter((a) => !inline.has(a.file));
  const renderAttachment = (file) => {
    const a = project.attachments.find((x) => x.file === file);
    return a ? <AttachmentRow attachment={a} /> : null;
  };

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
          <span>{project.displayDate}</span>
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
          {/* Each tag opens the index filtered to it. */}
          {project.tags.map((t) => (
            <Link key={t} className="tag-link" to={`/work?tag=${encodeURIComponent(t)}`} title={`All projects tagged ${t}`}>
              <Tag>{t}</Tag>
            </Link>
          ))}
        </div>
      </header>

      {leadVideo ? (
        <VideoEmbed
          youtube={leadVideo.youtube}
          caption={leadVideo.caption}
          source={leadVideo.source}
          aspect={leadVideo.aspect}
        />
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

      {project.body.length ? <RichBody blocks={project.body} renderAttachment={renderAttachment} /> : null}

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
              <VideoEmbed key={v.source} youtube={v.youtube} caption={v.caption} source={v.source} aspect={v.aspect} />
            ))}
          </div>
        </section>
      ) : null}

      {bottomAttachments.length ? (
        <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <h2 style={sectionLabel}>Reports and files</h2>
          {bottomAttachments.map((a) => (
            <AttachmentRow key={a.file + a.label} attachment={a} />
          ))}
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
        <Button onClick={copyEmail} iconRight={emailCopied ? "check" : "copy"}>
          Copy email address
        </Button>
      </Card>

      <ProjectPager project={project} />
    </article>
  );
}
