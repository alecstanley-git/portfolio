#!/usr/bin/env bash
# Mechanical steps for replacing the CV on alecstanley.com.
#
#   bash update-cv.sh prepare <path/to/new.pdf>   copy the new CV in and stage it
#   bash update-cv.sh verify                       wait for the deploy, check the live file
#
# The path is required: Alec always says where the new CV is.
set -euo pipefail

REPO="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
SITE_CV="$REPO/public/alec-stanley-cv.pdf"
KIT_CV="$REPO/.claude/skills/alec-stanley-portfolio-design/assets/alec-stanley-cv.pdf"
DOMAIN="$(cat "$REPO/public/CNAME" 2>/dev/null || echo alecstanley.com)"
LIVE_URL="https://$DOMAIN/alec-stanley-cv.pdf"

die() { echo "ERROR: $*" >&2; exit 1; }
sha() { shasum "$1" | cut -d' ' -f1; }

prepare() {
  local src="${1:-}"
  [[ -n "$src" ]] || die "No CV path given. Ask Alec where the new CV is."
  [[ -f "$src" ]] || die "Not a file: $src"
  head -c 5 "$src" | grep -q '%PDF-' || die "Not a PDF: $src"

  echo "Source:   $src"
  echo "Modified: $(stat -f '%Sm' "$src")"
  echo "Pages:    $(pdfinfo "$src" 2>/dev/null | awk '/^Pages:/{print $2}' || echo '?')"

  if [[ -f "$SITE_CV" && "$(sha "$src")" == "$(sha "$SITE_CV")" ]]; then
    echo "UNCHANGED: the site already has this exact CV. Nothing to do."
    exit 0
  fi

  # Text diff of old vs new, so site copy that mirrors the CV can be checked.
  if command -v pdftotext >/dev/null && [[ -f "$SITE_CV" ]]; then
    local tmp; tmp="$(mktemp -d)"
    pdftotext -layout "$SITE_CV" "$tmp/old.txt"
    pdftotext -layout "$src" "$tmp/new.txt"
    echo "----- CV text changes (old -> new) -----"
    diff -wB "$tmp/old.txt" "$tmp/new.txt" || true
    echo "----------------------------------------"
    rm -rf "$tmp"
  fi

  cp "$src" "$SITE_CV"
  [[ -d "$(dirname "$KIT_CV")" ]] && cp "$src" "$KIT_CV"
  git -C "$REPO" add "$SITE_CV" "$KIT_CV" 2>/dev/null || git -C "$REPO" add "$SITE_CV"
  echo "STAGED:"
  git -C "$REPO" diff --cached --stat
}

verify() {
  command -v gh >/dev/null || die "gh CLI not installed"
  local run_id
  run_id="$(cd "$REPO" && gh run list --branch main --limit 1 --json databaseId -q '.[0].databaseId')"
  echo "Watching deploy run $run_id..."
  (cd "$REPO" && gh run watch "$run_id" --exit-status >/dev/null) || die "Deploy run $run_id failed (gh run view $run_id --log-failed)"

  local tmp; tmp="$(mktemp -d)"
  curl -sfL "$LIVE_URL?v=$(date +%s)" -o "$tmp/fresh.pdf" || die "Could not download $LIVE_URL"
  curl -sfL "$LIVE_URL" -o "$tmp/cached.pdf" || true
  local want; want="$(sha "$SITE_CV")"

  [[ "$(sha "$tmp/fresh.pdf")" == "$want" ]] || die "Live file does not match local CV yet (GitHub Pages may still be propagating; retry in a minute)"
  echo "LIVE: $LIVE_URL matches the new CV."
  if [[ -f "$tmp/cached.pdf" && "$(sha "$tmp/cached.pdf")" != "$want" ]]; then
    echo "CACHE: Cloudflare is still serving the old copy at the plain URL. Purge /alec-stanley-cv.pdf in Cloudflare, or wait for the cache to expire."
  fi
  rm -rf "$tmp"
}

case "${1:-}" in
  prepare) shift; prepare "${1:-}" ;;
  verify)  verify ;;
  *) echo "Usage: bash $0 {prepare <pdf> | verify}" >&2; exit 2 ;;
esac
