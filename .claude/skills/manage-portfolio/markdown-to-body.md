# Markdown → project body

`body` is an array of blocks. Convert Alec's markdown block by block, keeping
his wording exactly:

| Markdown | Block |
| --- | --- |
| Paragraph (lines joined with spaces) | `"…"` |
| `#`, `##`, `###` heading | `{ heading: "…" }` (a `#` that repeats the project title is dropped; it is the page title) |
| `-` / `*` list | `{ list: ["…", "…"] }` |
| `1.` list | `{ list: ["…"], ordered: true }` |
| `**bold**`, `*italic*`, `_italic_`, `[text](https://…)` | Kept inline, unchanged |
| `![alt](figure.png)` | Not a block. Add to `images[]` with the caption from the alt text or from an italic line directly below it. If neither exists, ask. |
| A link or instruction placing a PDF ("appendix goes here") | `{ attachment: "<file name>" }`, and the file listed in `attachments[]` |
| Video link (YouTube) | Not a block. Add to `videos[]`. |
| Table, code block, HTML, nested list, blockquote | Not supported. Ask Alec how to show it. |

Only `https://`, `http://`, `mailto:` and site paths (`/work/p-013`) become
links. Any other link stays as plain text, so check every URL survived.

Straight quotes and dashes stay as Alec typed them. Fix spelling only if he
asks.

## Example

```markdown
# Rotor Wake Study

I measured the wake behind a two-blade rotor at **three** tip speeds.

## Method

- Hot-wire traverse, 2 mm steps
- Data reduced in *python* — see [the repo](https://github.com/alecstanley-git/rotor)

Put the calibration appendix here.

![Velocity deficit at 0.5R](deficit.png)
```

```js
body: [
  "I measured the wake behind a two-blade rotor at **three** tip speeds.",
  { heading: "Method" },
  { list: [
    "Hot-wire traverse, 2 mm steps",
    "Data reduced in *python* — see [the repo](https://github.com/alecstanley-git/rotor)",
  ] },
  { attachment: "calibration-appendix.pdf" },   // after confirming which PDF "the calibration appendix" is
],
images: [{ file: "deficit.png", caption: "Velocity deficit at 0.5R" }],
```

"Put the calibration appendix here" is an instruction, not page text, so it
becomes a block rather than a paragraph.
