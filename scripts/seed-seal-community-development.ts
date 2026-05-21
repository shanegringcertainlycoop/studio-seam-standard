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
  // ── 1. Overview ────────────────────────────────────────────
  h3('Overview'),
  p('The SEAM Community Development SEAL recognizes a defined community development initiative grounded in impacted party engagement, informed communication, materiality, initiative design, volunteer delivery, and independent review.'),
  p('The SEAL uses a defined subset of SEAM Activities. The reviewed initiative must show a traceable pathway from community context and impacted party input to a material issue, a designed initiative, and completed volunteer action.'),
  p('A qualifying initiative should be able to answer five public-facing questions: who may be affected, what they need and value, what issue is material enough to prioritize, what change the initiative intends to create, and what reviewed SEAM pathway supports the SEAL claim.'),

  // ── 2. SEAL basis ──────────────────────────────────────────
  h3('SEAL basis in the SEAM framework'),
  p('The Community Development SEAL is based on the SEAM Concept of Community Involvement. Within the SEAM framework, community involvement recognizes that organizations can strengthen civil society through respectful engagement, support, and relationship-building with the community.'),
  p('The SEAM Objective of Community Development is to actively contribute to the socially sustainable development of communities to increase resilience and well-being.'),
  p("For this SEAL, community development means a reviewed initiative that follows SEAM's pathway for context, engagement, materiality, initiative design, delivery, and claim discipline."),

  // ── 3. What this SEAL is and is not ────────────────────────
  h3('What this SEAL is and is not'),
  h4('What this SEAL is'),
  li('A limited-scope SEAM verified designation for a defined community development initiative tied to a project or asset.'),
  li('A defined SEAM Activity pathway focused on community involvement and community development.'),
  li('A reviewed pathway connecting community context, impacted party input, materiality, initiative design, and completed volunteer delivery.'),
  li('Independent review against the SEAM Standard for the included Activities.'),
  li('A public claim limited to the reviewed initiative and Assessment Scope.'),
  h4('What this SEAL is not'),
  li('Full SEAM Certification or a substitute for full SEAM Certification.'),
  li('Certification of the owner, organization, portfolio, or all community-facing work.'),
  li('A claim that all community members approve of the project or initiative.'),
  li('A donation program, publicity campaign, or stand-alone volunteer event detached from the SEAM pathway.'),
  li('A guarantee of long-term outcomes unless those outcomes have been measured and reviewed.'),

  // ── 4. Applicability and Assessment Scope ──────────────────
  h3('Applicability and Assessment Scope'),
  p('The Community Development SEAL may be used in Buildings + Interiors and Operations + Maintenance contexts. For construction-phase initiatives, the applicable materiality Activity is TGa5.1. For operating-asset initiatives, the applicable materiality Activity is TGa5.2.'),
  p('A project may pursue more than one Community Development SEAL when each initiative independently satisfies the SEAL pathway and review requirements. The SEAL applies only to the initiative reviewed and does not extend to other initiatives, phases, projects, assets, or owner-level programs.'),
  p('The Assessment Scope defines the boundaries of the SEAL claim. It identifies what was reviewed and what remains outside the scope of the claim:'),
  liBold('Reviewed initiative — ', 'the specific community development initiative seeking the SEAL.'),
  liBold('Project or asset context — ', 'the commercial real estate project, property, space, or operating asset connected to the initiative.'),
  liBold('Applicant or responsible party — ', 'the party seeking the SEAL and responsible for the submitted review scope.'),
  liBold('SEAM phase context — ', 'whether the initiative sits in a construction-phase or operating-asset context.'),
  liBold('Materiality Activity — ', 'TGa5.1 for construction-phase initiatives or TGa5.2 for operating-asset initiatives.'),
  liBold('Target population — ', 'the community or impacted party group the initiative is intended to benefit or engage.'),
  liBold('Material issue — ', 'the issue prioritized through the SEAM pathway and linked to impacted party feedback.'),
  liBold('Community or implementation partners — ', 'any organizations, groups, public agencies, or impacted party representatives involved in shaping or delivering the initiative.'),
  liBold('Review period — ', 'the period covered by the SEAL review.'),
  liBold('Exclusions and limitations — ', 'any initiative elements, locations, populations, time periods, outcomes, or claims outside the review.'),

  // ── 5. Core SEAL standard ──────────────────────────────────
  h3('Core SEAL standard'),
  p('A reviewed initiative qualifies for the Community Development SEAL only when it can show the SEAL-specific conditions below. The SEAM Standard governs the detailed requirements for each Activity.'),
  li('The initiative addresses a significant social issue relevant to the target population and traceable to impacted-party feedback and materiality.'),
  li('Community members who may be affected have been responsibly informed about the project, likely impacts, and ways to respond.'),
  li('The initiative connects resources, actions, outputs, outcomes, and intended impact in a way that the SEAM pathway can support.'),
  li('The initiative design reflects impact, equity, ethics, participation, collaboration, and accountability.'),
  li('A volunteer event is delivered through the project or property team in line with the reviewed initiative design.'),
  li('The SEAL claim remains limited to the reviewed initiative and Assessment Scope.'),

  // ── 6. SEAM Activity pathway ───────────────────────────────
  h3('SEAM Activity pathway'),
  p('The Community Development SEAL uses the SEAM Activity pathway below. The SEAM Standard and applicable scorecard materials set the Activity-level requirements and evidence rules.'),
  liBold('Activity IAa1.2 — Community Profile. ', 'Establishes the demographic, social, economic, cultural, and historical context for the reviewed initiative.'),
  liBold('Activity IAa1.5 — Identify impacted parties. ', 'Defines the people or groups connected to the initiative and its social area of influence.'),
  liBold('Activity IAa1.6 — Engagement plan. ', 'Sets the engagement approach for identified impacted parties.'),
  liBold('Activity IAa1.7 — Baseline data. ', 'Establishes starting conditions for the initiative issue.'),
  liBold('Activity IAa2.1 — Inform community members. ', 'Supports accessible communication about the project and relevant impacts.'),
  liBold('Activity IAa2.2 — Collect feedback. ', 'Captures input from impacted parties under the engagement approach.'),
  liBold('Activity TGa5.1 — Materiality assessment: construction phase. ', 'Applies when the reviewed initiative sits in a construction-phase context. It connects the initiative to a material issue.'),
  liBold('Activity TGa5.2 — Materiality assessment: operating asset. ', 'Applies when the reviewed initiative sits in an operating-asset context. It connects the initiative to a material issue.'),
  liBold('Activity CIa1.1 — Design the initiative. ', 'Connects the initiative design to the material issue and the Community Development objective.'),
  liBold('Activity CIa1.2 — Deliver the volunteer event. ', 'Confirms the initiative completed the volunteer action.'),
  p('Phase note: the SEAL includes both TGa5.1 and TGa5.2 because the credential applies across construction-phase and operating-asset contexts. A reviewed initiative uses the materiality Activity that matches its context.'),

  // ── 7. How the SEAL pathway works ──────────────────────────
  h3('How the SEAL pathway works'),
  liBold('Build a credible foundation (IAa1.2, IAa1.5, IAa1.6, IAa1.7). ', 'Documents local context, affected groups, engagement approach, and baseline conditions for the reviewed initiative.'),
  liBold('Create transparent and reciprocal engagement (IAa2.1, IAa2.2). ', 'Communicates relevant information and captures input from impacted parties.'),
  liBold('Turn input into a reasoned basis for action (TGa5.1 or TGa5.2). ', 'Prioritizes the material issue that should guide the initiative.'),
  liBold('Design for relevance and sustained value (CIa1.1). ', 'Links the selected issue to a defined initiative design and community development objective.'),
  liBold('Demonstrate completed action (CIa1.2). ', 'Shows that the initiative moved from design to completed volunteer delivery.'),

  // ── 8. SEAL determination ──────────────────────────────────
  h3('SEAL determination'),
  p('The Community Development SEAL uses a binary determination: the reviewed initiative either achieves the SEAL or does not.'),
  p('SEAM determines the result through independent review against the SEAM Standard and applicable scorecard materials for the SEAL Activity pathway.'),
  p('The SEAL should not be awarded when the issue was selected before engagement, when the initiative cannot be tied to materiality, when the volunteer event is disconnected from the reviewed initiative design, when the reviewed pathway is incomplete, or when the claim exceeds the Assessment Scope.'),

  // ── 9. Leading Practice Recognition ────────────────────────
  h3('Leading Practice Recognition'),
  p('Organizations that achieve the Gold-equivalent or Platinum-equivalent thresholds across the applicable Community Development SEAL subset may receive the distinction SEAM Community Development SEAL — Leading Practice.'),

  // ── 10. Relationship to SEAM Certification ─────────────────
  h3('Relationship to SEAM Certification'),
  p('The Community Development SEAL is not full SEAM Certification. It is a limited-scope credential based on the SEAM Activities identified in this guidance.'),
  p('Activities completed for this SEAL may count toward future SEAM Certification when the project, phase, reporting period, evidence, and applicable rating system remain aligned with SEAM requirements.'),
  p('The SEAL does not replace other SEAM Activities required for full SEAM Certification.'),

  // ── 11. Public claims and limitations ──────────────────────
  h3('Public claims and limitations'),
  p('Public statements should identify the reviewed initiative, project or asset context, and Assessment Scope. Claims should not imply full SEAM Certification, owner-level certification, community-wide approval, all community development work by the project or owner, or guaranteed long-term impact.'),
  p('Example claim: "[Project or property] achieved the SEAM Community Development SEAL for [reviewed initiative] during [review period]."'),
  li('The SEAL does not certify the full project, asset, owner, or community development portfolio.'),
  li('The SEAL does not prove that all community concerns have been resolved.'),
  li('The SEAL does not guarantee long-term community outcomes unless those outcomes have been measured and reviewed.'),
  li('The SEAL does not replace permitting, legal compliance, community benefits agreements, public approval processes, or other required processes.'),
  li('The SEAL determination depends on the Assessment Scope, evidence reviewed under the SEAM Standard, review period, and applicable phase-specific materiality Activity.'),

  // ── 12. Program statement ──────────────────────────────────
  h3('Program statement'),
  p('A SEAM Community Development SEAL should signify more than participation. It should signify that a community development initiative was informed by context, shaped by impacted party input, tied to a material issue, intentionally designed, delivered through volunteer action, and independently reviewed within a defined scope.'),

  // ── 13. Governing materials ────────────────────────────────
  h3('Governing materials'),
  li('SEAM Standard v1.1 with Implementation Guidance.'),
  li('Applicable SEAM scorecard materials for the rating system and reviewed initiative.'),
  li('SEAM certification review process materials.'),
  p('This guidance does not replace the SEAM Standard, scorecard, or certification review process.'),
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
