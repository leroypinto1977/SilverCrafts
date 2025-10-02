import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'From CSV: Product Name column',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'weightGrams',
      title: 'Weight (Grams)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
      description: 'From CSV: Weight (Grams) column',
    }),
    defineField({
      name: 'heightInches',
      title: 'Height (Inches)',
      type: 'number',
      description: 'From CSV: Height (Inches) column',
    }),
    defineField({
      name: 'diameterInches',
      title: 'Diameter (Inches)',
      type: 'number',
      description: 'From CSV: Diameter (Inches) column',
    }),
    defineField({
      name: 'lengthInches',
      title: 'Length (Inches)',
      type: 'number',
      description: 'From CSV: Length (inches) column',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'From CSV: Status column',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'From CSV: Notes column',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for product cards',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
      description: 'From CSV: Category column',
    }),
    defineField({
      name: 'materials',
      title: 'Materials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'material' }],
        },
      ],
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'collection' }],
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Show this product in featured sections',
      initialValue: false,
    }),
    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      description: 'Is this product available for display',
      initialValue: true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'shortDescription',
      media: 'images.0',
      weight: 'weightGrams',
    },
    prepare(selection) {
      const { title, subtitle, media, weight } = selection
      return {
        title,
        subtitle: subtitle || `${weight}g`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Weight (Light to Heavy)',
      name: 'weightAsc',
      by: [{ field: 'weightGrams', direction: 'asc' }],
    },
    {
      title: 'Weight (Heavy to Light)',
      name: 'weightDesc',
      by: [{ field: 'weightGrams', direction: 'desc' }],
    },
    {
      title: 'Published Date, New',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})