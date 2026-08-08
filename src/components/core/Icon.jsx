import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Cpu,
  Download,
  FileArchive,
  FileText,
  FileType,
  Gauge,
  Github,
  Image as ImageIcon,
  Info,
  Linkedin,
  Mail,
  MapPin,
  Orbit,
  Paperclip,
  Phone,
  Ruler,
  Send,
  TriangleAlert,
  Youtube,
  Zap,
} from "lucide-react";

/* The house glyph set, kebab-case as the design system names them. Lucide is a
   documented substitution — swapping icon libraries means changing this map and
   nothing else. Never inline hand-drawn SVG paths at the call site. */
const GLYPHS = {
  "alert-circle": AlertCircle,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  "chevron-down": ChevronDown,
  cpu: Cpu,
  download: Download,
  "file-archive": FileArchive,
  "file-text": FileText,
  "file-type": FileType,
  gauge: Gauge,
  github: Github,
  image: ImageIcon,
  info: Info,
  linkedin: Linkedin,
  mail: Mail,
  "map-pin": MapPin,
  orbit: Orbit,
  paperclip: Paperclip,
  phone: Phone,
  ruler: Ruler,
  send: Send,
  "triangle-alert": TriangleAlert,
  youtube: Youtube,
  zap: Zap,
};

const SIZES = { sm: 14, md: 16, lg: 20, xl: 24 };

/** Lucide glyph rendered at a system size, inheriting currentColor. */
export function Icon({ name, size = "md", color = "currentColor", style, ...rest }) {
  const Glyph = GLYPHS[name];
  const px = typeof size === "number" ? size : SIZES[size] || SIZES.md;
  if (!Glyph) {
    if (import.meta.env.DEV) console.warn(`Icon: no glyph mapped for "${name}"`);
    return null;
  }
  return (
    <Glyph
      aria-hidden="true"
      focusable="false"
      width={px}
      height={px}
      style={{ flex: "0 0 auto", color, ...style }}
      {...rest}
    />
  );
}
