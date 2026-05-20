import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'documentationTemplate',
  title: 'Documentation template',
  type: 'object',
  description: 'Structured table template that owners fill in as evidence (e.g. SJa1.1 Tables 1–4).',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Table 1: Policies and Communication"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (r) => r.required().min(2),
    }),
    defineField({
      name: 'exampleRows',
      title: 'Example rows',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'cells',
              title: 'Cells (in column order)',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (r) => r.required(),
            },
          ],
          preview: {
            select: { cells: 'cells' },
            prepare({ cells }) {
              const text = Array.isArray(cells) ? cells.join(' | ') : ''
              return { title: text.slice(0, 80) || '(empty row)' }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'footnote',
      title: 'Footnote (e.g. "*Calculated by adding…")',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
