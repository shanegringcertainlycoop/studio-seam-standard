/**
 * Seeds Activity IAa1.3 — "Map the proposed project value chain"
 *
 * Run with:
 *   npx tsx scripts/seed-activity-IAa1-3.ts
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

// Paragraph that contains a single inline editorial-note reference between `before` and `after`.
function paragraphWithEditorialNote(before: string, noteId: string, after: string) {
  const markKey = nextKey()
  return {
    _type: 'richText',
    _key: nextKey(),
    style: 'normal',
    children: [
      { _type: 'span', _key: nextKey(), text: before, marks: [] },
      { _type: 'span', _key: nextKey(), text: '', marks: [markKey] },
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

const IDS = {
  biblio16: 'bib-16-iaia-sia-2015',
  noteIV: 'note-iv',
  noteV: 'note-v',
  activity: 'activity-IAa1-3',
}

async function run() {
  console.log('Seeding editorial notes iv and v...')
  await client.createOrReplace({
    _id: IDS.noteIV,
    _type: 'editorialNote',
    marker: 'iv',
    order: 4,
    body: [p('Examples are not exhaustive.')],
  })
  console.log('  ✓ [iv]')

  await client.createOrReplace({
    _id: IDS.noteV,
    _type: 'editorialNote',
    marker: 'v',
    order: 5,
    body: [
      p('Verification is focused on ensuring adherence to prescribed guidelines and process steps rather than evaluating the factual accuracy and completeness of document data.'),
    ],
  })
  console.log('  ✓ [v]')

  console.log('\nSeeding Activity IAa1.3...')
  await client.createOrReplace({
    _id: IDS.activity,
    _type: 'activity',
    activityId: 'IAa1.3',
    title: 'Map the proposed project value chain',
    slug: { _type: 'slug', current: 'iaa1-3' },
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
      p('The Owner shall define the phases and activities required throughout the entire scope of the project, including all relevant and supporting activities, by listing all the phases/stages of work and their corresponding activities.'),
    ],

    // No section footnote on Requirements

    requirements: [
      {
        _type: 'requirementGroup',
        _key: nextKey(),
        items: [
          {
            _type: 'requirementItem',
            _key: nextKey(),
            number: 1,
            body: [paragraphWithEditorialNote('A value chain map that includes the following', IDS.noteIV, ':')],
            subItems: [
              { _key: nextKey(), letter: 'a', body: [p('value chain stages (e.g., financing; planning; design and engineering; commissioning; procurement; construction materials extraction, processing, and manufacturing; logistics; construction; property marketing; leasing; operations; maintenance; renovation; deconstruction; demolition; waste processing and disposal, etc.)')] },
              { _key: nextKey(), letter: 'b', body: [p('value chain activities within each phase (e.g., activities in procurement could be creating an RFP; determining bid list; bid-leveling proposals; interviewing bidders; contracting, etc.)')] },
            ],
          },
          {
            _type: 'requirementItem',
            _key: nextKey(),
            number: 2,
            body: [p('Completion of procedural methodology that includes the following:')],
            subItems: [
              { _key: nextKey(), letter: 'a', body: [p('exploratory interviews with key internal project team members to identify known relevant and supporting activities')] },
              { _key: nextKey(), letter: 'b', body: [p('desk research on analogous components from other projects')] },
              { _key: nextKey(), letter: 'c', body: [p('developing a draft process map')] },
              { _key: nextKey(), letter: 'd', body: [p('hosting review sessions for feedback from involved internal project team members')] },
              { _key: nextKey(), letter: 'e', body: [p('incorporating feedback into an updated process map')] },
              { _key: nextKey(), letter: 'f', body: [p('iterating the above steps until no major new relevant and supporting activities are identified')] },
            ],
          },
        ],
      },
    ],

    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the 100% completion of the project value chain map as defined in the requirements.'),
      ],
    },

    scoring: {
      _type: 'scoring',
      mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'Completion',
        bands: [
          { _key: nextKey(), pointsLabel: '2 points', criterion: 'upon completion of a value chain map according to all requirements' },
        ],
      },
    },

    documentationSectionFootnote: { _type: 'reference', _ref: IDS.noteV },

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
        body: [p('A value chain map with a comprehensive list of all stages of the full project with associated activities relevant to each stage.')],
      },
      {
        _type: 'documentationItem',
        _key: nextKey(),
        number: 3,
        body: [p('Documentation verifying procedural compliance:')],
        subItems: [
          { _key: nextKey(), letter: 'a', body: [p('names of project team members interviewed, interview notes highlighting inputs on known relevant and supporting activities')] },
          { _key: nextKey(), letter: 'b', body: [p('documents, reports, and analyses detailing research done on analogous project components to identify common relevant and supporting activities')] },
          { _key: nextKey(), letter: 'c', body: [p('a draft version of the value chain map prior to community/partner review to show initial work')] },
          { _key: nextKey(), letter: 'd', body: [p('meeting agenda, list of participating project team members, and minutes capturing feedback')] },
          { _key: nextKey(), letter: 'e', body: [p('the revised version incorporating feedback')] },
          { _key: nextKey(), letter: 'f', body: [p('a checklist signed off by the project lead confirming each component of Requirement #2 was completed')] },
        ],
      },
    ],

    // No Definitions, no Guidance

    referencedSources: [{ _type: 'reference', _ref: IDS.biblio16, _key: nextKey() }],

    version: '1.1',
    status: 'published',
  })
  console.log('  ✓ Activity IAa1.3')

  console.log('\nDone.')
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
