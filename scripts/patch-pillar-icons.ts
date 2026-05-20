/**
 * One-off: patches pillar documents with iconUrl values.
 * Re-runnable.
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

const ICONS: Record<string, string> = {
  'pillar-social-impact': 'https://seamcertification.org/images/social-impact/bridge.png',
  // Add others as you have them:
  // 'pillar-social-responsibility': '...',
  // 'pillar-social-justice':        '...',
  // 'pillar-social-accountability': '...',
}

async function run() {
  for (const [id, url] of Object.entries(ICONS)) {
    await client.patch(id).set({ iconUrl: url }).commit()
    console.log(`  ✓ ${id}: ${url}`)
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
