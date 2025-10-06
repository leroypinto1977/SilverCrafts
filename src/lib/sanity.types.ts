// Sanity Types for SilverCrafts with Variants

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface SanityCategory {
  _id: string;
  _type: "category";
  name: string;
  slug: {
    current: string;
  };
  description?: string;
}

export interface SanityMaterial {
  _id: string;
  _type: "material";
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  purity?: number;
}

export interface SanityCollection {
  _id: string;
  _type: "collection";
  name: string;
  slug: {
    current: string;
  };
  description?: string;
}

export interface ProductVariant {
  _key: string;
  _type: "variant";
  weightGrams: number;
  heightInches?: number;
  diameterInches?: number;
  lengthInches?: number;
  status: "available" | "out_of_stock" | "discontinued";
  sku?: string;
  notes?: string;
}

export interface SanityProduct {
  _id: string;
  _type: "product";
  name: string;
  slug: {
    current: string;
  };
  category: SanityCategory;
  materials?: SanityMaterial[];
  collections?: SanityCollection[];
  variants: ProductVariant[];
  images?: SanityImage[];
  description?: string;
  shortDescription?: string;
  featured?: boolean;
  available?: boolean;
  tags?: string[];
  _createdAt: string;
  _updatedAt: string;
}

// For filtering and search
export interface ProductFilters {
  category?: string;
  material?: string;
  collection?: string;
  weightRange?: [number, number];
  search?: string;
  availability?: "available" | "out_of_stock" | "all";
}

// For product listing
export interface ProductListItem {
  _id: string;
  name: string;
  slug: string;
  category: {
    name: string;
    slug: string;
  };
  shortDescription?: string;
  images?: SanityImage[];
  variants: ProductVariant[];
  featured?: boolean;
  available?: boolean;
  minWeight: number;
  maxWeight: number;
  variantCount: number;
}
