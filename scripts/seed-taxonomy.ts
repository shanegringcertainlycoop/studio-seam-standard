/**
 * Seeds the SEAM Standard taxonomy: 4 pillars, 8 concepts, 21 objectives.
 *
 * Run with:
 *   npx tsx scripts/seed-taxonomy.ts
 *
 * Requires .env with:
 *   SANITY_STUDIO_PROJECT_ID=...
 *   SANITY_STUDIO_DATASET=production
 *   SANITY_AUTH_TOKEN=<editor-or-admin token from sanity.io/manage>
 *
 * Idempotent — uses createOrReplace, so re-running is safe.
 */

import { createClient } from '@sanity/client'
import { config as loadEnv } from 'dotenv'

loadEnv()

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'
const token = process.env.SANITY_AUTH_TOKEN

if (!projectId) throw new Error('SANITY_STUDIO_PROJECT_ID is not set in .env')
if (!token) throw new Error('SANITY_AUTH_TOKEN is not set in .env (create one at https://www.sanity.io/manage/project/' + projectId + '/api)')

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-01-01',
  useCdn: false,
})

const pillars = [
  { id: 'pillar-social-impact', number: 1, title: 'Social Impact', slug: 'social-impact' },
  { id: 'pillar-social-responsibility', number: 2, title: 'Social Responsibility', slug: 'social-responsibility' },
  { id: 'pillar-social-justice', number: 3, title: 'Social Justice', slug: 'social-justice' },
  { id: 'pillar-social-accountability', number: 4, title: 'Social Accountability', slug: 'social-accountability' },
] as const

const concepts = [
  { id: 'concept-IA', number: 1, code: 'IA', title: 'Impact Assessment', slug: 'impact-assessment', pillarId: 'pillar-social-impact' },
  { id: 'concept-TG', number: 2, code: 'TG', title: 'Transformational Governance', slug: 'transformational-governance', pillarId: 'pillar-social-responsibility' },
  { id: 'concept-CI', number: 3, code: 'CI', title: 'Community Involvement', slug: 'community-involvement', pillarId: 'pillar-social-responsibility' },
  { id: 'concept-SI', number: 4, code: 'SI', title: 'Social Investment', slug: 'social-investment', pillarId: 'pillar-social-responsibility' },
  { id: 'concept-SJ', number: 5, code: 'SJ', title: 'Social Equity + Justice', slug: 'social-equity-justice', pillarId: 'pillar-social-justice' },
  { id: 'concept-IN', number: 6, code: 'IN', title: 'Social Justice Innovation', slug: 'social-justice-innovation', pillarId: 'pillar-social-justice' },
  { id: 'concept-HR', number: 7, code: 'HR', title: 'Human Rights', slug: 'human-rights', pillarId: 'pillar-social-accountability' },
  { id: 'concept-HS', number: 8, code: 'HS', title: 'Health + Safety', slug: 'health-safety', pillarId: 'pillar-social-accountability' },
] as const

const objectives = [
  // IA — Impact Assessment
  { id: 'objective-IA01', code: 'IA01', number: 1, title: 'Contextual Analysis', slug: 'contextual-analysis', conceptId: 'concept-IA' },
  { id: 'objective-IA02', code: 'IA02', number: 2, title: 'Impacted Party Engagement', slug: 'impacted-party-engagement', conceptId: 'concept-IA' },
  { id: 'objective-IA03', code: 'IA03', number: 3, title: 'Monitoring + Evaluation', slug: 'monitoring-evaluation', conceptId: 'concept-IA' },
  // TG — Transformational Governance
  { id: 'objective-TG01', code: 'TG01', number: 1, title: 'Education + Awareness', slug: 'education-awareness', conceptId: 'concept-TG' },
  { id: 'objective-TG02', code: 'TG02', number: 2, title: 'Voluntary Initiatives', slug: 'voluntary-initiatives', conceptId: 'concept-TG' },
  { id: 'objective-TG03', code: 'TG03', number: 3, title: 'Responsible Policies', slug: 'responsible-policies', conceptId: 'concept-TG' },
  { id: 'objective-TG04', code: 'TG04', number: 4, title: 'Transparent Communication', slug: 'transparent-communication', conceptId: 'concept-TG' },
  { id: 'objective-TG05', code: 'TG05', number: 5, title: 'Impacted Party Materiality', slug: 'impacted-party-materiality', conceptId: 'concept-TG' },
  // CI — Community Involvement
  { id: 'objective-CI01', code: 'CI01', number: 1, title: 'Community Development', slug: 'community-development', conceptId: 'concept-CI' },
  // SI — Social Investment
  { id: 'objective-SI01', code: 'SI01', number: 1, title: 'Community Resilience', slug: 'community-resilience', conceptId: 'concept-SI' },
  // SJ — Social Equity + Justice
  { id: 'objective-SJ01', code: 'SJ01', number: 1, title: 'Equity + Inclusion in Procurement', slug: 'equity-inclusion-procurement', conceptId: 'concept-SJ' },
  { id: 'objective-SJ02', code: 'SJ02', number: 2, title: 'Equity + Inclusion in the Workplace', slug: 'equity-inclusion-workplace', conceptId: 'concept-SJ' },
  { id: 'objective-SJ03', code: 'SJ03', number: 3, title: 'Equity + Inclusion in the Community', slug: 'equity-inclusion-community', conceptId: 'concept-SJ' },
  { id: 'objective-SJ04', code: 'SJ04', number: 4, title: 'Equity + Inclusion in Capital', slug: 'equity-inclusion-capital', conceptId: 'concept-SJ' },
  // IN — Social Justice Innovation
  { id: 'objective-IN01', code: 'IN01', number: 1, title: 'Social Justice Industry Innovation', slug: 'social-justice-industry-innovation', conceptId: 'concept-IN' },
  { id: 'objective-IN02', code: 'IN02', number: 2, title: 'Design for Embodied Justice', slug: 'design-for-embodied-justice', conceptId: 'concept-IN' },
  // HR — Human Rights
  { id: 'objective-HR01', code: 'HR01', number: 1, title: 'Ethical Materials Procurement', slug: 'ethical-materials-procurement', conceptId: 'concept-HR' },
  { id: 'objective-HR02', code: 'HR02', number: 2, title: 'Ethical Suppliers Procurement', slug: 'ethical-suppliers-procurement', conceptId: 'concept-HR' },
  { id: 'objective-HR03', code: 'HR03', number: 3, title: 'Human Rights Reporting', slug: 'human-rights-reporting', conceptId: 'concept-HR' },
  { id: 'objective-HR04', code: 'HR04', number: 4, title: 'Human Rights Awareness', slug: 'human-rights-awareness', conceptId: 'concept-HR' },
  // HS — Health + Safety
  { id: 'objective-HS01', code: 'HS01', number: 1, title: 'Health, Safety, + Wellness', slug: 'health-safety-wellness', conceptId: 'concept-HS' },
] as const

async function run() {
  console.log(`Seeding ${pillars.length} pillars...`)
  for (const p of pillars) {
    await client.createOrReplace({
      _id: p.id,
      _type: 'pillar',
      number: p.number,
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      accentColor: 'gold-400',
    })
    console.log(`  ✓ ${p.title}`)
  }

  console.log(`\nSeeding ${concepts.length} concepts...`)
  for (const c of concepts) {
    await client.createOrReplace({
      _id: c.id,
      _type: 'concept',
      number: c.number,
      code: c.code,
      title: c.title,
      slug: { _type: 'slug', current: c.slug },
      pillar: { _type: 'reference', _ref: c.pillarId },
    })
    console.log(`  ✓ ${c.code} — ${c.title}`)
  }

  console.log(`\nSeeding ${objectives.length} objectives...`)
  for (const o of objectives) {
    await client.createOrReplace({
      _id: o.id,
      _type: 'objective',
      objectiveCode: o.code,
      number: o.number,
      title: o.title,
      slug: { _type: 'slug', current: o.slug },
      concept: { _type: 'reference', _ref: o.conceptId },
    })
    console.log(`  ✓ ${o.code} — ${o.title}`)
  }

  console.log(`\nDone. Seeded ${pillars.length} pillars, ${concepts.length} concepts, ${objectives.length} objectives.`)
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
