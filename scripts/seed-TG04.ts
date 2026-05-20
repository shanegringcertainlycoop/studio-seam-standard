/**
 * Seeds Objective TG04 + Activities TGa4.1 and TGa4.2.
 * Also updates the UN OHCHR Mass Media master doc with the longer 1978 citation.
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
  bibUDHR: 'bib-udhr',
  bibUNOHCHR: 'bib-un-ohchr-mass-media',
  a41: 'activity-TGa4-1',
  a42: 'activity-TGa4-2',
}

function r1SubItems() {
  return [
    { _key: k(), letter: 'a', body: [p('Communication shall not disclose information that a reasonable person would deem highly offensive and invasive')] },
    { _key: k(), letter: 'b', body: [p('Communication shall assess for prevention of impacts on vulnerable groups related to content and visuals used in its communication')] },
    { _key: k(), letter: 'c', body: [p('Owner shall obtain written consent before including information about persons or groups in communication')] },
    { _key: k(), letter: 'd', body: [p('Communication shall include a land acknowledgment')] },
    { _key: k(), letter: 'e', body: [p('Communication shall obtain informed consent of the owners and provide recognition to the creators before using musical or artistic material in communication (if applicable)')] },
  ]
}

function r2SubItems() {
  return [
    { _key: k(), letter: 'a', body: [p('Organizational governance')] },
    { _key: k(), letter: 'b', body: [p('Human rights')] },
    { _key: k(), letter: 'c', body: [p('Labor practices')] },
    { _key: k(), letter: 'd', body: [p('Fair operating practices')] },
    { _key: k(), letter: 'e', body: [p('Consumer issues (can be building occupants, visitors, or customers)')] },
    { _key: k(), letter: 'f', body: [p('Community involvement and development')] },
  ]
}

function indicators() {
  return {
    _type: 'indicators',
    performanceIndicator: [
      p('The performance indicator is the percentage of social responsibility topics in public-facing communication. The context indicator is the total number of people reached by the communication (measured by the number of likes, comments, shares, clicks, brand/project mentions, profile visits, unique visits, and active followers).'),
    ],
    calculation: {
      _type: 'calculation',
      mode: 'single',
      steps: [
        {
          _key: k(),
          formula: 'P = (SR / N) × 100',
          variables: [
            { symbol: 'P', meaning: 'percentage of addressed social responsibility topics' },
            { symbol: 'SR', meaning: 'total number of social responsibility topics that were addressed' },
            { symbol: 'N', meaning: 'total number of relevant social responsibility topics (6)' },
          ],
        },
      ],
    },
  }
}

function scoring() {
  return {
    _type: 'scoring',
    mode: 'single',
    outcomeThreshold: [p("All communication shall comply with all Act to avoid harm requirements and meet all characteristics of 'responsible communication' as described in Guidelines below.")],
    eligibility: [p('Requirement #1 must be met to be eligible for points')],
    pointsAssignment: {
      _type: 'scoringRubric',
      criterionLabel: 'Percentage of Social Responsibility Topics Addressed',
      bands: [
        { _key: k(), pointsLabel: '1 point', criterion: '50% percentage of social responsibility topics addressed' },
        { _key: k(), pointsLabel: '2 points', criterion: '67% percentage of social responsibility topics addressed' },
        { _key: k(), pointsLabel: '3 points', criterion: '83% percentage of social responsibility topics addressed' },
        { _key: k(), pointsLabel: '4 points', criterion: '100% percentage of social responsibility topics addressed' },
      ],
    },
    additionalPointsEligibility: [p('These points are only assigned if all points in the Points assignment section are earned')],
    additionalPointsAssignment: {
      _type: 'scoringRubric',
      criterionLabel: 'Additional Requirement(s) Satisfied',
      bands: [
        { _key: k(), pointsLabel: '+1 point', criterion: 'Requirement #3 satisfied' },
      ],
    },
  }
}

function docItems() {
  return [
    { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
    { _type: 'documentationItem', _key: k(), number: 2, body: [p('Publication record of where and when the communication was published. This could include a link to the webpage where it is posted, a screenshot of the webpage, or a copy of the publication notice.')] },
    { _type: 'documentationItem', _key: k(), number: 3, body: [p('Copies of the communication in all the languages in which it was published. This would provide evidence that the communication was made accessible to impacted parties in their native languages.')] },
    { _type: 'documentationItem', _key: k(), number: 4, body: [p('Communication records (if applicable) with impacted parties about the publication of the communication. This could include emails, meeting minutes, or other forms of communication that show impacted parties were informed about the publication of the communication.')] },
  ]
}

function guidance(bibNum: string) {
  return [
    {
      _type: 'guidanceSubsection', _key: k(),
      heading: 'Responsible communication characteristics',
      body: [
        pWithBib('According to ISO 26000:2010, Guidance on social responsibility, information relating to social responsibility should be', bibNum, ':'),
        liBold('Complete', ' – address all significant activities and impacts related to social responsibility', 1),
        liBold('Understandable', ' – consider the cultural, social, educational, and economic background of those receiving the communication. Both the language used and how the material is presented, including how it is organized, should be accessible for the impacted parties intended to receive the information', 1),
        liBold('Responsive', ' – be responsive to impacted party interests', 1),
        liBold('Accurate', ' – be factually correct and should provide sufficient detail to be useful and appropriate for its purpose', 1),
        liBold('Balanced', " – be balanced and fair and should not omit relevant negative information concerning the organization's impacts", 1),
        liBold('Timely', ' – out-of-date information can be misleading; identification of the period of time covered allows impacted parties to compare the performance of the organization with its earlier performance and other organizations', 1),
        liBold('Accessible', ' – be available to the impacted parties concerned', 1),
      ],
    },
    {
      _type: 'guidanceResources', _key: k(),
      heading: 'Additional Resources',
      resources: [
        {
          _key: k(),
          label: 'ISO 26000:2010, Guidance on social responsibility',
          description: [p('available for purchase online at https://www.iso.org/iso-26000-social-responsibility.html')],
          url: 'https://www.iso.org/iso-26000-social-responsibility.html',
        },
      ],
    },
  ]
}

function refSources() {
  return [
    { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibISO26000 } },
    { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibUNGP } },
    { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibUDHR } },
    { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibUNOHCHR } },
  ]
}

async function run() {
  // ─── Update UN OHCHR Mass Media doc with longer citation ────────────────
  console.log('Updating UN OHCHR Mass Media master citation...')
  await client.createOrReplace({
    _id: IDS.bibUNOHCHR,
    _type: 'bibliographyEntry',
    title: 'UN OHCHR Declaration on Mass Media (1978)',
    citation: 'United Nations OHCHR Declaration on Fundamental Principles concerning the Contribution of the Mass Media to Strengthening Peace and International Understanding, to the Promotion of Human Rights and to Countering Racialism, Apartheid and Incitement to War (1978), Articles 2(3) and 3(2)',
    sourceType: 'declaration',
  })
  console.log('  ✓ UN OHCHR doc')

  // ─── Objective TG04 ─────────────────────────────────────────────────────
  console.log('\nPatching Objective TG04...')
  await client
    .patch('objective-TG04')
    .set({
      headlineGoal: 'Promote social responsibility through clear and open communication.',
      narrative: [
        p("In an era where impacted parties, from consumers to investors, demand greater corporate responsibility, clear and open communication becomes a cornerstone of trust-building. By actively promoting social responsibility through public channels, Owners can highlight their dedication to positive societal impact. This objective aligns with global standards like the Global Reporting Initiative (GRI) and the United Nations' Sustainable Development Goals (SDGs), both of which advocate for transparent reporting and impacted party inclusivity. Through this objective, Owners are guided to be proactive, accountable, and genuinely committed to making a positive difference in society."),
        p('There is a significant amount of communication embedded throughout the SEAM Activities in the scorecard, covering multiple types of social responsibility communication as defined by ISO 26000, such as:'),
        li('conversations with impacted parties (IAa2.2 and IAa2.5),', 'bullet', 1),
        li('communication with impacted parties on specific issues of social responsibility (TGa1.3),', 'bullet', 1),
        li('team activities focused on integration of social responsibility (TGa1.1 and 1.2, CIa1.1 and 1.2),', 'bullet', 1),
        li('project-related communication (TGa1.3),', 'bullet', 1),
        li('communication concerning claims about the social responsibility related to Project activities (IAa2.5 and HRa3.2),', 'bullet', 1),
        li('communication with suppliers about procurement requirements (SJa1.1 – 1.5, SJa2.3, HRa1.1, and HRa2.3 – 2.6),', 'bullet', 1),
        li('communication between Owner and employees, or project team, to raise awareness and support for social responsibility (HRa4.1), and', 'bullet', 1),
        li('communication on aspects of social responsibility aimed at peers (HRa4.2).', 'bullet', 1),
        p('However, the Activities in TG04 specifically address marketing, advertisements, or other public statements to promote social responsibility.'),
      ],
    })
    .commit()
  console.log('  ✓ TG04 objective')

  // ─── TGa4.1 ─────────────────────────────────────────────────────────────
  console.log('\nSeeding TGa4.1...')
  await client.createOrReplace({
    _id: IDS.a41,
    _type: 'activity',
    activityId: 'TGa4.1',
    title: 'Promote social responsibility through a public-facing communication during the construction project',
    slug: { _type: 'slug', current: 'tga4-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-responsibility' },
    concept: { _type: 'reference', _ref: 'concept-TG' },
    objective: { _type: 'reference', _ref: 'objective-TG04' },
    activityType: 'Impact',
    ratingSystemApplication: {
      _type: 'ratingSystemApplication',
      bi_developer: true, bi_occupier: true, om_developer: false, om_occupier: false, cd: false,
    },

    scope: [
      p("The Owner shall develop and disseminate public-facing communications emphasizing social responsibility principles as outlined in ISO 26000. This communication shall transparently report the Project's strategies, objectives, plans, and performance concerning social responsibility. Communications that do not align with ISO 26000's principles or fail to provide a comprehensive overview of the Project's social responsibility endeavors are outside the scope of this activity."),
    ],

    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-49' },

    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('A right to privacy, accuracy of sources, and respect for rights of others, including:')],
            subItems: r1SubItems(),
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Communication(s) shall align to the six relevant core subjects of social responsibility from ISO 26000:2010 (out of six; environmental is not accepted) as listed below:')],
            subItems: r2SubItems(),
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [p('Communication shall include contact information for a Project representative to support impacted party dialogue.')],
          },
        ],
      },
    ],

    indicators: indicators(),
    scoring: scoring(),
    documentationItems: docItems(),
    guidance: guidance('50'),
    referencedSources: refSources(),
    version: '1.1', status: 'published',
  })
  console.log('  ✓ TGa4.1')

  // ─── TGa4.2 ─────────────────────────────────────────────────────────────
  console.log('\nSeeding TGa4.2...')
  await client.createOrReplace({
    _id: IDS.a42,
    _type: 'activity',
    activityId: 'TGa4.2',
    title: 'Promote social responsibility through a public-facing communication on the operating asset',
    slug: { _type: 'slug', current: 'tga4-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-responsibility' },
    concept: { _type: 'reference', _ref: 'concept-TG' },
    objective: { _type: 'reference', _ref: 'objective-TG04' },
    activityType: 'Impact',
    ratingSystemApplication: {
      _type: 'ratingSystemApplication',
      bi_developer: true, bi_occupier: true, om_developer: true, om_occupier: true, cd: false,
    },

    scope: [
      p("The Owner shall develop and disseminate public-facing communications that emphasize social responsibility principles as outlined in ISO 26000. This communication shall transparently report the operating property's strategies, objectives, plans, and performance concerning social responsibility. Communications that do not align with ISO 26000's principles or fail to provide a comprehensive overview of the property's social responsibility endeavors are outside the scope of this activity."),
    ],

    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-51' },

    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('A right to privacy, accuracy of sources, and respect for rights of others, including:')],
            subItems: r1SubItems(),
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Communication(s) shall align to the six relevant core subjects of social responsibility from ISO 26000:2010 (out of seven) as listed below:')],
            subItems: r2SubItems(),
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [p('Communication shall include contact information for a Project representative to support impacted party dialogue.')],
          },
        ],
      },
    ],

    indicators: indicators(),
    scoring: scoring(),
    documentationItems: docItems(),
    guidance: guidance('52'),
    referencedSources: refSources(),
    version: '1.1', status: 'published',
  })
  console.log('  ✓ TGa4.2')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
