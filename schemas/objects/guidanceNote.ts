import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'guidanceNote',
  title: 'Guidance: note',
  type: 'object',
  description: 'Boxed note callout (e.g. SJa1.3 "Note: This clause is not legal advice...").',
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'richText' }],
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { body: 'body' },
    prepare({ body }) {
      const firstBlock = Array.isArray(body)
        ? body.find((b: { _type?: string; children?: { text?: string }[] }) => b._type === 'block')
        : null
      const excerpt = firstBlock?.children?.map((c: { text?: string }) => c.text).join(' ').slice(0, 80) ?? ''
      return { title: 'Note', subtitle: excerpt }
    },
  },
})
