/**
 * A deliberately small inline-markdown parser for body copy: **bold**,
 * *italic* / _italic_ and [text](url). No nesting, no raw HTML.
 *
 * Returns tokens rather than markup so the React side builds elements and
 * nothing from content is ever injected as HTML. Anything that does not form
 * a complete mark stays literal, so "5 * 3" and "my_var_name" survive.
 */

const SAFE_HREF = /^(https?:|mailto:|\/)/;
const isSpace = (c) => c === undefined || /\s/.test(c);
const isWord = (c) => c !== undefined && /\w/.test(c);

/** `[text](url)` starting at i, with balanced parentheses in the URL. */
function readLink(s, i) {
  const close = s.indexOf("]", i + 1);
  if (close < 0 || s[close + 1] !== "(") return null;
  let depth = 0;
  for (let j = close + 1; j < s.length; j++) {
    if (s[j] === "(") depth++;
    else if (s[j] === ")" && --depth === 0) {
      const href = s.slice(close + 2, j);
      const label = s.slice(i + 1, close);
      if (!label || !SAFE_HREF.test(href)) return null;
      return { token: { type: "link", text: label, href }, end: j + 1 };
    }
  }
  return null;
}

/** Emphasis delimited by `mark` starting at i, or null if it doesn't close. */
function readEmphasis(s, i, mark, type) {
  const start = i + mark.length;
  if (isSpace(s[start])) return null;
  if (mark === "_" && isWord(s[i - 1])) return null;
  for (let j = s.indexOf(mark, start + 1); j >= 0; j = s.indexOf(mark, j + 1)) {
    if (isSpace(s[j - 1])) continue;
    if (mark === "_" && isWord(s[j + 1])) continue;
    if (mark === "*" && s[j + 1] === "*") continue;
    return { token: { type, text: s.slice(start, j) }, end: j + mark.length };
  }
  return null;
}

export function parseInline(input) {
  const s = String(input ?? "");
  const tokens = [];
  const push = (token) => {
    const last = tokens[tokens.length - 1];
    if (token.type === "text" && last?.type === "text") last.text += token.text;
    else tokens.push(token);
  };

  let i = 0;
  while (i < s.length) {
    const c = s[i];
    const hit =
      c === "["
        ? readLink(s, i)
        : c === "*" && s[i + 1] === "*"
          ? readEmphasis(s, i, "**", "strong")
          : c === "*"
            ? readEmphasis(s, i, "*", "em")
            : c === "_"
              ? readEmphasis(s, i, "_", "em")
              : null;
    if (hit) {
      push(hit.token);
      i = hit.end;
    } else {
      push({ type: "text", text: c });
      i++;
    }
  }
  return tokens;
}
