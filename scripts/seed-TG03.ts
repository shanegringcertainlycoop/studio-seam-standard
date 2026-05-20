/**
 * Seeds Objective TG03 + Activities TGa3.1 and TGa3.2.
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
  a31: 'activity-TGa3-1',
  a32: 'activity-TGa3-2',
}

// Sub-items for Requirement 1 (mostly shared, with inline bib ref on the lead paragraph)
function r1SubItems() {
  return [
    { _key: k(), letter: 'a', body: [p('Bullying and harassment')] },
    { _key: k(), letter: 'b', body: [p('Gifts and hospitality')] },
    { _key: k(), letter: 'c', body: [p('Safety and health, including unauthorized weapons')] },
    { _key: k(), letter: 'd', body: [p('Money laundering')] },
    {
      _key: k(),
      letter: 'e',
      body: [
        p('Professional standards and conduct that includes'),
        p("i. Support for the obligation to dissent defined as each team member's responsibility to address a miscalculation or oversight regardless of their position in the company's hierarchy"),
        p('ii. Support for minoritized groups and minoritized voices'),
      ],
    },
    { _key: k(), letter: 'f', body: [p('Anti-corruption, anti-bribery, and fair competition')] },
    { _key: k(), letter: 'g', body: [p('Responsible political involvement (if applicable)')] },
    { _key: k(), letter: 'h', body: [p('Respect for property rights (including intellectual property)')] },
  ]
}

function r2SubItems() {
  return [
    { _key: k(), letter: 'a', body: [p('Adherence to international and local laws and compliance with trade restrictions, sanctions, and environmental laws.')] },
    { _key: k(), letter: 'b', body: [p('Uphold anti-corruption, anti-bribery, and anti-money laundering standards. Maintain transparency, honesty, and accuracy in business dealings and records. Protect against cyber threats and ensure data security and privacy.')] },
    { _key: k(), letter: 'c', body: [p('Respect globally recognized labor standards: workplace free of harassment, discrimination, and unlawful practices; fair compensation, working conditions, and prohibition of forced or child labor; recognize and respect the right to collective bargaining and freedom of association (where legal).')] },
    { _key: k(), letter: 'd', body: [p('Ensure compliance with local health and safety regulations.')] },
    { _key: k(), letter: 'e', body: [p('Implementation of training and awareness program for employees and representatives, especially those exposed to higher risks')] },
    { _key: k(), letter: 'f', body: [p('Create open communication channels for employees and impacted parties to report concerns or violations and cooperate in investigations and audits related to code compliance.')] },
    { _key: k(), letter: 'g', body: [p("Vendors should commit to the code's principles and extend similar standards to their supply chains.")] },
  ]
}

function r3SubItems() {
  return [
    { _key: k(), letter: 'a', body: [p('Leadership endorsement at the most senior level of the project that sets the policy as a minimum standard for conducting business')] },
    { _key: k(), letter: 'b', body: [p('Creating a training and awareness program for employees and representatives, especially those exposed to higher risks')] },
    { _key: k(), letter: 'c', body: [p('Implementing a whistle-blowing system where cases related to corruption, political involvement, and property rights can be reported with clear processes to investigate and sanction cases, including reporting to authorities')] },
    { _key: k(), letter: 'd', body: [p('Implementing internal controls against counterfeiting, piracy, and theft of intellectual property')] },
    { _key: k(), letter: 'e', body: [p('Transparently reporting on the program and its outcomes')] },
    { _key: k(), letter: 'f', body: [p('Regularly reviewing and improving practices to remain effective based on feedback and performance metrics')] },
  ]
}

function indicators() {
  return {
    _type: 'indicators',
    performanceIndicator: [
      p('The performance indicator is the percentage of responsible governance according to the requirements. The first context indicator is the average number of hours anti-corruption training per employee per year. The second context indicator is the average number of hours of ethics training per employee per year.'),
      p('Assess policy commitments according to the requirements as follows:'),
      li('0%: Any policy commitments that do not comply with requirements #1, #2 and #3.', 'bullet', 1),
      li('20%: Ethics, Fair Operating Practices, and Supplier Code of Conduct requirements are satisfied.', 'bullet', 1),
      li('40%: Addition of one additional requirement from #4 or #5 is satisfied.', 'bullet', 1),
      li('60%: Addition of both additional requirements of #4 or #5 are satisfied.', 'bullet', 1),
      li('80%: Three additional requirements are satisfied.', 'bullet', 1),
      li('100%: All additional requirements are satisfied.', 'bullet', 1),
    ],
  }
}

function scoring() {
  return {
    _type: 'scoring',
    mode: 'single',
    outcomeThreshold: [p('The outcome threshold is 20% representing the absence of harm by achieving the Act to Avoid Harm requirements.')],
    pointsAssignment: {
      _type: 'scoringRubric',
      criterionLabel: 'Percentage Responsible Governance',
      bands: [
        { _key: k(), pointsLabel: '1 point', criterion: '20% responsible governance' },
        { _key: k(), pointsLabel: '2 points', criterion: '40% responsible governance' },
        { _key: k(), pointsLabel: '3 points', criterion: '60% responsible governance' },
        { _key: k(), pointsLabel: '4 points', criterion: '80% responsible governance' },
        { _key: k(), pointsLabel: '5 points', criterion: '100% responsible governance' },
      ],
    },
  }
}

function docItems() {
  return [
    { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
    { _type: 'documentationItem', _key: k(), number: 2, body: [p('Site-specific Fair Operating and Ethics Policy adhering to all requirements of Requirement 1.')] },
    { _type: 'documentationItem', _key: k(), number: 3, body: [p('Supplier Code of Conduct adhering to all requirements of Requirement 2.')] },
    { _type: 'documentationItem', _key: k(), number: 4, body: [p('Documentation of operationalization of the policies according to the requirements.')] },
    { _type: 'documentationItem', _key: k(), number: 5, body: [p('If applicable, documentation of the adoption of the ethics policy throughout the organization, such as a memo or email from top management.')] },
    { _type: 'documentationItem', _key: k(), number: 6, body: [p('If applicable, documentation of the adoption of the fair operating practices policies throughout the organization, such as a memo or email from top management.')] },
    { _type: 'documentationItem', _key: k(), number: 7, body: [p("If applicable, copies of policies, contracts, or agreements that clearly communicate the project's expectations to business partners, entities in the value chain, and other relevant parties (e.g., RFPs, vendor contracts, etc.).")] },
    { _type: 'documentationItem', _key: k(), number: 8, body: [p('If applicable, performance evaluation documents that include references to the policy commitments and their impact on personnel assessments or rewards. Must meet GDPR standards.')] },
  ]
}

function guidance(arBibNum: string) {
  return [
    {
      _type: 'guidanceSubsection', _key: k(),
      heading: 'On property rights',
      body: [p('ISO 26000:2010 defines property rights as covering both physical property and intellectual property and include interest in land and other physical assets, copyrights, patents, geographical indicator rights, funds, moral rights, and other rights.')],
    },
    {
      _type: 'guidanceResources', _key: k(),
      heading: 'Additional Resources',
      resources: [
        {
          _key: k(),
          label: 'DFGE, Fair operating practices checklist',
          description: [pWithBib("a checklist based on the core subjects listed by ISO 26000, the norm on Social Responsibility, to assist improving an organization's social sustainability program", arBibNum, '.')],
        },
      ],
    },
  ]
}

async function run() {
  // ─── Objective TG03 ─────────────────────────────────────────────────────
  console.log('Patching Objective TG03...')
  await client
    .patch('objective-TG03')
    .set({
      headlineGoal: 'Create policies and commitments reflecting understanding of social responsibility to increase ethical and sustainable practices.',
      narrative: [
        p('Creating policies and commitments reflecting an understanding of social responsibility is a critical issue for many organizations. Without these, organizations may unintentionally engage in unfair operating practices, potentially causing harm to impacted parties. These policies guide decision-making at all levels, ensuring compliance with legal and ethical standards and reducing the risk of harmful practices.'),
        p("More importantly, these policies have a direct impact on people. They can lead to improved working conditions, fairer treatment, and better respect for human rights. They also create more responsible interactions with customers and communities, enhancing their well-being. They can also signal to impacted parties the organization's dedication to respecting people, enhancing its reputation, building trust, and strengthening relationships."),
      ],
    })
    .commit()
  console.log('  ✓ TG03 objective')

  // ─── TGa3.1 ─────────────────────────────────────────────────────────────
  console.log('\nSeeding TGa3.1...')
  await client.createOrReplace({
    _id: IDS.a31,
    _type: 'activity',
    activityId: 'TGa3.1',
    title: 'Implement site-specific social responsibility policies within construction project governance',
    slug: { _type: 'slug', current: 'tga3-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-responsibility' },
    concept: { _type: 'reference', _ref: 'concept-TG' },
    objective: { _type: 'reference', _ref: 'objective-TG03' },
    activityType: 'Impact',
    ratingSystemApplication: {
      _type: 'ratingSystemApplication',
      bi_developer: true, bi_occupier: true, om_developer: false, om_occupier: false, cd: false,
    },

    scope: [
      p("Owner shall develop and integrate site-specific policies and practices into the construction project's governance framework. These shall be tailored to each project location, ensuring adherence to recognized fair operating practices and respect for ethics. All interactions and operations shall respect and uphold the rights of all involved impacted parties."),
    ],

    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-43' },

    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [pWithBib('A set of guidelines or principles that outline the moral and ethical standards and fair operating practices applicable to the project that includes the following', '44', ':')],
            subItems: r1SubItems(),
          },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('A Supplier Code of Conduct that includes the following criteria:')],
            subItems: r2SubItems(),
          },
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [p('Operationalization of both policies shall include:')],
            subItems: r3SubItems(),
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('Ethics + Fair Operating Practices policies adoption for organization (not just project).')] },
          { _type: 'requirementItem', _key: k(), number: 5, body: [p('Supplier Code of Conduct adoption across the entire organization (not just the project).')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 6, body: [p("The policy commitments clearly communicate the project's expectations of business partners, business entities in the value chain, and other parties directly linked to project operations.")] },
          { _type: 'requirementItem', _key: k(), number: 7, body: [p('The policy commitments are reflected in performance incentives for project personnel.')] },
        ],
      },
    ],

    requirementsNotes: [
      p('Note: Requirement for "Promoting Social Responsibility in the Value Chain" within fair operating practices according to ISO 26000 has been excluded from this Activity as it is comprehensively covered in minimum requirement Activities within Objective HR01: Ethical Materials Procurement.'),
    ],

    indicators: indicators(),
    scoring: scoring(),
    documentationItems: docItems(),
    guidance: guidance('45'),

    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibISO26000 } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibUNGP } },
    ],

    version: '1.1',
    status: 'published',
  })
  console.log('  ✓ TGa3.1')

  // ─── TGa3.2 ─────────────────────────────────────────────────────────────
  console.log('\nSeeding TGa3.2...')
  await client.createOrReplace({
    _id: IDS.a32,
    _type: 'activity',
    activityId: 'TGa3.2',
    title: 'Implement site-specific social responsibility policies within governance on the operating asset',
    slug: { _type: 'slug', current: 'tga3-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-responsibility' },
    concept: { _type: 'reference', _ref: 'concept-TG' },
    objective: { _type: 'reference', _ref: 'objective-TG03' },
    activityType: 'Impact',
    ratingSystemApplication: {
      _type: 'ratingSystemApplication',
      bi_developer: true, bi_occupier: true, om_developer: true, om_occupier: true, cd: false,
    },

    scope: [
      p("Owner shall develop and integrate site-specific policies and practices into the operating property's governance framework. These shall be tailored to each property location, ensuring adherence to recognized fair operating practices and the respect for ethics. All interactions and operations shall respect and uphold the rights of all involved impacted parties."),
    ],

    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-46' },

    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [pWithBib('A set of guidelines or principles that outline the moral and ethical standards and fair operating practices applicable to the project that includes the following', '47', ':')],
            subItems: r1SubItems(),
          },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('A Supplier Code of Conduct that includes the following criteria:')],
            subItems: r2SubItems(),
          },
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [p('Operationalization of both policies shall include:')],
            subItems: r3SubItems(),
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('Ethics + Fair Operating Practices policies adoption for the organization (not just project).')] },
          { _type: 'requirementItem', _key: k(), number: 5, body: [p('Supplier Code of Conduct adoption across the entire organization (not just the project).')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 6, body: [p("The policy commitments clearly communicate the project's expectations of business partners, business entities in the value chain, and other parties directly linked to project operations.")] },
          { _type: 'requirementItem', _key: k(), number: 7, body: [p('The policy commitments are reflected in performance incentives for project personnel.')] },
        ],
      },
    ],

    requirementsNotes: [
      p('Note: Requirement for "Promoting Social Responsibility in the Value Chain" within fair operating practices according to ISO 26000 has been excluded from this Activity as it is comprehensively covered in minimum requirement Activities within Objective HR01: Ethical Materials Procurement.'),
    ],

    indicators: indicators(),
    scoring: scoring(),
    documentationItems: docItems(),
    guidance: guidance('48'),

    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibISO26000 } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibUNGP } },
    ],

    version: '1.1',
    status: 'published',
  })
  console.log('  ✓ TGa3.2')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
