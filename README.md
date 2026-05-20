# studio-seam-standard

Sanity Studio for the SEAM Standard. Sibling repo to [`seam-standard`](../seam-standard) (the public site).

## Schemas

**Documents:**
- `pillar` — 4 entries (Social Impact, Social Responsibility, Social Justice, Social Accountability)
- `concept` — 8 entries
- `objective` — 21 entries
- `activity` — 60+ entries (the leaf content)
- `bibliographyEntry` — global numbered citation registry
- `editorialNote` — global lowercase-roman editorial-note registry
- `glossaryTerm` — global Key Terms + Definitions
- `appendix` — Appendices A–E

**Multi-modal `activity` sub-objects:**
- `requirementGroup` — supports Avoid Harm / Benefit / Contribute groupings, or ungrouped
- `indicators` → `calculation` → either `calculationStep[]` (single or multi-step) or `calculationScenario[]` (multi-scenario like IAa2.4)
- `scoring` → `scoringRubric` (single) or `scoringScenario[]` (multi-scenario), plus optional `additionalPointsAssignment` with `or` / `sum` semantics
- `documentationItem[]` + optional `documentationTemplate[]` (table templates like SJa1.1 Tables 1–4)
- `guidance[]` is a discriminated union of: `subsection`, `steps`, `resources`, `example`, `note`, `image`

**Portable Text inline annotations:**
- `bibliographyRef` — numbered superscript citation
- `editorialNoteRef` — lowercase-roman superscript editorial note
- `activityRef` — cross-link to another activity
- `requirementRef` — within-activity requirement cross-reference
- `link` — external URL

## First-time setup

```bash
npm install
npx sanity init --reconfigure          # creates the Sanity project, fills projectId
cp .env.example .env.local             # copy projectId in
npm run dev                            # studio at http://localhost:3333
```

When `sanity init` asks about schema, choose the existing local schema (do not overwrite).

## Status

Schema scaffold only. No content yet — first activity to model is `IAa1.1`
("Establish project understanding and governance framework"), which will validate
the schema end-to-end against the rendered page in [`seam-standard`](../seam-standard).
