import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'guidanceImage',
  title: 'Guidance: image / diagram',
  type: 'object',
  description: 'Embedded diagram or chart (e.g. HRa1.2 p.240 risk-prioritization matrix).',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: { alt: 'alt', media: 'image' },
    prepare({ alt, media }) {
      return { title: alt || 'Image', media }
    },
  },
})
