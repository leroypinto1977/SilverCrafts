// Sanity Data Fetching Functions for SilverCrafts

import { client } from "./sanity";
import {
  PRODUCTS_QUERY,
  FEATURED_PRODUCTS_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  RELATED_PRODUCTS_QUERY,
  CATEGORIES_QUERY,
  MATERIALS_QUERY,
  COLLECTIONS_QUERY,
  SEARCH_PRODUCTS_QUERY,
} from "./sanity.queries";
import {
  SanityProduct,
  ProductListItem,
  SanityCategory,
  SanityMaterial,
  SanityCollection,
  ProductFilters,
} from "./sanity.types";

// Fetch all products with caching
export async function getProducts(): Promise<ProductListItem[]> {
  try {
    return await client.fetch(PRODUCTS_QUERY, {}, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return fallback data if Sanity is unavailable
    return [];
  }
}

// Fetch featured products
export async function getFeaturedProducts(): Promise<ProductListItem[]> {
  try {
    return await client.fetch(FEATURED_PRODUCTS_QUERY);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

// Fetch products by category
export async function getProductsByCategory(
  categorySlug: string
): Promise<ProductListItem[]> {
  try {
    return await client.fetch(PRODUCTS_BY_CATEGORY_QUERY, { categorySlug });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

// Fetch single product by slug
export async function getProductBySlug(
  slug: string
): Promise<SanityProduct | null> {
  try {
    return await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

// Fetch related products
export async function getRelatedProducts(
  categorySlug: string,
  currentSlug: string
): Promise<ProductListItem[]> {
  try {
    return await client.fetch(RELATED_PRODUCTS_QUERY, {
      categorySlug,
      currentSlug,
    });
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

// Fetch all categories
export async function getCategories(): Promise<SanityCategory[]> {
  try {
    return await client.fetch(CATEGORIES_QUERY);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Fetch all materials
export async function getMaterials(): Promise<SanityMaterial[]> {
  try {
    return await client.fetch(MATERIALS_QUERY);
  } catch (error) {
    console.error("Error fetching materials:", error);
    return [];
  }
}

// Fetch all collections
export async function getCollections(): Promise<SanityCollection[]> {
  try {
    return await client.fetch(COLLECTIONS_QUERY);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
}

// Search products
export async function searchProducts(
  searchTerm: string
): Promise<ProductListItem[]> {
  try {
    return await client.fetch(SEARCH_PRODUCTS_QUERY, { searchTerm });
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

// Filter products (client-side filtering for complex filters)
export function filterProducts(
  products: ProductListItem[],
  filters: ProductFilters
): ProductListItem[] {
  return products.filter((product) => {
    // Category filter
    if (filters.category && product.category.slug !== filters.category) {
      return false;
    }

    // Weight range filter
    if (filters.weightRange) {
      const [minWeight, maxWeight] = filters.weightRange;
      if (product.maxWeight < minWeight || product.minWeight > maxWeight) {
        return false;
      }
    }

    // Availability filter
    if (filters.availability && filters.availability !== "all") {
      const hasAvailableVariants = product.variants.some(
        (variant) => variant.status === "available"
      );
      if (filters.availability === "available" && !hasAvailableVariants) {
        return false;
      }
      if (filters.availability === "out_of_stock" && hasAvailableVariants) {
        return false;
      }
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(searchLower);
      const categoryMatch = product.category.name
        .toLowerCase()
        .includes(searchLower);
      const descriptionMatch =
        product.shortDescription?.toLowerCase().includes(searchLower) || false;

      if (!nameMatch && !categoryMatch && !descriptionMatch) {
        return false;
      }
    }

    return true;
  });
}

// Sort products
export function sortProducts(
  products: ProductListItem[],
  sortBy: "name" | "weight" | "variants"
): ProductListItem[] {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "weight":
        return a.minWeight - b.minWeight;
      case "variants":
        return b.variantCount - a.variantCount;
      default:
        return 0;
    }
  });
}
