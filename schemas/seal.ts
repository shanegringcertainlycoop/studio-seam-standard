import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seal',
  title: 'SEAL',
  type: 'document',
  description: 'A thematic collection of SEAM activities. Like a curated playlist — pick a SEAL to focus the standard view on a single theme.',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. "Ethical Procurement SEAL"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order on the /seals index.',
      initialValue: 0,
    }),
    defineField({
      name: 'summary',
      title: 'Short summary',
      type: 'text',
      rows: 2,
      description: 'One-line description shown on the /seals index and in the Product dropdown.',
    }),
    defineField({
      name: 'body',
      title: 'Description',
      type: 'array',
      of: [{ type: 'richText' }],
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent color (Tailwind token name)',
      type: 'string',
      description: 'e.g. "seam-700" — used as the chip color on activity headers and in the nav.',
    }),
    defineField({
      name: 'activities',
      title: 'Activities in this SEAL',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'activity' }] }],
      validation: (r) => r.unique(),
    }),
  ],
  preview: {
    select: { title: 'name', count: 'activities' },
    prepare({ title, count }) {
      const n = Array.isArray(count) ? count.length : 0
      return { title, subtitle: `${n} activit${n === 1 ? 'y' : 'ies'}` }
    },
  },
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Name', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
})
