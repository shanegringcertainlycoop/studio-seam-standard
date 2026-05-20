import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'bibliographyEntry',
  title: 'Bibliography entry',
  type: 'document',
  description: 'Numbered global registry (1, 2, 3...126+). Cited as superscript numbers across the standard.',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      type: 'number',
      description: 'The canonical sequential number used in citations (e.g. 16, 22, 113).',
      validation: (r) => r.required().integer().positive(),
    }),
    defineField({
      name: 'citation',
      title: 'Citation (full text)',
      type: 'text',
      rows: 4,
      description: 'Full bibliographic citation as it would appear in the bibliography (Appendix B / page 330).',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title / short name',
      type: 'string',
      description: 'Optional short title for editor convenience.',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'sourceType',
      title: 'Source type',
      type: 'string',
      options: {
        list: ['standard', 'study', 'article', 'book', 'guidance', 'declaration', 'website', 'other'],
      },
    }),
  ],
  preview: {
    select: { number: 'number', title: 'title', citation: 'citation' },
    prepare({ number, title, citation }) {
      return {
        title: `[${number}] ${title || (citation as string)?.slice(0, 80) || 'Untitled'}`,
        subtitle: title ? (citation as string)?.slice(0, 100) : undefined,
      }
    },
  },
  orderings: [
    {
      title: 'Number',
      name: 'numberAsc',
      by: [{ field: 'number', direction: 'asc' }],
    },
  ],
})
