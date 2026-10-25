import { test } from "node:test";
import assert from "node:assert/strict";
import { classify, planOutputs, safeName, serialiseManifest } from "../scripts/lib/media-rules.mjs";

test("safeName lowercases and hyphenates", () => {
  assert.equal(safeName("Team_61_-_Final_Submission_2025.pdf"), "team-61-final-submission-2025.pdf");
  assert.equal(safeName("Plot 1.PNG", ".webp"), "plot-1.webp");
});

test("classify by extension", () => {
  assert.equal(classify("a.PNG"), "image");
  assert.equal(classify("b.pdf"), "pdf");
  assert.equal(classify("c.MOV"), "video");
  assert.equal(classify("notes.md"), "text");
  assert.equal(classify("x.stl"), "other");
});

test("planOutputs: two images that would both become plot.webp collide", () => {
  const { errors } = planOutputs(["Plot.png", "plot.jpg", "cover.jpg"], { thumbnail: "cover.jpg" });
  assert.equal(errors.length, 1);
  assert.match(errors[0], /plot\.webp/);
});

test("planOutputs: names that differ only by spacing collide", () => {
  const { errors } = planOutputs(["Figure 1.png", "figure-1.png", "t.png"], { thumbnail: "t.png" });
  assert.equal(errors.length, 1);
  assert.match(errors[0], /figure-1\.webp/);
});

test("planOutputs: thumbnail becomes cover.webp, PNG figures are lossless", () => {
  const { outputs, errors } = planOutputs(["a.png", "t.jpg"], { thumbnail: "t.jpg" });
  assert.deepEqual(errors, []);
  assert.deepEqual(
    outputs.find((o) => o.src === "t.jpg"),
    { src: "t.jpg", out: "cover.webp", kind: "thumbnail" },
  );
  assert.deepEqual(
    outputs.find((o) => o.src === "a.png"),
    { src: "a.png", out: "a.webp", kind: "image", lossless: true },
  );
});

test("planOutputs: JPEG figures are lossy, PDFs keep their extension", () => {
  const { outputs } = planOutputs(["Photo.JPG", "Final Report.pdf", "t.png"], { thumbnail: "t.png" });
  assert.deepEqual(outputs.find((o) => o.src === "Photo.JPG"), { src: "Photo.JPG", out: "photo.webp", kind: "image", lossless: false });
  assert.deepEqual(outputs.find((o) => o.src === "Final Report.pdf"), { src: "Final Report.pdf", out: "final-report.pdf", kind: "pdf" });
});

test("planOutputs: SVG figures are images, rendered to lossless WebP", () => {
  const { outputs, errors } = planOutputs(["Training History.svg", "t.png"], { thumbnail: "t.png" });
  assert.deepEqual(errors, []);
  assert.deepEqual(outputs.find((o) => o.src === "Training History.svg"), { src: "Training History.svg", out: "training-history.webp", kind: "image", lossless: true });
});

test("planOutputs: refuses without a thumbnail", () => {
  assert.match(planOutputs(["a.png"], {}).errors.join(" "), /thumbnail/i);
});

test("planOutputs: refuses video, pointing at YouTube", () => {
  assert.match(planOutputs(["clip.mp4", "t.png"], { thumbnail: "t.png" }).errors.join(" "), /YouTube/);
});

test("planOutputs: refuses unknown file kinds", () => {
  assert.match(planOutputs(["model.stl", "t.png"], { thumbnail: "t.png" }).errors.join(" "), /model\.stl/);
});

test("serialiseManifest writes header lines then a default export", () => {
  assert.equal(
    serialiseManifest(["// one", "// two"], { a: { b: 1 } }),
    '// one\n// two\nexport default {\n  "a": {\n    "b": 1\n  }\n};\n',
  );
});

test("planOutputs: no thumbnail needed when the project already has a cover", () => {
  const { outputs, errors } = planOutputs(["extra.png"], { hasCover: true });
  assert.deepEqual(errors, []);
  assert.deepEqual(outputs, [{ src: "extra.png", out: "extra.webp", kind: "image", lossless: true }]);
});

test("planOutputs: refuses to overwrite a file another source already owns", () => {
  const existing = { "orbit_energy.png": "media/p-013/orbit-energy.webp" };
  const { errors } = planOutputs(["Orbit Energy.jpg"], { hasCover: true, existing });
  assert.equal(errors.length, 1);
  assert.match(errors[0], /orbit-energy\.webp/);
});

test("planOutputs: re-adding the same source name replaces it", () => {
  const existing = { "orbit_energy.png": "media/p-013/orbit-energy.webp" };
  assert.deepEqual(planOutputs(["orbit_energy.png"], { hasCover: true, existing }).errors, []);
});

test("planOutputs: a figure can never become cover.webp", () => {
  assert.match(planOutputs(["cover.png"], { hasCover: true }).errors.join(" "), /cover\.webp/);
});

test("selectFiles: never picks files on its own — Alec names every file", async () => {
  const { selectFiles } = await import("../scripts/lib/media-rules.mjs");
  const found = ["t.jpg", "a.png", "r.pdf", "draft.png"];
  assert.match(selectFiles({ listed: [], found, thumbnail: "t.jpg", hasCover: false }).error, /list/i);
  assert.deepEqual(selectFiles({ listed: ["a.png", "r.pdf"], found, thumbnail: "t.jpg", hasCover: false }), { files: ["a.png", "r.pdf"] });
});

test("selectFiles: an existing project never sweeps the folder", async () => {
  const { selectFiles } = await import("../scripts/lib/media-rules.mjs");
  const found = ["new.jpg", "a.png"];
  assert.deepEqual(selectFiles({ listed: [], found, thumbnail: "new.jpg", hasCover: true }), { files: [] });
  assert.match(selectFiles({ listed: [], found, hasCover: true }).error, /list/i);
  assert.deepEqual(selectFiles({ listed: ["a.png"], found, hasCover: true }), { files: ["a.png"] });
});
