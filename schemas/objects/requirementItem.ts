import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'requirementItem',
  title: 'Requirement item',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      type: 'number',
      description: 'Sequential numbering across all requirements in this activity (e.g. 1, 2, 3...). Sub-items live in the sub-items array.',
      validation: (r) => r.required().integer().positive(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'richText' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subItems',
      title: 'Sub-items (a, b, c...)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'letter', type: 'string', title: 'Letter (a, b, c...)', validation: (r) => r.required() },
            { name: 'body', type: 'array', of: [{ type: 'richText' }], validation: (r) => r.required() },
          ],
          preview: {
            select: { letter: 'letter', body: 'body' },
            prepare({ letter, body }) {
              const firstBlock = Array.isArray(body)
                ? body.find((b: { _type?: string; children?: { text?: string }[] }) => b._type === 'block')
                : null
              const excerpt = firstBlock?.children?.map((c: { text?: string }) => c.text).join(' ').slice(0, 80) ?? ''
              return { title: `${letter}. ${excerpt}` }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { number: 'number', body: 'body' },
    prepare({ number, body }) {
      const firstBlock = Array.isArray(body)
        ? body.find((b: { _type?: string; children?: { text?: string }[] }) => b._type === 'block')
        : null
      const excerpt = firstBlock?.children?.map((c: { text?: string }) => c.text).join(' ').slice(0, 80) ?? ''
      return { title: `${String(number ?? '?').padStart(2, '0')}. ${excerpt}` }
    },
  },
})
