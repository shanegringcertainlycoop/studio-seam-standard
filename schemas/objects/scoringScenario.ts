import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'scoringScenario',
  title: 'Scoring scenario',
  type: 'object',
  description: 'Matches a calculation scenario (e.g. "No Grievances Filed" / "Grievances Filed").',
  fields: [
    defineField({
      name: 'label',
      title: 'Scenario label',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'rubric',
      title: 'Rubric',
      type: 'scoringRubric',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { label: 'label' },
  },
})
