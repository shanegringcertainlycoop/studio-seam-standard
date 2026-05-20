/**
 * Migrates existing activities' referencedSources to the new
 * { source, footnote? } object shape, then seeds Activity IAa3.2.
 *
 * Run with:
 *   npx tsx scripts/seed-activity-IAa3-2.ts
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

const IDS = {
  bibSA8000: 'bib-sa8000-master',
  noteXIV: 'note-xiv',
  bib16: 'bib-16-iaia-sia-2015', // old id holding actual entry 16 content
  iaiaMaster: 'bib-iaia-sia-2015-master',
  activity: 'activity-IAa3-2',
}

async function migrateExistingActivities() {
  // Migrate any referencedSources items that are still plain references
  // (i.e. _type === 'reference') to the new { _type: 'referencedSource', source: ref } shape.
  type RsItem =
    | { _type: 'reference'; _key: string; _ref: string }
    | { _type: 'referencedSource'; _key: string; source: { _ref: string } }
  const activities = await client.fetch<Array<{ _id: string; referencedSources: RsItem[] | null }>>(
    `*[_type == "activity"]{ _id, referencedSources }`,
  )
  let migrated = 0
  for (const a of activities) {
    const rs = a.referencedSources ?? []
    const needsMigration = rs.some((it) => it._type === 'reference')
    if (!needsMigration) continue
    const newArr = rs.map((it) => {
      if (it._type === 'referencedSource') return it
      // legacy reference -> wrap
      return {
        _type: 'referencedSource',
        _key: it._key ?? k(),
        source: { _type: 'reference', _ref: it._ref },
      }
    })
    await client.patch(a._id).set({ referencedSources: newArr }).commit()
    migrated += 1
    console.log(`  ✓ migrated ${a._id}`)
  }
  console.log(`  ${migrated} activities migrated`)
}

async function run() {
  console.log('1. Migrating existing referencedSources to new shape...')
  await migrateExistingActivities()

  console.log('\n2. Seeding SA8000 master source...')
  await client.createOrReplace({
    _id: IDS.bibSA8000,
    _type: 'bibliographyEntry',
    title: 'SA8000® International Standard (2014)',
    citation: 'Social Accountability International SA8000® International Standard (2014)',
    sourceType: 'standard',
  })
  console.log('  ✓ SA8000 doc created')

  console.log('\n3. Seeding editorial note xiv...')
  await client.createOrReplace({
    _id: IDS.noteXIV,
    _type: 'editorialNote',
    marker: 'xiv',
    order: 14,
    body: [p('This standard emphasizes the importance of addressing and rectifying non-compliance.')],
  })
  console.log('  ✓ note xiv')

  console.log('\n4. Seeding Activity IAa3.2...')
  await client.createOrReplace({
    _id: IDS.activity,
    _type: 'activity',
    activityId: 'IAa3.2',
    title: 'Undertake evaluation and periodic review (audit)',
    slug: { _type: 'slug', current: 'iaa3-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-impact' },
    concept: { _type: 'reference', _ref: 'concept-IA' },
    objective: { _type: 'reference', _ref: 'objective-IA03' },
    activityType: 'Impact',
    ratingSystemApplication: {
      _type: 'ratingSystemApplication',
      bi_developer: true, bi_occupier: true, om_developer: true, om_occupier: true, cd: false,
    },

    scope: [
      p("The Owner shall create detailed reports that reflect the project's social performance and undergo an internal review/audit. The objective is to validate the project's adherence to the SIMP, derive insights from the data, and pinpoint improvement areas. Activities that bypass the monitoring phase's findings or do not follow established audit and review procedures are not encompassed within this scope."),
    ],

    requirements: [
      {
        _type: 'requirementGroup', _key: k(),
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('Data collected against the benchmarks and goals set out in the SIMP, synthesizing findings into actionable insights.')] },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p("Comprehensive and transparent reports detailing the project's social performance, areas of improvement, and are published in a transparent manner.")] },
          { _type: 'requirementItem', _key: k(), number: 3, body: [p("A schedule for periodic internal reviews and external audits to assess the project's adherence to the SIMP and its overall social impact, that shall not exceed one year.")] },
          { _type: 'requirementItem', _key: k(), number: 4, body: [p("A process for identifying and implementing necessary adjustments to enhance the project's social performance based on the evaluation and review findings, with mechanisms for measuring the effectiveness of these adjustments.")] },
          { _type: 'requirementItem', _key: k(), number: 5, body: [p('A defined system for impacted parties to provide input on the evaluation process, along with a process for reviewing and integrating their feedback into subsequent project phases.')] },
          { _type: 'requirementItem', _key: k(), number: 6, body: [p("Documentation management policy specifying the format, responsible personnel, and document accessibility for potential SEAM recertification processes, aligning with the SEAM Standard's recertification requirements.")] },
        ],
      },
    ],

    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of resolved non-compliances, which tracks the non-compliances identified during evaluations and the subsequent corrective actions taken. The context indicator is the total number of corrective actions taken.'),
      ],
      calculation: {
        _type: 'calculation',
        mode: 'single',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Identify the total number non-compliances from the evaluation and review process in Activity IAa3.1.', 'number', 1),
              li('Determine the number of non-compliances that been resolved.', 'number', 1),
              li('Calculate the percentage of resolved non-compliances.', 'number', 1),
            ],
            formula: 'P = (RN / N) × 100',
            variables: [
              { symbol: 'P', meaning: 'percentage of SIMP non-compliances resolved' },
              { symbol: 'RN', meaning: 'total number of non-compliances resolved' },
              { symbol: 'N', meaning: 'total number of non-compliances' },
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
        criterionLabel: 'Percentage of Resolved Non-Compliances',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '50 - 69% of resolved non-compliances' },
          { _key: k(), pointsLabel: '2 points', criterion: '70 - 84% of resolved non-compliances' },
          { _key: k(), pointsLabel: '3 points', criterion: '85 - 94% of resolved non-compliances' },
          { _key: k(), pointsLabel: '4 points', criterion: '95+% of resolved non-compliances' },
        ],
      },
      notes: [
        p('Note: This rubric emphasizes the importance of resolving identified non-compliances. Projects that resolve nearly all or all non-compliances receive full points.'),
      ],
    },

    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Comprehensive evaluation reports synthesizing the monitoring data, highlighting key findings, areas of improvement, and recommendations.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p("Reports from both internal reviews and external audits (if applicable), detailing the project's adherence to the SIMP and its overall social impact.")] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Documentation detailing the actions taken to address identified non-compliances, including a specified format, timelines, responsible parties, and outcomes.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Records of impacted party input on the evaluation process, including feedback sessions, surveys, or other engagement mechanisms.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Detailed guidelines regarding the recertification process (if applicable), including application forms, previous certification records, and any correspondence with the certifying body.')] },
    ],

    guidance: [
      {
        _type: 'guidanceResources',
        _key: k(),
        heading: 'Additional Resources',
        resources: [
          { _key: k(), label: 'ISO 19011', description: [p('Provides guidelines for auditing management systems. It can serve as a foundational reference for the evaluation and review process.')] },
          { _key: k(), label: "AccountAbility's AA1000 Series", description: [p('Standards designed for accountability, responsibility, and sustainability, which can guide the evaluation process.')] },
          { _key: k(), label: 'Principles for Responsible Investment (PRI)', description: [p("While primarily focused on investment, PRI's principles can provide context for evaluating the social impact of projects in terms of broader societal benefits.")] },
          { _key: k(), label: 'Transparentem.org', description: [p('A nonprofit organization that advances the well-being of workers and communities by exposing hard truths to those with the power to transform industries.')] },
          { _key: k(), label: 'ISAE3000', description: [p('Provides requirements and guidance on assurance engagements, other than audit or reviews of historical financial information.')] },
        ],
      },
    ],

    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.iaiaMaster } },
      {
        _type: 'referencedSource',
        _key: k(),
        source: { _type: 'reference', _ref: IDS.bibSA8000 },
        footnote: { _type: 'reference', _ref: IDS.noteXIV },
      },
    ],

    version: '1.1',
    status: 'published',
  })
  console.log('  ✓ Activity IAa3.2')

  console.log('\nDone.')
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
