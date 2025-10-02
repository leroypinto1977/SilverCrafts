import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Silvercrafts Content")
    .items([
      // Products section
      S.listItem()
        .title("Products")
        .child(
          S.list()
            .title("Product Management")
            .items([
              S.listItem()
                .title("All Products")
                .child(S.documentTypeList("product").title("All Products")),
              S.listItem()
                .title("Featured Products")
                .child(
                  S.documentList()
                    .title("Featured Products")
                    .filter('_type == "product" && featured == true')
                ),
              S.listItem()
                .title("Available Products")
                .child(
                  S.documentList()
                    .title("Available Products")
                    .filter('_type == "product" && isAvailable == true')
                ),
            ])
        ),

      // Catalog organization
      S.listItem()
        .title("Catalog Organization")
        .child(
          S.list()
            .title("Categories & Collections")
            .items([
              S.listItem()
                .title("Categories")
                .child(S.documentTypeList("category").title("Categories")),
              S.listItem()
                .title("Collections")
                .child(S.documentTypeList("collection").title("Collections")),
              S.listItem()
                .title("Materials")
                .child(S.documentTypeList("material").title("Materials")),
            ])
        ),

      // Content management
      S.listItem()
        .title("Content Management")
        .child(
          S.list()
            .title("Site Content")
            .items([
              S.listItem()
                .title("Pages")
                .child(S.documentTypeList("page").title("Pages")),
              S.listItem()
                .title("Testimonials")
                .child(S.documentTypeList("testimonial").title("Testimonials")),
              S.listItem()
                .title("Featured Testimonials")
                .child(
                  S.documentList()
                    .title("Featured Testimonials")
                    .filter('_type == "testimonial" && featured == true')
                ),
            ])
        ),

      // Divider
      S.divider(),

      // All document types (fallback)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "product",
            "category",
            "collection",
            "material",
            "page",
            "testimonial",
          ].includes(listItem.getId()!)
      ),
    ]);
