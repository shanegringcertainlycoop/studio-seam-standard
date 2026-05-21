/**
 * Patches markEligible=true on the activities that can be earned as
 * standalone SEAM Marks.
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

// activityId -> doc id suffix ('.' → '-', case preserved)
const docSuffix = (id: string) => id.replace(/\./g, '-')

const MARK_ACTIVITY_IDS = [
  'IAa2.4',   // community grievance mechanism
  'CIa1.1',   // community development
  'CIa1.2',   // community development
  'TGa3.1',   // responsible policies
  'TGa3.2',   // responsible policies
  'SJa1.1',   // Tier 1 supplier procurement inclusion
  'SJa2.4',   // gender pay equity
  'SJa2.5',   // diversity pay equity
  'HRa2.1',   // owner living wage
  'HRa2.3',   // supplier living wage
]

async function run() {
  // First reset all activities to markEligible=false, then set the chosen ones
  // to true — so re-running is idempotent.
  const allIds: Array<{ _id: string }> = await client.fetch(`*[_type == "activity"]{ _id }`)
  console.log(`Resetting markEligible on ${allIds.length} activities...`)

  let tx = client.transaction()
  for (const { _id } of allIds) {
    tx = tx.patch(_id, (p) => p.set({ markEligible: false }))
  }
  await tx.commit()

  console.log(`Marking ${MARK_ACTIVITY_IDS.length} activities as Mark-eligible:`)
  let tx2 = client.transaction()
  for (const id of MARK_ACTIVITY_IDS) {
    const docId = `activity-${docSuffix(id)}`
    console.log(`  ✓ ${id} (${docId})`)
    tx2 = tx2.patch(docId, (p) => p.set({ markEligible: true }))
  }
  await tx2.commit()

  console.log('Done.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
