import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'scoringBand',
  title: 'Scoring band',
  type: 'object',
  fields: [
    defineField({
      name: 'pointsLabel',
      title: 'Points label',
      type: 'string',
      description: 'e.g. "1 point", "3 points", "+1 point", "REQUIREMENT MET", "0 points".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'criterion',
      title: 'Criterion',
      type: 'string',
      description: 'e.g. "50% impacted parties informed", "13–19% diverse Tenants".',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { points: 'pointsLabel', criterion: 'criterion' },
    prepare({ points, criterion }) {
      return { title: `${points} — ${criterion}` }
    },
  },
})
