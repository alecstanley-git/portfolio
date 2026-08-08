import React from "react";
import { AttachmentLink } from "./AttachmentLink.jsx";
import { Button } from "../core/Button.jsx";
import { useMediaQuery } from "../../lib/useMediaQuery.js";

/* Two gates, both needed.

   The media query is the important one: iOS Safari reports
   `pdfViewerEnabled === true` and then renders a single non-scrollable page in
   an iframe, so its own capability flag cannot be trusted. A wide viewport with
   a fine pointer is the honest signal. It is also a design call — an A4 page in
   a 340px column is unreadable, and handing the file to the OS viewer is
   simply better on a phone.

   The capability check then catches desktop browsers with the built-in PDF
   viewer disabled, where an iframe would render nothing at all. */
const CAN_INLINE = "(min-width: 721px) and (hover: hover) and (pointer: fine)";

function pdfViewerAvailable() {
  if (typeof navigator === "undefined") return false;
  if (typeof navigator.pdfViewerEnabled === "boolean") return navigator.pdfViewerEnabled;
  return Boolean(navigator.mimeTypes?.["application/pdf"]);
}

/**
 * A report row that expands into an inline PDF viewer.
 *
 * The iframe is mounted only while expanded, so an unopened report costs no
 * bandwidth. Falls back to `AttachmentLink` when there is no file yet, or on a
 * device that cannot display a PDF inline.
 */
export function PdfEmbed({ label, file, href, height = 640 }) {
  const [open, setOpen] = React.useState(false);
  const [hasViewer] = React.useState(pdfViewerAvailable);
  const wideEnough = useMediaQuery(CAN_INLINE);
  const panelId = React.useId();

  if (!href || !wideEnough || !hasViewer) return <AttachmentLink label={label} file={file} href={href} />;

  return (
    <div>
      <AttachmentLink
        label={label}
        file={file}
        href={href}
        expandable
        expanded={open}
        controls={panelId}
        onToggle={() => setOpen((v) => !v)}
      />
      {open ? (
        <div
          id={panelId}
          style={{
            border: "1px solid var(--border-line)",
            borderTop: "1px solid var(--border-hairline)",
            borderRadius: "0 0 var(--radius-control) var(--radius-control)",
            background: "var(--surface-inset)",
            overflow: "hidden",
          }}
        >
          <iframe
            src={`${href}#view=FitH`}
            title={label}
            style={{ display: "block", width: "100%", height, border: 0, background: "var(--hull-800)" }}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-2)",
              padding: "var(--space-3) var(--space-4)",
              borderTop: "1px solid var(--border-hairline)",
            }}
          >
            <Button
              as="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="ghost"
              iconRight="arrow-up-right"
            >
              Open in new tab
            </Button>
            <Button as="a" href={href} download size="sm" variant="ghost" iconLeft="download">
              Download
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
