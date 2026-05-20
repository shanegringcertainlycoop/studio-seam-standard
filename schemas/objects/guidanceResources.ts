import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'guidanceResources',
  title: 'Guidance: additional resources',
  type: 'object',
  description: 'Bulleted list of external resources/tools/links.',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Additional Resources',
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label', validation: (r) => r.required() },
            { name: 'description', type: 'array', of: [{ type: 'richText' }], title: 'Description' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
          preview: {
            select: { label: 'label', url: 'url' },
            prepare({ label, url }) {
              return { title: label, subtitle: url }
            },
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { heading: 'heading', resources: 'resources' },
    prepare({ heading, resources }) {
      const count = Array.isArray(resources) ? resources.length : 0
      return { title: heading, subtitle: `${count} resource${count === 1 ? '' : 's'}` }
    },
  },
})
