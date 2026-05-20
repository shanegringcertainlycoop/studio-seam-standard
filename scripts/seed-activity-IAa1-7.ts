/**
 * Seeds Activity IAa1.7 — "Assemble relevant baseline data for key social issues"
 *
 * Run with:
 *   npx tsx scripts/seed-activity-IAa1-7.ts
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
  noteIX: 'note-ix',
  noteX: 'note-x',
  activity: 'activity-IAa1-7',
}

async function run() {
  console.log('Seeding editorial notes ix and x...')
  await client.createOrReplace({
    _id: IDS.noteIX,
    _type: 'editorialNote',
    marker: 'ix',
    order: 9,
    body: [
      p('Verification is focused on ensuring adherence to prescribed guidelines and process steps rather than evaluating the factual accuracy and completeness of document data.'),
    ],
  })
  console.log('  ✓ [ix]')

  await client.createOrReplace({
    _id: IDS.noteX,
    _type: 'editorialNote',
    marker: 'x',
    order: 10,
    body: [
      p('This provides a record of how the data was collected and can be used to address any questions or concerns about the data.'),
    ],
  })
  console.log('  ✓ [x]')

  console.log('\nSeeding Activity IAa1.7...')
  await client.createOrReplace({
    _id: IDS.activity,
    _type: 'activity',
    activityId: 'IAa1.7',
    title: 'Assemble relevant baseline data for key social issues',
    slug: { _type: 'slug', current: 'iaa1-7' },
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
      p('Owner shall compile baseline data specifically for the SEAM performance and context indicators within the Activities being pursued as part of certification. This data will establish the initial conditions against which project impacts and performance can be measured. The scope is confined to identifying and collecting these indicators, ensuring data accuracy and relevance. It does not extend to subsequent data analysis, interpretation, or monitoring phases.'),
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
            body: [p('Data collection shall adhere to the following:')],
            subItems: [
              { _key: nextKey(), letter: 'a', body: [p('data shall be from reliable and credible sources such as internal project documents, activity logs, or impacted party feedback')] },
              { _key: nextKey(), letter: 'b', body: [p('data shall reflect the most recent and relevant conditions of the project')] },
              { _key: nextKey(), letter: 'c', body: [p('privacy and confidentiality shall be respected when collecting and handling data as applicable')] },
              { _key: nextKey(), letter: 'd', body: [p('detailed records of all data collected shall be kept, including the source, date of collection, and methodologies used. This ensures transparency and allows for verification if needed')] },
            ],
          },
          {
            _type: 'requirementItem',
            _key: nextKey(),
            number: 2,
            body: [p('Baseline data collected shall encompass all performance and context indicators for each Activity being pursued as part of this certification.')],
          },
        ],
      },
    ],

    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the 100% completion of baseline data collection according to requirements.'),
      ],
    },

    scoring: {
      _type: 'scoring',
      mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'Completion',
        bands: [
          { _key: nextKey(), pointsLabel: '4 points', criterion: 'upon completion of all requirements' },
        ],
      },
    },

    documentationSectionFootnote: { _type: 'reference', _ref: IDS.noteIX },

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
        body: [p('A baseline table recording the following:')],
        subItems: [
          { _key: nextKey(), letter: 'a', body: [p('baseline data collected for each pursued SEAM Certification Activity performance and context indicator (if context indicator is able to be collected at this stage of measurement)')] },
          { _key: nextKey(), letter: 'b', body: [paragraphWithEditorialNote('details of the data collection process', IDS.noteX, ', including data sources, collection methods, and collection dates')] },
          { _key: nextKey(), letter: 'c', body: [p('evidence of permissions, informed consent forms (if applicable), and measures taken for data privacy')] },
        ],
      },
    ],

    guidance: [
      {
        _type: 'guidanceResources',
        _key: nextKey(),
        heading: 'Additional Resources',
        resources: [
          {
            _key: nextKey(),
            label: 'International Association for Impact Assessment (IAIA)',
            description: [p('The IAIA is a leading global network on best practice in the use of impact assessment. They provide resources, guidelines, and professional development opportunities related to various types of impact assessment, including social impact assessment.')],
          },
          {
            _key: nextKey(),
            label: "World Bank's Social Analysis Guidelines",
            description: [p('The World Bank provides comprehensive guidelines for conducting social analysis for its projects, which includes guidance on collecting and analyzing baseline data.')],
          },
          {
            _key: nextKey(),
            label: 'United Nations Development Programme (UNDP) Handbook on Planning, Monitoring and Evaluating for Development Results',
            description: [p('This handbook provides detailed guidance on planning and implementing monitoring + evaluation activities, including the collection of baseline data.')],
          },
          {
            _key: nextKey(),
            label: 'Organisation for Economic Co-operation and Development (OECD) DAC Guidelines and Reference Series',
            description: [p("OECD's Development Assistance Committee (DAC) provides guidelines on aspects of development cooperation, including impact evaluation + collection of baseline data.")],
          },
          {
            _key: nextKey(),
            label: 'Sphere Standards',
            description: [p('The Sphere Handbook, developed by a global network of humanitarian response professionals, provides standards and guidance for humanitarian interventions, including the collection of baseline data.')],
          },
          {
            _key: nextKey(),
            label: 'Social Impact Assessment: Guidance for assessing and managing the social impacts of projects, by the International Finance Corporation (IFC)',
            description: [p('This guide provides a detailed overview of the process of conducting a social impact assessment, including the collection of baseline data.')],
          },
        ],
      },
    ],

    referencedSources: [{ _type: 'reference', _ref: IDS.biblio16, _key: nextKey() }],

    version: '1.1',
    status: 'published',
  })
  console.log('  ✓ Activity IAa1.7')

  console.log('\nDone.')
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
