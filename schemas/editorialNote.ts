import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'editorialNote',
  title: 'Editorial note',
  type: 'document',
  description: 'Lowercase-roman global registry (i, ii, iii...xxvi+). Inline editorial side-notes throughout the standard.',
  fields: [
    defineField({
      name: 'marker',
      title: 'Marker',
      type: 'string',
      description: 'Lowercase roman numeral as it appears in the PDF (e.g. "i", "ii", "xi", "xxvi").',
      validation: (r) =>
        r.required().regex(/^[ivxlcdm]+$/, { name: 'lowercase roman numeral' }),
    }),
    defineField({
      name: 'order',
      title: 'Sequence (decimal)',
      type: 'number',
      description: 'Decimal value of the marker, for sorting. e.g. "xi" → 11. Set manually for now.',
      validation: (r) => r.required().integer().positive(),
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
    select: { marker: 'marker', body: 'body' },
    prepare({ marker, body }) {
      const firstBlock = Array.isArray(body)
        ? body.find((b: { _type?: string; children?: { text?: string }[] }) => b._type === 'block')
        : null
      const excerpt = firstBlock?.children?.map((c: { text?: string }) => c.text).join(' ').slice(0, 80) ?? ''
      return { title: `[${marker}]`, subtitle: excerpt }
    },
  },
  orderings: [
    { title: 'Sequence', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
