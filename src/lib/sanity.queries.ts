// Sanity Queries for SilverCrafts Products with Variants

import { groq } from "next-sanity";

// Query for listing all products with basic info
export const PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(name asc) {
    _id,
    name,
    slug,
    category->{
      name,
      slug
    },
    shortDescription,
    images,
    variants,
    featured,
    available,
    "minWeight": min(variants[].weightGrams),
    "maxWeight": max(variants[].weightGrams),
    "variantCount": count(variants)
  }
`;

// Query for featured products
export const FEATURED_PRODUCTS_QUERY = groq`
  *[_type == "product" && featured == true] | order(name asc) [0...8] {
    _id,
    name,
    slug,
    category->{
      name,
      slug
    },
    shortDescription,
    images,
    variants,
    "minWeight": min(variants[].weightGrams),
    "maxWeight": max(variants[].weightGrams),
    "variantCount": count(variants)
  }
`;

// Query for products by category
export const PRODUCTS_BY_CATEGORY_QUERY = groq`
  *[_type == "product" && category->slug.current == $categorySlug] | order(name asc) {
    _id,
    name,
    slug,
    category->{
      name,
      slug
    },
    shortDescription,
    images,
    variants,
    available,
    "minWeight": min(variants[].weightGrams),
    "maxWeight": max(variants[].weightGrams),
    "variantCount": count(variants)
  }
`;

// Query for single product by slug
export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    shortDescription,
    category->{
      name,
      slug,
      description
    },
    materials[]->{
      name,
      slug,
      description,
      purity
    },
    collections[]->{
      name,
      slug,
      description
    },
    variants,
    images,
    featured,
    available,
    tags,
    _createdAt,
    _updatedAt,
    "minWeight": min(variants[].weightGrams),
    "maxWeight": max(variants[].weightGrams),
    "variantCount": count(variants)
  }
`;

// Query for related products (same category, different product)
export const RELATED_PRODUCTS_QUERY = groq`
  *[_type == "product" && category->slug.current == $categorySlug && slug.current != $currentSlug] | order(name asc) [0...6] {
    _id,
    name,
    slug,
    category->{
      name,
      slug
    },
    shortDescription,
    images,
    variants,
    "minWeight": min(variants[].weightGrams),
    "maxWeight": max(variants[].weightGrams),
    "variantCount": count(variants)
  }
`;

// Query for all categories
export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    "productCount": count(*[_type == "product" && references(^._id)])
  }
`;

// Query for all materials
export const MATERIALS_QUERY = groq`
  *[_type == "material"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    purity,
    "productCount": count(*[_type == "product" && references(^._id)])
  }
`;

// Query for all collections
export const COLLECTIONS_QUERY = groq`
  *[_type == "collection"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    "productCount": count(*[_type == "product" && references(^._id)])
  }
`;

// Search query for products
export const SEARCH_PRODUCTS_QUERY = groq`
  *[_type == "product" && (
    name match $searchTerm + "*" ||
    category->name match $searchTerm + "*" ||
    description match $searchTerm + "*" ||
    tags[] match $searchTerm + "*"
  )] | order(name asc) {
    _id,
    name,
    slug,
    category->{
      name,
      slug
    },
    shortDescription,
    images,
    variants,
    available,
    "minWeight": min(variants[].weightGrams),
    "maxWeight": max(variants[].weightGrams),
    "variantCount": count(variants)
  }
`;
