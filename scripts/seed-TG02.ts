/**
 * Seeds Objective TG02 (Voluntary Initiatives) + Activities TGa2.1 and TGa2.2.
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
  a21: 'activity-TGa2-1',
  a22: 'activity-TGa2-2',
}

// Shared content used by both TGa2.1 and TGa2.2
const sharedDocLeadIn = [
  p("The SEAM purpose of applying ISO 26000 principles in the context of voluntary initiatives is to enhance a Project's contribution to socially sustainable development. As such, any demonstration of successful participation should also show how the Project's efforts have had a positive impact on society."),
]

const sharedDocItems = () => [
  { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
  { _type: 'documentationItem', _key: k(), number: 2, body: [p("A Participation Report describing the initiative, including the Project's contributions, commitments, actions taken, and the social responsibility goals or outcomes achieved, with alignment to ISO 26000 principles. This report should be transparent and list the locations where it is publicly available.")] },
  { _type: 'documentationItem', _key: k(), number: 3, body: [p('Evidence of publication locations.')] },
  { _type: 'documentationItem', _key: k(), number: 4, body: [p('Third-Party Validation (if applicable) if the voluntary initiative has an organizing body or is part of a larger program that can provide feedback, evaluations, or other forms of recognition for participants.')] },
]

function guidanceInitiativesList(singleStakeholderFirstItem: string) {
  return [
    p('The following initiatives have been identified as applicable and relevant to commercial real estate projects and qualify to receive compliance credit for this Activity:'),
    // IG
    li('Intergovernmental (IG) initiatives (defined by ISO 26000 as developed and administered by intergovernmental organizations)', 'bullet', 1),
    li('OECD, Risk Awareness Tool for Multinational Enterprises in Weak Governance Zones – www.oecd.org', 'bullet', 2),
    li('UN Global Compact – www.unglobalcompact.org', 'bullet', 2),
    li('UN Global Compact, UNDP, UNITAR – www.unglobalcompact.org/Issues/partnerships/pat.html', 'bullet', 2),
    li('UNCTAD, Intergovernmental Working Group of Experts on International Standards of Accounting and Reporting (ISAR) – www.unctad.org/isar', 'bullet', 2),
    // MS
    li('Multi-stakeholder (MS) initiatives (defined by ISO 26000 as developed or administered through multi-stakeholder processes)', 'bullet', 1),
    li('Amnesty International, Human Rights Principles for Companies – https://www.amnesty.org/en/documents/act70/001/1998/en/', 'bullet', 2),
    li('EFQM, The EFQM Model – a globally recognized management framework that supports organizations in managing change and improving performance www.efqm.org', 'bullet', 2),
    li('Global Reporting Initiative (GRI), Sustainability Reporting Guidelines – www.globalreporting.org', 'bullet', 2),
    li('Fair Labour Association – www.fairlabor.org', 'bullet', 2),
    li('Danish Institute for Human Rights, Human Rights Compliance Assessment – www.humanrightsbusiness.org', 'bullet', 2),
    li('Social Accountability International (SAI) – www.sa-intl.org', 'bullet', 2),
    li('Transparency International – anti-corruption toolkits https://www.transparency.org/en/toolkits/business', 'bullet', 2),
    li('JUST Declare Label - https://declare.living-future.org', 'bullet', 2),
    li('B Impact Assessment - https://www.bcorporation.net/en-us/programs-and-tools/b-impact-assessment', 'bullet', 2),
    li('Design for Freedom Toolkit - https://www.designforfreedom.org/', 'bullet', 2),
    // SS
    li('Single-stakeholder (SS) initiatives (defined by ISO 26000 as developed or administered through single-stakeholder processes)', 'bullet', 1),
    li(singleStakeholderFirstItem, 'bullet', 2),
    li('Salmon Safe - https://salmonsafe.org/get-certified/', 'bullet', 2),
  ]
}

async function run() {
  // ─── Objective TG02 ─────────────────────────────────────────────────────
  console.log('Patching Objective TG02...')
  await client
    .patch('objective-TG02')
    .set({
      headlineGoal: 'Participate in voluntary initiative(s) addressing social responsibility to contribute to a more equitable society.',
      narrative: [
        p('Voluntary initiatives are actions that organizations choose to take beyond their legal obligations to improve their social impact. Voluntary initiatives can take many forms, including commitments to specific standards, participation in industry partnerships, or independent actions to improve social responsibility.'),
        p("Participation in voluntary initiatives allows organizations to demonstrate their commitment to social responsibility within a format that follows best practices. These initiatives can directly benefit people in numerous ways. They can enhance working conditions, respect for human rights, and improve employee well-being. They also align with global goals like the United Nations' Sustainable Development Goals, contributing to worldwide efforts to end poverty and ensure prosperity for all. These initiatives serve as “ready-made” social responsibility strategies for organizations to create a profound and positive impact on individuals, communities, and society at large."),
      ],
    })
    .commit()
  console.log('  ✓ TG02 objective')

  // ─── TGa2.1 ─────────────────────────────────────────────────────────────
  console.log('\nSeeding Activity TGa2.1...')
  await client.createOrReplace({
    _id: IDS.a21,
    _type: 'activity',
    activityId: 'TGa2.1',
    title: 'Participate in a voluntary initiative addressing social responsibility during the construction project',
    slug: { _type: 'slug', current: 'tga2-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-responsibility' },
    concept: { _type: 'reference', _ref: 'concept-TG' },
    objective: { _type: 'reference', _ref: 'objective-TG02' },
    activityType: 'Driver',
    ratingSystemApplication: {
      _type: 'ratingSystemApplication',
      bi_developer: true, bi_occupier: true, om_developer: false, om_occupier: false, cd: false,
    },

    scope: [
      p("The Owner shall participate in initiatives that have a clear focus on social responsibility principles and are relevant to the commercial real estate sector in the specific context and challenges of the project's location and impacted party community. Initiatives without a transparent governance structure or those that conflict with the broader objectives of the SEAM Standard are excluded."),
    ],

    requirements: [
      {
        _type: 'requirementGroup', _key: k(),
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('The Project shall publicly state its involvement in the voluntary initiative and how it aligns with the ISO 26000 principles.')],
          },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Voluntary initiative(s) shall meet the following criteria:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('applicable and relevant to a commercial real estate project')] },
              { _key: k(), letter: 'b', body: [p('addresses one or more ISO 26000 core subjects')] },
              { _key: k(), letter: 'c', body: [p('is not country-specific and is currently being implemented in at least 3 countries')] },
              { _key: k(), letter: 'd', body: [p('is not administered by a “for profit” organization for the purposes of financial gain')] },
            ],
          },
        ],
      },
    ],

    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the number of voluntary initiatives in which the project participates.'),
      ],
    },

    scoring: {
      _type: 'scoring',
      mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'Number of Voluntary Initiatives',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: 'single-stakeholder initiative participation (' },
          { _key: k(), pointsLabel: '2 points', criterion: 'inter-governmental or multi-stakeholder initiative participation' },
          { _key: k(), pointsLabel: '3 points', criterion: '2 or more initiatives participation' },
        ],
      },
    },

    documentationLeadIn: sharedDocLeadIn,
    documentationItems: sharedDocItems(),

    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On SEAM-approved voluntary initiatives',
        body: [
          ...guidanceInitiativesList("JLL's DEI Standard for the Built Environment Rating"),
          p('Note: The fact that an initiative is listed as approved in this Standard does not constitute a judgment by SEAM on the value or effectiveness of any of the initiatives to your project or organization, nor does it imply any form of endorsement by SEAM of that initiative and its fit for purpose. The listing indicates that the initiative is applicable and relevant to commercial real estate and will be accepted for SEAM points. Furthermore, important characteristics relating to the initiative that cannot be objectively measured within the scope of the SEAM Standard – such as its effectiveness, credibility, legitimacy, and representative nature – are not considered here. Such characteristics should be assessed directly by those considering use of that initiative.'),
        ],
      },
      {
        _type: 'guidanceResources', _key: k(),
        heading: 'Additional Resources',
        resources: [
          {
            _key: k(),
            label: 'Implementing ISO 26000: The New International Standard on Social Responsibility',
            description: [p('by Adrian Henriques and Julie Richardson')],
          },
        ],
      },
    ],

    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibISO26000 } },
    ],

    version: '1.1',
    status: 'published',
  })
  console.log('  ✓ TGa2.1')

  // ─── TGa2.2 ─────────────────────────────────────────────────────────────
  console.log('\nSeeding Activity TGa2.2...')
  await client.createOrReplace({
    _id: IDS.a22,
    _type: 'activity',
    activityId: 'TGa2.2',
    title: 'Participate in a voluntary initiative addressing social responsibility on the operating asset',
    slug: { _type: 'slug', current: 'tga2-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-responsibility' },
    concept: { _type: 'reference', _ref: 'concept-TG' },
    objective: { _type: 'reference', _ref: 'objective-TG02' },
    activityType: 'Driver',
    ratingSystemApplication: {
      _type: 'ratingSystemApplication',
      bi_developer: true, bi_occupier: true, om_developer: true, om_occupier: true, cd: false,
    },

    scope: [
      p("Owner shall participate in initiatives that have a clear focus on social responsibility principles and are relevant to the commercial real estate sector in the specific context and challenges of the project's location and impacted party community. Initiatives without a transparent governance structure or those that conflict with the broader objectives of the SEAM Standard are excluded."),
    ],

    requirements: [
      {
        _type: 'requirementGroup', _key: k(),
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('The Project shall publicly state its involvement in the voluntary initiative and how it aligns with the ISO 26000 principles.')],
          },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Voluntary initiative(s) shall meet the following criteria:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('It is applicable and relevant to a commercial real estate project')] },
              { _key: k(), letter: 'b', body: [p('It addresses one or more ISO 26000 core subjects')] },
              { _key: k(), letter: 'c', body: [p('It is not country-specific and is currently being implemented in at least 3 countries')] },
              { _key: k(), letter: 'd', body: [p('It is not administered by a “for profit” organization for the purposes of financial gain')] },
            ],
          },
        ],
      },
    ],

    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the number of voluntary initiatives in which the project participates.'),
      ],
    },

    scoring: {
      _type: 'scoring',
      mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'Number of Voluntary Initiatives',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: 'single-stakeholder initiative participation' },
          { _key: k(), pointsLabel: '2 points', criterion: 'inter-governmental or multi-stakeholder initiative participation' },
          { _key: k(), pointsLabel: '3 points', criterion: '2 or more initiatives participation' },
        ],
      },
    },

    documentationLeadIn: sharedDocLeadIn,
    documentationItems: sharedDocItems(),

    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On SEAM approved voluntary initiatives',
        body: [
          ...guidanceInitiativesList('DEI Standard for the Built Environment Rating'),
          p('Note: The fact that an initiative is listed as approved in this Standard does not constitute a judgment by SEAM on the value or effectiveness of any of the initiatives, nor does it imply any form of endorsement by SEAM of that initiative and its fit for purpose. The listing indicates that the initiative is applicable and relevant to commercial real estate. Furthermore, important characteristics relating to the initiative that cannot be objectively measured within the scope of the SEAM Standard – such as its effectiveness, credibility, legitimacy, and representative nature – are not considered here. Such characteristics should be assessed directly by those considering use of that initiative.'),
        ],
      },
      {
        _type: 'guidanceResources', _key: k(),
        heading: 'Additional Resources',
        resources: [
          {
            _key: k(),
            label: 'Implementing ISO 26000: The New International Standard on Social Responsibility',
            description: [p('by Adrian Henriques and Julie Richardson')],
          },
        ],
      },
    ],

    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibISO26000 } },
    ],

    version: '1.1',
    status: 'published',
  })
  console.log('  ✓ TGa2.2')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
