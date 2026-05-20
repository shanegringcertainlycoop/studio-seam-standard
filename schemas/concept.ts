import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'concept',
  title: 'Concept',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Concept number',
      type: 'number',
      description: '1 through 8 (sequential across all pillars)',
      validation: (r) => r.required().integer().min(1).max(8),
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      description: 'Two-letter code used in activity IDs, e.g. "IA", "TG", "CI", "SI", "SJ", "IN", "HR", "HS"',
      validation: (r) => r.required().length(2),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'pillar',
      title: 'Pillar',
      type: 'reference',
      to: [{ type: 'pillar' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary / narrative context',
      type: 'array',
      of: [{ type: 'richText' }],
    }),
  ],
  preview: {
    select: { title: 'title', number: 'number', code: 'code' },
    prepare({ title, number, code }) {
      return { title: `Concept ${number}. ${title}`, subtitle: code }
    },
  },
})
