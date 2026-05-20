import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'indicators',
  title: 'Indicators',
  type: 'object',
  fields: [
    defineField({
      name: 'performanceIndicator',
      title: 'Performance indicator (description)',
      type: 'array',
      of: [{ type: 'richText' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'contextIndicators',
      title: 'Context indicators (one or more)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contextIndicator',
          fields: [
            {
              name: 'body',
              type: 'array',
              of: [{ type: 'richText' }],
              title: 'Body',
              validation: (r) => r.required(),
            },
          ],
          preview: {
            select: { body: 'body' },
            prepare({ body }: { body?: Array<{ _type?: string; children?: { text?: string }[] }> }) {
              const firstBlock = Array.isArray(body)
                ? body.find((b) => b._type === 'block')
                : null
              const excerpt = firstBlock?.children?.map((c) => c.text).join(' ').slice(0, 80) ?? ''
              return { title: excerpt || '(empty context indicator)' }
            },
          },
        },
      ],
      description: 'Each entry is a separate context indicator. Most activities have 1–3.',
    }),
    defineField({
      name: 'calculation',
      title: 'Calculation',
      type: 'calculation',
      description: 'How the performance indicator is calculated. Optional — leave blank if the activity has no formula.',
    }),
  ],
})
