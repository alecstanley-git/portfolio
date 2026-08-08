import { Link } from "react-router-dom";
import { Button, SectionHeading } from "../components/index.js";
import { usePageMeta } from "../lib/usePageMeta.js";

export default function NotFound() {
  usePageMeta("Page not found");

  return (
    <div className="container container--narrow">
      <section className="section section--top">
        <SectionHeading index="404 / Not found" title="No page at this address" lede="The link is wrong or the page has moved." />
        <div className="cluster cluster--actions">
          <Button as={Link} to="/" iconRight="arrow-right">
            Back to home
          </Button>
          <Button as={Link} to="/work" variant="secondary">
            All projects
          </Button>
        </div>
      </section>
    </div>
  );
}
