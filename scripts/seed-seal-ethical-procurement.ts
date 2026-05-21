/**
 * Seeds the Ethical Procurement SEAL (v1.0, June 1 2026).
 *
 * Source: SEAM_Ethical_Procurement_SEAL_Program_Guidance_v1.0.pdf
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

// ── Activities ─────────────────────────────────────────────
const REQUIRED_ACTIVITY_IDS = [
  // Governance, scope, value-chain mapping
  'IAa1.1', 'IAa1.3',
  // Risk identification and exposure analysis
  'IAa1.4', 'IAa1.5', 'IAa1.7',
  // Policy and procurement controls
  'HRa1.1', 'HRa1.3', 'TGa3.1', 'TGa3.2',
  // Labor conditions in the assessed organization's own operations
  'HRa2.1', 'HRa2.2',
  // Corrective action and remediation
  'IAa2.3', 'HRa1.4',
  // Grievance, reporting, and transparency
  'HRa3.1', 'HRa3.2',
  // Training and capability
  'HRa4.1',
  // Monitoring, effectiveness, and review
  'IAa3.1', 'IAa3.2',
]

const SCOPE_TRIGGERED_ACTIVITY_IDS = [
  'HRa1.2',  // Tier 1 Suppliers of goods/materials
  'HRa2.3',  // Supplier living wage
  'HRa2.4',  // Supplier decent work conditions
  'HRa2.7',  // Supplier human-rights impacts
  'HRa2.5',  // Tenant labor practices
  'HRa2.6',  // Tenant decent work conditions
  'IAa2.4',  // Community grievance mechanism
  'HRa4.2',  // External capacity-building
]

const docId = (activityId: string) => `activity-${activityId.replace(/\./g, '-')}`

// ── Body ───────────────────────────────────────────────────

const body: Block[] = [
  h3('What this SEAL recognizes'),
  p('A limited-scope credential covering modern slavery, forced labor, and supply-chain human-rights due diligence within a defined Assessment Scope. Required Activities apply to every assessed party; Scope-Triggered Activities apply when the Assessment Scope includes a supplier, tenant, impacted-party, import, or capacity-building condition.'),
  p('Designed for commercial real estate value-chain actors — reporting entities, vendors, suppliers, property owners, managers, and investment managers — when the Assessment Scope supports review.'),

  h3('Assessment Scope'),
  p('Every Ethical Procurement SEAL review defines an Assessment Scope before scoring. The scope identifies the boundaries of the review and the limits of the public claim:'),
  liBold('Assessed party — ', 'the legal entity, business unit, fund, project, asset, or supplier seeking the SEAL.'),
  liBold('Role of assessed party — ', 'reporting entity, vendor, supplier, property owner, manager, investment manager, or other value-chain role.'),
  liBold('Legal reporting party — ', 'where applicable, the entity responsible for a modern slavery statement, forced-labor report, import response, or regulatory filing the SEAL supports.'),
  liBold('Regulatory frameworks covered — ', 'the modern slavery, forced-labor, supply-chain, or related frameworks the SEAL is intended to support.'),
  liBold('Reporting or review period — ', 'the period covered by the SEAL review.'),
  liBold('Supply-chain profile — ', 'whether Tier 1 Suppliers of goods or materials, subcontractors, vendors, or service providers sit within scope.'),
  liBold('Tenant relationship — ', 'whether tenant labor practices or working conditions fall within scope.'),
  liBold('Owned or controlled entities — ', 'any owned or controlled entities included in the legal reporting scope.'),
  liBold('U.S. import role — ', 'whether the assessed party acts as importer of record, purchases imported goods, controls product sourcing, or prepares forced-labor import documentation.'),
  liBold('Exclusions and limitations — ', 'entities, assets, suppliers, jurisdictions, materials, products, import flows, or claims outside the review.'),

  h3('Required Activity pathway'),
  p('These Activities apply to every Ethical Procurement SEAL review:'),
  h4('Governance, scope, and value-chain mapping'),
  liBold('IAa1.1 — ', 'Establish project understanding and governance framework.'),
  liBold('IAa1.3 — ', 'Map the proposed project value chain.'),
  h4('Risk identification and exposure analysis'),
  liBold('IAa1.4 — ', 'Identify and scope likely social and human-rights impacts.'),
  liBold('IAa1.5 — ', 'Determine the social area of influence by identifying likely impacted parties.'),
  liBold('IAa1.7 — ', 'Assemble relevant baseline data for key social issues.'),
  h4('Policy and procurement controls'),
  liBold('HRa1.1 — ', 'Ethical materials procurement governance and policy.'),
  liBold('HRa1.3 — ', 'Ethical sourcing of products and materials.'),
  liBold('TGa3.1 or TGa3.2 — ', 'Site-specific social responsibility policies applicable to the construction or operating asset phase.'),
  h4("Labor conditions in the assessed organization's own operations"),
  liBold('HRa2.1 — ', 'Living wage for organizational operations.'),
  liBold('HRa2.2 — ', 'Decent work conditions for organizational operations.'),
  h4('Corrective action and remediation'),
  liBold('IAa2.3 — ', 'Develop and implement ways of addressing impacts.'),
  liBold('HRa1.4 — ', 'Remediation of materials procurement-related human-rights impacts.'),
  h4('Grievance, reporting, and transparency'),
  liBold('HRa3.1 — ', 'Communicate externally about human-rights impacts and how the project addresses them.'),
  liBold('HRa3.2 — ', 'Establish a grievance mechanism for direct reporting of human-rights violations to the enterprise.'),
  h4('Training and capability'),
  liBold('HRa4.1 — ', 'Conduct education and training sessions on human-rights standards for relevant procurement employees.'),
  h4('Monitoring, effectiveness, and review'),
  liBold('IAa3.1 — ', 'Develop and implement ongoing social performance monitoring plan.'),
  liBold('IAa3.2 — ', 'Undertake evaluation and periodic review.'),

  h3('Scope-Triggered Activities'),
  p('These Activities apply only when the Assessment Scope includes the relevant trigger. When applicable, they become part of the reviewed subset:'),
  liBold('HRa1.2 — ', 'when the assessed party has Tier 1 Suppliers of goods or materials in scope.'),
  liBold('HRa2.3 — ', 'when Tier 1 Suppliers are in scope and supplier living wage expectations are within scope.'),
  liBold('HRa2.4 — ', 'when Tier 1 Suppliers are in scope and supplier decent work conditions are within scope.'),
  liBold('HRa2.7 — ', 'when Tier 1 Suppliers are in scope and supplier procurement-related human-rights impacts have been identified or require review.'),
  liBold('HRa2.5 — ', 'when tenant labor practices fall within scope or the assessed party has relevant leasing, contractual, reporting, or operational authority.'),
  liBold('HRa2.6 — ', 'when tenant decent work conditions fall within scope or the assessed party has relevant leasing, contractual, reporting, or operational authority.'),
  liBold('IAa2.4 — ', 'when community members, occupants, residents, visitors, or other non-worker impacted parties need a project- or asset-level grievance channel within scope.'),
  liBold('HRa4.2 — ', 'when the scope includes external education, supplier capacity-building, sector-level engagement, market leadership, or comparable external capability-building.'),

  h3('Proportionate due diligence'),
  p('Required + Scope-Triggered Activities combine into a proportionate review for each assessed-party profile:'),
  liBold('Reporting entity with global goods supply chain and tenants — ', 'Required + applicable supplier oversight, tenant relationship, community grievance, and capacity-building Activities.'),
  liBold('Reporting entity with goods supply chain and no tenants — ', 'Required + applicable supplier oversight Activities.'),
  liBold('Tier 1 vendor with its own goods supply chain — ', 'Required + applicable supplier oversight Activities.'),
  liBold('Tier 1 service-only vendor with no goods supply chain — ', 'Required only, when the scope supports that determination.'),
  liBold('Property owner or manager with tenants and no goods supply chain — ', 'Required + applicable tenant relationship and community grievance Activities.'),

  h3('Determination'),
  p('Binary — the assessed party either achieves the SEAL or does not. To achieve it, complete all Required Activities, complete all applicable Scope-Triggered Activities, and meet the Bronze-equivalent minimum point threshold for the applicable subset.'),
  p('The SEAL may not be awarded where credible evidence shows active, unremediated modern slavery, forced labor, child labor, trafficking, or refusal to provide required evidence within the Assessment Scope. Such findings must be resolved, remediated, or documented through an approved corrective action process before the SEAL can be granted.'),

  h3('Leading Practice'),
  p('Assessed parties that achieve Gold- or Platinum-equivalent thresholds across the applicable subset may receive the SEAM Ethical Procurement SEAL — Leading Practice distinction. This recognizes advanced implementation within the reviewed scope; it is not a legal conclusion or a guarantee that human-rights harms are absent.'),
]

async function run() {
  console.log('Seeding seal-ethical-procurement...')
  const allIds = [...REQUIRED_ACTIVITY_IDS, ...SCOPE_TRIGGERED_ACTIVITY_IDS]
  await client.createOrReplace({
    _id: 'seal-ethical-procurement',
    _type: 'seal',
    name: 'Ethical Procurement SEAL',
    slug: { _type: 'slug', current: 'ethical-procurement' },
    order: 2,
    summary: 'A limited-scope SEAM credential for modern slavery, forced labor, and supply-chain human-rights due diligence in commercial real estate operations and procurement.',
    accentColor: 'seam-700',
    body,
    activities: allIds.map((id) => ({
      _key: k(),
      _type: 'reference',
      _ref: docId(id),
    })),
  })

  console.log(`  ✓ ${REQUIRED_ACTIVITY_IDS.length} required + ${SCOPE_TRIGGERED_ACTIVITY_IDS.length} scope-triggered = ${allIds.length} activities`)
  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
