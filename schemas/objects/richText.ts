import { defineType, defineArrayMember } from 'sanity'

/**
 * Base rich-text block type used everywhere prose appears.
 * Carries the three custom inline annotations the standard relies on:
 *  - bibliographyRef  → numbered superscript citation
 *  - editorialNoteRef → lowercase-roman superscript editorial note
 *  - activityRef      → cross-link to another activity by activityId
 */
export default defineType({
  name: 'richText',
  title: 'Rich text block',
  type: 'block',
  styles: [
    { title: 'Body', value: 'normal' },
    { title: 'Heading', value: 'h3' },
    { title: 'Subheading', value: 'h4' },
  ],
  lists: [
    { title: 'Bullet', value: 'bullet' },
    { title: 'Numbered', value: 'number' },
  ],
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
      { title: 'Underline', value: 'underline' },
    ],
    annotations: [
      defineArrayMember({
        name: 'link',
        type: 'object',
        title: 'External link',
        fields: [
          { name: 'href', type: 'url', title: 'URL', validation: (r) => r.required() },
        ],
      }),
      defineArrayMember({
        name: 'bibliographyRef',
        type: 'object',
        title: 'Bibliography citation',
        fields: [
          {
            name: 'entry',
            type: 'reference',
            to: [{ type: 'bibliographyEntry' }],
            validation: (r) => r.required(),
          },
        ],
      }),
      defineArrayMember({
        name: 'editorialNoteRef',
        type: 'object',
        title: 'Editorial note',
        fields: [
          {
            name: 'note',
            type: 'reference',
            to: [{ type: 'editorialNote' }],
            validation: (r) => r.required(),
          },
        ],
      }),
      defineArrayMember({
        name: 'activityRef',
        type: 'object',
        title: 'Activity cross-reference',
        fields: [
          {
            name: 'activity',
            type: 'reference',
            to: [{ type: 'activity' }],
            validation: (r) => r.required(),
          },
        ],
      }),
      defineArrayMember({
        name: 'requirementRef',
        type: 'object',
        title: 'Requirement cross-reference (within this activity)',
        description: 'Renders as "(appears in Requirement N)" style links.',
        fields: [
          { name: 'requirementNumber', type: 'number', title: 'Requirement number', validation: (r) => r.required() },
          { name: 'subItem', type: 'string', title: 'Sub-item (optional, e.g. "b")' },
        ],
      }),
    ],
  },
})
