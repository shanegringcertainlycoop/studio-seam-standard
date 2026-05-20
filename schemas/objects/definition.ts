import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'definition',
  title: 'Definition (per-activity)',
  type: 'object',
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Definition',
      type: 'array',
      of: [{ type: 'richText' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'appearsInRequirement',
      title: 'Appears in Requirement #',
      type: 'number',
      description: 'Optional cross-reference to a requirement number in this activity.',
    }),
  ],
  preview: {
    select: { term: 'term', n: 'appearsInRequirement' },
    prepare({ term, n }) {
      return { title: term, subtitle: n ? `appears in Requirement ${n}` : undefined }
    },
  },
})
