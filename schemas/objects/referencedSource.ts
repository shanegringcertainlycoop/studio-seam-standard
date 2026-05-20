import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'referencedSource',
  title: 'Referenced source',
  type: 'object',
  description: 'A source cited in an activity\'s "Referenced Source" list, optionally with an inline editorial-note marker (e.g. SA8000 (2014)ˣⁱᵛ).',
  fields: [
    defineField({
      name: 'source',
      title: 'Source',
      type: 'reference',
      to: [{ type: 'bibliographyEntry' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'footnote',
      title: 'Inline editorial note (optional)',
      type: 'reference',
      to: [{ type: 'editorialNote' }],
      description: 'Editorial-note marker rendered after the citation text.',
    }),
  ],
  preview: {
    select: { citation: 'source.citation', title: 'source.title', marker: 'footnote.marker' },
    prepare({ citation, title, marker }) {
      const text = title || (citation as string)?.slice(0, 80) || 'Untitled'
      return { title: marker ? `${text} [${marker}]` : text }
    },
  },
})
