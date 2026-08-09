/* @ds-bundle: {"format":4,"namespace":"AlecStanleyPortfolioDesignSystem_9e359a","components":[{"name":"AttachmentLink","sourcePath":"components/content/AttachmentLink.jsx"},{"name":"Callout","sourcePath":"components/content/Callout.jsx"},{"name":"MediaFrame","sourcePath":"components/content/MediaFrame.jsx"},{"name":"ProjectCard","sourcePath":"components/content/ProjectCard.jsx"},{"name":"SkillMeter","sourcePath":"components/content/SkillMeter.jsx"},{"name":"StatBlock","sourcePath":"components/content/StatBlock.jsx"},{"name":"TimelineEntry","sourcePath":"components/content/TimelineEntry.jsx"},{"name":"ToastProvider","sourcePath":"components/content/Toast.jsx"},{"name":"VideoEmbed","sourcePath":"components/content/VideoEmbed.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Backdrop","sourcePath":"components/layout/Backdrop.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"Footer","sourcePath":"components/layout/Footer.jsx"},{"name":"NavBar","sourcePath":"components/layout/NavBar.jsx"},{"name":"SectionHeading","sourcePath":"components/layout/SectionHeading.jsx"}],"sourceHashes":{"components/content/AttachmentLink.jsx":"91eca127c0d6","components/content/Callout.jsx":"b45af3d2d42b","components/content/MediaFrame.jsx":"7646ae0ccaa7","components/content/ProjectCard.jsx":"f30fcbfaae0f","components/content/SkillMeter.jsx":"7913edc4ef47","components/content/StatBlock.jsx":"3149a43154ea","components/content/TimelineEntry.jsx":"a27c6213487c","components/content/VideoEmbed.jsx":"e0914b99adb1","components/core/Badge.jsx":"c336c0de7cdf","components/core/Button.jsx":"2e2ec831702b","components/core/Icon.jsx":"6780f96678de","components/core/IconButton.jsx":"2e7f4bc85a74","components/core/Tag.jsx":"bb65149d40ad","components/forms/Input.jsx":"78b9ef950bc8","components/forms/Select.jsx":"2414bd7f4bcc","components/forms/Textarea.jsx":"d0206ddaa704","components/layout/Card.jsx":"0d3b3f22b0a9","components/layout/Footer.jsx":"c95ac23b4db5","components/layout/NavBar.jsx":"bb370c419052","components/layout/SectionHeading.jsx":"163ff3d6c614","ui_kits/portfolio/About.jsx":"f376b262e2a7","ui_kits/portfolio/Home.jsx":"6e87ea6c7fd7","ui_kits/portfolio/Work.jsx":"484e1d221d48","ui_kits/portfolio/data.js":"d5c15b005ce6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AlecStanleyPortfolioDesignSystem_9e359a = window.AlecStanleyPortfolioDesignSystem_9e359a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/SkillMeter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Segmented proficiency readout — deliberately coarse (5 segments), never a percentage. */
function SkillMeter({
  label,
  level = 3,
  max = 5,
  note,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-medium) var(--text-sm) / 1.2 var(--font-body)",
      color: "var(--text-primary)"
    }
  }, label), note ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, note) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3
    },
    role: "img",
    "aria-label": `${label}: ${level} of ${max}`
  }, Array.from({
    length: max
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: 4,
      borderRadius: "var(--radius-xs)",
      background: i < level ? "var(--ignition-500)" : "var(--hull-700)",
      boxShadow: i < level ? "0 0 10px var(--ignition-tint-strong)" : "none"
    }
  }))));
}
Object.assign(__ds_scope, { SkillMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SkillMeter.jsx", error: String((e && e.message) || e) }); }

// components/content/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Big mono figure with a label — GPA, years, counts, measurements. */
function StatBlock({
  value,
  label,
  unit,
  tone = "default",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 4,
      font: `var(--weight-bold) var(--text-3xl) / 1 var(--font-display)`,
      color: tone === "accent" ? "var(--ignition-500)" : "var(--text-primary)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, value, unit ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-medium) var(--text-md) / 1 var(--font-mono)",
      color: "var(--text-faint)"
    }
  }, unit) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)",
      color: "var(--text-faint)"
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  ok: {
    fg: "var(--state-ok)",
    bg: "var(--state-ok-tint)"
  },
  warn: {
    fg: "var(--state-warn)",
    bg: "var(--state-warn-tint)"
  },
  fail: {
    fg: "var(--state-fail)",
    bg: "var(--state-fail-tint)"
  },
  idle: {
    fg: "var(--text-faint)",
    bg: "var(--hull-800)"
  },
  accent: {
    fg: "var(--ignition-500)",
    bg: "var(--ignition-tint)"
  }
};

/** Uppercase status marker with an optional signal dot. */
function Badge({
  children,
  tone = "idle",
  dot = true,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.idle;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 22,
      padding: "0 8px",
      borderRadius: "var(--radius-pill)",
      background: t.bg,
      color: t.fg,
      font: "var(--type-label)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: t.fg,
      boxShadow: `0 0 8px ${t.fg}`
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24
};
const CACHE = window.__lucideCache = window.__lucideCache || {};
function load(name) {
  if (!CACHE[name]) {
    CACHE[name] = fetch(`https://unpkg.com/lucide-static@0.363.0/icons/${name}.svg`).then(r => r.ok ? r.text() : "").catch(() => "");
  }
  return CACHE[name];
}

/** Lucide glyph inlined as SVG so it inherits currentColor. */
function Icon({
  name,
  size = "md",
  color = "currentColor",
  style,
  ...rest
}) {
  const px = typeof size === "number" ? size : SIZES[size] || SIZES.md;
  const [markup, setMarkup] = React.useState("");
  React.useEffect(() => {
    let live = true;
    load(name).then(svg => {
      if (!live || !svg) return;
      setMarkup(svg.replace(/<\?xml[^>]*\?>/g, "").replace(/width="[^"]*"/, `width="${px}"`).replace(/height="[^"]*"/, `height="${px}"`).replace(/stroke="[^"]*"/g, 'stroke="currentColor"'));
    });
    return () => {
      live = false;
    };
  }, [name, px]);
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    "data-icon": name,
    dangerouslySetInnerHTML: {
      __html: markup
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: px,
      height: px,
      flex: "0 0 auto",
      color,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/content/AttachmentLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ICONS = {
  pdf: "file-text",
  zip: "file-archive",
  docx: "file-type",
  default: "paperclip"
};

/** Row-style link to a report, certificate or code bundle. */
function AttachmentLink({
  label,
  file,
  href,
  style,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const ext = (file || "").split(".").pop().toLowerCase();
  const missing = !href;
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href || undefined,
    target: href ? "_blank" : undefined,
    rel: "noopener",
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      padding: "var(--space-3) var(--space-4)",
      borderRadius: "var(--radius-control)",
      border: `1px ${missing ? "dashed" : "solid"} ${hovered && !missing ? "var(--border-strong)" : "var(--border-line)"}`,
      background: hovered && !missing ? "var(--hull-800)" : "var(--surface-inset)",
      color: missing ? "var(--text-faint)" : hovered ? "var(--ignition-400)" : "var(--text-body)",
      textDecoration: "none",
      cursor: missing ? "default" : "pointer",
      transition: "var(--transition-control)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ICONS[ext] || ICONS.default,
    size: "md",
    color: missing ? "var(--text-faint)" : "var(--ignition-500)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-medium) var(--text-sm) / 1.2 var(--font-display)",
      flex: 1
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, missing ? "FILE PENDING" : ext.toUpperCase()), missing ? null : /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-up-right",
    size: "sm"
  }));
}
Object.assign(__ds_scope, { AttachmentLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/AttachmentLink.jsx", error: String((e && e.message) || e) }); }

// components/content/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  note: {
    fg: "var(--plasma-500)",
    bg: "var(--plasma-tint)",
    icon: "info"
  },
  accent: {
    fg: "var(--ignition-500)",
    bg: "var(--ignition-tint)",
    icon: "zap"
  },
  warn: {
    fg: "var(--state-warn)",
    bg: "var(--state-warn-tint)",
    icon: "triangle-alert"
  }
};

/** Inline aside for a caveat, result or key finding. */
function Callout({
  children,
  title,
  tone = "note",
  icon,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.note;
  return /*#__PURE__*/React.createElement("aside", _extends({
    style: {
      display: "flex",
      gap: "var(--space-3)",
      padding: "var(--space-4) var(--space-5)",
      background: t.bg,
      borderInlineStart: `2px solid ${t.fg}`,
      borderRadius: "0 var(--radius-md) var(--radius-md) 0",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon || t.icon,
    size: "md",
    color: t.fg,
    style: {
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)"
    }
  }, title ? /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-semibold) var(--text-sm) / 1.3 var(--font-display)",
      color: t.fg
    }
  }, title) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-body)"
    }
  }, children)));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Callout.jsx", error: String((e && e.message) || e) }); }

// components/content/MediaFrame.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Figure frame: renders an image when `src` is supplied, otherwise a labelled drop slot. */
function MediaFrame({
  src,
  alt,
  caption,
  file,
  height = 320,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt || caption || "",
    style: {
      width: "100%",
      display: "block",
      borderRadius: "var(--radius-card)",
      border: "1px solid var(--border-hairline)",
      filter: "saturate(0.9)"
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-2)",
      background: "var(--surface-inset)",
      border: "1px dashed var(--border-line)",
      borderRadius: "var(--radius-card)",
      color: "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "image",
    size: "lg"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)"
    }
  }, "Image slot"), file ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)"
    }
  }, file) : null), caption ? /*#__PURE__*/React.createElement("figcaption", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-muted)",
      textAlign: "center"
    }
  }, caption) : null);
}
Object.assign(__ds_scope, { MediaFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/MediaFrame.jsx", error: String((e && e.message) || e) }); }

// components/content/Toast.jsx
try { (() => {
const ToastContext = React.createContext(() => {
});
const VISIBLE_MS = 2600;
function useToast() {
  return React.useContext(ToastContext);
}
function ToastProvider({ children, duration = VISIBLE_MS }) {
  const [toast, setToast] = React.useState(null);
  const timer = React.useRef(null);
  const showToast = React.useCallback(
    (message, icon = "check") => {
      clearTimeout(timer.current);
      setToast({ id: Date.now(), message, icon });
      timer.current = setTimeout(() => setToast(null), duration);
    },
    [duration]
  );
  React.useEffect(() => () => clearTimeout(timer.current), []);
  return /* @__PURE__ */ React.createElement(ToastContext.Provider, { value: showToast }, children, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "no-print",
      role: "status",
      "aria-live": "polite",
      style: {
        position: "fixed",
        left: "50%",
        bottom: "var(--space-8)",
        zIndex: 60,
        transform: "translateX(-50%)",
        maxWidth: "calc(100% - (var(--gutter-lg) * 2))",
        pointerEvents: "none"
      }
    },
    toast ? /* @__PURE__ */ React.createElement(ToastBox, { key: toast.id, icon: toast.icon, message: toast.message }) : null
  ));
}
function ToastBox({ icon, message }) {
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-5)",
        background: "var(--surface-raised)",
        border: "1px solid var(--border-line)",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-lg)",
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(8px)",
        transition: "opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)"
      }
    },
    /* @__PURE__ */ React.createElement(__ds_scope.Icon, { name: icon, size: "md", color: "var(--ignition-500)" }),
    /* @__PURE__ */ React.createElement("span", { style: { font: "var(--type-body-sm)", color: "var(--text-primary)", overflowWrap: "anywhere" } }, message)
  );
}
Object.assign(__ds_scope, { ToastProvider, useToast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Toast.jsx", error: String((e && e.message) || e) }); }

// components/content/VideoEmbed.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function youtubeId(url) {
  if (!url) return null;
  const m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{6,})/);
  return m ? m[1] : /^[\w-]{6,}$/.test(url) ? url : null;
}

/** 16:9 video block — YouTube embed when `youtube` is set, otherwise a labelled placeholder. */
function VideoEmbed({
  youtube,
  caption,
  source,
  style,
  ...rest
}) {
  const id = youtubeId(youtube);
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      aspectRatio: "16 / 9",
      borderRadius: "var(--radius-card)",
      overflow: "hidden",
      border: id ? "1px solid var(--border-hairline)" : "1px dashed var(--border-line)",
      background: "var(--surface-inset)"
    }
  }, id ? /*#__PURE__*/React.createElement("iframe", {
    src: `https://www.youtube.com/embed/${id}`,
    title: caption || "Video",
    allow: "accelerometer; clipboard-write; encrypted-media; picture-in-picture",
    allowFullScreen: true,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      border: 0
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-2)",
      color: "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "youtube",
    size: "xl",
    color: "var(--ignition-500)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)"
    }
  }, "YouTube embed slot"), source ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)"
    }
  }, source) : null)), caption ? /*#__PURE__*/React.createElement("figcaption", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-muted)",
      textAlign: "center"
    }
  }, caption) : null);
}
Object.assign(__ds_scope, { VideoEmbed });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/VideoEmbed.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZE = {
  sm: {
    padding: "0 10px",
    height: 30,
    font: "var(--text-xs)",
    gap: 6
  },
  md: {
    padding: "0 16px",
    height: 38,
    font: "var(--text-sm)",
    gap: 8
  },
  lg: {
    padding: "0 22px",
    height: 46,
    font: "var(--text-md)",
    gap: 10
  }
};
function palette(variant, hovered) {
  switch (variant) {
    case "primary":
      return {
        background: hovered ? "var(--ignition-400)" : "var(--ignition-500)",
        color: "var(--hull-1000)",
        border: "1px solid transparent"
      };
    case "secondary":
      return {
        background: hovered ? "var(--hull-700)" : "var(--hull-800)",
        color: "var(--text-primary)",
        border: `1px solid ${hovered ? "var(--border-strong)" : "var(--border-line)"}`
      };
    case "ghost":
      return {
        background: hovered ? "var(--ignition-tint)" : "transparent",
        color: hovered ? "var(--ignition-400)" : "var(--text-body)",
        border: "1px solid transparent"
      };
    case "danger":
      return {
        background: hovered ? "var(--state-fail)" : "var(--state-fail-tint)",
        color: hovered ? "var(--hull-1000)" : "var(--state-fail)",
        border: "1px solid var(--state-fail)"
      };
    default:
      return {};
  }
}

/** The system's primary action control. */
function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  disabled = false,
  fullWidth = false,
  as = "button",
  style,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const s = SIZE[size] || SIZE.md;
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    disabled: Tag === "button" ? disabled : undefined,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    style: {
      display: fullWidth ? "flex" : "inline-flex",
      width: fullWidth ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      font: `var(--weight-medium) ${s.font} / 1 var(--font-display)`,
      letterSpacing: "0.01em",
      borderRadius: "var(--radius-control)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      transform: pressed && !disabled ? "translateY(1px)" : "none",
      textDecoration: "none",
      whiteSpace: "nowrap",
      transition: "var(--transition-control), transform var(--dur-instant) var(--ease-standard)",
      ...palette(variant, hovered && !disabled),
      ...style
    }
  }, rest), iconLeft ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: size === "lg" ? "lg" : "sm"
  }) : null, children, iconRight ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: size === "lg" ? "lg" : "sm"
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZE = {
  sm: 30,
  md: 38,
  lg: 46
};

/** Square, label-less control for toolbars and social links. */
function IconButton({
  icon,
  label,
  variant = "secondary",
  size = "md",
  disabled = false,
  style,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const px = SIZE[size] || SIZE.md;
  const ghost = variant === "ghost";
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: px,
      height: px,
      borderRadius: "var(--radius-control)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      background: ghost ? hovered ? "var(--ignition-tint)" : "transparent" : hovered ? "var(--hull-700)" : "var(--hull-800)",
      border: ghost ? "1px solid transparent" : `1px solid ${hovered ? "var(--border-strong)" : "var(--border-line)"}`,
      color: hovered ? "var(--ignition-400)" : "var(--text-body)",
      transition: "var(--transition-control)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === "lg" ? "lg" : "md"
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Monospace metadata chip — technologies, tools, disciplines. */
function Tag({
  children,
  tone = "neutral",
  size = "md",
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      color: "var(--text-muted)",
      background: "var(--hull-800)",
      border: "var(--border-hairline)"
    },
    accent: {
      color: "var(--ignition-400)",
      background: "var(--ignition-tint)",
      border: "var(--ignition-tint-strong)"
    },
    data: {
      color: "var(--plasma-500)",
      background: "var(--plasma-tint)",
      border: "var(--plasma-tint)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: size === "sm" ? 20 : 24,
      padding: size === "sm" ? "0 6px" : "0 8px",
      font: `var(--weight-medium) ${size === "sm" ? "var(--text-2xs)" : "var(--text-xs)"} / 1 var(--font-mono)`,
      letterSpacing: "0.02em",
      color: t.color,
      background: t.background,
      border: `1px solid ${t.border}`,
      borderRadius: "var(--radius-xs)",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/content/TimelineEntry.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** One row on an experience or education timeline. */
function TimelineEntry({
  period,
  title,
  org,
  description,
  tags = [],
  current = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
      display: "grid",
      gridTemplateColumns: "148px 1fr",
      gap: "var(--space-6)",
      padding: "var(--space-6) 0",
      borderTop: "1px solid var(--border-hairline)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "var(--space-2)",
      paddingTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      marginTop: 4,
      borderRadius: "50%",
      flex: "0 0 auto",
      background: current ? "var(--ignition-500)" : "var(--hull-500)",
      boxShadow: current ? "0 0 10px var(--ignition-500)" : "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      letterSpacing: "var(--tracking-wide)",
      color: current ? "var(--ignition-400)" : "var(--text-faint)"
    }
  }, period)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h3)",
      color: "var(--text-primary)",
      margin: 0
    }
  }, title), org ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-accent)"
    }
  }, org) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-muted)",
      margin: 0,
      maxWidth: "var(--measure)"
    }
  }, description) : null, tags.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-2)",
      marginTop: "var(--space-1)"
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t,
    size: "sm"
  }, t))) : null));
}
Object.assign(__ds_scope, { TimelineEntry });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/TimelineEntry.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Labelled single-line text field. */
function Input({
  label,
  hint,
  error,
  id,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const fieldId = id || `in-${label ? label.replace(/\W+/g, "-").toLowerCase() : "field"}`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      font: "var(--type-label)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)",
      color: focused ? "var(--ignition-500)" : "var(--text-faint)",
      transition: "color var(--dur-fast) var(--ease-standard)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      height: 42,
      padding: "0 var(--space-4)",
      background: "var(--surface-inset)",
      color: "var(--text-primary)",
      font: "var(--type-body-sm)",
      border: `1px solid ${error ? "var(--state-fail)" : focused ? "var(--ignition-500)" : "var(--border-line)"}`,
      borderRadius: "var(--radius-control)",
      boxShadow: "var(--inner-inset)",
      outline: "none",
      transition: "var(--transition-control)",
      width: "100%"
    }
  }, rest)), error || hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: error ? "var(--state-fail)" : "var(--text-faint)"
    }
  }, error || hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native select restyled to match Input. */
function Select({
  label,
  hint,
  options = [],
  id,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const fieldId = id || `sel-${label ? label.replace(/\W+/g, "-").toLowerCase() : "field"}`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      font: "var(--type-label)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)",
      color: focused ? "var(--ignition-500)" : "var(--text-faint)",
      transition: "color var(--dur-fast) var(--ease-standard)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      appearance: "none",
      width: "100%",
      height: 42,
      padding: "0 var(--space-10) 0 var(--space-4)",
      background: "var(--surface-inset)",
      color: "var(--text-primary)",
      font: "var(--type-body-sm)",
      border: `1px solid ${focused ? "var(--ignition-500)" : "var(--border-line)"}`,
      borderRadius: "var(--radius-control)",
      boxShadow: "var(--inner-inset)",
      outline: "none",
      cursor: "pointer",
      transition: "var(--transition-control)"
    }
  }, rest), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: "sm",
    color: "var(--text-faint)",
    style: {
      position: "absolute",
      right: "var(--space-4)",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none"
    }
  })), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Multi-line field, styled to match Input. */
function Textarea({
  label,
  hint,
  error,
  rows = 5,
  id,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const fieldId = id || `ta-${label ? label.replace(/\W+/g, "-").toLowerCase() : "field"}`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      font: "var(--type-label)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)",
      color: focused ? "var(--ignition-500)" : "var(--text-faint)",
      transition: "color var(--dur-fast) var(--ease-standard)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    rows: rows,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      padding: "var(--space-3) var(--space-4)",
      background: "var(--surface-inset)",
      color: "var(--text-primary)",
      font: "var(--type-body-sm)",
      border: `1px solid ${error ? "var(--state-fail)" : focused ? "var(--ignition-500)" : "var(--border-line)"}`,
      borderRadius: "var(--radius-control)",
      boxShadow: "var(--inner-inset)",
      outline: "none",
      resize: "vertical",
      transition: "var(--transition-control)",
      width: "100%"
    }
  }, rest)), error || hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: error ? "var(--state-fail)" : "var(--text-faint)"
    }
  }, error || hint) : null);
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/layout/Backdrop.jsx
try { (() => {
const DRIFT = 0.15;
const HORIZON = "linear-gradient(180deg, #000 0%, #000 18%, transparent 78%)";
function Backdrop({ drift = DRIFT, style, ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const write = () => {
      frame = 0;
      el.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };
    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ref,
      className: "no-print",
      "aria-hidden": "true",
      style: {
        position: "fixed",
        inset: 0,
        // At z-index 0 a positioned layer paints ABOVE non-positioned block
        // content, which would put the grid over the page text.
        zIndex: -1,
        pointerEvents: "none",
        "--scroll-y": "0px",
        backgroundImage: "var(--bg-grid-image)",
        backgroundSize: "var(--grid-size) var(--grid-size)",
        // A position shift rather than a transform, so the pattern tiles
        // forever and no edge is exposed however long the page runs.
        backgroundPosition: `0 calc(var(--scroll-y) * -${drift})`,
        WebkitMaskImage: HORIZON,
        maskImage: HORIZON,
        ...style
      },
      ...rest
    }
  );
}
Object.assign(__ds_scope, { Backdrop });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Backdrop.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The system's surface primitive: hairline border, machined 10px radius, no soft shadow at rest. */
function Card({
  children,
  interactive = false,
  padding = "var(--space-6)",
  accent = false,
  style,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const lift = interactive && hovered;
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      position: "relative",
      background: "var(--surface-card)",
      border: `1px solid ${lift ? "var(--border-strong)" : "var(--border-hairline)"}`,
      borderRadius: "var(--radius-card)",
      padding,
      boxShadow: lift ? "var(--shadow-md)" : "var(--inner-top)",
      transform: lift ? "translateY(-2px)" : "none",
      transition: "var(--transition-control), transform var(--dur-base) var(--ease-out)",
      overflow: "hidden",
      ...style
    }
  }, rest), accent ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      insetInlineStart: 0,
      top: 0,
      height: 2,
      width: "100%",
      background: "linear-gradient(90deg, var(--ignition-500), transparent 70%)"
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/ProjectCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The portfolio's workhorse: one technical project, at a glance. */
function ProjectCard({
  id,
  title,
  summary,
  discipline,
  year,
  status,
  tags = [],
  image,
  onOpen,
  featured,
  role,
  team,
  body,
  result,
  caveat,
  stats,
  style,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  return /*#__PURE__*/React.createElement(__ds_scope.Card, _extends({
    interactive: true,
    padding: "0",
    onClick: onOpen,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 168,
      backgroundColor: "var(--surface-inset)",
      backgroundImage: image ? `url(${image})` : "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderBottom: "1px solid var(--border-hairline)",
      filter: hovered ? "saturate(1.05)" : "saturate(0.85)",
      transition: "filter var(--dur-base) var(--ease-standard)"
    }
  }, status ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "var(--space-3)",
      right: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: status.tone
  }, status.label)) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      padding: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      font: "var(--type-mono)",
      letterSpacing: "var(--tracking-wide)",
      color: "var(--text-faint)",
      textTransform: "uppercase"
    }
  }, id ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ignition-500)"
    }
  }, id) : null, discipline ? /*#__PURE__*/React.createElement("span", null, discipline) : null, year ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, year) : null), /*#__PURE__*/React.createElement("h3", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      font: "var(--type-h3)",
      color: hovered ? "var(--ignition-400)" : "var(--text-primary)",
      margin: 0,
      transition: "color var(--dur-fast) var(--ease-standard)"
    }
  }, title, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-up-right",
    size: "sm",
    style: {
      opacity: hovered ? 1 : 0.35,
      transform: hovered ? "translate(2px,-2px)" : "none",
      transition: "all var(--dur-fast) var(--ease-standard)"
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, summary), tags.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-2)",
      marginTop: "var(--space-1)"
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t,
    size: "sm"
  }, t))) : null));
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// components/layout/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Page footer: contact line, social row, build stamp. */
function Footer({
  email = "hello@alecstanley.dev",
  location = "Melbourne, VIC",
  links = [],
  note,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-6)",
      padding: "var(--space-10) var(--gutter-lg)",
      borderTop: "1px solid var(--border-hairline)",
      background: "var(--surface-panel)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: `mailto:${email}`,
    style: {
      font: "var(--weight-semibold) var(--text-lg) / 1.2 var(--font-display)",
      color: "var(--text-primary)",
      textDecoration: "none",
      borderBottom: "1px solid var(--ignition-tint-strong)"
    }
  }, email), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)",
      letterSpacing: "var(--tracking-wide)"
    }
  }, location)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)"
    }
  }, links.map(l => /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    key: l.label,
    icon: l.icon,
    label: l.label,
    variant: "ghost"
  }))), note ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)",
      width: "100%"
    }
  }, note) : null);
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Footer.jsx", error: String((e && e.message) || e) }); }

// components/layout/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Sticky top navigation: wordmark, section links, one primary action. */
function NavBar({
  brand = "ALEC STANLEY",
  items = [],
  activeId,
  onNavigate,
  action,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      position: "sticky",
      top: 0,
      zIndex: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-8)",
      height: 64,
      padding: "0 var(--gutter-lg)",
      background: "rgba(8, 11, 16, 0.72)",
      backdropFilter: "var(--blur-panel)",
      WebkitBackdropFilter: "var(--blur-panel)",
      borderBottom: "1px solid var(--border-hairline)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-bold) var(--text-sm) / 1 var(--font-display)",
      letterSpacing: "var(--tracking-caps)",
      color: "var(--text-primary)",
      textTransform: "uppercase"
    }
  }, brand), /*#__PURE__*/React.createElement("ul", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-6)",
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, items.map(it => {
    const active = it.id === activeId;
    return /*#__PURE__*/React.createElement("li", {
      key: it.id
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => onNavigate && onNavigate(it.id),
      style: {
        background: "none",
        border: 0,
        padding: "6px 0",
        cursor: "pointer",
        font: `var(--weight-medium) var(--text-xs) / 1 var(--font-mono)`,
        letterSpacing: "var(--tracking-wide)",
        textTransform: "uppercase",
        color: active ? "var(--ignition-500)" : "var(--text-muted)",
        borderBottom: `1px solid ${active ? "var(--ignition-500)" : "transparent"}`,
        transition: "var(--transition-control)"
      }
    }, it.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)"
    }
  }, action));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Numbered section header: mono index, display title, optional lede and trailing action. */
function SectionHeading({
  index,
  title,
  lede,
  action,
  align = "center",
  style,
  ...rest
}) {
  const centered = align === "center";
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: "flex",
      flexDirection: centered ? "column" : "row",
      alignItems: centered ? "center" : "flex-end",
      justifyContent: "space-between",
      gap: centered ? "var(--space-5)" : "var(--space-8)",
      textAlign: centered ? "center" : "left",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: centered ? "center" : "flex-start",
      gap: "var(--space-3)",
      maxWidth: "var(--measure)"
    }
  }, index ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-caps)",
      textTransform: "uppercase",
      color: "var(--ignition-500)"
    }
  }, index) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h2)",
      letterSpacing: "var(--tracking-tight)",
      color: "var(--text-primary)",
      margin: 0
    }
  }, title), lede ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, lede) : null), action ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 auto"
    }
  }, action) : null, centered ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 1,
      background: "var(--border-line)",
      marginTop: "var(--space-1)"
    }
  }) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/About.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DSA = window.AlecStanleyPortfolioDesignSystem_9e359a;
const CVA = window.CV;
function About() {
  const {
    SectionHeading,
    TimelineEntry,
    SkillMeter,
    Card,
    Callout,
    Button,
    Tag
  } = DSA;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "var(--space-16) var(--gutter-lg) var(--section-y)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--section-y-sm)"
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "var(--space-5)",
      maxWidth: "var(--container-narrow)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    index: "01 / About",
    title: "Perth to Melbourne, hardware to data"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      maxWidth: "58ch"
    }
  }, "I'm studying a Bachelor of Engineering (Honours) and Bachelor of Science at Monash University, Clayton \u2014 specialising in aerospace engineering and astrophysics, with completed minors in physics and mathematics."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      maxWidth: "58ch"
    }
  }, "I grew up in Perth, Western Australia and moved east at 18 to study in Melbourne. Alongside my degree I've led a residential community as a Resident Advisor and supervised teams at Coles \u2014 both of which taught me to stay composed and communicate clearly under pressure."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, window.INTERESTS.map(i => /*#__PURE__*/React.createElement(Tag, {
    key: i
  }, i))), /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: CVA.cvUrl,
    target: "_blank",
    rel: "noopener",
    variant: "secondary",
    iconLeft: "download"
  }, "Download full CV")), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-8)",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    index: "02 / Education & experience",
    title: "Study, leadership and work"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: "var(--container-narrow)"
    }
  }, window.TIMELINE.map(t => /*#__PURE__*/React.createElement(TimelineEntry, _extends({
    key: t.title
  }, t))))), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-8)",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    index: "03 / Skills",
    title: "Tools I actually use",
    lede: "Levels are self-assessed against real coursework and project work."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--space-6)",
      width: "100%"
    }
  }, window.SKILLS.map(g => /*#__PURE__*/React.createElement(Card, {
    key: g.group
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)",
      color: "var(--ignition-500)",
      marginBottom: "var(--space-5)",
      textAlign: "center"
    }
  }, g.group), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, g.items.map(s => /*#__PURE__*/React.createElement(SkillMeter, _extends({
    key: s.label
  }, s))))))), /*#__PURE__*/React.createElement(Callout, {
    title: "Referees",
    style: {
      maxWidth: 640
    }
  }, "Available on request, and listed in full on the CV.")));
}
function Contact() {
  const {
    SectionHeading,
    Input,
    Textarea,
    Select,
    Button,
    Card
  } = DSA;
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--container-narrow)",
      margin: "0 auto",
      padding: "var(--space-16) var(--gutter-lg) var(--section-y)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    index: "04 / Contact",
    title: "Let's talk",
    lede: "Graduate roles, internships, or a question about any project here."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: "var(--space-12)",
      font: "var(--type-mono)",
      color: "var(--text-faint)",
      lineHeight: 2,
      textAlign: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", null, "EMAIL", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${CVA.email}`,
    style: {
      color: "var(--text-link)"
    }
  }, CVA.email)), /*#__PURE__*/React.createElement("span", null, "PHONE", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
    href: `tel:${CVA.phone.replace(/\s/g, "")}`,
    style: {
      color: "var(--text-link)"
    }
  }, CVA.phone)), /*#__PURE__*/React.createElement("span", null, "LINKEDIN", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
    href: CVA.linkedin,
    target: "_blank",
    rel: "noopener",
    style: {
      color: "var(--text-link)"
    }
  }, "ALEC STANLEY")), /*#__PURE__*/React.createElement("span", null, "CV", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
    href: CVA.cvUrl,
    target: "_blank",
    rel: "noopener",
    style: {
      color: "var(--text-link)"
    }
  }, "DOWNLOAD PDF"))), /*#__PURE__*/React.createElement(Card, {
    accent: true,
    padding: "var(--space-8)",
    style: {
      width: "100%",
      maxWidth: 560
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      padding: "var(--space-8) 0",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-h2)",
      color: "var(--text-primary)"
    }
  }, "Message sent"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, "I'll get back to you within a couple of days."), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setSent(false),
    style: {
      alignSelf: "center",
      marginTop: "var(--space-4)"
    }
  }, "Send another")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    placeholder: "Your name",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "you@company.com",
    required: true
  })), /*#__PURE__*/React.createElement(Select, {
    label: "Enquiry",
    options: [{
      value: "grad",
      label: "Graduate role"
    }, {
      value: "intern",
      label: "Internship"
    }, {
      value: "project",
      label: "Question about a project"
    }, {
      value: "other",
      label: "Something else"
    }]
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "Message",
    rows: 5,
    placeholder: "What are you working on?"
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    fullWidth: true,
    iconRight: "send"
  }, "Send message"))));
}
Object.assign(window, {
  About,
  Contact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DS = window.AlecStanleyPortfolioDesignSystem_9e359a;
const CV = window.CV;
function Hero({
  onNavigate
}) {
  const {
    Button,
    Tag,
    StatBlock
  } = DS;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-24) var(--gutter-lg) var(--space-16)",
      borderBottom: "1px solid var(--border-hairline)",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-narrow)",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/portrait-alec.png",
    alt: "Alec Stanley",
    style: {
      width: 132,
      height: 132,
      borderRadius: "50%",
      border: "1px solid var(--border-line)",
      filter: "saturate(0.85)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)",
      color: "var(--ignition-500)"
    }
  }, "Melbourne, VIC \u2014 Monash University"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-display)",
      letterSpacing: "var(--tracking-tight)",
      color: "var(--text-primary)",
      margin: 0
    }
  }, CV.name), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--weight-regular) var(--text-xl) / 1.55 var(--font-body)",
      color: "var(--text-body)",
      maxWidth: "46ch",
      margin: 0
    }
  }, CV.intro), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "accent"
  }, "Aerospace Engineering"), /*#__PURE__*/React.createElement(Tag, {
    tone: "accent"
  }, "Astrophysics"), /*#__PURE__*/React.createElement(Tag, null, "Python"), /*#__PURE__*/React.createElement(Tag, null, "MATLAB"), /*#__PURE__*/React.createElement(Tag, null, "C++"), /*#__PURE__*/React.createElement(Tag, null, "SolidWorks"), /*#__PURE__*/React.createElement(Tag, null, "CFD")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      marginTop: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => onNavigate("work")
  }, "See the work"), /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: CV.cvUrl,
    target: "_blank",
    rel: "noopener",
    size: "lg",
    variant: "secondary",
    iconLeft: "download"
  }, "Download CV"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "var(--space-16) auto 0",
      display: "flex",
      justifyContent: "center",
      gap: "var(--space-20)",
      paddingTop: "var(--space-8)",
      borderTop: "1px solid var(--border-hairline)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "4",
    label: "Year of 5",
    style: {
      alignItems: "center"
    }
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: window.PROJECTS.length,
    label: "Technical projects",
    tone: "accent",
    style: {
      alignItems: "center"
    }
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "2",
    label: "Majors",
    style: {
      alignItems: "center"
    }
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "98.65",
    label: "ATAR",
    style: {
      alignItems: "center"
    }
  })));
}
function Home({
  onNavigate,
  onOpenProject
}) {
  const {
    SectionHeading,
    ProjectCard,
    Button,
    Callout,
    Icon
  } = DS;
  const featured = window.PROJECTS.filter(p => p.featured);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "var(--section-y) var(--gutter-lg)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    index: "01 / Selected work",
    title: "Featured projects",
    lede: "Some of my best work, where I learnt the most."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "var(--space-6)",
      width: "100%",
      maxWidth: 900
    }
  }, featured.map(p => /*#__PURE__*/React.createElement(ProjectCard, _extends({
    key: p.id
  }, p, {
    onOpen: () => onOpenProject(p.id)
  })))), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconRight: "arrow-right",
    onClick: () => onNavigate("work")
  }, "All projects")), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "0 var(--gutter-lg) var(--section-y)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    index: "02 / Approach",
    title: "How I work"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--space-10)",
      width: "100%",
      maxWidth: 900,
      textAlign: "center"
    }
  }, [["ruler", "Model it", "An analytical first pass before any solver runs."], ["cpu", "Simulate it", "CAD, numerical modelling or code — with a sanity check."], ["gauge", "Measure it", "Test the real thing and close the loop on the model."]].map(([icon, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: "xl",
    color: "var(--ignition-500)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-h3)",
      color: "var(--text-primary)"
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-muted)",
      maxWidth: "30ch"
    }
  }, d)))), /*#__PURE__*/React.createElement(Callout, {
    tone: "accent",
    title: "Right now",
    style: {
      maxWidth: 640
    }
  }, "Fourth year of five, looking for graduate roles in aerospace design, simulation or test from 2027.")));
}
Object.assign(window, {
  Home,
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Work.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DSW = window.AlecStanleyPortfolioDesignSystem_9e359a;
const DISCIPLINES = ["Aerospace", "Astrophysics", "Engineering", "Physics", "Software"];
function Work({
  onOpenProject
}) {
  const {
    SectionHeading,
    ProjectCard,
    Select,
    Tag
  } = DSW;
  const [discipline, setDiscipline] = React.useState("all");
  const all = window.PROJECTS;
  const shown = discipline === "all" ? all : all.filter(p => p.discipline === discipline);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "var(--space-16) var(--gutter-lg) var(--section-y)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    index: "01 / Index",
    title: "All technical projects",
    lede: "Coursework, competition builds and independent work, newest first."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "data"
  }, shown.length, " of ", all.length), /*#__PURE__*/React.createElement(Select, {
    value: discipline,
    onChange: e => setDiscipline(e.target.value),
    style: {
      width: 220
    },
    options: [{
      value: "all",
      label: "All disciplines"
    }, ...DISCIPLINES.map(d => ({
      value: d,
      label: d
    }))]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--space-6)",
      width: "100%"
    }
  }, shown.map(p => /*#__PURE__*/React.createElement(ProjectCard, _extends({
    key: p.id
  }, p, {
    onOpen: () => onOpenProject(p.id)
  })))));
}
function ProjectDetail({
  id,
  onBack
}) {
  const {
    Button,
    Badge,
    Tag,
    Card,
    Callout,
    MediaFrame,
    VideoEmbed,
    AttachmentLink
  } = DSW;
  const p = window.PROJECTS.find(x => x.id === id) || window.PROJECTS[0];
  return /*#__PURE__*/React.createElement("article", {
    style: {
      maxWidth: "var(--container-narrow)",
      margin: "0 auto",
      padding: "var(--space-12) var(--gutter-lg) var(--section-y)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconLeft: "arrow-left",
    onClick: onBack,
    style: {
      alignSelf: "flex-start"
    }
  }, "Back to index"), /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "var(--space-4)",
      font: "var(--type-mono)",
      letterSpacing: "var(--tracking-wide)",
      color: "var(--text-faint)",
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ignition-500)"
    }
  }, p.id), /*#__PURE__*/React.createElement("span", null, p.discipline), /*#__PURE__*/React.createElement("span", null, p.date), p.grade ? /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    dot: false
  }, p.grade) : null), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-h1)",
      letterSpacing: "var(--tracking-tight)",
      color: "var(--text-primary)"
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--weight-regular) var(--text-lg) / 1.6 var(--font-body)",
      color: "var(--text-muted)",
      maxWidth: "56ch"
    }
  }, p.summary), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "var(--space-2)"
    }
  }, p.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t)))), p.videos.length ? /*#__PURE__*/React.createElement(VideoEmbed, {
    youtube: p.videos[0].youtube,
    caption: p.videos[0].caption,
    source: p.videos[0].source
  }) : p.images.length ? /*#__PURE__*/React.createElement(MediaFrame, {
    src: p.images[0].src,
    file: p.images[0].file,
    caption: p.images[0].caption,
    height: 280
  }) : null, p.body.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, p.body.map((para, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, para))) : null, p.result ? /*#__PURE__*/React.createElement(Callout, {
    tone: "accent",
    title: "Result"
  }, p.result) : null, p.caveat ? /*#__PURE__*/React.createElement(Callout, {
    tone: "warn",
    title: "Limitation"
  }, p.caveat) : null, p.images.length > (p.videos.length ? 0 : 1) ? /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-label)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)",
      color: "var(--ignition-500)",
      textAlign: "center"
    }
  }, "Figures"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: p.images.length > 3 ? "1fr 1fr" : "1fr",
      gap: "var(--space-6)"
    }
  }, p.images.slice(p.videos.length ? 0 : 1).map(im => /*#__PURE__*/React.createElement(MediaFrame, {
    key: im.file,
    src: im.src,
    file: im.file,
    caption: im.caption,
    height: 200
  })))) : null, p.videos.length > 1 ? /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-label)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)",
      color: "var(--ignition-500)",
      textAlign: "center"
    }
  }, "Video"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: p.videos.length > 2 ? "1fr 1fr" : "1fr",
      gap: "var(--space-6)"
    }
  }, p.videos.slice(1).map(v => /*#__PURE__*/React.createElement(VideoEmbed, {
    key: v.source,
    youtube: v.youtube,
    caption: v.caption,
    source: v.source
  })))) : null, p.attachments.length ? /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-label)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)",
      color: "var(--ignition-500)",
      textAlign: "center"
    }
  }, "Reports & files"), p.attachments.map(a => /*#__PURE__*/React.createElement(AttachmentLink, {
    key: a.file,
    label: a.label,
    file: a.file,
    href: a.href
  }))) : null, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-8)",
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-h3)",
      color: "var(--text-primary)"
    }
  }, "Want the detail?"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, "Happy to share methodology, code and raw data.")), /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: `mailto:${window.CV.email}`,
    iconRight: "mail"
  }, "Get in touch")));
}
Object.assign(window, {
  Work,
  ProjectDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Work.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/data.js
try { (() => {
// Content recovered from the old Notion portfolio export (My Drive/OLDPORTFOLIO)
// and Alec's CV (assets/alec-stanley-cv.pdf).
// Image / video / PDF slots carry the ORIGINAL export filename so assets can be dropped in.
window.CV = {
  name: "Alec Stanley",
  fullName: "Alec Matthew Stanley",
  title: "Aerospace Engineering (Honours) & Astrophysics",
  institution: "Monash University, Clayton",
  email: "asta0044@student.monash.edu",
  phone: "+61 413 970 596",
  linkedin: "https://www.linkedin.com/in/alec-stanley-0a483b195/",
  location: "Melbourne, VIC",
  cvUrl: "../../assets/alec-stanley-cv.pdf",
  intro: "I'm in my fourth year of a five-year Bachelor of Engineering (Honours) and Bachelor of Science at Monash University, specialising in aerospace engineering and astrophysics. This is a collection of the technical projects I've worked on over the last few years."
};
const P = o => ({
  status: {
    label: "Complete",
    tone: "ok"
  },
  tags: [],
  images: [],
  videos: [],
  attachments: [],
  body: [],
  ...o
});
window.PROJECTS = [P({
  id: "P-017",
  title: "Introduction to Programming — C++ Portfolio",
  discipline: "Software",
  year: "2026",
  date: "June 7, 2026",
  grade: "HD",
  summary: "A portfolio-based first-year unit introducing C++. The high-distinction project is an n-body gravitational simulator.",
  tags: ["C++", "OOP", "data structures", "physics engine"],
  body: ["The portfolio builds through increasing levels of expertise, with reflections and the code I wrote at each stage. Notable work: memory management, sorting algorithms, procedural and object-oriented programming, and building my own data stores — linked lists, vectors and arrays.", "For the high distinction I built an n-body gravitational simulator: a physics engine, a plotting engine and a custom window manager, among other utilities."],
  videos: [{
    caption: "Walkthrough — how to use the simulator",
    source: "H2_Video.mp4"
  }, {
    caption: "Source-code deep dive and the challenges I faced",
    source: "H1_Video.mp4"
  }],
  attachments: [{
    label: "Full portfolio",
    file: "FIT1045-FIT1053-asta0044-portfolio.pdf"
  }, {
    label: "N-body simulator report",
    file: "submission.pdf"
  }, {
    label: "Source code",
    file: "Source-Code.zip"
  }]
}), P({
  id: "P-016",
  title: "Photometric Distance and Age of the Open Cluster NGC 2175",
  discipline: "Astrophysics",
  year: "2026",
  date: "May 31, 2026",
  summary: "Determining the age and distance of NGC 2175 using R, V and B band observations from a consumer-grade telescope and computational photometry.",
  tags: ["photometry", "Python", "observational astronomy"],
  attachments: [{
    label: "Full report",
    file: "report.pdf"
  }]
}), P({
  id: "P-015",
  title: "Viscous Flow Regimes in a Large-Eddy Simulation",
  discipline: "Aerospace",
  year: "2026",
  date: "May 31, 2026",
  summary: "Using large-eddy-simulation CFD to investigate flow regimes, boundary layer behaviour, and the turbulent wake behind a NACA0012 airfoil.",
  tags: ["CFD", "LES", "turbulence", "NACA0012"],
  attachments: [{
    label: "Full report",
    file: "report.pdf"
  }]
}), P({
  id: "P-014",
  title: "Boundary Layers in Laminar and Turbulent Flow Regimes using CFD",
  discipline: "Aerospace",
  year: "2026",
  date: "April 19, 2026",
  featured: true,
  grade: "HD",
  summary: "A comprehensive CFD study of boundary layer properties across three cases: incompressible laminar and turbulent flow over a flat plate, and compressible laminar flow over a 2D cylinder.",
  tags: ["CFD", "boundary layers", "compressible flow"],
  body: ["I was awarded a high distinction for my efforts in this task."],
  attachments: [{
    label: "Full report",
    file: "report.pdf"
  }]
}), P({
  id: "P-013",
  title: "Galaxy Collision Simulation",
  discipline: "Astrophysics",
  year: "2025",
  date: "October 30, 2025",
  featured: true,
  grade: "HD",
  summary: "A Python program simulating the collision of two galaxies under Newton's laws of gravitation, modelling the observed collision between M51 and NGC 5195.",
  tags: ["Python", "numerical integration", "multiprocessing", "gravitation"],
  body: ["This Python program extends a typical two-body simulation into a collision of two galaxies with a disk of stars. Each galaxy has a central mass surrounded by rings of massless stars, modelled after Toomre and Toomre (1972), where the symmetry of the ring galaxies largely negates the relatively weak interactions between individual stars.", "The parameters were chosen to model the real collision between M51 and its smaller companion NGC 5195. Each galaxy carries 120 stars, so the program integrates the motion of 242 particles including the two central masses. Motion is advanced with Leapfrog integration — a second-order integrator that conserves energy and momentum well and keeps the integration time-reversible.", "The simulation uses the Keplerian potential rather than a logarithmic (dark-matter) potential: the logarithmic model is far harder to solve analytically in reasonable time, and is notorious for producing unphysical values for stars flung far from the galaxies during a collision.", "Beyond the physics, this task shows a lot of my software work: multi-threaded rendering to generate the three simulation videos simultaneously, class-based design, and efficient data management — replacing Pandas data frames with pre-allocated arrays and C-based list indexing cut the runtime from tens of minutes to seconds."],
  result: "Total energy is conserved, with angular momentum noise only at the order of 10⁻¹² — an artefact of the numerical integration.",
  images: [{
    file: "m51-and-companion_0-jpg.jpg",
    caption: "The Whirlpool Galaxy, M51, a spiral galaxy 31 million light-years away — Hubble (NASA, ESA)"
  }, {
    file: "orbit_energy.png",
    caption: "Left: total energy over time, the dotted line showing conservation. Right: total angular momentum magnitude."
  }, {
    file: "image.png",
    caption: "Snapshot of the parameters able to be tweaked by the user."
  }],
  videos: [{
    caption: "Full 3D numerical integration — two massive bodies and 240 massless stars",
    source: "orbit_3d.mp4"
  }, {
    caption: "X–Y projection (top-down)",
    source: "orbit_xy.mp4"
  }, {
    caption: "X–Z projection (side-on)",
    source: "orbit_xz.mp4"
  }, {
    caption: "Early draft — two stellar masses in an eccentric binary orbit",
    source: "orbit.mp4"
  }]
}), P({
  id: "P-012",
  title: "Aerodynamic Glider Analysis",
  discipline: "Aerospace",
  year: "2025",
  date: "October 27, 2025",
  summary: "The Design Build Fly project: my group developed and built a glider to fly as far as possible, with a full aerodynamic report in accompaniment.",
  tags: ["aerodynamics", "design build fly", "team project"],
  attachments: [{
    label: "Aerodynamic report",
    file: "Report-To-Submit.pdf"
  }]
}), P({
  id: "P-011",
  title: "Tumbling Rocket — Intermediate Axis Theorem",
  discipline: "Aerospace",
  year: "2025",
  date: "October 24, 2025",
  featured: true,
  grade: "HD",
  summary: "A MATLAB simulation of a tumbling rocket in free space, demonstrating the instability of uncontrolled rotation in three dimensions.",
  tags: ["MATLAB", "rigid body dynamics", "STL", "angular momentum"],
  body: ["Designed in MATLAB, this program subjects a 3D STL model to the laws of conservation of angular momentum. After giving the object an initial push, we see the intermediate axis theorem: rigid-body rotation about the minor and major moments of inertia is stable, while the intermediate axis becomes unstable. This is often called the Dzhanibekov effect, after the Soviet cosmonaut who demonstrated it in 1985.", "At t = 0 the rocket tumbles about the X-axis, with zero initial spin about Z and a very small perturbation about Y — the intermediate axis. Roll is a consistent periodic sawtooth and yaw is constant, predictable tumbling, but pitch exhibits chaotic, unreliable changes with an uneven baseline and wild 180° rotations.", "What is interesting is that this behaviour is fully predicted and expected by conservation of angular momentum. Engineers avoid it by designing spacecraft to spin about the principal axis of maximum moment of inertia, and spacecraft must carry small compressed-air jets to counter unstable rotation in a live scenario.", "The object was designed in SolidWorks by the unit demonstrator, but any fully enclosed STL works — so I also explored what other objects do under the same conditions, for example an aeroplane."],
  result: "Awarded a High Distinction; the accompanying report was graded 10/10.",
  images: [{
    file: "fig5.png",
    caption: "Angular velocity of the rocket over time."
  }, {
    file: "fig4.png",
    caption: "Euler angles of the rocket over time — each is the angle from its respective principal axis."
  }, {
    file: "fig3.png",
    caption: "A closer look at the target object."
  }],
  videos: [{
    caption: "Rocket undergoing torque-free motion in three dimensions — chaotic, unstable rotation",
    source: "spacecraft_animation_20fps_100s.mp4"
  }, {
    caption: "The same principles applied to an aeroplane",
    source: "malaysian_airlines_10fps_40s.mp4"
  }],
  attachments: [{
    label: "Full report (10/10)",
    file: "report.pdf"
  }]
}), P({
  id: "P-010",
  title: "Rocket Launch Simulation",
  discipline: "Aerospace",
  year: "2025",
  date: "October 10, 2025",
  summary: "Simulation of a single-stage rocket launch using the principles of particle dynamics in Python.",
  tags: ["Python", "particle dynamics", "drag", "Max-Q"],
  body: ["A full analysis of the aerodynamic forces on a rocket as it launches, exhausts its fuel and re-enters the atmosphere, exploring phenomena such as Max-Q and the rocket's changing pitch angle.", "Three forces act on the rocket — drag, thrust and gravity; lift was assumed negligible. All calculations were done in normal-tangential coordinates and transformed back to Cartesian, as is typical for these rocketry problems."],
  caveat: "A better model would include and account for the curvature of the Earth.",
  images: [{
    file: "fbd.png",
    caption: "Rocket free body diagram"
  }, {
    file: "kinetic.png",
    caption: "Rocket kinetic diagram in the normal-tangential coordinate system"
  }, {
    file: "altitude_vs_time.png",
    caption: "Altitude in kilometres over time — the 'edge of the atmosphere' sits at about 100 km."
  }, {
    file: "drag_vs_time.png",
    caption: "Drag over time. Air density falls off steadily above a certain altitude; data is cut off moments before impact due to the ballistic nature of re-entry."
  }, {
    file: "speed_vs_time.png",
    caption: "Total speed of the rocket over time."
  }, {
    file: "horizontal_velocity_vs_time.png",
    caption: "Horizontal velocity over time"
  }, {
    file: "vertical_velocity_vs_time.png",
    caption: "Vertical velocity over time"
  }],
  attachments: [{
    label: "Final report and code",
    file: "report.pdf"
  }]
}), P({
  id: "P-009",
  title: "Warman Project",
  discipline: "Engineering",
  year: "2025",
  date: "May 29, 2025",
  featured: true,
  summary: "A nationally recognised competition to design and build a fully functioning autonomous rover. A rewarding group project spanning coding, electronics and workshop skills.",
  tags: ["Arduino", "C/C++", "laser cutting", "3D printing", "SolidWorks", "electronics"],
  body: ["The 38th Warman Competition was a practical engineering challenge. Through rigorous design iterations we engineered a functional rover to the required specification. The brief: prototype a reduced-scale, proof-of-concept transport system to precisely deliver scale representations of meteorites from their settling zones to a storage bunker.", "Meteorites were simulated by a tennis ball, a down ball and a table tennis ball in a random 3×3 grid. The rover had to traverse narrow gaps and a pivoting seesaw, be activated by a single starting mechanism, and autonomously collect, traverse and deposit within 120 seconds.", "Our initial design used a rotating sweeper to collect the balls and a hinged rear to deposit them, driven by brushless DC motors and a single Arduino. It had many problems: tank-like wheels grippy enough to avoid slip but still free to rotate became increasingly complex; the sweeper pushed balls aside rather than picking them up, made worse by their different sizes and materials; and the rover moved unpredictably coming off the seesaw, which would have needed costly sensing and long debugging to tame.", "We settled on a full redesign — going around the seesaw rather than over it, through a much narrower gap. The final rover had a main board with a large arm extended out front, raised and lowered by a single pulley and extended by a string-and-pulley system we developed. Omni-directional mecanum wheels let it approach the very edge of the board, skim past the seesaw, turn 180° and drop the balls. Two ultrasonic sensors on the front detected the edge; with no fallback, they had to work.", "The arm was cut PVC pipe, all the wood was laser cut in the Monash studio, and the pulleys were 3D printed. The metal extender was a repurposed drawer runner. Underneath it sat a small custom circuit board with status LEDs and operating buttons, with the Arduino on the right and the LiPo battery in a 3D-printed container on the left."],
  images: [{
    file: "image.png",
    caption: "Schematic view of the 2025 competition track"
  }, {
    file: "Picture1.png",
    caption: "At rest in the starting zone"
  }, {
    file: "Picture2.png",
    caption: "Traversing the seesaw on the upwards side"
  }, {
    file: "Picture3.png",
    caption: "The final design"
  }, {
    file: "Picture4.png",
    caption: "The final design before it retracts to hold the balls"
  }, {
    file: "Picture5.png",
    caption: "Skimming along the edge of the board, holding the balls out front"
  }, {
    file: "Picture6.png",
    caption: "The ultrasonic sensors mounted to the front of the board"
  }, {
    file: "Picture7.png",
    caption: "Omnidirectional wheels on custom aluminium mounts beneath the laser-cut board"
  }, {
    file: "Picture9.png",
    caption: "CAD — the overhead pulley attachment"
  }, {
    file: "Picture10.png",
    caption: "CAD — the laser-cut base of the robot, a 2D cutout"
  }, {
    file: "Picture11.png",
    caption: "CAD — one half of the PVC pipe attachment"
  }],
  attachments: [{
    label: "Team 61 final submission",
    file: "Team_61_-_Final_Submission_2025.pdf"
  }]
}), P({
  id: "P-008",
  title: "CSWA Certificate",
  discipline: "Engineering",
  year: "2025",
  date: "May 21, 2025",
  summary: "Certified SolidWorks Associate — awarded for proven proficiency in 3D CAD modelling, taken as a three-hour exam with a 70% pass mark.",
  tags: ["SolidWorks", "CAD", "certification"],
  result: "235 / 240 — 98%.",
  attachments: [{
    label: "CSWA certificate",
    file: "CSWA_Certificate.pdf"
  }]
}), P({
  id: "P-007",
  title: "Shock Theory in a Supersonic Wind Tunnel",
  discipline: "Aerospace",
  year: "2024",
  date: "October 19, 2024",
  summary: "Demonstrating shock and expansion structures over a wedge airfoil in a supersonic tunnel.",
  tags: ["compressible flow", "shock waves", "wind tunnel"],
  attachments: [{
    label: "Full report",
    file: "report.pdf"
  }]
}), P({
  id: "P-006",
  title: "Stellar Compact Objects",
  discipline: "Astrophysics",
  year: "2024",
  date: "October 9, 2024",
  summary: "Exploring the changing properties of a compact object accreting mass from a binary companion star.",
  tags: ["accretion", "binary systems", "compact objects"],
  attachments: [{
    label: "Lab report",
    file: "lab10_report.pdf"
  }]
}), P({
  id: "P-005",
  title: "Stirling Engine Thermodynamic Properties",
  discipline: "Engineering",
  year: "2024",
  date: "September 27, 2024",
  summary: "Explaining variations in Stirling engine effectiveness using thermodynamic theory.",
  tags: ["thermodynamics", "heat engines"],
  attachments: [{
    label: "Full report",
    file: "report.pdf"
  }]
}), P({
  id: "P-004",
  title: "Internal Combustion Engine Thermodynamic Properties",
  discipline: "Engineering",
  year: "2024",
  date: "September 27, 2024",
  summary: "Investigating heat transfer mechanisms in internal combustion engines.",
  tags: ["thermodynamics", "heat transfer", "ICE"],
  attachments: [{
    label: "Full report",
    file: "report.pdf"
  }]
}), P({
  id: "P-003",
  title: "Properties of Microwaves",
  discipline: "Physics",
  year: "2024",
  date: "August 31, 2024",
  summary: "Exploration of the properties of microwaves, including polarisation, interference and interferometry.",
  tags: ["optics", "interferometry", "waves"],
  attachments: [{
    label: "Full report",
    file: "report.pdf"
  }]
}), P({
  id: "P-002",
  title: "Detecting Extrasolar Planets using the Transit Method",
  discipline: "Astrophysics",
  year: "2024",
  date: "May 19, 2024",
  summary: "Using differential photometry to detect the transit of extrasolar planets in front of distant stars.",
  tags: ["photometry", "exoplanets", "transit method"],
  attachments: [{
    label: "Full report",
    file: "report.pdf"
  }]
}), P({
  id: "P-001",
  title: "Star Characteristics in NGC 2301",
  discipline: "Astrophysics",
  year: "2024",
  date: "March 22, 2024",
  summary: "Using aperture photometry to determine star features including distance, surface temperature and radius.",
  tags: ["aperture photometry", "stellar properties"],
  attachments: [{
    label: "Aperture photometry report",
    file: "AperturePhotometryReport.pdf"
  }]
})];
window.TIMELINE = [{
  period: "2023 — NOW",
  current: true,
  title: "Bachelor of Engineering (Honours) / Bachelor of Science",
  org: "Monash University, Clayton",
  description: "Double degree specialising in aerospace engineering and astrophysics. Completed minors in physics and mathematics.",
  tags: ["Aerospace", "Astrophysics", "Physics", "Mathematics"]
}, {
  period: "FEB 2024 — JUN 2025",
  title: "Resident Advisor",
  org: "Richardson Hall, Monash University",
  description: "Ran events and handled sensitive incidents for a diverse student population — active listening, composure and adaptability under complex interpersonal dynamics.",
  tags: ["Leadership", "Incident response"]
}, {
  period: "2019 — NOW",
  title: "Service Supervisor",
  org: "Coles Supermarkets — Perth WA, then Melbourne VIC",
  description: "Team leadership in a high-pressure environment: time management, conflict de-escalation, inventory, financial reporting and POS systems.",
  tags: ["Team supervision"]
}, {
  period: "2009 — 2022",
  title: "Ursula Frayne Catholic College — ATAR 98.65",
  org: "Perth, Western Australia",
  description: "Top-level mathematics, English, physics and modern history. Arts Representative in Year 12 and lead roles in school musical theatre.",
  tags: ["ATAR 98.65"]
}];

// Skill groups follow the Programming / Engineering / Science tagging from the old portfolio.
window.SKILLS = [{
  group: "Programming",
  items: [{
    label: "Python",
    level: 5,
    note: "simulation & analysis"
  }, {
    label: "MATLAB",
    level: 5,
    note: "modelling"
  }, {
    label: "C / C++",
    level: 4,
    note: "HD portfolio"
  }, {
    label: "Mathematica",
    level: 4,
    note: "advanced modelling"
  }, {
    label: "Numerical analysis",
    level: 4,
    note: "integrators, CFD"
  }, {
    label: "Arduino and robotics",
    level: 4,
    note: "Warman rover"
  }]
}, {
  group: "Engineering",
  items: [{
    label: "SolidWorks — CSWA certified",
    level: 5,
    note: "98% exam"
  }, {
    label: "Mathematical modelling",
    level: 4,
    note: "core"
  }, {
    label: "3D printing",
    level: 4,
    note: "prototyping"
  }, {
    label: "Laser cutting & workshop",
    level: 3,
    note: "Warman build"
  }]
}, {
  group: "Science",
  items: [{
    label: "Aerodynamics",
    level: 4,
    note: "CFD, wind tunnel"
  }, {
    label: "Thermodynamics",
    level: 4,
    note: "engines, heat transfer"
  }, {
    label: "Rigid body dynamics",
    level: 4,
    note: "spacecraft attitude"
  }, {
    label: "Gravity and relativity",
    level: 4,
    note: "astrophysics major"
  }, {
    label: "Quantum mechanics",
    level: 3,
    note: "physics minor"
  }]
}];
window.INTERESTS = ["Running", "Muay Thai kickboxing", "Time with friends"];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/data.js", error: String((e && e.message) || e) }); }

__ds_ns.AttachmentLink = __ds_scope.AttachmentLink;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.MediaFrame = __ds_scope.MediaFrame;

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

__ds_ns.SkillMeter = __ds_scope.SkillMeter;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.TimelineEntry = __ds_scope.TimelineEntry;

__ds_ns.ToastProvider = __ds_scope.ToastProvider;

__ds_ns.useToast = __ds_scope.useToast;

__ds_ns.VideoEmbed = __ds_scope.VideoEmbed;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Backdrop = __ds_scope.Backdrop;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

})();
