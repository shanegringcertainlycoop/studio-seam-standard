/**
 * Seeds Activity IAa1.4 — "Identify and scope the likely social and human rights
 * impacts of the commercial real estate project"
 *
 * Run with:
 *   npx tsx scripts/seed-activity-IAa1-4.ts
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

let blockKey = 0
function nextKey() {
  blockKey += 1
  return `k${blockKey}`
}

function p(text: string) {
  return {
    _type: 'richText',
    _key: nextKey(),
    style: 'normal',
    children: [{ _type: 'span', _key: nextKey(), text, marks: [] }],
    markDefs: [],
  }
}

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

const IDS = {
  biblio16: 'bib-16-iaia-sia-2015',
  biblio18: 'bib-18',
  noteVI: 'note-vi',
  activity: 'activity-IAa1-4',
}

async function run() {
  // Bibliography entry #18 — placeholder
  console.log('Seeding bibliography entry #18 (placeholder)...')
  await client.createOrReplace({
    _id: IDS.biblio18,
    _type: 'bibliographyEntry',
    number: 18,
    title: 'Bibliography entry 18 (TBD)',
    citation: 'Bibliography entry #18 — to be filled in from Appendix B / page 330.',
    sourceType: 'other',
  })
  console.log('  ✓ [18] (placeholder)')

  // Editorial note vi (Documentation section footnote — same boilerplate)
  console.log('\nSeeding editorial note vi...')
  await client.createOrReplace({
    _id: IDS.noteVI,
    _type: 'editorialNote',
    marker: 'vi',
    order: 6,
    body: [
      p('Verification is focused on ensuring adherence to prescribed guidelines and process steps rather than evaluating the factual accuracy and completeness of document data.'),
    ],
  })
  console.log('  ✓ [vi]')

  console.log('\nSeeding Activity IAa1.4...')
  await client.createOrReplace({
    _id: IDS.activity,
    _type: 'activity',
    activityId: 'IAa1.4',
    title: 'Identify and scope the likely social and human rights impacts of the commercial real estate project',
    slug: { _type: 'slug', current: 'iaa1-4' },
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
      p('The Owner shall identify, and scope anticipated social and human rights impacts associated with the project referencing the value chain map created in Activity IAa1.2. The scope does not cover mitigation strategies or broader environmental considerations.'),
    ],

    requirements: [
      {
        _type: 'requirementGroup',
        _key: nextKey(),
        items: [
          {
            _type: 'requirementItem',
            _key: nextKey(),
            number: 1,
            body: [p('A record of the likely impacts for each activity identified in Activity IAa1.2 with the following qualifiers:')],
            subItems: [
              { _key: nextKey(), letter: 'a', body: [p('positive or negative')] },
              { _key: nextKey(), letter: 'b', body: [p('scope – extent of impact regarding number of individuals affected')] },
              { _key: nextKey(), letter: 'c', body: [p('scale – how serious would the impacts be')] },
              { _key: nextKey(), letter: 'd', body: [p('remediability – the ease with which the individual can be restored to a pre-impact state')] },
              { _key: nextKey(), letter: 'e', body: [p('likelihood – how probable that the impact will occur within 2 to 3 years')] },
            ],
          },
        ],
      },
    ],

    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the 100% completion of the project likely impacts assessment as defined in the requirement.'),
      ],
    },

    scoring: {
      _type: 'scoring',
      mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'Completion',
        bands: [
          { _key: nextKey(), pointsLabel: '3 points', criterion: 'upon completion of the requirement' },
        ],
      },
    },

    documentationSectionFootnote: { _type: 'reference', _ref: IDS.noteVI },

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
        body: [p('Completed Table of Likely Impacts worksheet for each activity listed in Activity IAa1.2, indicating whether it is positive or negative, scope, scale, remediability, and likelihood.')],
      },
    ],

    guidance: [
      {
        _type: 'guidanceSubsection',
        _key: nextKey(),
        heading: 'On scoping the likely impacts',
        headingFootnote: { _type: 'reference', _ref: IDS.biblio18 },
        body: [
          p('"Scoping is an open, ongoing process that responds to information. Inputs to scoping (i.e., suggestions of impacts to consider) should come from a range of sources including a desktop review of similar cases elsewhere, expert judgement, and most importantly suggestions from local people. The initial interviews [with the project or property team] done as part of the profiling process can provide ideas which can be a good starting point. However, undertaking community-based workshops [or surveys] to generate input for the scoping process is a good idea. The scale and location of these workshops [and surveys] should, of course, be responsive to the context. For example, in communities where it is not considered appropriate for women to speak publicly, separate meetings with women may be necessary to ensure that any issues or potential impacts they have are able to be recorded and included in the scoping process."'),
          p('Steps to scope the likely impacts:'),
          li('List the likely impacts for each major activity identified in Activity IAa1.2.', 'number', 1),
          li('Identify each impact as positive or negative.', 'number', 1),
          li('Identify each impact as intended or unintended.', 'number', 1),
          li('Identify each impact as actual or potential (actual impacts are occurring now or existing).', 'number', 1),
          li('Identify how many people will likely experience this impact (scope of impact).', 'number', 1),
          li('Determine the severity of the likely impact (i.e., how serious would the impacts be).', 'number', 1),
          li('Identify the remediability of the impact (i.e., will a remedy restore the impacted person to the same or equivalent position before the harm?).', 'number', 1),
        ],
      },
    ],

    referencedSources: [{ _type: 'reference', _ref: IDS.biblio16, _key: nextKey() }],

    version: '1.1',
    status: 'published',
  })
  console.log('  ✓ Activity IAa1.4')

  console.log('\nDone.')
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
