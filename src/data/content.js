/**
 * All site content lives here. Nothing else needs editing to update the
 * portfolio.
 *
 * Project entries were recovered from the old Notion portfolio; bio, education
 * and employment come from the CV in `public/alec-stanley-cv.pdf`.
 *
 * Media: `images[].file`, `videos[].source` and `attachments[].file` name the
 * original export filename — that is the record of *what* the asset is. The
 * URL is derived, not written by hand: `npm run import-assets` copies the file
 * out of the Notion export and records it in `media-manifest.js`, and the
 * `project()` factory below turns that into `src` / `href`.
 *
 * A file missing from the manifest simply gets no URL, so the page falls back
 * to its labelled placeholder slot. Videos are deliberately not imported — set
 * `youtube` on one by hand once it is uploaded. See MEDIA.md.
 */
import { asset } from "../lib/asset.js";
import MEDIA from "./media-manifest.js";
import COVERS from "./cover-manifest.js";

export const PROFILE = {
  name: "Alec Stanley",
  fullName: "Alec Matthew Stanley",
  title: "Aerospace engineering (Honours) and astrophysics",
  institution: "Monash University, Clayton",
  email: "contact@alecstanley.com",
  linkedin: "https://www.linkedin.com/in/alec-stanley-0a483b195/",
  github: "https://github.com/alecstanley-git/",
  location: "Melbourne, VIC",
  get cvUrl() {
    return asset("alec-stanley-cv.pdf");
  },
  get portraitUrl() {
    return asset("portrait-alec.png");
  },
  intro:
    "I'm in my fourth year of a five-year Bachelor of Engineering (Honours) and Bachelor of Science at Monash University, specialising in aerospace engineering and astrophysics. This is a collection of the technical projects I've worked on over the last few years.",
  seeking:
    "Currently looking for undergraduate internship roles in engineering design, simulation, and testing for the 2026/2027 break.",
  lastUpdated: "2026-08",
};

const project = (o) => {
  const slug = o.id.toLowerCase();
  const imported = MEDIA[slug] || {};
  const cover = COVERS[slug];
  return {
    status: { label: "Complete", tone: "ok" },
    tags: [],
    videos: [],
    body: [],
    ...o,
    slug,
    // The card thumbnail. Sourced from the old site's Notion page covers, which
    // the Markdown export omits entirely — see scripts/fetch-covers.mjs.
    image: o.image ?? (cover ? asset(cover.path) : undefined),
    // After the spread, so an explicit `src` / `href` on an entry still wins.
    images: (o.images || []).map((i) => {
      const m = imported[i.file];
      // Intrinsic size travels with the URL so <img> can reserve its box.
      return { ...i, src: i.src ?? (m ? asset(m.path) : undefined), width: m?.w, height: m?.h };
    }),
    attachments: (o.attachments || []).map((a) => {
      const m = imported[a.file];
      return { ...a, href: a.href ?? (m ? asset(m.path) : undefined), pages: m?.pages };
    }),
  };
};

export const PROJECTS = [
  project({
    id: "P-017",
    title: "Introduction to Programming — C++ Portfolio",
    discipline: "Software",
    year: "2026",
    date: "June 7, 2026",
    grade: "HD",
    summary:
      "A portfolio-based first-year unit introducing C++. The high-distinction project is an n-body gravitational simulator.",
    tags: ["C++", "OOP", "data structures", "physics engine"],
    body: [
      "The portfolio builds through increasing levels of expertise, with reflections and the code I wrote at each stage. Notable work: memory management, sorting algorithms, procedural and object-oriented programming, and building my own data stores — linked lists, vectors and arrays.",
      "For the high distinction I built an n-body gravitational simulator: a physics engine, a plotting engine and a custom window manager, among other utilities.",
    ],
    videos: [
      { caption: "Walkthrough — how to use the simulator", source: "H2_Video.mp4", youtube: "https://youtu.be/tva667XRgrs" },
      { caption: "Source-code deep dive and the challenges I faced", source: "H1_Video.mp4", youtube: "https://youtu.be/y7kh_ImsZWA" },
    ],
    attachments: [
      { label: "Full portfolio", file: "FIT1045-FIT1053-asta0044-portfolio.pdf" },
      { label: "N-body simulator report", file: "submission.pdf" },
      { label: "Source code", file: "Source-Code.zip" },
    ],
  }),
  project({
    id: "P-016",
    title: "Photometric Distance and Age of the Open Cluster NGC 2175",
    discipline: "Astrophysics",
    year: "2026",
    date: "May 31, 2026",
    summary:
      "Determining the age and distance of NGC 2175 using R, V and B band observations from a consumer-grade telescope and computational photometry.",
    tags: ["photometry", "python", "observational astronomy"],
    attachments: [{ label: "Full report", file: "report.pdf" }],
  }),
  project({
    id: "P-015",
    title: "Viscous Flow Regimes in a Large-Eddy Simulation",
    discipline: "Aerospace",
    year: "2026",
    date: "May 31, 2026",
    summary:
      "Using large-eddy-simulation CFD to investigate flow regimes, boundary layer behaviour, and the turbulent wake behind a NACA0012 airfoil.",
    tags: ["CFD", "LES", "turbulence", "NACA0012"],
    attachments: [{ label: "Full report", file: "report.pdf" }],
  }),
  project({
    id: "P-014",
    title: "Boundary Layers in Laminar and Turbulent Flow Regimes using CFD",
    discipline: "Aerospace",
    year: "2026",
    date: "April 19, 2026",
    featured: true,
    grade: "HD",
    summary:
      "A comprehensive CFD study of boundary layer properties across three cases: incompressible laminar and turbulent flow over a flat plate, and compressible laminar flow over a 2D cylinder.",
    tags: ["CFD", "boundary layers", "compressible flow"],
    body: ["I was awarded a high distinction for my efforts in this task."],
    attachments: [{ label: "Full report", file: "report.pdf" }],
  }),
  project({
    id: "P-013",
    title: "Galaxy Collision Simulation",
    discipline: "Astrophysics",
    year: "2025",
    date: "October 30, 2025",
    featured: true,
    grade: "HD",
    summary:
      "A python program simulating the collision of two galaxies under Newton's laws of gravitation, modelling the observed collision between M51 and NGC 5195.",
    tags: ["python", "numerical integration", "multiprocessing", "gravitation"],
    body: [
      "This python program extends a typical two-body simulation into a collision of two galaxies with a disk of stars. Each galaxy has a central mass surrounded by rings of massless stars, modelled after Toomre and Toomre (1972), where the symmetry of the ring galaxies largely negates the relatively weak interactions between individual stars.",
      "The parameters were chosen to model the real collision between M51 and its smaller companion NGC 5195. Each galaxy carries 120 stars, so the program integrates the motion of 242 particles including the two central masses. Motion is advanced with Leapfrog integration — a second-order integrator that conserves energy and momentum well and keeps the integration time-reversible.",
      "The simulation uses the Keplerian potential rather than a logarithmic (dark-matter) potential: the logarithmic model is far harder to solve analytically in reasonable time, and is notorious for producing unphysical values for stars flung far from the galaxies during a collision.",
      "Beyond the physics, this task shows a lot of my software work: multi-threaded rendering to generate the three simulation videos simultaneously, class-based design, and efficient data management — replacing Pandas data frames with pre-allocated arrays and C-based list indexing cut the runtime from tens of minutes to seconds.",
    ],
    result:
      "Total energy is conserved, with angular momentum noise only at the order of 10⁻¹² — an artefact of the numerical integration.",
    images: [
      {
        file: "m51-and-companion_0-jpg.jpg",
        caption:
          "The Whirlpool Galaxy, M51, a spiral galaxy 31 million light-years away — Hubble (NASA, ESA)",
      },
      {
        file: "orbit_energy.png",
        caption: "Left: total energy over time, the dotted line showing conservation. Right: total angular momentum magnitude.",
      },
      { file: "image.png", caption: "Snapshot of the parameters able to be tweaked by the user." },
    ],
    videos: [
      {
        caption: "Full 3D numerical integration — two massive bodies and 240 massless stars",
        source: "orbit_3d.mp4", youtube: "https://youtu.be/IX7oxoXnUtU", aspect: "4 / 3",
      },
      { caption: "X–Y projection (top-down)", source: "orbit_xy.mp4", youtube: "https://youtube.com/shorts/OnNiuFmy3v0", aspect: "4 / 3" },
      { caption: "X–Z projection (side-on)", source: "orbit_xz.mp4", youtube: "https://youtube.com/shorts/SGShWJixM4c", aspect: "4 / 3" },
      { caption: "Early draft — two stellar masses in an eccentric binary orbit", source: "orbit.mp4", youtube: "https://youtube.com/shorts/PHwWd32pBQg", aspect: "4 / 3" },
    ],
  }),
  project({
    id: "P-012",
    title: "Aerodynamic Glider Analysis",
    discipline: "Aerospace",
    year: "2025",
    date: "October 27, 2025",
    summary:
      "The Design Build Fly project: my group developed and built a glider to fly as far as possible, with a full aerodynamic report in accompaniment.",
    tags: ["aerodynamics", "design build fly", "team project"],
    attachments: [{ label: "Aerodynamic report", file: "Report-To-Submit.pdf" }],
  }),
  project({
    id: "P-011",
    title: "Tumbling Rocket — Intermediate Axis Theorem",
    discipline: "Aerospace",
    year: "2025",
    date: "October 24, 2025",
    featured: true,
    grade: "HD",
    summary:
      "A MATLAB simulation of a tumbling rocket in free space, demonstrating the instability of uncontrolled rotation in three dimensions.",
    tags: ["MATLAB", "rigid body dynamics", "STL", "angular momentum"],
    body: [
      "Designed in MATLAB, this program subjects a 3D STL model to the laws of conservation of angular momentum. After giving the object an initial push, we see the intermediate axis theorem: rigid-body rotation about the minor and major moments of inertia is stable, while the intermediate axis becomes unstable. This is often called the Dzhanibekov effect, after the Soviet cosmonaut who demonstrated it in 1985.",
      "At t = 0 the rocket tumbles about the X-axis, with zero initial spin about Z and a very small perturbation about Y — the intermediate axis. Roll is a consistent periodic sawtooth and yaw is constant, predictable tumbling, but pitch exhibits chaotic, unreliable changes with an uneven baseline and wild 180° rotations.",
      "What is interesting is that this behaviour is fully predicted and expected by conservation of angular momentum. Engineers avoid it by designing spacecraft to spin about the principal axis of maximum moment of inertia, and spacecraft must carry small compressed-air jets to counter unstable rotation in a live scenario.",
      "The object was designed in SolidWorks by the unit demonstrator, but any fully enclosed STL works — so I also explored what other objects do under the same conditions, for example an aeroplane.",
    ],
    result: "Awarded a High Distinction; the accompanying report was graded 10/10.",
    images: [
      { file: "fig5.png", caption: "Angular velocity of the rocket over time." },
      {
        file: "fig4.png",
        caption: "Euler angles of the rocket over time — each is the angle from its respective principal axis.",
      },
      { file: "fig3.png", caption: "A closer look at the target object." },
    ],
    videos: [
      {
        caption: "Rocket undergoing torque-free motion in three dimensions — chaotic, unstable rotation",
        source: "spacecraft_animation_20fps_100s.mp4", youtube: "https://youtu.be/gh8g2y9LSV0", aspect: "4 / 3",
      },
      { caption: "The same principles applied to an aeroplane", source: "malaysian_airlines_10fps_40s.mp4", youtube: "https://youtu.be/oZQza4nHjzo" },
    ],
    attachments: [{ label: "Full report (10/10)", file: "report.pdf" }],
  }),
  project({
    id: "P-010",
    title: "Rocket Launch Simulation",
    discipline: "Aerospace",
    year: "2025",
    date: "October 10, 2025",
    summary: "Simulation of a single-stage rocket launch using the principles of particle dynamics in python.",
    tags: ["python", "particle dynamics", "drag", "Max-Q"],
    body: [
      "A full analysis of the aerodynamic forces on a rocket as it launches, exhausts its fuel and re-enters the atmosphere, exploring phenomena such as Max-Q and the rocket's changing pitch angle.",
      "Three forces act on the rocket — drag, thrust and gravity; lift was assumed negligible. All calculations were done in normal-tangential coordinates and transformed back to Cartesian, as is typical for these rocketry problems.",
    ],
    caveat: "A better model would include and account for the curvature of the Earth.",
    images: [
      { file: "fbd.png", caption: "Rocket free body diagram" },
      { file: "kinetic.png", caption: "Rocket kinetic diagram in the normal-tangential coordinate system" },
      {
        file: "altitude_vs_time.png",
        caption: "Altitude in kilometres over time — the 'edge of the atmosphere' sits at about 100 km.",
      },
      {
        file: "drag_vs_time.png",
        caption:
          "Drag over time. Air density falls off steadily above a certain altitude; data is cut off moments before impact due to the ballistic nature of re-entry.",
      },
      { file: "speed_vs_time.png", caption: "Total speed of the rocket over time." },
      { file: "horizontal_velocity_vs_time.png", caption: "Horizontal velocity over time" },
      { file: "vertical_velocity_vs_time.png", caption: "Vertical velocity over time" },
    ],
    attachments: [{ label: "Final report and code", file: "report.pdf" }],
  }),
  project({
    id: "P-009",
    title: "Warman Project",
    discipline: "Engineering",
    year: "2025",
    date: "May 29, 2025",
    featured: true,
    summary:
      "A nationally recognised competition to design and build a fully functioning autonomous rover. A rewarding group project spanning coding, electronics and workshop skills.",
    tags: ["Arduino", "C/C++", "laser cutting", "3D printing", "SolidWorks", "electronics"],
    body: [
      "The 38th Warman Competition was a practical engineering challenge. Through rigorous design iterations we engineered a functional rover to the required specification. The brief: prototype a reduced-scale, proof-of-concept transport system to precisely deliver scale representations of meteorites from their settling zones to a storage bunker.",
      "Meteorites were simulated by a tennis ball, a down ball and a table tennis ball in a random 3×3 grid. The rover had to traverse narrow gaps and a pivoting seesaw, be activated by a single starting mechanism, and autonomously collect, traverse and deposit within 120 seconds.",
      "Our initial design used a rotating sweeper to collect the balls and a hinged rear to deposit them, driven by brushless DC motors and a single Arduino. It had many problems: tank-like wheels grippy enough to avoid slip but still free to rotate became increasingly complex; the sweeper pushed balls aside rather than picking them up, made worse by their different sizes and materials; and the rover moved unpredictably coming off the seesaw, which would have needed costly sensing and long debugging to tame.",
      "We settled on a full redesign — going around the seesaw rather than over it, through a much narrower gap. The final rover had a main board with a large arm extended out front, raised and lowered by a single pulley and extended by a string-and-pulley system we developed. Omni-directional mecanum wheels let it approach the very edge of the board, skim past the seesaw, turn 180° and drop the balls. Two ultrasonic sensors on the front detected the edge; with no fallback, they had to work.",
      "The arm was cut PVC pipe, all the wood was laser cut in the Monash studio, and the pulleys were 3D printed. The metal extender was a repurposed drawer runner. Underneath it sat a small custom circuit board with status LEDs and operating buttons, with the Arduino on the right and the LiPo battery in a 3D-printed container on the left.",
    ],
    images: [
      { file: "image.png", caption: "Schematic view of the 2025 competition track" },
      { file: "Picture1.png", caption: "At rest in the starting zone" },
      { file: "Picture2.png", caption: "Traversing the seesaw on the upwards side" },
      { file: "Picture3.png", caption: "The final design" },
      { file: "Picture4.png", caption: "The final design before it retracts to hold the balls" },
      { file: "Picture5.png", caption: "Skimming along the edge of the board, holding the balls out front" },
      { file: "Picture6.png", caption: "The ultrasonic sensors mounted to the front of the board" },
      { file: "Picture7.png", caption: "Omnidirectional wheels on custom aluminium mounts beneath the laser-cut board" },
      { file: "Picture9.png", caption: "CAD — the overhead pulley attachment" },
      { file: "Picture10.png", caption: "CAD — the laser-cut base of the robot, a 2D cutout" },
      { file: "Picture11.png", caption: "CAD — one half of the PVC pipe attachment" },
    ],
    attachments: [{ label: "Team 61 final submission", file: "Team_61_-_Final_Submission_2025.pdf" }],
  }),
  project({
    id: "P-008",
    title: "CSWA Certificate",
    discipline: "Engineering",
    year: "2025",
    date: "May 21, 2025",
    summary:
      "Certified SolidWorks Associate — awarded for proven proficiency in 3D CAD modelling, taken as a three-hour exam with a 70% pass mark.",
    tags: ["SolidWorks", "CAD", "certification"],
    result: "235 / 240 — 98%.",
    attachments: [{ label: "CSWA certificate", file: "CSWA_Certificate.pdf" }],
  }),
  project({
    id: "P-007",
    title: "Shock Theory in a Supersonic Wind Tunnel",
    discipline: "Aerospace",
    year: "2024",
    date: "October 19, 2024",
    summary: "Demonstrating shock and expansion structures over a wedge airfoil in a supersonic tunnel.",
    tags: ["compressible flow", "shock waves", "wind tunnel"],
    attachments: [{ label: "Full report", file: "WindTunnelReport.pdf" }],
  }),
  project({
    id: "P-006",
    title: "Stellar Compact Objects",
    discipline: "Astrophysics",
    year: "2024",
    date: "October 9, 2024",
    summary: "Exploring the changing properties of a compact object accreting mass from a binary companion star.",
    tags: ["accretion", "binary systems", "compact objects"],
    attachments: [{ label: "Lab report", file: "lab10_report.pdf" }],
  }),
  project({
    id: "P-005",
    title: "Stirling Engine Thermodynamic Properties",
    discipline: "Engineering",
    year: "2024",
    date: "September 27, 2024",
    summary: "Explaining variations in Stirling engine effectiveness using thermodynamic theory.",
    tags: ["thermodynamics", "heat engines"],
    attachments: [{ label: "Full report", file: "Report.pdf" }],
  }),
  project({
    id: "P-004",
    title: "Internal Combustion Engine Thermodynamic Properties",
    discipline: "Engineering",
    year: "2024",
    date: "September 27, 2024",
    summary: "Investigating heat transfer mechanisms in internal combustion engines.",
    tags: ["thermodynamics", "heat transfer", "ICE"],
    attachments: [{ label: "Full report", file: "ICE_Report.pdf" }],
  }),
  project({
    id: "P-003",
    title: "Properties of Microwaves",
    discipline: "Physics",
    year: "2024",
    date: "August 31, 2024",
    summary: "Exploration of the properties of microwaves, including polarisation, interference and interferometry.",
    tags: ["optics", "interferometry", "waves"],
    attachments: [{ label: "Full report", file: "Report.pdf" }],
  }),
  project({
    id: "P-002",
    title: "Detecting Extrasolar Planets using the Transit Method",
    discipline: "Astrophysics",
    year: "2024",
    date: "May 19, 2024",
    summary: "Using differential photometry to detect the transit of extrasolar planets in front of distant stars.",
    tags: ["photometry", "exoplanets", "transit method"],
    attachments: [{ label: "Full report", file: "ExtrasolarPlanetsReport.pdf" }],
  }),
  project({
    id: "P-001",
    title: "Star Characteristics in NGC 2301",
    discipline: "Astrophysics",
    year: "2024",
    date: "March 22, 2024",
    summary: "Using aperture photometry to determine star features including distance, surface temperature and radius.",
    tags: ["aperture photometry", "stellar properties"],
    attachments: [{ label: "Aperture photometry report", file: "AperturePhotometryReport.pdf" }],
  }),
];

export const DISCIPLINES = [...new Set(PROJECTS.map((p) => p.discipline))].sort();

export const FEATURED = PROJECTS.filter((p) => p.featured);

export function findProject(slug) {
  return PROJECTS.find((p) => p.slug === String(slug || "").toLowerCase());
}

export const TIMELINE = [
  {
    period: "2023 — NOW",
    current: true,
    title: "Bachelor of Engineering (Honours) / Bachelor of Science",
    org: "Monash University, Clayton",
    description:
      "Double degree specialising in aerospace engineering and astrophysics. Completed minors in physics and mathematics.",
    tags: ["Aerospace", "Astrophysics", "Physics", "Mathematics"],
  },
  {
    period: "FEB 2024 — JUN 2025",
    title: "Resident Advisor",
    org: "Richardson Hall, Monash University",
    description:
      "Pastoral care and first response for a residential floor across three semesters: overnight on-call roster, floor events, welfare check-ins, and after-hours incidents de-escalated with mental health first aid and escalated to hall management.",
    tags: ["Pastoral care", "On-call duty", "Incident response"],
  },
  {
    period: "2019 — NOW",
    title: "Service Supervisor",
    org: "Coles Supermarkets — Perth WA, then Melbourne VIC",
    description:
      "Team leadership in a high-pressure environment: time management, conflict de-escalation, inventory, financial reporting and POS systems.",
    tags: ["Team supervision"],
  },
  {
    period: "2009 — 2022",
    title: "Ursula Frayne Catholic College — ATAR 98.65",
    org: "Perth, Western Australia",
    description:
      "Top-level mathematics, English, physics and modern history. Arts Representative in Year 12 and lead roles in school musical theatre.",
    tags: ["ATAR 98.65"],
  },
];

/* Hero chips — the degree's majors and minors. `kind` is what the chip reveals
   on hover, and it also picks the tone: majors take ignition, minors neutral.
   Lowercase per the system's tag casing: these are common nouns, not as-written
   product names. Distinct from DISCIPLINES above, the project filter's list. */
export const STUDY_AREAS = [
  { label: "aerospace engineering", kind: "major" },
  { label: "astrophysics", kind: "major" },
  { label: "mathematics", kind: "minor" },
  { label: "physics", kind: "minor" },
];
