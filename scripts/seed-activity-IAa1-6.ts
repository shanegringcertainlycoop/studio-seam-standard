/**
 * Seeds Activity IAa1.6 — "Create a reliable, credible, equitable, and efficient
 * impacted party engagement plan"
 *
 * Run with:
 *   npx tsx scripts/seed-activity-IAa1-6.ts
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
  noteVIII: 'note-viii',
  activity: 'activity-IAa1-6',
}

async function run() {
  console.log('Seeding editorial note viii...')
  await client.createOrReplace({
    _id: IDS.noteVIII,
    _type: 'editorialNote',
    marker: 'viii',
    order: 8,
    body: [
      p('Verification is focused on ensuring adherence to prescribed guidelines and process steps rather than evaluating the factual accuracy and completeness of document data.'),
    ],
  })
  console.log('  ✓ [viii]')

  console.log('\nSeeding Activity IAa1.6...')
  await client.createOrReplace({
    _id: IDS.activity,
    _type: 'activity',
    activityId: 'IAa1.6',
    title: 'Create a reliable, credible, equitable, and efficient impacted party engagement plan',
    slug: { _type: 'slug', current: 'iaa1-6' },
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
      p('Owner shall create an impacted party engagement plan, including mechanisms for transparent and inclusive interactions with all identified impacted parties, detailing engagement methods, frequency, and communication channels. Special attention shall be given to ensure representation from marginalized or vulnerable groups. The scope is limited to the design of the engagement plan and does not encompass its execution or subsequent assessment.'),
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
            body: [p('Each engagement method shall clearly communicate to impacted parties the following:')],
            subItems: [
              { _key: nextKey(), letter: 'a', body: [p('the objectives of the engagement')] },
              { _key: nextKey(), letter: 'b', body: [p('who will be using the collected information')] },
              { _key: nextKey(), letter: 'c', body: [p('how the information will be used')] },
            ],
          },
          {
            _type: 'requirementItem',
            _key: nextKey(),
            number: 2,
            body: [p('Questions/content shall be designed for the specific audience you are requesting feedback from.')],
          },
          {
            _type: 'requirementItem',
            _key: nextKey(),
            number: 3,
            body: [p('Sample size shall achieve statistical significance of 95% or higher confidence level with 5% or less margin of error for the population size.')],
          },
          {
            _type: 'requirementItem',
            _key: nextKey(),
            number: 4,
            body: [p('Plan shall specify the most effective method of reaching each impacted party group (there will likely be multiple methods of impacted party engagement).')],
          },
          {
            _type: 'requirementItem',
            _key: nextKey(),
            number: 5,
            body: [p('Feedback collection questions shall be:')],
            subItems: [
              { _key: nextKey(), letter: 'a', body: [p('ethical – do not ask deeply personal or invasive questions')] },
              { _key: nextKey(), letter: 'b', body: [p('decision-focused – relevant and actionable questions')] },
              { _key: nextKey(), letter: 'c', body: [p('tested – questions have been tested on a small sample of locals to confirm they are understandable')] },
              { _key: nextKey(), letter: 'd', body: [p('short – keep feedback collection as short as possible to prevent burdening respondents')] },
              { _key: nextKey(), letter: 'e', body: [p('mixed – balance of question types (open-ended, multiple choice, quantitative, and qualitative)')] },
              { _key: nextKey(), letter: 'f', body: [p("non-assumptive – do not assume respondents' knowledge of background info needed to answer the question")] },
              { _key: nextKey(), letter: 'g', body: [p('non-leading (or unintentionally coercive) – do not ask questions that are phrased in a way that prompts or suggests a particular answer')] },
            ],
          },
          {
            _type: 'requirementItem',
            _key: nextKey(),
            number: 6,
            body: [p('Impacted party engagement shall be GDPR compliant to protect confidentiality.')],
          },
        ],
      },
    ],

    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the 100% completion of an impacted party engagement protocol according to requirements.'),
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

    documentationSectionFootnote: { _type: 'reference', _ref: IDS.noteVIII },

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
        body: [p('Engagement Protocol detailing all the requirements.')],
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
            label: 'The Lean Data Field Guide (Acumen)',
            url: 'https://cerise-sptf.org/docs/RC-1b-Acumens-Lean-Data-Field-Guide-Nov2015.pdf',
          },
        ],
      },
    ],

    referencedSources: [{ _type: 'reference', _ref: IDS.biblio16, _key: nextKey() }],

    version: '1.1',
    status: 'published',
  })
  console.log('  ✓ Activity IAa1.6')

  console.log('\nDone.')
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
