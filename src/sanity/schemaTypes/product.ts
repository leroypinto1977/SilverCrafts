import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: 'Base product name (e.g., "Plain Bowl")',
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variants",
      title: "Product Variants",
      type: "array",
      of: [
        {
          type: "object",
          name: "variant",
          title: "Variant",
          fields: [
            {
              name: "weightGrams",
              title: "Weight (Grams)",
              type: "number",
              validation: (Rule) => Rule.required().positive(),
              description: "From CSV: Weight (Grams) column",
            },
            {
              name: "heightInches",
              title: "Height (Inches)",
              type: "number",
              description: "From CSV: Height (Inches) column",
            },
            {
              name: "diameterInches",
              title: "Diameter (Inches)",
              type: "number",
              description: "From CSV: Diameter (Inches) column",
            },
            {
              name: "lengthInches",
              title: "Length (Inches)",
              type: "number",
              description: "From CSV: Length (inches) column",
            },
            {
              name: "status",
              title: "Status",
              type: "string",
              options: {
                list: [
                  { title: "Available", value: "available" },
                  { title: "Out of Stock", value: "out_of_stock" },
                  { title: "Coming Soon", value: "coming_soon" },
                ],
              },
              initialValue: "available",
              description: "From CSV: Status column",
            },
            {
              name: "notes",
              title: "Variant Notes",
              type: "text",
              description: "From CSV: Notes column - specific to this variant",
            },
          ],
          preview: {
            select: {
              weight: "weightGrams",
              status: "status",
              height: "heightInches",
              diameter: "diameterInches",
              length: "lengthInches",
            },
            prepare(selection) {
              const { weight, status, height, diameter, length } = selection;
              const dimensions = [];
              if (height) dimensions.push(`H: ${height}"`);
              if (diameter) dimensions.push(`D: ${diameter}"`);
              if (length) dimensions.push(`L: ${length}"`);
              const dimensionStr =
                dimensions.length > 0 ? ` (${dimensions.join(", ")})` : "";

              return {
                title: `${weight}g${dimensionStr}`,
                subtitle: status || "available",
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("At least one variant is required"),
      description: "Different weight/size options for this product",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Brief description for product cards",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
      description: "From CSV: Category column",
    }),
    defineField({
      name: "materials",
      title: "Materials",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "material" }],
        },
      ],
    }),
    defineField({
      name: "collections",
      title: "Collections",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "collection" }],
        },
      ],
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      description: "Show this product in featured sections",
      initialValue: false,
    }),
    defineField({
      name: "available",
      title: "Available",
      type: "boolean",
      description: "Is this product available for display",
      initialValue: true,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "shortDescription",
      media: "images.0",
      variants: "variants",
    },
    prepare(selection) {
      const { title, subtitle, media, variants } = selection;
      const variantCount = variants?.length || 0;
      let variantInfo = "";

      if (variants && variants.length > 0) {
        const weights = variants.map((v: any) => v.weightGrams).filter(Boolean);
        if (weights.length > 1) {
          variantInfo = `${Math.min(...weights)}g - ${Math.max(...weights)}g`;
        } else if (weights.length === 1) {
          variantInfo = `${weights[0]}g`;
        }
      }

      return {
        title,
        subtitle:
          subtitle ||
          `${variantCount} variant${variantCount !== 1 ? "s" : ""} (${variantInfo})`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Published Date, New",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
