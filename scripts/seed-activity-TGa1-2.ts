/**
 * Seeds Activity TGa1.2 — "Complete interactive, activity-based training on
 * social responsibility principles and practices during the operational phase"
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

function h3(text: string) {
  return {
    _type: 'richText',
    _key: k(),
    style: 'h3',
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

function liBold(boldTerm: string, rest: string, level = 1) {
  return {
    _type: 'richText',
    _key: k(),
    style: 'normal',
    listItem: 'bullet',
    level,
    children: [
      { _type: 'span', _key: k(), text: boldTerm, marks: ['strong'] },
      { _type: 'span', _key: k(), text: rest, marks: [] },
    ],
    markDefs: [],
  }
}

function pWithBibs(parts: Array<string | { bib: string }>) {
  const children: Array<Record<string, unknown>> = []
  const markDefs: Array<Record<string, unknown>> = []
  for (const part of parts) {
    if (typeof part === 'string') {
      children.push({ _type: 'span', _key: k(), text: part, marks: [] })
    } else {
      const markKey = k()
      children.push({ _type: 'span', _key: k(), text: '', marks: [markKey] })
      markDefs.push({
        _type: 'bibliographyRef',
        _key: markKey,
        entry: { _type: 'reference', _ref: `bib-${part.bib}` },
      })
    }
  }
  return { _type: 'richText', _key: k(), style: 'normal', children, markDefs }
}

const IDS = {
  bibISO26000: 'bib-iso-26000',
  activity: 'activity-TGa1-2',
}

async function run() {
  console.log('Seeding Activity TGa1.2...')
  await client.createOrReplace({
    _id: IDS.activity,
    _type: 'activity',
    activityId: 'TGa1.2',
    title: 'Complete interactive, activity-based training on social responsibility principles and practices during the operational phase',
    slug: { _type: 'slug', current: 'tga1-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-responsibility' },
    concept: { _type: 'reference', _ref: 'concept-TG' },
    objective: { _type: 'reference', _ref: 'objective-TG01' },
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
      p("Owner shall ensure the provision of interactive, activity-based training at the operational phase of the commercial real estate project, focusing on social responsibility principles. This training shall aim to equip the property team with a comprehensive understanding of these principles and their practical application. Training that does not align with ISO 26000's guidelines or lacks an interactive component is outside the scope of this activity."),
    ],

    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-35' },

    requirements: [
      {
        _type: 'requirementGroup', _key: k(),
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('Training on social responsibility shall contain the following topics from ISO 26000:2010 Guidance on social responsibility:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('scope, terms, and definitions')] },
              { _key: k(), letter: 'b', body: [p('understanding social responsibility')] },
              { _key: k(), letter: 'c', body: [p('fundamental principles of social responsibility')] },
              { _key: k(), letter: 'd', body: [p('recognizing social responsibility and impacted parties')] },
              { _key: k(), letter: 'e', body: [p('the seven core subjects')] },
              { _key: k(), letter: 'f', body: [p('integration of principles and core subjects')] },
              { _key: k(), letter: 'g', body: [p('voluntary initiatives')] },
            ],
          },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Training shall be conducted by a facilitator possessing the following:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('professional experience in the field of social responsibility')] },
              { _key: k(), letter: 'b', body: [p('understanding of ISO 26000')] },
              { _key: k(), letter: 'c', body: [p('experience as a trainer - such experience must clearly demonstrate a practical understanding of factors affecting social responsibility in relation to construction and the built environment; including, acting in an advisory capacity to provide recommendations for social responsibility enhancement and mitigation measures.')] },
              { _key: k(), letter: 'd', body: [p('relevant experience must relate to the country where the training is being conducted - designated SEAM APs are qualified to design and deliver this training')] },
            ],
          },
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [p('All participants shall be present for 100% of the training.')],
          },
          {
            _type: 'requirementItem', _key: k(), number: 4,
            body: [p('Training shall assess participant knowledge through formative assessment – interactive, practical exercise-based delivery of training indicating participant competence across key learning outcomes.')],
          },
          {
            _type: 'requirementItem', _key: k(), number: 5,
            body: [p('Participants shall sign a personal pledge indicating commitment to upholding the behaviors and actions associated with social responsibility as outlined in the training.')],
          },
        ],
      },
    ],

    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of committed team members (the team members that meet all the requirements). The first context indicator is the total number of individuals completing the training. The second context indicator is the total number of companies represented during the training.'),
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
              li('Determine number of project team members that meet all the requirements.', 'number', 1),
              li('Calculate percentage committed team members.', 'number', 1),
            ],
            formula: 'P = (TM / N) × 100',
            variables: [
              { symbol: 'P', meaning: 'percentage committed team members' },
              { symbol: 'TM', meaning: 'number of team members that satisfied all the requirements' },
              { symbol: 'N', meaning: 'total number of team members on the project' },
            ],
          },
        ],
      },
    },

    scoring: {
      _type: 'scoring',
      mode: 'multi-scenario',
      outcomeThreshold: [
        pWithBibs([
          'Scientific findings provide direct empirical demonstration of the existence of a tipping point in the dynamics of changing social conventions. When minoritized groups reached the critical mass—that is, the critical group size for initiating social change—they were consistently able to overturn the established behavior',
          { bib: '36' },
          '. The tipping point was identified as 25%. This threshold aligns with the Pareto Principle, also a scientifically proven principle, known as the "80/20 rule", which states that 80% of outcomes are attributable to 20% of actions.',
          { bib: '37' },
          ' Since we know that a minority of causes, inputs, or effort causes a majority of results, outputs, or rewards, we have based the Outcome threshold target as 25% of the project group shall reach the status of "committed to acting responsibly".',
        ]),
      ],
      scenarios: [
        {
          _key: k(),
          label: 'B + I Certification',
          rubric: {
            _type: 'scoringRubric',
            criterionLabel: 'Percentage Committed Team Members',
            bands: [
              { _key: k(), pointsLabel: '1 point', criterion: '15% committed team members' },
              { _key: k(), pointsLabel: '2 points', criterion: '25% committed team members' },
              { _key: k(), pointsLabel: '3 points', criterion: '35% committed team members' },
            ],
          },
        },
        {
          _key: k(),
          label: 'O + M Certification',
          rubric: {
            _type: 'scoringRubric',
            criterionLabel: 'Committed Team Members',
            bands: [
              { _key: k(), pointsLabel: 'Required', criterion: 'must achieve twenty-five percent (25%) of operational team as committed to acting responsibly.' },
            ],
          },
        },
      ],
    },

    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Training Curriculum Outline/Agenda that details the curriculum that includes all the topics from ISO 26000:2010 Guidance on social responsibility as specified in Requirement 1. It should break down what is taught during the training, ensuring it covers all required aspects.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p("Trainer's Qualification Records which could include the trainer's CV, resumes, certificates, or other relevant documentation that demonstrates the trainer's professional experience, understanding of ISO 26000, and experience as a trainer as outlined in Requirement 2. For evidence of local relevance, letters of reference, project reports, or other official documentation may serve as proof of experience in the specific country.")] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Attendance Records for the training. This could be a sign-in sheet or digital attendance log, pictures taken during the training, and any other documentation of evidence that shows all participants were present for 100% of the training as stated in Requirement 3.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Assessment Results for the training. This could be copies of formative assessment results showing participant competence across key learning outcomes, in line with Requirement 4. These results should clearly indicate the practical exercises that were performed, the outcomes, and the individual scores or grades (if applicable).')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Personal Pledges from the training. Signed documents from each participant, indicating their commitment to uphold the behaviors and actions associated with social responsibility in line with Requirement 5.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Participant List for the training. This list should include details such as name, company, and role to cross-verify with the attendance and assessment records and provide the ability to track the number of companies represented during the training. This list shall be GDPR compliant.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Project Team Records for the project. This could include project planning documents, contracts, or other records demonstrating the total number of project team members.')] },
      { _type: 'documentationItem', _key: k(), number: 9, body: [p('Training Feedback Forms for the training. This is an optional but good practice to collect feedback from participants about the training quality, content, and delivery.')] },
    ],

    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On designing interactivity into the training delivery',
        body: [
          p('The most effective assessment of understanding of the ISO 26000 topics is through practical exercises by participants. It will be necessary to collect feedback from the project team to complete Activities TG02 through TG05, CI01, and SI01 within the Social Responsibility pillar, therefore an efficient training could design practical exercises to teach the concepts while also gathering the required feedback. A sample training design plan and presentation slides can be used as a template and is found in the Resources section of the SEAMcertification.org website.'),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On scope of who is considered operational team',
        body: [
          p("The operational team is any individual or company representative that is required to operate the property. This list contains, but is not limited to, the Owner, Owner's representatives, legal and accounting services providers, marketing and communication services providers, asset manager, property manager, facilities and maintenance team, security services provider, cleaning and janitorial services provider, leasing team, technology services providers, pest control services providers, testing providers and consultants, and generally anyone that is providing products or services on a regular basis to operate the property. For the purpose of required attendance in the interactive social responsibility training, determine the list of team members that have been procured at the time of the training that are required to attend regular project meetings. For example, if the training is held during planning, required attendees could be Owner or Owner's representative, property manager, building engineers, Sustainability consultants, asset manager, leasing, and marketing."),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On scope of Personal Pledge',
        body: [
          p("Creating a personal pledge form is an important step in ensuring commitment to social responsibility principles, as well as enabling clear objectives and expectations for project team members. Here's how you can create it:"),
          h3('1. Personal Pledge Form:'),
          p("A personal pledge form is a document where an individual commits to upholding certain behaviors and actions. In this case, it's about commitment to social responsibility. This form should be straightforward, easy to understand, and contain the following:"),
          liBold('Title:', " Make it clear that this is a 'Personal Pledge on Social Responsibility', for example.", 1),
          liBold('Introduction:', " Briefly explain the purpose of the pledge and why it's important.", 1),
          liBold('Statement of Commitment:', ' Outline the principles of social responsibility as derived from the training and ISO 26000, that the individual is agreeing to uphold. Make sure these are specific, measurable, achievable, relevant, and time-bound (SMART).', 1),
          liBold('Signature and Date:', ' Provide space for the individual to sign and date the pledge as a mark of their commitment.', 1),
          liBold('Witness Signature:', ' It can also be beneficial to have the pledge witnessed and signed by a superior or HR representative.', 1),
          p('Remember, the document should be clearly worded, with agreed definitions, and be specific to be effective. Ambiguity can lead to confusion, misunderstandings, and potentially lack of adherence. Ensure that the employees fully understand what they are committing to and what is expected from them.'),
        ],
      },
      {
        _type: 'guidanceResources', _key: k(),
        heading: 'Additional Resources',
        resources: [
          {
            _key: k(),
            label: 'ISO 26000 Post Publication Organisation (PPO) Basic Training Material',
            description: [pWithBibs([{ bib: '38' }, ' - open source, free for anyone to use and customize to fit their own context and needs.'])],
          },
          {
            _key: k(),
            label: 'ISO 26000:2010 Guidance on social responsibility',
            description: [pWithBibs([{ bib: '39' }, ' – provides guidance to all types of organizations, regardless of their size, or location.'])],
          },
        ],
      },
    ],

    referencedSources: [
      {
        _type: 'referencedSource',
        _key: k(),
        source: { _type: 'reference', _ref: IDS.bibISO26000 },
      },
    ],

    version: '1.1',
    status: 'published',
  })
  console.log('  ✓ Activity TGa1.2')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
