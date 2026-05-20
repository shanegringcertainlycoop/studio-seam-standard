import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'glossaryTerm',
  title: 'Glossary term',
  type: 'document',
  description: 'Global "Key Terms + Definitions" entries (pp. 9–15 of the standard).',
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'term', maxLength: 96 },
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
      name: 'footnote',
      title: 'Footnote citation (optional)',
      type: 'reference',
      to: [{ type: 'bibliographyEntry' }],
    }),
  ],
  preview: {
    select: { title: 'term' },
  },
  orderings: [
    { title: 'Term (A–Z)', name: 'termAsc', by: [{ field: 'term', direction: 'asc' }] },
  ],
})
