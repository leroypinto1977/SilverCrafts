import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerTitle',
      title: 'Customer Title/Company',
      type: 'string',
      description: 'e.g., "CEO of Company Name" or "Professional Chef"',
    }),
    defineField({
      name: 'testimonialText',
      title: 'Testimonial Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'customerPhoto',
      title: 'Customer Photo',
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
      ],
    }),
    defineField({
      name: 'productPurchased',
      title: 'Product Purchased',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'The product this testimonial is about',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Should this testimonial be featured prominently?',
      initialValue: false,
    }),
    defineField({
      name: 'dateReceived',
      title: 'Date Received',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'verified',
      title: 'Verified Purchase',
      type: 'boolean',
      description: 'Is this from a verified customer?',
      initialValue: true,
    }),
    defineField({
      name: 'location',
      title: 'Customer Location',
      type: 'string',
      description: 'e.g., "New York, USA" or "London, UK"',
    }),
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'testimonialText',
      media: 'customerPhoto',
      rating: 'rating',
    },
    prepare(selection) {
      const { title, subtitle, media, rating } = selection
      return {
        title,
        subtitle: `${subtitle?.substring(0, 100)}... (${rating}/5 stars)`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Date Received, New',
      name: 'dateReceivedDesc',
      by: [{ field: 'dateReceived', direction: 'desc' }],
    },
    {
      title: 'Rating, High',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [{ field: 'featured', direction: 'desc' }, { field: 'dateReceived', direction: 'desc' }],
    },
  ],
})