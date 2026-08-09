import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "../components/index.js";
import { PROFILE } from "../data/content.js";

const COPIED_MS = 1800;

async function writeToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Refused — usually an unfocused document. Try the legacy path below.
    }
  }
  // The async clipboard API is also absent outside secure contexts, so keep the
  // old selection trick as the fallback.
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.top = "-100vh";
  document.body.appendChild(field);
  field.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(field);
  if (!ok) throw new Error("copy command rejected");
}

/**
 * Copies the contact address and raises a toast. `copied` stays true briefly so
 * a control can swap its icon or label for confirmation.
 */
export function useCopyEmail() {
  const showToast = useToast();
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    try {
      await writeToClipboard(PROFILE.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), COPIED_MS);
      showToast(`${PROFILE.email} copied to clipboard`);
    } catch {
      // A refused clipboard should still leave the reader with the address.
      showToast(`Copy blocked — the address is ${PROFILE.email}`, "triangle-alert");
    }
  }, [showToast]);

  return { copy, copied, email: PROFILE.email };
}
