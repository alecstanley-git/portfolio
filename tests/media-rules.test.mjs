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
