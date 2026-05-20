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

async function run() {
  await client
    .patch('concept-TG')
    .set({
      headlineGoal:
        'Enables an organization to take responsibility for its actions and serves to increase its ability to behave in a socially responsible manner.',
    })
    .commit()
  console.log('✓ concept-TG headlineGoal set')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
