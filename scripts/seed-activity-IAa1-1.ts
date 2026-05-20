/**
 * Seeds Activity IAa1.1 — "Establish project understanding and governance framework"
 * along with the bibliography entry and editorial notes it references.
 *
 * Run with:
 *   npx tsx scripts/seed-activity-IAa1-1.ts
 *
 * Idempotent.
 */

import { createClient } from '@sanity/client'
import { config as loadEnv } from 'dotenv'

loadEnv()

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'
const token = process.env.SANITY_AUTH_TOKEN

if (!projectId) throw new Error('SANITY_STUDIO_PROJECT_ID is not set')
if (!token) throw new Error('SANITY_AUTH_TOKEN is not set')

const client = createClient({ projectId, dataset, token, apiVersion: '2025-01-01', useCdn: false })

// ─── Helpers ──────────────────────────────────────────────────────────────
let blockKey = 0
function nextKey() {
  blockKey += 1
  return `k${blockKey}`
}

// Builds a simple paragraph block from a string (no inline marks).
function p(text: string) {
  return {
    _type: 'richText',
    _key: nextKey(),
    style: 'normal',
    children: [{ _type: 'span', _key: nextKey(), text, marks: [] }],
    markDefs: [],
  }
}

// Builds a list-item block: appears in <ul> or <ol> with optional nesting level.
function li(text: string, listItem: 'bullet' | 'number' = 'bullet', level = 1) {
  return {
    _type: 'richText',
    _key: nextKey(),
    style: 'normal',
    listItem,
    level,
    children: [{ _type: 'span', _key: nextKey(), text, marks: [] }],
    markDefs: [],
  }
}

// Builds a block with mixed runs. spans is an array of {text, marks?}.
function block(spans: Array<{ text: string; marks?: string[] }>, markDefs: Array<Record<string, unknown>> = []) {
  return {
    _type: 'richText',
    _key: nextKey(),
    style: 'normal',
    children: spans.map((s) => ({ _type: 'span', _key: nextKey(), text: s.text, marks: s.marks ?? [] })),
    markDefs,
  }
}

// Builds a paragraph that contains a single inline editorial-note reference.
// Renders as "...text<i>." where <i> resolves to editorial note doc.
function paragraphWithEditorialNote(before: string, noteId: string, after: string) {
  const markKey = nextKey()
  return {
    _type: 'richText',
    _key: nextKey(),
    style: 'normal',
    children: [
      { _type: 'span', _key: nextKey(), text: before, marks: [] },
      { _type: 'span', _key: nextKey(), text: '', marks: [markKey] }, // anchor for the superscript marker
      { _type: 'span', _key: nextKey(), text: after, marks: [] },
    ],
    markDefs: [
      {
        _type: 'editorialNoteRef',
        _key: markKey,
        note: { _type: 'reference', _ref: noteId },
      },
    ],
  }
}

// ─── Documents ────────────────────────────────────────────────────────────

const IDS = {
  biblio16: 'bib-16-iaia-sia-2015',
  noteI: 'note-i-iaa1-1',
  noteII: 'note-ii-iaa1-1',
  activity: 'activity-IAa1-1',
}

async function run() {
  // Bibliography entry #16 — IAIA SIA Guidance 2015 (also used as the Referenced Source)
  console.log('Seeding bibliography entry #16...')
  await client.createOrReplace({
    _id: IDS.biblio16,
    _type: 'bibliographyEntry',
    number: 16,
    title: 'Social Impact Assessment: Guidance for assessing and managing the social impacts of projects',
    citation:
      'Social Impact Assessment: Guidance for assessing and managing the social impacts of projects, International Association for Impact Assessment (2015)',
    sourceType: 'guidance',
  })
  console.log('  ✓ [16] IAIA SIA Guidance (2015)')

  // Editorial notes i and ii (page-bottom footnotes on IAa1.1)
  console.log('\nSeeding editorial notes...')
  await client.createOrReplace({
    _id: IDS.noteI,
    _type: 'editorialNote',
    marker: 'i',
    order: 1,
    body: [
      p('This is necessary to ensure efficiency and effectiveness and reduce burden on local communities according to the "SIA Guidance Document" of International Association for Impact Assessment.'),
    ],
  })
  console.log('  ✓ [i]')

  await client.createOrReplace({
    _id: IDS.noteII,
    _type: 'editorialNote',
    marker: 'ii',
    order: 2,
    body: [
      p('Verification is focused on ensuring adherence to prescribed guidelines and process steps rather than evaluating the factual accuracy and completeness of document data.'),
    ],
  })
  console.log('  ✓ [ii]')

  // ─── Activity IAa1.1 ────────────────────────────────────────────────────
  console.log('\nSeeding Activity IAa1.1...')
  await client.createOrReplace({
    _id: IDS.activity,
    _type: 'activity',
    activityId: 'IAa1.1',
    title: 'Establish project understanding and governance framework',
    slug: { _type: 'slug', current: 'iaa1-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-impact' },
    concept: { _type: 'reference', _ref: 'concept-IA' },
    objective: { _type: 'reference', _ref: 'objective-IA01' },
    activityType: 'Driver',
    ratingSystemApplication: {
      _type: 'ratingSystemApplication',
      bi_developer: true,
      bi_occupier: true,
      om_developer: true,
      om_occupier: true,
      cd: false,
    },

    scope: [
      p("The Owner shall understand and document the project's relation to relevant studies, legal frameworks, and sociocultural values and define and document the project's scope."),
    ],

    requirementsSectionFootnote: { _type: 'reference', _ref: IDS.biblio16 },

    requirements: [
      {
        _type: 'requirementGroup',
        _key: nextKey(),
        // No heading — IAa1.1 has flat (ungrouped) requirements
        items: [
          {
            _type: 'requirementItem',
            _key: nextKey(),
            number: 1,
            body: [
              paragraphWithEditorialNote(
                'A list of related studies or other certifications being conducted or directed by the Owner as part of this project and how they integrate with the project',
                IDS.noteI,
                '.',
              ),
            ],
          },
          {
            _type: 'requirementItem',
            _key: nextKey(),
            number: 2,
            body: [p('A list of applicable laws and policies, including:')],
            subItems: [
              { _key: nextKey(), letter: 'a', body: [p('national and state regulations, policies, laws, and relevant procedures')] },
              { _key: nextKey(), letter: 'b', body: [p('local or municipal permitting, zoning, regulations, requirements, Memorandums of Understanding, and/or other contractual agreements or legal stipulations')] },
              { _key: nextKey(), letter: 'c', body: [p('lending institution, investor, or corporate policies, procedures, or requirements')] },
            ],
          },
          {
            _type: 'requirementItem',
            _key: nextKey(),
            number: 3,
            body: [p('Outline steps to resolve conflicts in laws or gaps in guidance (if applicable).')],
          },
          {
            _type: 'requirementItem',
            _key: nextKey(),
            number: 4,
            body: [p('A list of areas of social or cultural importance (see Guidance below).')],
          },
          {
            _type: 'requirementItem',
            _key: nextKey(),
            number: 5,
            body: [p('An overview, objectives, team roles, budget, and schedule for the project.')],
          },
        ],
      },
    ],

    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the 100% completion of all listed requirements in the Requirements section. The context Indicator is the budget for the project.'),
      ],
      // No calculation — IAa1.1 has no formula
    },

    scoring: {
      _type: 'scoring',
      mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'Completion',
        bands: [
          { _key: nextKey(), pointsLabel: '2 points', criterion: 'upon completion of all requirements' },
        ],
      },
    },

    documentationSectionFootnote: { _type: 'reference', _ref: IDS.noteII },

    documentationItems: [
      {
        _type: 'documentationItem',
        _key: nextKey(),
        number: 1,
        body: [p('List of financial, human, and material resources utilized for this activity.')],
      },
      {
        _type: 'documentationItem',
        _key: nextKey(),
        number: 2,
        body: [p('Summary of project goals, team roles, budget, and timeline.')],
      },
      {
        _type: 'documentationItem',
        _key: nextKey(),
        number: 3,
        body: [p('List and description of other studies and how they relate to this project.')],
      },
      {
        _type: 'documentationItem',
        _key: nextKey(),
        number: 4,
        body: [p('List of applicable regulations, requirements, and laws for the project.')],
      },
      {
        _type: 'documentationItem',
        _key: nextKey(),
        number: 5,
        body: [p('Narrative describing any legal conflicts or gaps and their resolutions.')],
      },
      {
        _type: 'documentationItem',
        _key: nextKey(),
        number: 6,
        body: [p('List of socially or culturally important areas and their locations.')],
      },
    ],

    definitions: [
      {
        _type: 'definition',
        _key: nextKey(),
        term: 'Related studies',
        appearsInRequirement: 1,
        body: [p('any other study commissioned, directed, or utilized by the Owner as part of this project.')],
      },
      {
        _type: 'definition',
        _key: nextKey(),
        term: 'Socio-cultural importance',
        appearsInRequirement: 4,
        body: [p("areas or aspects bearing significant social or cultural value in the project's context.")],
      },
    ],

    guidance: [
      {
        _type: 'guidanceSubsection',
        _key: nextKey(),
        heading: 'On relevant studies',
        body: [
          p("In conducting an Impact Assessment for a commercial real estate project, it's important to incorporate findings from relevant, independent specialist studies. These include studies commissioned or utilized by the Owner, such as demographic analyses, economic impact forecasts, public health evaluations, environmental site assessments, traffic studies, urban planning insights, and sociocultural research. By integrating these external studies, the SIA team gains a broader range of technical perspectives and data. This approach enables a thorough evaluation of the project's potential social impacts in areas such as population dynamics, local economic effects, health and social service requirements, cultural influences, community integration, and infrastructure demands. Leveraging this external expertise in the SIA process ensures that impact assessments and mitigation strategies for the commercial development are grounded in comprehensive, multi-disciplinary insights."),
        ],
      },
      {
        _type: 'guidanceSubsection',
        _key: nextKey(),
        heading: 'On identifying high cultural value and/or high social value sites',
        body: [
          li('United Nations Educational, Scientific and Cultural Organization (UNESCO) world heritage sites and biosphere sites are protected areas of outstanding value to humanity because of their significance to our cultural and natural heritage.', 'number', 1),
          li('HCV Network — the HCV Network offers extensive guidance for identifying areas of High Conservation Value (HCV), including the following excerpts:', 'number', 1),
          li('Describe the key social features of the wider landscape. This should include information on protected areas, human settlements and infrastructure, agricultural areas, social context (ethnicity, major social trends, and land use activities), and history of land use and development trends, including future plans (e.g., spatial planning maps, development initiatives, and existing/proposed commercial exploitation and production licenses).', 'bullet', 2),
          li('Evaluate for characteristics that suggest an area may be of high conservation value, including:', 'bullet', 2),
          li('UNESCO World Heritage sites.', 'bullet', 3),
          li('Protected areas.', 'bullet', 3),
          li('Museums, heritage lists, national data sets, authorities, and organizations specializing in particular geographic areas or cultures.', 'bullet', 3),
          li('Large areas that are relatively far from human settlements, roads, or other access. Especially if they are among the largest such areas in a particular country or region.', 'bullet', 3),
          li('Large areas that are more natural and intact than most other such areas and which provide habitats of top predators or species with large range requirements.', 'bullet', 3),
          li('Upstream of important municipal water sources.', 'bullet', 3),
          li('Remote and/or poor rural areas where people rely directly on natural resources to supply most of their needs, including water.', 'bullet', 3),
          li('Areas where hunting and/or fishing is an essential source of protein and income.', 'bullet', 3),
          li('Indigenous hunter-gatherers are present.', 'bullet', 3),
          li('Permanent or nomadic pastoralists are present.', 'bullet', 3),
          li('Farming and livestock raising are done on a small or subsistence scale.', 'bullet', 3),
          li('Native Land (www.native-land.ca) offers guidance to determine if there is a history of Indigenous territories, treaties, and languages in the social area of influence.', 'number', 1),
        ],
      },
    ],

    referencedSources: [{ _type: 'reference', _ref: IDS.biblio16, _key: nextKey() }],

    version: '1.1',
    status: 'published',
  })
  console.log('  ✓ Activity IAa1.1')

  console.log('\nDone.')
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
