import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'calculation',
  title: 'Calculation',
  type: 'object',
  description: 'Indicator calculation. Three modes: single (one step + one formula), multi-step (sequential steps), multi-scenario (parallel scenarios each with their own formula).',
  fields: [
    defineField({
      name: 'mode',
      title: 'Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Single', value: 'single' },
          { title: 'Multi-step', value: 'multi-step' },
          { title: 'Multi-scenario', value: 'multi-scenario' },
        ],
        layout: 'radio',
      },
      initialValue: 'single',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{ type: 'calculationStep' }],
      description: 'Used for "single" (one step) and "multi-step" (multiple sequential steps).',
      hidden: ({ parent }) => parent?.mode === 'multi-scenario',
    }),
    defineField({
      name: 'scenarios',
      title: 'Scenarios',
      type: 'array',
      of: [{ type: 'calculationScenario' }],
      description: 'Used for "multi-scenario" (e.g. IAa2.4: "No Grievances Filed" vs "Grievances Filed"). Each scenario has its own steps + formula.',
      hidden: ({ parent }) => parent?.mode !== 'multi-scenario',
    }),
  ],
})
