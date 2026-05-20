/**
 * Seeds Concept CI (narrative) + Objective CI01 + Activities CIa1.1 and CIa1.2.
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

const IDS = {
  bibISO26000: 'bib-iso-26000',
  bibUNGP: 'bib-un-guiding-principles',
  a11: 'activity-CIa1-1',
  a12: 'activity-CIa1-2',
}

async function run() {
  // Concept CI
  console.log('Patching Concept CI...')
  await client.patch('concept-CI').set({
    headlineGoal: 'Organizations can help strengthen civil society through respectful engagement, support, and relationship-building with the community.',
    summary: [
      p('Organizations play a pivotal role in shaping the fabric of civil society, not only through their primary business operations but also through their interactions with the communities they touch. Strengthening civil society is not based on transactional interactions but instead emphasizes the importance of deep, meaningful engagement with community impacted parties.'),
      p('Supporting the community can take various forms, from providing resources and expertise to backing community-led initiatives. The goal is to leverage organizational strengths to bolster community capacities, ensuring that support is relevant and impactful.'),
      p('By actively engaging, supporting, and building relationships with the community, the project and the community can thrive, leading to sustainable development that benefits all impacted parties.'),
    ],
  }).commit()

  console.log('Patching Objective CI01...')
  await client.patch('objective-CI01').set({
    headlineGoal: 'Actively contribute to the socially sustainable development of communities to increase resilience and well-being.',
    narrative: [
      p('In the evolving landscape of corporate responsibility, organizations must actively engage with the communities they operate within. This objective focuses on the significance of meaningful, sustained connections with local communities. Organizations can align their efforts with specific, impacted party-identified goals by designing and executing tailored community involvement partnerships or programs. Such initiatives ensure that community interactions are not transactional but transformational, leading to tangible improvements in local conditions.'),
      p("Engaging volunteers in community service events as part of these partnerships amplifies the project's commitment. Volunteering shifts the focus from financial or infrastructural support to human connection, shared experiences, and mutual growth. This hands-on approach allows project teams to gain deeper insights into the community's aspirations, challenges, and dynamics. In return, the community benefits from the resources, expertise, and opportunities such collaborations bring. Ultimately, this objective aims to foster a culture of mutual respect, understanding, and shared purpose between projects and their communities."),
    ],
  }).commit()

  // CIa1.1
  console.log('\nSeeding CIa1.1...')
  await client.createOrReplace({
    _id: IDS.a11,
    _type: 'activity',
    activityId: 'CIa1.1',
    title: 'Design and execute a community involvement initiative that achieves a specific impacted party-centered goal',
    slug: { _type: 'slug', current: 'cia1-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-responsibility' },
    concept: { _type: 'reference', _ref: 'concept-CI' },
    objective: { _type: 'reference', _ref: 'objective-CI01' },
    activityType: 'Impact',
    ratingSystemApplication: {
      _type: 'ratingSystemApplication',
      bi_developer: true, bi_occupier: true, om_developer: true, om_occupier: true, cd: false,
    },
    scope: [
      p('The Owner shall design, implement, and evaluate a community involvement initiative that is centered around volunteer efforts to achieve a specific goal identified by project impacted parties. The program aims to create collaboration, mutual understanding, and shared responsibility between the project and the community impacted parties.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('The initiative shall address a significant social issue or problem that is relevant to the target population as identified during the impacted party engagement in Activity IAa2.2 and the impacted party materiality assessment in TGa5.1/5.2.')] },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('The program shall be guided by a defined logic model (see Guide to creating a logic model in Appendix E) detailing the intended outcomes and the steps needed to achieve them. Preference should be placed on leveraging existing resources (Inputs) and processes of the Owner to optimize opportunities to create a positive impact.')] },
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [pWithBib('The initiative shall include the following criteria', '53', ':')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('measurable and positive impact on the well-being of individuals or communities')] },
              { _key: k(), letter: 'b', body: [p('promotes fairness and equality, ensuring that marginalized or disadvantaged groups are not further marginalized or excluded')] },
              { _key: k(), letter: 'c', body: [p('respects the rights, culture, and dignity of the target community and should be culturally sensitive and appropriate, considering the cultural norms, values, and practices of the target community')] },
              { _key: k(), letter: 'd', body: [p('active participation and engagement of the target population, ensuring that their voices and perspectives are heard and considered')] },
              { _key: k(), letter: 'e', body: [p('collaboration and coordination with relevant impacted parties, such as community organizations, government agencies, and other key actors')] },
              { _key: k(), letter: 'f', body: [p('have mechanisms in place to ensure transparency, accountability, and the responsible use of resources')] },
            ],
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('The initiative should use evidence-based strategies and methods that have been proven to work in similar contexts.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 5, body: [p('The initiative should aim to build the capacity of local community members and organizations to support and sustain the intervention.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p("The performance indicator is the impacted party satisfaction rate (expressed as a percentage) derived from a structured Impacted Party Satisfaction Survey. The survey should be designed to measure the impacted parties' perception of the initiative's effectiveness and its impact on the community. The context indicators are the indicators identified (as outputs) in the logic model in Requirement #2."),
      ],
      calculation: {
        _type: 'calculation',
        mode: 'multi-step',
        steps: [
          {
            _key: k(), label: 'Step 1',
            instructions: [
              p('To calculate the performance indicator:'),
              li('Administer an impacted party satisfaction survey (see the Impacted Party Satisfaction Survey template in Appendix D) to the relevant impacted parties and collect the responses.', 'number', 1),
              li('Calculate the average score for each question by summing the responses (where 1 = Very Dissatisfied/Not at all Relevant/Very Poor/Not at all/Very Unlikely/Strongly Disagree and 5 = Very Satisfied/Very Relevant/Very Good/Very Well/Very Likely/Strongly Agree) and divide by the total number of responses.', 'number', 1),
              li('Calculate the overall average score by summing the average scores for all the questions and dividing by the total number of questions.', 'number', 1),
              li('Calculate the impacted party satisfaction rate (%) by dividing the score by the maximum possible score (5) and multiplying by 100.', 'number', 1),
            ],
            formula: 'a# = (R1+R2+… / N) × 100',
            variables: [
              { symbol: 'a#', meaning: 'the average score for each question' },
              { symbol: 'R#', meaning: 'the response for the # question (where # ranges from 1 to n, and n is the total number of questions)' },
              { symbol: 'N', meaning: 'the total number of responses for the # question' },
            ],
          },
          {
            _key: k(), label: 'Step 2',
            formula: 'A = (a1+a2+…) / Q',
            variables: [
              { symbol: 'A', meaning: 'overall average score' },
              { symbol: 'a#', meaning: 'the average score for each question (from Step 1)' },
              { symbol: 'Q', meaning: 'the total number of questions' },
            ],
          },
          {
            _key: k(), label: 'Step 3',
            formula: 'S = (A / 5) × 100',
            variables: [
              { symbol: 'S', meaning: 'satisfaction rate (%)' },
              { symbol: 'A', meaning: 'overall average score' },
              { symbol: '5', meaning: 'maximum possible score' },
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
        criterionLabel: 'Percentage Impacted Party Satisfaction Rate',
        bands: [
          { _key: k(), pointsLabel: '2 points', criterion: '40 - 59% impacted party satisfaction rate' },
          { _key: k(), pointsLabel: '4 points', criterion: '60 - 79% impacted party satisfaction rate' },
          { _key: k(), pointsLabel: '6 points', criterion: '80 - 100% impacted party satisfaction rate' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'Additional Requirements Satisfied',
        bands: [
          { _key: k(), pointsLabel: '+2 points', criterion: 'Requirement #4 satisfied' },
          { _key: k(), pointsLabel: '+2 points', criterion: 'Requirement #5 satisfied' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Impacted Party Engagement Documentation including records of impacted party engagement activities that led to the identification of the significant social issue or problem that the program addresses. This could be meeting minutes, surveys, or other forms of documentation that show how impacted parties were involved in the process (can skip if uploaded during IAa2.2.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('A detailed logic model that outlines the intended outcomes of the program and the steps needed to achieve them. This should include the top Key Performance Indicators (KPIs) identified as outputs.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Initiative Design and Implementation Plan that details how the initiative meets the criteria of being impactful, equitable, ethical, participatory, collaborative, and accountable. It should include strategies and methods that are evidence-based and have been proven to work in similar contexts (if applicable).')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Evaluation Reports that provide evidence of the positive impact on the well-being of individuals or communities, promotion of fairness and equality, respect for the rights, culture, and dignity of the target community, active participation and engagement of the target population, collaboration and coordination with relevant impacted parties, and transparency, accountability, and the responsible use of resources.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Capacity Building Plan that details how the program aims to build the capacity of local community members and organizations to support and sustain the intervention.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('A copy of the Impacted Party Satisfaction Survey content.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Impacted Party Satisfaction Survey results used to calculate the impacted party satisfaction rate including encoded responses that can be used to calculate the average score for each question, the overall average score, and the impacted party satisfaction rate.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On content of the impacted party engagement',
        body: [p('A template for an impacted Party Satisfaction Survey can be found in Appendix D.')],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibISO26000 } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibUNGP } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ CIa1.1')

  // CIa1.2
  console.log('\nSeeding CIa1.2...')
  await client.createOrReplace({
    _id: IDS.a12,
    _type: 'activity',
    activityId: 'CIa1.2',
    title: 'Participate in a community services event within developed community involvement initiative',
    slug: { _type: 'slug', current: 'cia1-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-responsibility' },
    concept: { _type: 'reference', _ref: 'concept-CI' },
    objective: { _type: 'reference', _ref: 'objective-CI01' },
    activityType: 'Impact',
    ratingSystemApplication: {
      _type: 'ratingSystemApplication',
      bi_developer: true, bi_occupier: true, om_developer: true, om_occupier: true, cd: false,
    },
    scope: [
      p('The Owner shall participate in the community service initiative designed in Activity CIa1.1. The task may include various roles such as planning, coordinating, or actively participating in the community-focused initiative. The objective is to promote community engagement and contribute to the overall development of the community.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(),
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('Volunteer initiative / event(s) shall be designed and developed in Activity CIa1.1.')] },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('Volunteers shall be members of the construction project or operating property team (additional volunteers are encouraged, however, only members of the construction project or operating property team shall be counted in the percentage of participation).')] },
          { _type: 'requirementItem', _key: k(), number: 3, body: [p('All volunteers shall be present for 100% of the volunteer event.')] },
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('For certain types of events, especially those involving vulnerable populations (like children, immunocompromised, or the elderly), volunteers need to pass background checks conducted by a reputable agency to ensure the safety and integrity of the event.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the volunteer participation rate (expressed as a percentage). The context indicators would be the total number of volunteer hours.'),
      ],
      calculation: {
        _type: 'calculation',
        mode: 'single',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Determine total number of project team members working on the project.', 'number', 1),
              li('Determine number of project team members that participated in the volunteer event(s).', 'number', 1),
              li('Calculate volunteer participation rate as a percentage.', 'number', 1),
            ],
            formula: 'P = (M / N) × 100',
            variables: [
              { symbol: 'P', meaning: 'percentage volunteer participation' },
              { symbol: 'M', meaning: 'number of project team members that participated' },
              { symbol: 'N', meaning: 'total number of team members working on the project' },
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
        criterionLabel: 'Percentage of Volunteer Participation',
        bands: [
          { _key: k(), pointsLabel: '3 points', criterion: '55 - 64% of project team members participated' },
          { _key: k(), pointsLabel: '5 points', criterion: '65 - 74% of project team members participated' },
          { _key: k(), pointsLabel: '10 points', criterion: '75-100% of project team members participated' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Event Outline/Agenda that details the event that includes what activities were conducted, dates, times, and any other pertinent details.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Attendance Records for the event detailing name, company, and role to cross-verify with the Project Team records and provide the ability to track the number of companies represented during the training. This list will be useful to calculate context indicators. This could be a sign-in sheet or digital attendance log, pictures taken during the event, and any other documentation of evidence that shows all participants were present for 100% of the event. This list shall be GDPR compliant.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Background checks (if applicable) for each volunteer in cases of events with vulnerable populations (like children, immunocompromised, or the elderly). Must be GDPR compliant.')] },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibISO26000 } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibUNGP } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ CIa1.2')
}

run().catch((err) => { console.error(err); process.exit(1) })
