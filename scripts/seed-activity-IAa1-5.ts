/**
 * Seeds Activity IAa1.5 — "Determine the 'social area of influence' by identifying
 * the likely impacted parties"
 *
 * Run with:
 *   npx tsx scripts/seed-activity-IAa1-5.ts
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
  biblio19: 'bib-19',
  noteVII: 'note-vii',
  activity: 'activity-IAa1-5',
}

async function run() {
  console.log('Seeding bibliography entry #19 (placeholder)...')
  await client.createOrReplace({
    _id: IDS.biblio19,
    _type: 'bibliographyEntry',
    number: 19,
    title: 'Bibliography entry 19 (TBD)',
    citation: 'Bibliography entry #19 — to be filled in from Appendix B / page 330.',
    sourceType: 'other',
  })
  console.log('  ✓ [19] (placeholder)')

  console.log('\nSeeding editorial note vii...')
  await client.createOrReplace({
    _id: IDS.noteVII,
    _type: 'editorialNote',
    marker: 'vii',
    order: 7,
    body: [
      p('Verification is focused on ensuring adherence to prescribed guidelines and process steps rather than evaluating the factual accuracy and completeness of document data.'),
    ],
  })
  console.log('  ✓ [vii]')

  console.log('\nSeeding Activity IAa1.5...')
  await client.createOrReplace({
    _id: IDS.activity,
    _type: 'activity',
    activityId: 'IAa1.5',
    title: "Determine the 'social area of influence' by identifying the likely impacted parties",
    slug: { _type: 'slug', current: 'iaa1-5' },
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
      p('The Owner shall identify and analyze parties potentially affected by the impacts (social area of influence) outlined in Activity IAa1.5. This assessment must include demographic data and a comprehensive understanding of the social context linking impacted parties to the project, focusing on those particularly vulnerable to negative impacts. The scope does not extend to impacted parties engagement strategies or broader environmental impacted party considerations.'),
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
            body: [p('A complete list of each impacted party group likely to be impacted for each of the identified impacts from Activity IAa1.4 that includes:')],
            subItems: [
              { _key: nextKey(), letter: 'a', body: [p('an estimate of the likely importance each of these impacted parties are likely to place on that impact')] },
              { _key: nextKey(), letter: 'b', body: [p('the likely level of influence each impacted party group has on the project')] },
              { _key: nextKey(), letter: 'c', body: [p('the geographical boundary for each of the impacted party groups')] },
              { _key: nextKey(), letter: 'd', body: [p('the demographic characteristics of each of the impacted party groups (including identification of underrepresented or vulnerable groups)')] },
            ],
          },
        ],
      },
    ],

    requirementsNotes: [
      p('Note: There may be more than one likely impacted party for each of the identified likely impacts (e.g., the likely impact of construction noise during the construction activity could negatively impact community residents, building occupants, and community business owners).'),
    ],

    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the 100% completion of an impacted party analysis for the project as defined in the requirements. The context indicator is the total number of identified impacted parties.'),
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

    documentationSectionFootnote: { _type: 'reference', _ref: IDS.noteVII },

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
        body: [p('A completed comprehensive table of likely impacted parties for each likely impact identified in Activity IAa1.4, including estimated importance, level of influence, geographical boundaries, and characteristics.')],
      },
    ],

    guidance: [
      {
        _type: 'guidanceSubsection',
        _key: nextKey(),
        heading: 'On determining social area of influence',
        headingFootnote: { _type: 'reference', _ref: IDS.biblio19 },
        body: [
          p("A 'social area of influence' consists of the people potentially impacted by a project. The location of affected people is both downstream and upstream and doesn't always align with the geographical boundaries of the project or property. Therefore, the social area of influence is not necessarily a geographic boundary. Social impacts \"do not necessarily decrease in intensity with distance from the project site.\" People are connected by many associations, relationships, and networks and can have extensive logistics corridors. The social scope of the project should be determined through a combination of impacted party analysis and value chain mapping and through an iterative process of understanding the social and economic changes produced by the project and the livelihoods and networks of potentially impacted people."),
          p("Consider the impact of a new shopping mall in a suburban area to understand the 'social area of influence.' Locally, residents and businesses near the mall, or 'downstream' impacted parties, may face increased traffic or gain job opportunities. Beyond this immediate area, 'upstream' impacted parties, like distant (in other countries) suppliers to mall stores, are also affected. Additionally, factory employees who had to be relocated due to the mall's construction are impacted despite not being traditionally impacted parties. The mall's social impacts, like job creation and traffic changes, extend beyond its physical location, affecting diverse groups through various networks. Mall developers must consider these widespread influences, engaging in impacted party analysis and value chain mapping to manage the mall's broader social impact effectively."),
        ],
      },
    ],

    referencedSources: [{ _type: 'reference', _ref: IDS.biblio16, _key: nextKey() }],

    version: '1.1',
    status: 'published',
  })
  console.log('  ✓ Activity IAa1.5')

  console.log('\nDone.')
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
