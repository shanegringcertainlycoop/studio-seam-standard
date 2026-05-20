import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'objective',
  title: 'Objective',
  type: 'document',
  fields: [
    defineField({
      name: 'objectiveCode',
      title: 'Objective code',
      type: 'string',
      description: 'Full code, e.g. "IA01", "TG03", "SJ04"',
      validation: (r) => r.required().regex(/^[A-Z]{2}[0-9]{2}$/, { name: 'objective code (e.g. IA01)' }),
    }),
    defineField({
      name: 'number',
      title: 'Number within concept',
      type: 'number',
      description: 'e.g. for IA02, this is 2',
      validation: (r) => r.required().integer().min(1),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Contextual Analysis"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'concept',
      title: 'Concept',
      type: 'reference',
      to: [{ type: 'concept' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headlineGoal',
      title: 'Headline goal',
      type: 'text',
      rows: 2,
      description: 'The bold sentence that introduces the objective (e.g. "Ensure that impacted parties\' views, concerns, and values are considered to increase their well-being.")',
    }),
    defineField({
      name: 'narrative',
      title: 'Narrative context',
      type: 'array',
      of: [{ type: 'richText' }],
    }),
  ],
  preview: {
    select: { title: 'title', code: 'objectiveCode' },
    prepare({ title, code }) {
      return { title: `${code}. ${title}`, subtitle: 'Objective' }
    },
  },
})
