import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'scoringRubric',
  title: 'Scoring rubric',
  type: 'object',
  fields: [
    defineField({
      name: 'criterionLabel',
      title: 'Criterion column label',
      type: 'string',
      description: 'The right-column header (e.g. "Percentage of Impacted Parties Informed", "Percentage Diverse Tenants").',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'bands',
      title: 'Bands',
      type: 'array',
      of: [{ type: 'scoringBand' }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { label: 'criterionLabel', bands: 'bands' },
    prepare({ label, bands }) {
      const count = Array.isArray(bands) ? bands.length : 0
      return { title: label || 'Rubric', subtitle: `${count} band${count === 1 ? '' : 's'}` }
    },
  },
})
