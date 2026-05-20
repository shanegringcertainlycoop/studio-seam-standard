import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pillar',
  title: 'Pillar',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Pillar number',
      type: 'number',
      description: '1 through 4',
      validation: (r) => r.required().integer().min(1).max(4),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Social Impact"',
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
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent color (CSS variable name)',
      type: 'string',
      description: 'e.g. "gold-400" — used for the pillar label in the page footer',
    }),
    defineField({
      name: 'iconUrl',
      title: 'Icon URL',
      type: 'url',
      description: 'External URL of the pillar icon (e.g. https://seamcertification.org/images/social-impact/bridge.png).',
    }),
  ],
  preview: {
    select: { title: 'title', number: 'number' },
    prepare({ title, number }) {
      return { title: `${number}. ${title}`, subtitle: 'Pillar' }
    },
  },
  orderings: [
    {
      title: 'Pillar number',
      name: 'numberAsc',
      by: [{ field: 'number', direction: 'asc' }],
    },
  ],
})
