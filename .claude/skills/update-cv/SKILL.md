---
name: update-cv
description: Use when Alec has a new or revised CV/resume PDF and wants it on alecstanley.com, says "update my CV", "new resume", "replace the CV on the site", or mentions a CV PDF anywhere.
---

# Update the CV on alecstanley.com

## Overview

The site serves one CV file: `public/alec-stanley-cv.pdf`. Every "Download CV" link reads it through `PROFILE.cvUrl` in `src/data/content.js`, so **replacing the file is the whole code change**. Pushing to `main` deploys via GitHub Actions to GitHub Pages, behind Cloudflare.

The design-system kit keeps a mirror at `.claude/skills/alec-stanley-portfolio-design/assets/alec-stanley-cv.pdf`. The script updates both.

## Steps

1. **Ask Alec where the new CV is.** Use AskUserQuestion every time, before touching any file. Use only the path Alec gives. Do not search Drive, use the newest file in a folder, reuse a path from an earlier session or memory, or guess from a filename. If the path doesn't exist or isn't a PDF, ask again.

2. **Prepare.** Run from the repo root with the path Alec gave:
   ```bash
   bash .claude/skills/update-cv/update-cv.sh prepare "<path Alec gave>"
   ```
   `UNCHANGED` means the site already has this file. Tell Alec and stop.

3. **Read the text diff it prints.** `src/data/content.js` repeats CV facts (`PROFILE`, `ABOUT`, `TIMELINE`, and `SKILLS`, which is the CV's Skills section word for word). If the diff changes any of those, list them for Alec and ask whether to update the site copy too. Do not edit site text without asking. Cosmetic or layout-only diffs need no follow-up.

4. **Commit and push** only the staged CV files (leave other working-tree changes alone):
   ```bash
   git commit -m "Update CV (<short reason, e.g. 2026 version>)"   # add the session's attribution trailer
   git push origin main
   ```
   If not on `main`, or the push is rejected, stop and report. Do not force-push.

5. **Verify:**
   ```bash
   bash .claude/skills/update-cv/update-cv.sh verify
   ```
   It waits for the deploy, then compares the live file (cache-busted) with the local one. Pass its `CACHE:` line on to Alec if it prints one.

## Report back

Lead with whether the new CV is live. Then give the commit hash, any CV text changes that affect site copy, and the Cloudflare cache note if there is one.

## Common mistakes

| Mistake | Fix |
|---|---|
| Picking the CV yourself ("the newest one in Drive is probably it") | Always ask Alec for the path first. |
| Renaming the file or editing `cvUrl` | Keep the name `alec-stanley-cv.pdf`; links depend on it. |
| Copying the `.typ` source | Only the exported PDF goes on the site. |
| Calling it done after the push | Run `verify`; the deploy can fail. |
| Checking the live URL without a query string | Cloudflare may serve the old copy; the script handles this. |
