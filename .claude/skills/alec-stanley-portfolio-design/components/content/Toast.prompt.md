Confirms an action that leaves no trace on the page — copying an address, and nothing else so far. Bottom-centred, opaque, one at a time, gone in 2.6s.

```jsx
<ToastProvider>
  <PageShell />
</ToastProvider>

const showToast = useToast();
showToast("contact@alecstanley.com copied to clipboard");
showToast(`Copy blocked — the address is ${email}`, "triangle-alert");
```

Rules:

- **Not for anything the reader must act on.** No buttons, no links, no dismiss control — it disappears on its own. A caveat or a result belongs in a `Callout`; a project's state belongs in a `Badge`.
- **The message must survive the toast.** If the action failed, say what the reader needed to know — the address itself — rather than only that it failed.
- **The icon is ignition, both states.** Failure is carried by the glyph (`triangle-alert`) and the words, not by `--state-warn`: the semantic ramp is reserved for project status.
- **Sentence case, no exclamation mark.** "Copied to clipboard", never "Copied!".
- One provider per app. Raising a second toast replaces the first.
