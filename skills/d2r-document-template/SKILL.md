---
name: d2r-document-template
description: Centralized skill for creating a single structured Job Description (JD) Word document in D2R AI Labs' fixed house format — header with logo and company name repeating on every page, an info table (Experience/Compensation/Role/Type/Location), and sections for Role Overview, Core Responsibilities, Must-Have Skills, Preferred Qualifications, Ideal Candidate, and Key Search Keywords. Use this skill whenever anyone asks to create, generate, or draft a job description, JD, role posting, or hiring document as a Word/.docx file, or mentions "JD template," "job description format," or building a JD "like the sample"/"like last time." Always interview the user for every field — never invent content, wording, or styling.
license: Proprietary
---

# JD Generator

Generates a single `.docx` Job Description that strictly reproduces the reference sample's format — colors, fonts, sizes, table styling, bullets, and header layout are all fixed and never improvised. This skill's only job is to collect the person's answers and slot them into the template exactly as specified below.

## Golden rule

**Never invent content or styling.** If any required field is missing, ask for it — do not guess, paraphrase into your own words, or fill gaps with placeholder text. If the person seems stuck mid-section, ask: "Would you like to see an example sentence from the sample document?" and only show the sample content if they say yes.

## Assets (fixed defaults — do not re-ask for these)

- `assets/company-logo.png` — the company logo, already saved.
- `assets/company-defaults.json` — company name + exact header layout spec (position, wrap style, colors, sizes). Read this file to get `company_name` and header parameters before generating.
- `assets/header-format-reference.docx` — reference doc showing the exact header look or approval.

If a user ever wants to change the logo or company name for **all future documents**, ask them to upload the new logo / give the new name, then overwrite these two files. Do not change them for a single one-off document — that would break the "centralized/default for everyone" requirement.

## Interview flow

Ask questions in this order. Use multiple-choice prompts (buttons) for Role/Type/Location since those have standard options; use free text for everything else. Confirm anything that looks like a typo (e.g. reversed compensation range, missing separators) before locking it in — do not silently "fix" it yourself.

1. **Position title** (e.g. "Senior AI Solutions Architect") and an optional **subtitle** line under it (e.g. "FORWARD DEPLOYED ENGINEER (FDE)") — subtitle may be "none".
2. **Experience range** (e.g. "8–12 Years")
3. **Compensation** (e.g. "₹30–50 LPA (based on experience, technical depth, certifications & customer-facing capability)")
4. **Role** — offer options: Customer-facing / Individual Contributor / Team Lead / Managerial / Cross-functional (or let them type their own)
5. **Type** — offer options: Full-time / Part-time / Contract / Internship
6. **Location** — offer options: Flexible (Remote / Hybrid / In-office) / Remote only / Hybrid / In-office only
7. **Role Overview** — one paragraph.
8. **Core Responsibilities** — ask how many sub-headings and their names, then collect bullets for each sub-heading one at a time.
9. **Must-Have Skills** — bullet list.
10. **Preferred Qualifications** — bullet list.
11. **Ideal Candidate** — intro paragraph + a lead-in line (e.g. "The right candidate will demonstrate:") + bullets.
12. **Key Search Keywords** — one line of terms; confirm the separator is " • " between every term (people often paste this with inconsistent spacing/separators — check and confirm before using).

After collecting everything, restate a short summary of what will go into the doc and confirm before generating.

## Generating the document

1. Build a content JSON matching the shape in `assets/sample-content-schema.json` (see `output/senior-architect-content.json` for a filled example).
2. Run:
   ```bash
   node scripts/generate_jd.js <content.json> <output.docx> <skill-root-dir>
   ```
   `<skill-root-dir>` is this skill's folder (so the script can resolve `assets/company-logo.png` and `assets/company-defaults.json`).
3. Render and visually verify before sharing:
   ```bash
   python /mnt/skills/public/docx/scripts/office/soffice.py --headless --convert-to pdf <output.docx>
   pdftoppm -jpeg -r 100 <output>.pdf page
   ```
   View the page images and check: header repeats on every page, table shading/colors match, section headings match, bullets render as round bullets.
4. Present the `.docx` to the user.

## Fixed style spec (extracted from the reference sample — never deviate)

**Header (every page)**
- Logo: floating image, 157×61 px, anchored left relative to page margin, **Behind Text** wrap (`behindDoc=1`, `wrapNone`).
- Company name: bold, `#1F4E79`, 16pt, right-aligned to the page margin via a right tab stop.
- Thin `#1F4E79` rule (single, size 6, space 20) beneath the header.

**Title / subtitle**
- Title: bold, `#1F4E79`, 16pt (uppercased).
- Subtitle: bold, `#333333`, 11pt (uppercased), only if provided.

**Info table** (Experience/Compensation/Role/Type, then Location spanning both columns)
- 2-column, full content width, thin auto-color borders (single, size 4) on all sides and interior.
- Cell fill `#EAF1F8`, cell margins 120/160 twips, vertically centered.
- Label run: bold, `#1F4E79`, 8.5pt. Value run: `#222222`, 10pt.

**Section headings ("Role Overview," "Core Responsibilities," etc.)**
- Bold, `#1F4E79`, 13pt, with a thin `#1F4E79` bottom rule (single, size 6). Spacing before 320 / after 140 twips.

**Sub-headings** (e.g. inside Core Responsibilities)
- Bold, `#333333`, 11pt. Spacing before 220 / after 100 twips.

**Body text** — 10.5pt, default black, spacing after 160 twips. No custom font family — use Word's default.

**Bullets** — round `●` bullet list, 10.5pt, spacing after 70 twips.

**Keywords line** — single paragraph, terms joined with " • ".

**Page** — US Letter, portrait, 0.75" margins all sides, header/footer 708 twips.

## Command behaviors (when working inside a live session with the user)

- **"rerun"** — run the interview again from the top and generate a new document; show the rendered result.
- **"update"** — ask what to change (content or styling/header), apply it to `scripts/generate_jd.js` and/or `assets/company-defaults.json`, regenerate the most recent document, and show the result.
- **"ok wrap"** — the skill is finalized; package it (this file + `scripts/` + `assets/`) for download. Do not create/overwrite `SKILL.md` at any earlier point in the workflow — only on this command.
