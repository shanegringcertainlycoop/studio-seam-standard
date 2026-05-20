import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'scoring',
  title: 'Scoring',
  type: 'object',
  fields: [
    defineField({
      name: 'outcomeThreshold',
      title: 'Outcome threshold (optional)',
      type: 'array',
      of: [{ type: 'richText' }],
      description: 'Some activities state a target threshold (e.g. "seventy-five percent (75%)"). Others have multi-paragraph rationale (HRa1.3).',
    }),
    defineField({
      name: 'eligibility',
      title: 'Eligibility precondition (optional)',
      type: 'array',
      of: [{ type: 'richText' }],
      description: 'e.g. "Requirements #1 through #5 must be satisfied to be eligible for points."',
    }),
    defineField({
      name: 'mode',
      title: 'Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Single rubric', value: 'single' },
          { title: 'Multi-scenario (matches indicator scenarios)', value: 'multi-scenario' },
        ],
        layout: 'radio',
      },
      initialValue: 'single',
    }),
    defineField({
      name: 'pointsAssignment',
      title: 'Points assignment',
      type: 'scoringRubric',
      hidden: ({ parent }) => parent?.mode === 'multi-scenario',
    }),
    defineField({
      name: 'scenarios',
      title: 'Scenarios',
      type: 'array',
      of: [{ type: 'scoringScenario' }],
      hidden: ({ parent }) => parent?.mode !== 'multi-scenario',
    }),
    defineField({
      name: 'additionalPointsAssignment',
      title: 'Additional points assignment (bonus, optional)',
      type: 'scoringRubric',
    }),
    defineField({
      name: 'additionalPointsEligibility',
      title: 'Additional points eligibility (optional)',
      type: 'array',
      of: [{ type: 'richText' }],
      description: 'Optional eligibility statement for the additional points (e.g. "These points are only assigned if all points in the Points assignment section are earned").',
      hidden: ({ parent }) => !parent?.additionalPointsAssignment,
    }),
    defineField({
      name: 'additionalPointsLogic',
      title: 'Additional points logic',
      type: 'string',
      options: {
        list: [
          { title: 'Independent (sum all that apply)', value: 'sum' },
          { title: 'OR (choose one)', value: 'or' },
        ],
        layout: 'radio',
      },
      initialValue: 'sum',
      description: 'Some activities (e.g. SJa1.1) use OR semantics: pick +1 OR +2, not both.',
      hidden: ({ parent }) => !parent?.additionalPointsAssignment,
    }),
    defineField({
      name: 'notes',
      title: 'Notes (rendered after the rubric)',
      type: 'array',
      of: [{ type: 'richText' }],
      description: 'Optional "Note:" callout that appears after the points assignment table (e.g. IAa3.1).',
    }),
  ],
})
