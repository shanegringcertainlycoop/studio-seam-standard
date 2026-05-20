import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ratingSystemApplication',
  title: 'Rating System Application',
  type: 'object',
  description: 'Which rating systems this activity applies to. CD (Community Development) is reserved for future use.',
  fields: [
    defineField({
      name: 'bi_developer',
      title: 'B+I:D — Buildings + Interiors: Developer',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'bi_occupier',
      title: 'B+I:O — Buildings + Interiors: Occupier',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'om_developer',
      title: 'O+M:D — Operations + Maintenance: Developer',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'om_occupier',
      title: 'O+M:O — Operations + Maintenance: Occupier',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'cd',
      title: 'CD — Community Development (future)',
      type: 'boolean',
      initialValue: false,
      readOnly: true,
    }),
  ],
  options: { columns: 2 },
})
