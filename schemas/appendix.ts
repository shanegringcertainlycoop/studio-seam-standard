import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'appendix',
  title: 'Appendix',
  type: 'document',
  description: 'Appendices A–E (SDGs alignment, Referenced Source descriptions, Contributors, Survey, Logic Model Guide).',
  fields: [
    defineField({
      name: 'code',
      title: 'Appendix code',
      type: 'string',
      description: 'A, B, C, D, or E',
      validation: (r) => r.required().length(1),
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
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'richText' }],
    }),
  ],
  preview: {
    select: { code: 'code', title: 'title' },
    prepare({ code, title }) {
      return { title: `Appendix ${code}: ${title}` }
    },
  },
})
