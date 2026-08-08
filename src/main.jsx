import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import About from "./routes/About.jsx";
import Contact from "./routes/Contact.jsx";
import Home from "./routes/Home.jsx";
import NotFound from "./routes/NotFound.jsx";
import ProjectDetail from "./routes/ProjectDetail.jsx";
import Work from "./routes/Work.jsx";
import "./styles/index.css";

/* basename tracks Vite's `base`, so deep links resolve both at a domain root
   and under a GitHub Pages project sub-path. */
const base = import.meta.env.BASE_URL;
const basename = base === "/" ? "/" : base.replace(/\/$/, "");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<ProjectDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
