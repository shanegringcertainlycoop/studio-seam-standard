/**
 * Seeds Activity IAa3.1 — "Develop and implement ongoing social performance
 * monitoring plan that addresses obligations from the SIMP"
 *
 * Also updates Objective IA03 with its narrative + headline goal.
 *
 * Run with:
 *   npx tsx scripts/seed-activity-IAa3-1.ts
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

let key = 0
const k = () => `k${++key}`

function p(text: string) {
  return {
    _type: 'richText',
    _key: k(),
    style: 'normal',
    children: [{ _type: 'span', _key: k(), text, marks: [] }],
    markDefs: [],
  }
}

function li(text: string, listItem: 'bullet' | 'number' = 'bullet', level = 1) {
  return {
    _type: 'richText',
    _key: k(),
    style: 'normal',
    listItem,
    level,
    children: [{ _type: 'span', _key: k(), text, marks: [] }],
    markDefs: [],
  }
}

// Bullet with a bold prefix (the term) followed by plain body. Mirrors the PDF's
// "Complete – address..." pattern with the term in bold.
function liBold(boldTerm: string, rest: string, listItem: 'bullet' | 'number' = 'bullet', level = 1) {
  const boldKey = k()
  return {
    _type: 'richText',
    _key: k(),
    style: 'normal',
    listItem,
    level,
    children: [
      { _type: 'span', _key: k(), text: boldTerm, marks: ['strong'] },
      { _type: 'span', _key: k(), text: rest, marks: [] },
    ],
    markDefs: [],
  }
}

function pWithBib(before: string, bibId: string, after: string) {
  const markKey = k()
  return {
    _type: 'richText',
    _key: k(),
    style: 'normal',
    children: [
      { _type: 'span', _key: k(), text: before, marks: [] },
      { _type: 'span', _key: k(), text: '', marks: [markKey] },
      { _type: 'span', _key: k(), text: after, marks: [] },
    ],
    markDefs: [
      { _type: 'bibliographyRef', _key: markKey, entry: { _type: 'reference', _ref: bibId } },
    ],
  }
}

const IDS = {
  bib16: 'bib-16-iaia-sia-2015',
  bib26: 'bib-26',
  bibISO26000: 'bib-iso-26000',
  activity: 'activity-IAa3-1',
}

async function run() {
  // ─── Objective IA03 ─────────────────────────────────────────────────────
  console.log('Updating Objective IA03...')
  await client
    .patch('objective-IA03')
    .set({
      headlineGoal: 'To implement adaptive management so that projects remain responsive to changing circumstances and unforeseen challenges and decrease negative social impacts.',
      narrative: [
        p("Monitoring and evaluation are vital for ensuring that the predicted social impacts align with the outcomes. It provides a mechanism to track the effectiveness of mitigation measures, adapt to unforeseen challenges, and ensure that the project remains compliant with international standards and best practices. Regular monitoring and evaluation safeguard impacted parties' interests, particularly vulnerable groups, and reinforce the project's social license to operate."),
      ],
    })
    .commit()
  console.log('  ✓ IA03 objective updated')

  // ─── Bibliography placeholder #26 ───────────────────────────────────────
  console.log('\nSeeding bibliography entry #26 (placeholder)...')
  await client.createOrReplace({
    _id: IDS.bib26,
    _type: 'bibliographyEntry',
    number: 26,
    title: 'Bibliography entry 26 (TBD)',
    citation: 'Bibliography entry #26 — to be filled in from Appendix B / page 330.',
    sourceType: 'other',
  })
  console.log('  ✓ [26] (placeholder)')

  // ─── Activity IAa3.1 ────────────────────────────────────────────────────
  console.log('\nSeeding Activity IAa3.1...')
  await client.createOrReplace({
    _id: IDS.activity,
    _type: 'activity',
    activityId: 'IAa3.1',
    title: 'Develop and implement ongoing social performance monitoring plan that addresses obligations from the SIMP',
    slug: { _type: 'slug', current: 'iaa3-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-impact' },
    concept: { _type: 'reference', _ref: 'concept-IA' },
    objective: { _type: 'reference', _ref: 'objective-IA03' },
    activityType: 'Impact',
    ratingSystemApplication: {
      _type: 'ratingSystemApplication',
      bi_developer: true,
      bi_occupier: true,
      om_developer: true,
      om_occupier: true,
      cd: false,
    },

    scope: [
      p("The Owner shall systematically collect relevant data and analyze it to gauge the project's ongoing social impact. The objective is to ensure that the project's actions and outcomes remain consistent with the benchmarks set by the SIMP. Activities that do not adhere to the SIMP's prescribed methodologies or fail to maintain consistent data tracking fall outside this scope."),
    ],

    requirements: [
      {
        _type: 'requirementGroup',
        _key: k(),
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('A monitoring plan that aligns with the SIMP, detailing the methodologies, tools, and indicators for continuous social performance monitoring.')],
          },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Engagement with impacted parties identified in the SIMP, ensuring their concerns and feedback are integrated into the monitoring process.')],
          },
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [p("Comprehensive records of all monitoring activities, ensuring they're secure and accessible for future evaluation and review.")],
          },
          {
            _type: 'requirementItem', _key: k(), number: 4,
            body: [p('Monitoring personnel for the project receive annual up-to-date training on best practices in social impact assessment and monitoring.')],
          },
          {
            _type: 'requirementItem', _key: k(), number: 5,
            body: [p('Establish a clear monitoring and reporting schedule, specifying the frequency of data collection, analysis, and reporting to impacted parties.')],
          },
        ],
      },
    ],

    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of SIMP obligations monitored, which measures the proportion of obligations from the SIMP with active monitoring mechanisms. The context indicator is the total number of obligations actively monitored.'),
      ],
      calculation: {
        _type: 'calculation',
        mode: 'single',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Identify the total number of obligations from the SIMP.', 'number', 1),
              li('Determine the number of obligations that have active monitoring mechanisms in place.', 'number', 1),
              li('Calculate the percentage of SIMP obligations monitored.', 'number', 1),
            ],
            formula: 'P = (SO / N) × 100',
            variables: [
              { symbol: 'P', meaning: 'percentage of SIMP Obligations Monitored' },
              { symbol: 'SO', meaning: 'total number of SIMP obligations actively monitored' },
              { symbol: 'N', meaning: 'total number of SIMP obligations' },
            ],
          },
        ],
      },
    },

    scoring: {
      _type: 'scoring',
      mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'Percentage of SIMP Obligations Monitored',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '50 - 69% of SIMP obligations monitored' },
          { _key: k(), pointsLabel: '2 points', criterion: '70 - 79% of SIMP obligations monitored' },
          { _key: k(), pointsLabel: '3 points', criterion: '80 - 89% of SIMP obligations monitored' },
          { _key: k(), pointsLabel: '4 points', criterion: '90+% of SIMP obligations monitored' },
        ],
      },
      notes: [
        p('Note: This rubric emphasizes the importance of monitoring the most material obligations. Projects that monitor nearly all or all material obligations receive full points.'),
      ],
    },

    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('A comprehensive monitoring plan detailing the methodologies, tools, + indicators used for continuous social performance monitoring in alignment with the SIMP.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Documentation of meetings, feedback sessions, or other engagement activities with impacted parties, including dates, attendees, and main discussion points.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Records of data collected, including source, date of collection, + person responsible.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Initial reports or summaries analyzing the collected data against the SIMP benchmarks.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Documentation of training sessions provided to monitoring personnel, including training content, dates, attendees, and trainers.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Monitoring and reporting schedule detailing the frequency of these activities, ensuring impacted parties are informed and engaged in the monitoring process.')] },
    ],

    guidance: [
      {
        _type: 'guidanceSubsection',
        _key: k(),
        heading: 'On responsible communication characteristics',
        body: [
          pWithBib('According to ISO 26000:2010, Guidance on social responsibility, information relating to social responsibility should be', IDS.bib26, ':'),
          liBold('Complete', ' – address all significant activities and impacts related to social responsibility', 'bullet', 1),
          liBold('Understandable', ' – provided with regard for the knowledge and the cultural, social, educational, and economic background of those who will be involved in the communication. Both the language used, and the manner in which the material is presented, including how it is organized, should be accessible for the impacted parties intended to receive the information', 'bullet', 1),
          liBold('Responsive', ' – be responsive to impacted party interests', 'bullet', 1),
          liBold('Accurate', ' – be factually correct and should provide sufficient detail to be useful and appropriate for its purpose', 'bullet', 1),
          liBold('Balanced', " – be balanced and fair and should not omit relevant negative information concerning the impacts of an organization's activities", 'bullet', 1),
          liBold('Timely', ' – out of date information can be misleading. Where information describes activities during a specific period of time, identification of the period of time covered will allow impacted parties to compare the performance of the organization with its earlier performance and with the performance of other organizations; and', 'bullet', 1),
          liBold('Accessible', ' – be available to the impacted parties concerned', 'bullet', 1),
        ],
      },
      {
        _type: 'guidanceResources',
        _key: k(),
        heading: 'Additional Resources',
        resources: [
          {
            _key: k(),
            label: 'ISO 26000',
            description: [p('Provides guidance on social responsibility and can serve as a foundational reference for defining and understanding social performance metrics.')],
          },
        ],
      },
    ],

    referencedSources: [{ _type: 'reference', _ref: IDS.bib16, _key: k() }],

    version: '1.1',
    status: 'published',
  })
  console.log('  ✓ Activity IAa3.1')

  console.log('\nDone.')
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
