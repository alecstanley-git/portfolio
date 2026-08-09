import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Button, Footer, NavBar, ToastProvider } from "./components/index.js";
import { PROFILE } from "./data/content.js";
import { useCopyEmail } from "./lib/useCopyEmail.js";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

/** Jump to the top on navigation, but leave in-page hash links alone. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <ToastProvider>
      <PageShell />
    </ToastProvider>
  );
}

/* Split from App so it sits inside the provider and can raise toasts. */
function PageShell() {
  const { copy, copied, email } = useCopyEmail();

  return (
    <div className="page">
      <ScrollToTop />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NavBar
        items={NAV}
        action={
          <Button
            as="a"
            href={PROFILE.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="secondary"
            iconLeft="download"
          >
            CV
          </Button>
        }
      />
      <main className="page__main" id="main">
        <Outlet />
      </main>
      <Footer
        email={email}
        location={PROFILE.location}
        emailCopied={copied}
        onCopyEmail={copy}
        links={[
          { icon: "linkedin", label: "LinkedIn", href: PROFILE.linkedin },
          { icon: "github", label: "GitHub", href: PROFILE.github },
          { icon: copied ? "check" : "copy", label: "Copy email address", onClick: copy },
          { icon: "file-text", label: "CV", href: PROFILE.cvUrl },
        ]}
        note={`Melbourne, VIC · Monash University, Clayton · Last updated ${PROFILE.lastUpdated}`}
      />
    </div>
  );
}
