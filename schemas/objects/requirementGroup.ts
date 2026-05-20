import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'requirementGroup',
  title: 'Requirement group',
  type: 'object',
  description: 'A group of requirements optionally headed by an impact-section label (e.g. "Act to Avoid Harm").',
  fields: [
    defineField({
      name: 'heading',
      title: 'Group heading',
      type: 'string',
      description: 'Common values: "Act to Avoid Harm", "Benefit Impacted Parties", "Contribute to Solutions", or a combined heading. Leave blank for ungrouped requirements.',
      options: {
        list: [
          { title: 'Act to Avoid Harm', value: 'Act to Avoid Harm' },
          { title: 'Benefit Impacted Parties', value: 'Benefit Impacted Parties' },
          { title: 'Contribute to Solutions', value: 'Contribute to Solutions' },
          { title: 'Benefit Impacted Parties + Contribute to Solutions', value: 'Benefit Impacted Parties + Contribute to Solutions' },
        ],
      },
    }),
    defineField({
      name: 'headingFootnote',
      title: 'Heading footnote (optional)',
      type: 'reference',
      to: [{ type: 'bibliographyEntry' }, { type: 'editorialNote' }],
      description: 'Optional superscript marker on the group heading (e.g. "Act to Avoid Harm²⁰").',
    }),
    defineField({
      name: 'items',
      title: 'Requirement items',
      type: 'array',
      of: [{ type: 'requirementItem' }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { heading: 'heading', items: 'items' },
    prepare({ heading, items }) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: heading || '(ungrouped)',
        subtitle: `${count} requirement${count === 1 ? '' : 's'}`,
      }
    },
  },
})
