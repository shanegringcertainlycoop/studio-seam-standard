/**
 * Seeds the Community Development SEAL (v1.0, June 1 2026).
 *
 * Source: SEAM_Community_Development_SEAL_Program_Guidance_v1.0.pdf
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

type Block = any

const p = (text: string): Block => ({
  _type: 'richText', _key: k(), style: 'normal',
  children: [{ _type: 'span', _key: k(), text, marks: [] }], markDefs: [],
})
const h3 = (text: string): Block => ({
  _type: 'richText', _key: k(), style: 'h3',
  children: [{ _type: 'span', _key: k(), text, marks: [] }], markDefs: [],
})
const h4 = (text: string): Block => ({
  _type: 'richText', _key: k(), style: 'h4',
  children: [{ _type: 'span', _key: k(), text, marks: [] }], markDefs: [],
})
const li = (text: string, listItem: 'bullet' | 'number' = 'bullet'): Block => ({
  _type: 'richText', _key: k(), style: 'normal', listItem, level: 1,
  children: [{ _type: 'span', _key: k(), text, marks: [] }], markDefs: [],
})
const liBold = (boldLead: string, rest: string, listItem: 'bullet' | 'number' = 'bullet'): Block => ({
  _type: 'richText', _key: k(), style: 'normal', listItem, level: 1,
  children: [
    { _type: 'span', _key: k(), text: boldLead, marks: ['strong'] },
    { _type: 'span', _key: k(), text: rest, marks: [] },
  ],
  markDefs: [],
})

// Activity IDs in the SEAL pathway, in the order they appear in §6.
const PATHWAY_ACTIVITY_IDS = [
  'IAa1.2',  // Community Profile
  'IAa1.5',  // Identify impacted parties
  'IAa1.6',  // Engagement plan
  'IAa1.7',  // Baseline data
  'IAa2.1',  // Inform community members
  'IAa2.2',  // Collect feedback
  'TGa5.1',  // Materiality assessment: construction phase
  'TGa5.2',  // Materiality assessment: operating asset
  'CIa1.1',  // Design the initiative
  'CIa1.2',  // Deliver the volunteer event
]

const docId = (activityId: string) => `activity-${activityId.replace(/\./g, '-')}`

const body: Block[] = [
  h3('What this SEAL recognizes'),
  p('Recognizes a defined community development initiative grounded in impacted-party engagement, informed communication, materiality, initiative design, volunteer delivery, and independent review.'),
  p("Built on the SEAM Concept of Community Involvement and the Objective of Community Development — actively contributing to the socially sustainable development of communities to increase resilience and well-being. A qualifying initiative answers five questions: who may be affected, what they need and value, what issue is material enough to prioritize, what change the initiative intends to create, and what reviewed SEAM pathway supports the SEAL claim."),

  h3('Applicability'),
  p('Usable in Buildings + Interiors and Operations + Maintenance contexts. Construction-phase initiatives use materiality Activity TGa5.1; operating-asset initiatives use TGa5.2. A project may pursue more than one Community Development SEAL when each initiative independently satisfies the pathway.'),

  h3('Conditions to award'),
  li('The initiative addresses a significant social issue relevant to the target population and traceable to impacted-party feedback and materiality.'),
  li('Community members who may be affected have been responsibly informed about the project, likely impacts, and ways to respond.'),
  li('The initiative connects resources, actions, outputs, outcomes, and intended impact in a way the SEAM pathway can support.'),
  li('The initiative design reflects impact, equity, ethics, participation, collaboration, and accountability.'),
  li('A volunteer event is delivered through the project or property team in line with the reviewed initiative design.'),
  li('The SEAL claim remains limited to the reviewed initiative and Assessment Scope.'),

  h3('Pathway'),
  liBold('Build a credible foundation — IAa1.2, IAa1.5, IAa1.6, IAa1.7. ', 'Documents local context, affected groups, engagement approach, and baseline conditions.'),
  liBold('Create transparent and reciprocal engagement — IAa2.1, IAa2.2. ', 'Communicates relevant information and captures input from impacted parties.'),
  liBold('Turn input into a reasoned basis for action — TGa5.1 or TGa5.2. ', 'Prioritizes the material issue that should guide the initiative.'),
  liBold('Design for relevance and sustained value — CIa1.1. ', 'Links the selected issue to a defined initiative design and the Community Development objective.'),
  liBold('Demonstrate completed action — CIa1.2. ', 'Shows the initiative moved from design to completed volunteer delivery.'),
  p('Phase note: the SEAL includes both TGa5.1 and TGa5.2 because the credential applies across construction-phase and operating-asset contexts. A reviewed initiative uses the materiality Activity that matches its context.'),

  h3('Determination'),
  p('Binary — the reviewed initiative either achieves the SEAL or does not, decided through independent review against the SEAM Standard for the pathway Activities. Not awarded when the issue was selected before engagement, when the initiative cannot be tied to materiality, when the volunteer event is disconnected from the reviewed design, when the pathway is incomplete, or when the claim exceeds the Assessment Scope.'),

  h3('Leading Practice'),
  p('Initiatives that achieve Gold- or Platinum-equivalent thresholds across the pathway may receive the SEAM Community Development SEAL — Leading Practice distinction.'),
]

async function run() {
  console.log('Seeding seal-community-development...')
  await client.createOrReplace({
    _id: 'seal-community-development',
    _type: 'seal',
    name: 'Community Development SEAL',
    slug: { _type: 'slug', current: 'community-development' },
    order: 1,
    summary: 'A limited-scope SEAM credential recognizing a defined community development initiative reviewed against a defined subset of SEAM Activities.',
    accentColor: 'seam-700',
    body,
    activities: PATHWAY_ACTIVITY_IDS.map((id) => ({
      _key: k(),
      _type: 'reference',
      _ref: docId(id),
    })),
  })

  console.log(`  ✓ ${PATHWAY_ACTIVITY_IDS.length} activities in pathway`)
  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
