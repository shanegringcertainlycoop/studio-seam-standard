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
  'pillar-social-responsibility': 'https://seamcertification.org/images/social-responsibility/compass.png',
  'pillar-social-justice': 'https://seamcertification.org/images/social-justice/scales.png',
  'pillar-social-accountability': 'https://seamcertification.org/images/social-accountability/lantern.png',
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
