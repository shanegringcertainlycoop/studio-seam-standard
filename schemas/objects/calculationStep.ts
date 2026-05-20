import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'calculationStep',
  title: 'Calculation step',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label (optional)',
      type: 'string',
      description: 'e.g. "Step 1", "Step 2". Leave blank for single-step calculations.',
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [{ type: 'richText' }],
      description: 'The numbered "To calculate the performance indicator" steps. The renderer formats these as an ordered list.',
    }),
    defineField({
      name: 'formula',
      title: 'Formula',
      type: 'string',
      description: 'Raw formula string (e.g. "P = (S_R / N) × 100" or "(Total Tier 1 Diverse Supplier spend / total Tier 1 Supplier spend) × 100"). Wrap subscripts in underscores: P = (S_R / N) × 100.',
    }),
    defineField({
      name: 'variables',
      title: 'Variable definitions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'symbol', type: 'string', title: 'Symbol (e.g. "P", "S_R", "N")', validation: (r) => r.required() },
            { name: 'meaning', type: 'string', title: 'Meaning', validation: (r) => r.required() },
          ],
          preview: {
            select: { symbol: 'symbol', meaning: 'meaning' },
            prepare({ symbol, meaning }) {
              return { title: `${symbol} = ${meaning}` }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { label: 'label', formula: 'formula' },
    prepare({ label, formula }) {
      return { title: label || 'Step', subtitle: formula }
    },
  },
})
