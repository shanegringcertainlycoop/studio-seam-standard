import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'guidanceSteps',
  title: 'Guidance: numbered steps',
  type: 'object',
  description: 'Multi-step procedural guidance (e.g. HRa1.2 "How to identify high-priority human rights risks", Steps 1–6).',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'lead',
      title: 'Lead-in text',
      type: 'array',
      of: [{ type: 'richText' }],
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label (e.g. "Step 1: Supply Chain Mapping")', validation: (r) => r.required() },
            { name: 'body', type: 'array', of: [{ type: 'richText' }], validation: (r) => r.required() },
          ],
          preview: {
            select: { label: 'label' },
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return { title: heading, subtitle: 'Guidance · steps' }
    },
  },
})
