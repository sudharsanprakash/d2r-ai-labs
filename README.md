# D2R AI Labs — Claude Code Plugins

Internal plugin marketplace for Claude Code. One-time setup per employee, then
available in every project. please.

## Install (one time per employee)

Run these two commands inside Claude Code (in any project, or with no project
open):

```
/plugin marketplace add venkatd2r/claude-plugins
/plugin install creating-corporate-documents@d2r-claude-plugins
```

### Prerequisite

The `creating-corporate-documents` plugin generates `.docx` files with
Python, so you also need the `python-docx` library installed once:

```
pip install python-docx
```

## Available plugins

### `creating-corporate-documents`

Generates a `.docx` matching D2R AI Labs' corporate template: Calibri font,
title page with logo, heading-based body, and a footer with page numbers.

**How to use it:** in Claude Code, just ask for a formal document — e.g.
"draft a Q3 sales report" or "create a project proposal doc" — and Claude
will use this skill automatically to produce a correctly branded `.docx`.
Full usage details, including the JSON content format, are in
[`creating-corporate-documents/skills/creating-corporate-documents/SKILL.md`](creating-corporate-documents/skills/creating-corporate-documents/SKILL.md).

## Updating

When this repo is updated (e.g. a template/branding change), each employee
picks up the change by running:

```
/plugin marketplace update d2r-claude-plugins
```

## Troubleshooting

- **`/plugin marketplace add` fails / repo not found:** confirm you have
  read access to `venkatd2r/claude-plugins` (it's a private repo) and that
  your git credentials are set up (`gh auth login` or an SSH key on file
  with GitHub).
- **Generated `.docx` is missing the logo:** confirm `python-docx` is
  installed (`pip show python-docx`); the logo file ships inside the plugin,
  so no separate download is needed.
