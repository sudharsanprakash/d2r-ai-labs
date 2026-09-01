---
name: creating-corporate-documents
description: Use when creating a formal company document (report, memo, proposal) that must follow the corporate Word template for font and structure.
---

# Creating Corporate Documents

## Overview

Generates a `.docx` that matches the standard corporate template: Calibri
font throughout, a title page, heading-based body structure, and a footer
with the company name and page numbers. Use `generate_doc.py` rather than
hand-building a Word document — it guarantees every generated document is
byte-for-byte consistent in font and structure, which manual formatting in
Word is not.

## When to Use

- Asked to draft/generate a report, memo, proposal, or other formal document
  that "every employee" or "the company" should produce the same way.
- Need a `.docx` with a specific corporate font and consistent heading styles,
  not just plain text.
- NOT for one-off scratch notes or documents where format doesn't matter —
  use a plain markdown or text file instead.

## Prerequisites

Requires `python-docx`: `pip install python-docx`

## Usage

```bash
python generate_doc.py --data data.json --config config.json --output out.docx
```

- `--data` (required): content — title, subtitle, author, date, and a list
  of `sections` (each with `heading`, `level` 1-3, and `body` paragraphs).
- `--config` (optional): company branding — `company_name`, `font_name`
  (default `Calibri`), heading sizes/color, footer text, page size, logo
  path. Omit to use the defaults in this directory's `config.json`.
- `--output` (required): path to write the `.docx`.

See the docstring at the top of `generate_doc.py` for the full JSON shapes.

## Customization

Edit `config.json` in this skill directory once per company/team (e.g. set
`company_name` to the real name, add a `logo_path`) — every document
generated after that automatically picks up the change. Don't hardcode
branding into `data.json` per-document.

## Quick Reference

| Field (config.json)   | Default            | Effect                              |
|------------------------|---------------------|--------------------------------------|
| `font_name`            | `Calibri`           | Applied to Normal, Title, Headings   |
| `body_size_pt`         | `11`                | Body paragraph size                 |
| `heading_sizes_pt`     | `{1:16, 2:13, 3:12}`| Per-level heading size              |
| `heading_color_hex`    | `1F4E79`            | Heading font color                  |
| `footer_text`          | `{company_name}`    | Left side of footer, next to page # |
| `page_size`            | `Letter`            | `Letter` or `A4`                    |

## Common Mistakes

- Editing generated `.docx` files by hand for font fixes — edit `config.json`
  and regenerate instead, so every document stays consistent.
- Putting company name/branding in `data.json` — that belongs in
  `config.json` so it's shared across all documents.
- Forgetting `level` on a section — defaults to `1` (top-level heading).
