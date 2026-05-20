import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'calculationScenario',
  title: 'Calculation scenario',
  type: 'object',
  description: 'A named scenario (e.g. "Scenario 1: No Grievances Filed") with its own indicators and steps.',
  fields: [
    defineField({
      name: 'label',
      title: 'Scenario label',
      type: 'string',
      description: 'e.g. "Scenario 1: No Grievances Filed"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (which indicators apply, etc.)',
      type: 'array',
      of: [{ type: 'richText' }],
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{ type: 'calculationStep' }],
    }),
  ],
  preview: {
    select: { label: 'label' },
  },
})
