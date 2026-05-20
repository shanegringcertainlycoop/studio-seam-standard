/**
 * Seeds Concept SI (Social Investment) + Objective SI01 + Activity SIa1.
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

function pWithBib(before: string, bibNum: string, after: string) {
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
      { _type: 'bibliographyRef', _key: markKey, entry: { _type: 'reference', _ref: `bib-${bibNum}` } },
    ],
  }
}

async function run() {
  console.log('Patching Concept SI...')
  await client.patch('concept-SI').set({
    headlineGoal: 'An organization can help to promote higher levels of well-being and improve quality of life in the community.',
    summary: [
      p("In today's globalized business landscape, the rationale for corporate social investment extends beyond philanthropy; it's a strategic imperative. Companies increasingly recognize that their long-term success is intertwined with the well-being of their communities. Investing in these communities isn't just about goodwill but fostering a robust consumer base, a skilled workforce, and ensuring a stable operational environment."),
      p("A company's social responsibility efforts can significantly influence its market reputation in an age of informed consumers. Engaging in meaningful social investments can enhance brand loyalty, trust, and differentiate a business in a crowded market. Additionally, with the rise of ESG (Environmental, Social, and Governance) considerations, investors are more inclined toward companies that demonstrate a positive social impact, viewing them as forward-thinking and less risky."),
      p("So, corporate social investment is not merely an act of charity but a strategic decision. It's about enlightened self-interest, where businesses understand that their prosperity and societal well-being are mutually dependent. The most progressive companies see social investment not as an expense but as a vital component of their long-term business strategy."),
    ],
  }).commit()

  console.log('Patching Objective SI01...')
  await client.patch('objective-SI01').set({
    headlineGoal: 'Contribute to the increase in capacities, resources, and opportunities for the community to increase community self-sufficiency and resilience.',
    narrative: [
      pWithBib('SEAM aligns with the transformative potential of capacity-building investments over traditional philanthropic donations. While philanthropy has its merits, it often involves one-off donations that may not lead to sustainable change. In contrast, capacity-building investments focus on strengthening the abilities of individuals, communities, and organizations to create a lasting impact. ISO 26000 guides us to consider social investment programs and infrastructure which will improve quality of life, and which will increase the capacity of the community to develop sustainably.', '54', ''),
      p('A key aspect of this is to align interventions with the specific needs and priorities identified by impacted parties, ensuring that initiatives are both relevant and impactful. By focusing on increasing capacities, resources, and opportunities, organizations can empower communities to better address their challenges and harness opportunities. Through such endeavors, organizations can play a pivotal role in creating communities that are not just surviving but thriving.'),
      p('This approach requires a paradigm shift, moving from transactional to transformational investment. Only by strengthening the foundational skills, knowledge, and resources of communities can projects create meaningful, lasting change, creating a win-win scenario for both the project and the community.'),
    ],
  }).commit()

  console.log('\nSeeding SIa1...')
  await client.createOrReplace({
    _id: 'activity-SIa1',
    _type: 'activity',
    activityId: 'SIa1',
    title: 'Contribute to the increase of capacities, resources, and opportunities within a community through financial contribution',
    slug: { _type: 'slug', current: 'sia1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-responsibility' },
    concept: { _type: 'reference', _ref: 'concept-SI' },
    objective: { _type: 'reference', _ref: 'objective-SI01' },
    activityType: 'Impact',
    ratingSystemApplication: {
      _type: 'ratingSystemApplication',
      bi_developer: true, bi_occupier: true, om_developer: true, om_occupier: true, cd: false,
    },
    scope: [
      p('The Owner shall design, implement, and evaluate a community involvement partnership or program that is centered around financial investment, contributions, or donations to achieve a specific goal identified by project impacted parties.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('The program shall address a significant social issue or problem that is relevant to the target population as identified during the impacted party engagement in Activity IAa2.2 and the impacted party materiality assessment in TGa5.1/5.2.')] },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('The program shall be guided by a defined logic model (see Guide to creating a logic model in Appendix E) detailing the intended outcomes and the steps needed to achieve them. Preference should be placed on leveraging existing resources and processes of the Owner to optimize opportunities to create a positive impact.')] },
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [pWithBib('The program shall include the following criteria', '55', ':')],
            subItems: [
              { _key: k(), letter: 'a', body: [p("measurable and positive impact on the well-being of individuals or communities, with impact metrics clearly defined and aligned with the program's stated goals")] },
              { _key: k(), letter: 'b', body: [p('promotes fairness and equality, ensuring that marginalized or disadvantaged groups are not further marginalized or excluded')] },
              { _key: k(), letter: 'c', body: [p('respects the rights, culture, and dignity of the target community and should be culturally sensitive and appropriate, considering the cultural norms, values, and practices of the target community')] },
              { _key: k(), letter: 'd', body: [p('active participation and engagement of the target population, ensuring that their voices and perspectives are heard and considered')] },
              { _key: k(), letter: 'e', body: [p('collaboration and coordination with relevant impacted parties, such as community organizations, government agencies, and other key actors')] },
              { _key: k(), letter: 'f', body: [p('have mechanisms to ensure transparency, accountability, and the responsible use of resources')] },
            ],
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('The program should use strategies and methods that are evidence-based and have been proven to work in similar contexts.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 5, body: [p('The program should aim to build the capacity of local community members and organizations to support and sustain the intervention.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of the budget invested. The context indicators are the KPIs identified (as outputs) in the logic model in Requirement #2.'),
      ],
      calculation: {
        _type: 'calculation',
        mode: 'single',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Determine total construction project or operating property budget.', 'number', 1),
              li('Determine financial contribution amount for the social investment program.', 'number', 1),
              li('Calculate percentage of budget invested.', 'number', 1),
            ],
            formula: 'P = (FC / TB) × 100',
            variables: [
              { symbol: 'P', meaning: 'percentage of budget invested' },
              { symbol: 'FC', meaning: 'financial contribution amount for the social investment' },
              { symbol: 'TB', meaning: 'total construction project or operating property budget' },
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
        criterionLabel: 'Percentage of Budget Invested',
        bands: [
          { _key: k(), pointsLabel: '5 points', criterion: '.5% of project budget invested OR $250,000 maximum' },
          { _key: k(), pointsLabel: '8 points', criterion: '1% of project budget invested OR $500,000 maximum' },
          { _key: k(), pointsLabel: '11 points', criterion: '2% of project budget invested OR $1,000,000 maximum' },
          { _key: k(), pointsLabel: '14 points', criterion: '4+% of project budget invested OR $2,000,000 maximum' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Impacted Party Engagement Documentation including records of impacted party engagement activities that led to the identification of the significant social issue or problem that the program addresses. This could be meeting minutes, surveys, or other documentation that shows how impacted parties were involved in the process.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('A detailed logic model that outlines the intended outcomes of the program and the steps needed to achieve them. This should include the top Key Performance Indicators (KPIs) identified as outputs.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Program Design and Implementation Plan detailing how the program meets the criteria of being impactful, equitable, ethical, participatory, collaborative, and accountable. It should include evidence-based strategies and methods that have been proven to work in similar contexts (if applicable).')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Evaluation Reports that provide evidence of the positive impact on the well-being of individuals or communities, promotion of fairness and equality, respect for the rights, culture, and dignity of the target community, active participation and engagement of the target population, collaboration and coordination with relevant impacted parties, and transparency, accountability, and the responsible use of resources.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Capacity Building Plan that details how the program aims to build the capacity of local community members and organizations to support and sustain the intervention.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('A copy of the Impacted Party Satisfaction Survey content.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Impacted Party Satisfaction Survey Results are used to calculate the impacted party satisfaction rate, including encoded responses that can be used to calculate the average score for each question, the overall average score, and the impacted party satisfaction rate.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On content of the impacted party engagement',
        body: [p('A template for an impacted Party Satisfaction Survey can be found in Appendix D.')],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-iso-26000' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-un-guiding-principles' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SIa1')
}

run().catch((err) => { console.error(err); process.exit(1) })
