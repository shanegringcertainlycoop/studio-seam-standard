/**
 * Seeds Objective TG05 + TGa5.1 + TGa5.2.
 *
 * Notes:
 *  - Example Rating Table and example materiality grid (page 124, 127) skipped —
 *    described inline as references but not seeded as structured data.
 */

import { createClient } from '@sanity/client'
import { config as loadEnv } from 'dotenv'

loadEnv()

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  token: process.env.SANITY_AUTH_TOKEN!,
  apiVersion: '2025-01-01',
  useCdn: false,
})

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
  bibISO26000: 'bib-iso-26000',
  bibUNGP: 'bib-un-guiding-principles',
  a51: 'activity-TGa5-1',
  a52: 'activity-TGa5-2',
}

function indicators() {
  return {
    _type: 'indicators',
    performanceIndicator: [
      p('The performance indicator is the percentage of addressed material issues. The context indicator is the number of material issues identified.'),
    ],
    calculation: {
      _type: 'calculation',
      mode: 'single',
      steps: [
        {
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Determine number of material issues or topics identified.', 'number', 1),
            li('Determine number of material issues addressed.', 'number', 1),
            li('Calculate the percentage of addressed material issues.', 'number', 1),
          ],
          formula: 'P = (MI / N) × 100',
          variables: [
            { symbol: 'P', meaning: 'percentage of addressed material issues' },
            { symbol: 'MI', meaning: 'total number of material issues addressed' },
            { symbol: 'N', meaning: 'total number of material issues identified' },
          ],
        },
      ],
    },
  }
}

function docItems() {
  return [
    { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
    { _type: 'documentationItem', _key: k(), number: 2, body: [p('Shareholder and impacted party list.')] },
    { _type: 'documentationItem', _key: k(), number: 3, body: [p("Materiality map with each party's associated interests, influence levels, and impacts.")] },
    { _type: 'documentationItem', _key: k(), number: 4, body: [p('Written protocol for the process of considering impacted party interests in decisions and activities.')] },
    { _type: 'documentationItem', _key: k(), number: 5, body: [p('Communication log of all impacted party feedback, date of contact, date of response, and response.')] },
  ]
}

function guidance() {
  return [
    {
      _type: 'guidanceSubsection', _key: k(),
      heading: 'On creating a materiality matrix to determine material issues',
      body: [
        p('The following step-by-step guidance allows you to create a materiality matrix and identify material issues.'),
        li('Determine importance of likely impact (issue) to impacted parties by:', 'number', 1),
        li('Conducting interviews, focus groups, or surveys with impacted parties', 'bullet', 2),
        li('ask them to categorize each issue based on its importance to them as Low, Medium, High, Severe. If you do not have direct importance data, tally the percentage of reports/responses for each issue and use the following scale to rate them: 1-15%=Low; 16-40%=Medium; 41-70%=High; 71%+=Severe.', 'bullet', 2),
        li('tally the responses to determine the consensus category for each issue', 'bullet', 2),
        li('record in the Ratings Table (see example below)', 'bullet', 2),
        li('Determine the impact of the issue to the project by conducting an internal assessment:', 'number', 1),
        li('engage with internal experts, management, or teams to categorize the potential impact of each issue on the project (consider factors like potential financial implications, reputational risks, and operational effects)', 'bullet', 2),
        li('ask them to categorize each issue based on the impact to the project (Low, Medium, High)', 'bullet', 2),
        li('tally the responses to determine the consensus category for each issue', 'bullet', 2),
        li('record in the Ratings Table (see example below)', 'bullet', 2),
        li('Plot the matrix by:', 'number', 1),
        li("creating a grid with the x-axis divided into sections labeled 'Low', 'Medium', 'High', representing impact to project and y-axis representing importance to impacted party (see example grid below).", 'bullet', 2),
        li('place each issue on the matrix based on the consensus category from impacted party feedback and internal assessment', 'bullet', 2),
        li('Determine and prioritize material issues by identifying issues:', 'number', 1),
        li('in the red arc as high materiality and represent your highest priorities', 'bullet', 2),
        li('issues in the yellow arc as medium-high materiality, which are of high importance or impact to one group but not the other', 'bullet', 2),
        li('issues in the green arc as low materiality, which are of lesser priority but should still be monitored.', 'bullet', 2),
        p('[Example Rating Table and example materiality grid image follow in the source PDF — see pages 124, 127.]'),
      ],
    },
  ]
}

function refSources() {
  return [
    { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibISO26000 } },
    { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibUNGP } },
  ]
}

async function run() {
  console.log('Patching Objective TG05...')
  await client.patch('objective-TG05').set({
    headlineGoal: 'Understand impacted party materiality to ensure impacted parties rights are upheld.',
    narrative: [
      p("An impacted party materiality assessment is the identification of key issues that are important to impacted parties. It is fundamentally about understanding and prioritizing the voices, concerns, and aspirations of those affected by an initiative or project. It's not just about measuring impact but ensuring that the metrics and methods used resonate with impacted parties' lived experiences and priorities. It must embrace a wide range of voices, especially those often marginalized or overlooked. This includes recognizing the diversity of impacted parties and ensuring that their unique perspectives are considered."),
      p("It's important to understand that materiality isn't static. As societal values, technological landscapes, and impacted party priorities evolve, so too does the concept of materiality. It requires continuous engagement and recalibration to stay relevant. While traditional metrics provide a foundation, they are insufficient in capturing the full spectrum of impacted party concerns. Newer metrics, especially those derived from digital platforms, offer a broader and more nuanced understanding of what matters to impacted parties."),
      p("It is essential to understand impacted party materiality in every project to ensure impacted parties' rights are safeguarded, and issues are addressed that impacted parties deem material. This can improve living conditions, better employment opportunities, and a healthier environment."),
    ],
  }).commit()
  console.log('  ✓ TG05 objective')

  // TGa5.1
  console.log('\nSeeding TGa5.1...')
  await client.createOrReplace({
    _id: IDS.a51,
    _type: 'activity',
    activityId: 'TGa5.1',
    title: 'Conduct impacted party materiality assessment during the construction project',
    slug: { _type: 'slug', current: 'tga5-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-responsibility' },
    concept: { _type: 'reference', _ref: 'concept-TG' },
    objective: { _type: 'reference', _ref: 'objective-TG05' },
    activityType: 'Driver',
    ratingSystemApplication: {
      _type: 'ratingSystemApplication',
      bi_developer: true, bi_occupier: true, om_developer: false, om_occupier: false, cd: false,
    },
    scope: [
      p('The Owner shall conduct an impacted party materiality assessment using impacted party feedback from Activity IAa2.2 and use findings to address material issues, ensuring alignment with impacted party concerns and expectations. Assessments related to post-construction or operational phases fall outside the purview of this activity.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(),
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('Identify material issues for the project using a standardized materiality assessment framework (see Guidance below).')] },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('Establish and implement a protocol for addressing material issues in decisions and activities for the project.')] },
        ],
      },
    ],
    indicators: indicators(),
    scoring: {
      _type: 'scoring',
      mode: 'single',
      outcomeThreshold: [p('The target outcome threshold is 75% of material issues are addressed.')],
      pointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'Material Issues Addressed',
        bands: [{ _key: k(), pointsLabel: 'Required', criterion: 'must achieve the Outcome Threshold' }],
      },
    },
    documentationItems: docItems(),
    guidance: guidance(),
    referencedSources: refSources(),
    version: '1.1', status: 'published',
  })
  console.log('  ✓ TGa5.1')

  // TGa5.2
  console.log('\nSeeding TGa5.2...')
  await client.createOrReplace({
    _id: IDS.a52,
    _type: 'activity',
    activityId: 'TGa5.2',
    title: 'Conduct impacted party materiality assessment on the operating asset',
    slug: { _type: 'slug', current: 'tga5-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-responsibility' },
    concept: { _type: 'reference', _ref: 'concept-TG' },
    objective: { _type: 'reference', _ref: 'objective-TG05' },
    activityType: 'Driver',
    ratingSystemApplication: {
      _type: 'ratingSystemApplication',
      bi_developer: true, bi_occupier: true, om_developer: true, om_occupier: true, cd: false,
    },
    scope: [
      p('The Owner shall conduct an impacted party materiality assessment using impacted party feedback from Activity IAa2.2 use findings to address material issues, ensuring alignment with impacted party concerns and expectations. Assessments related to pre-construction or construction phases fall outside the purview of this activity.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(),
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('Identify material issues for the project using a standardized materiality assessment framework (see Guidance below).')] },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('Establish and implement a protocol for addressing material issues in decisions and activities for the project.')] },
        ],
      },
    ],
    indicators: indicators(),
    scoring: {
      _type: 'scoring',
      mode: 'multi-scenario',
      outcomeThreshold: [p('The target outcome threshold is 75% of material issues are addressed.')],
      scenarios: [
        {
          _key: k(),
          label: 'B + I Certification',
          rubric: {
            _type: 'scoringRubric',
            criterionLabel: 'Percentage of Addressed Material Issues',
            bands: [
              { _key: k(), pointsLabel: '1 point', criterion: '51% percentage of addressed material issues' },
              { _key: k(), pointsLabel: '2 points', criterion: '75% percentage of addressed material issues' },
            ],
          },
        },
        {
          _key: k(),
          label: 'O + M Certification',
          rubric: {
            _type: 'scoringRubric',
            criterionLabel: 'Material Issues Addressed',
            bands: [{ _key: k(), pointsLabel: 'Required', criterion: 'must achieve Outcome Threshold' }],
          },
        },
      ],
    },
    documentationItems: docItems(),
    guidance: guidance(),
    referencedSources: refSources(),
    version: '1.1', status: 'published',
  })
  console.log('  ✓ TGa5.2')
}

run().catch((err) => { console.error(err); process.exit(1) })
