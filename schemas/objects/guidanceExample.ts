import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'guidanceExample',
  title: 'Guidance: worked example',
  type: 'object',
  description: 'Boxed worked example (e.g. HRa1.1\'s "XYZ Corporation" walkthrough on p.233).',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading (optional)',
      type: 'string',
      initialValue: 'Example',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'richText' }],
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return { title: heading || 'Example', subtitle: 'Guidance · worked example' }
    },
  },
})
