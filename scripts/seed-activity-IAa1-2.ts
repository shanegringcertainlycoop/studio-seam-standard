/**
 * Seeds Activity IAa1.2 — "Gain a good understanding of the communities likely
 * to be affected by the project by preparing a Community Profile"
 *
 * Run with:
 *   npx tsx scripts/seed-activity-IAa1-2.ts
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

const IDS = {
  biblio16: 'bib-16-iaia-sia-2015',
  biblio17: 'bib-17',
  noteIII: 'note-iii-iaa1-2',
  activity: 'activity-IAa1-2',
}

async function run() {
  // Bibliography entry #17 — placeholder until full bibliography pass
  console.log('Seeding bibliography entry #17 (placeholder)...')
  await client.createOrReplace({
    _id: IDS.biblio17,
    _type: 'bibliographyEntry',
    number: 17,
    title: 'Bibliography entry 17 (TBD)',
    citation: 'Bibliography entry #17 — to be filled in from Appendix B / page 330.',
    sourceType: 'other',
  })
  console.log('  ✓ [17] (placeholder)')

  // Editorial note iii
  console.log('\nSeeding editorial note iii...')
  await client.createOrReplace({
    _id: IDS.noteIII,
    _type: 'editorialNote',
    marker: 'iii',
    order: 3,
    body: [
      p('Verification is focused on ensuring adherence to prescribed guidelines and process steps rather than evaluating the factual accuracy and completeness of document data.'),
    ],
  })
  console.log('  ✓ [iii]')

  // Activity IAa1.2
  console.log('\nSeeding Activity IAa1.2...')
  await client.createOrReplace({
    _id: IDS.activity,
    _type: 'activity',
    activityId: 'IAa1.2',
    title: 'Gain a good understanding of the communities likely to be affected by the project by preparing a Community Profile',
    slug: { _type: 'slug', current: 'iaa1-2' },
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
      p("The Owner shall prepare a detailed Community Profile that captures comprehensive information about the communities anticipated to be impacted by the project. This profile shall encompass demographic data, socio-economic indicators, cultural practices, and historical context. The objective is to establish a baseline understanding of the community's characteristics and dynamics. The scope does not include community engagement strategies or interventions based on the profile findings."),
    ],

    requirementsSectionFootnote: { _type: 'reference', _ref: IDS.biblio17 },

    requirements: [
      {
        _type: 'requirementGroup',
        _key: nextKey(),
        items: [
          {
            _type: 'requirementItem',
            _key: nextKey(),
            number: 1,
            body: [p('Community Profile report shall be comprehensive, with clear documentation of data sources, methodologies, and any assumptions made during the analysis, including:')],
            subItems: [
              { _key: nextKey(), letter: 'a', body: [p('detailed demographic data of the affected communities, including age distribution, gender ratios, ethnic groups, and population growth trends')] },
              { _key: nextKey(), letter: 'b', body: [p('socio-economic conditions of the communities, encompassing employment rates, income levels, education status, and prevalent industries or occupations')] },
              { _key: nextKey(), letter: 'c', body: [p('cultural practices, traditions, and historical events or milestones that have shaped the communities and might influence their perception or reception of the project')] },
              { _key: nextKey(), letter: 'd', body: [p('key community infrastructure such as schools, healthcare facilities, transportation networks, and other essential services')] },
              { _key: nextKey(), letter: 'e', body: [p('influential individuals, community leaders, and organized groups within the communities that play pivotal roles in community decision-making and dynamics')] },
              { _key: nextKey(), letter: 'f', body: [p('segments of the community that may be particularly vulnerable to project impacts, such as marginalized groups, Indigenous populations, or economically disadvantaged groups')] },
              { _key: nextKey(), letter: 'g', body: [p('historical context, including events that have a long community-cultural memory and impact (see Additional Resources for mapping tools)')] },
            ],
          },
        ],
      },
    ],

    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the 100% completion of a community profile according to requirements.'),
      ],
    },

    scoring: {
      _type: 'scoring',
      mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'Completion',
        bands: [
          { _key: nextKey(), pointsLabel: '3 points', criterion: 'upon completion of all requirements' },
        ],
      },
    },

    documentationSectionFootnote: { _type: 'reference', _ref: IDS.noteIII },

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
        body: [p('A Community Profile that addresses all elements in the requirements or explanations for lack of information.')],
      },
    ],

    guidance: [
      {
        _type: 'guidanceResources',
        _key: nextKey(),
        heading: 'Additional Resources',
        resources: [
          { _key: nextKey(), label: 'Race and Income Mapping', url: 'http://www.justicemap.org/' },
          { _key: nextKey(), label: 'Housing + Transportation Affordability Mapping', url: 'https://htaindex.cnt.org/map/' },
          { _key: nextKey(), label: 'Land displacement / Native land mapping', url: 'https://native-land.ca/' },
          { _key: nextKey(), label: 'Redlining maps', url: 'https://dsl.richmond.edu/panorama/redlining/#loc=4/41.218/-105.499' },
          { _key: nextKey(), label: 'Justice Mapping', url: 'https://www.justicemapping.org/' },
          { _key: nextKey(), label: 'Urban Renewal Mapping', url: 'https://dsl.richmond.edu/panorama/renewal/#view=0/0/1&viz=cartogram' },
        ],
      },
    ],

    referencedSources: [{ _type: 'reference', _ref: IDS.biblio16, _key: nextKey() }],

    version: '1.1',
    status: 'published',
  })
  console.log('  ✓ Activity IAa1.2')

  console.log('\nDone.')
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
