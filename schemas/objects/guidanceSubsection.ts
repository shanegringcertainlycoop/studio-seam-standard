import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'guidanceSubsection',
  title: 'Guidance: subsection',
  type: 'object',
  description: 'Standard "On X" guidance subsection with an orange heading and rich body.',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'e.g. "On relevant studies", "On responsible communication characteristics"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headingFootnote',
      title: 'Heading footnote (optional)',
      type: 'reference',
      to: [{ type: 'bibliographyEntry' }, { type: 'editorialNote' }],
      description: 'Optional superscript marker next to the heading (e.g. "On scoping the likely impacts¹⁸").',
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
      return { title: heading, subtitle: 'Guidance · subsection' }
    },
  },
})
