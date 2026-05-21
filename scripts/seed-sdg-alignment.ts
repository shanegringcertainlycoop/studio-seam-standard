/**
 * Patches each activity with its UN SDG alignment per Appendix A.
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

const docId = (activityId: string) => `activity-${activityId.replace(/\./g, '-')}`

// Activity ID -> array of SDG numbers (1-17). HSa1.1 is "See healthy building
// standard" per the source; we leave it unset.
const SDG_MAP: Record<string, number[]> = {
  'IAa1.1': [16, 17],
  'IAa1.2': [1, 4, 10, 11],
  'IAa1.3': [17],
  'IAa1.4': [5, 8, 16],
  'IAa1.5': [1, 5, 10, 16],
  'IAa1.6': [5, 10, 16, 17],
  'IAa1.7': [10, 16, 17],
  'IAa2.1': [4, 10, 11, 16, 17],
  'IAa2.2': [8, 10, 11, 16, 17],
  'IAa2.3': [8, 9, 11, 12, 17],
  'IAa2.4': [3, 5, 8, 10, 16],
  'IAa2.5': [9, 10, 16, 17],
  'IAa3.1': [8, 10, 16, 17],
  'IAa3.2': [16, 17],
  'TGa1.1': [4, 8, 9, 12, 16],
  'TGa1.2': [4, 8, 9, 12, 16],
  'TGa1.3': [4, 5, 10],
  'TGa2.1': [3, 8, 17],
  'TGa2.2': [3, 8, 17],
  'TGa3.1': [8, 10, 16, 17],
  'TGa3.2': [8, 10, 16, 17],
  'TGa4.1': [8, 10, 12, 16, 17],
  'TGa4.2': [8, 10, 12, 16, 17],
  'TGa5.1': [11, 16],
  'TGa5.2': [11, 16],
  'CIa1.1': [1, 6, 11, 12, 13, 15, 16, 17],
  'CIa1.2': [1, 6, 11, 12, 13, 15, 16, 17],
  'SJa1.1': [5, 8, 10, 12],
  'SJa1.2': [5, 8, 10, 11, 16],
  'SJa1.3': [5, 8, 10, 12],
  'SJa1.4': [5, 8, 10, 12],
  'SJa1.5': [5, 8, 10, 16],
  'SJa2.1': [3, 5, 8, 10, 11, 17],
  'SJa2.2': [3, 5, 8, 10, 16],
  'SJa2.3': [3, 5, 8, 10, 16],
  'SJa2.4': [1, 5, 8, 10],
  'SJa2.5': [1, 5, 8, 10, 16],
  'SJa3.1': [1, 10, 11, 16],
  'SJa3.2': [1, 5, 10, 11, 16],
  'SJa3.3': [1, 4, 5, 8, 10, 11, 12],
  'SJa3.4': [8, 12, 16, 17],
  'SJa4.1': [1, 5, 8, 10, 11],
  'SJa4.2': [1, 5, 8, 10, 11],
  'INa1': [1, 11, 12, 15, 16],
  'INa2': [1, 11, 12, 15, 16],
  'HRa1.1': [8, 10, 12, 16],
  'HRa1.2': [8, 10, 12, 16, 17],
  'HRa1.3': [1, 5, 8, 10, 12, 16, 17],
  'HRa1.4': [5, 8, 12, 16, 17],
  'HRa2.1': [1, 8, 10],
  'HRa2.2': [3, 5, 8, 10, 16],
  'HRa2.3': [1, 8, 10],
  'HRa2.4': [3, 5, 8, 10, 16],
  'HRa2.5': [1, 8, 10],
  'HRa2.6': [3, 5, 8, 10, 16],
  'HRa2.7': [5, 8, 12, 16, 17],
  'HRa3.1': [8, 10, 16, 17],
  'HRa3.2': [3, 5, 10, 16],
  'HRa4.1': [4, 8, 10, 16],
  'HRa4.2': [4, 8, 10, 11, 16],
  'HSa1.2': [3, 4, 8, 9, 10, 11, 12, 13, 16, 17],
  'HSa1.3': [3, 8, 11],
  'HSa1.4': [3, 9, 11],
}

async function run() {
  let tx = client.transaction()
  let count = 0
  for (const [id, sdgs] of Object.entries(SDG_MAP)) {
    tx = tx.patch(docId(id), (p) => p.set({ sdgs }))
    count++
  }
  await tx.commit()
  console.log(`Patched ${count} activities with SDG alignment.`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
