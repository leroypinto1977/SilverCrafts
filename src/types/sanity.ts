import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

export interface Material {
  _id: string;
  _type: "material";
  name: string;
  description?: string;
  properties?: string[];
  careInstructions?: string;
}

export interface Category {
  _id: string;
  _type: "category";
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  image?: SanityImage;
  parentCategory?: Category;
}

export interface Collection {
  _id: string;
  _type: "collection";
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  image?: SanityImage;
  featured?: boolean;
}

export interface Product {
  _id: string;
  _type: "product";
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  shortDescription?: string;
  images?: SanityImage[];
  category?: Category;
  collection?: Collection;
  materials?: Material[];
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    weight?: number;
    unit?: "cm" | "mm" | "inch";
    weightUnit?: "g" | "kg" | "oz" | "lb";
  };
  weight?: {
    value: number;
    unit: "g" | "kg" | "oz" | "lb";
  };
  features?: string[];
  craftingTechnique?: string;
  origin?: string;
  artisan?: string;
  careInstructions?: string | string[];
  specifications?: {
    key: string;
    value: string;
  }[];
  featured?: boolean;
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  _id: string;
  _type: "testimonial";
  customerName: string;
  content: string;
  rating?: number;
  location?: string;
  image?: SanityImage;
  product?: Product;
  featured?: boolean;
}

export interface Page {
  _id: string;
  _type: "page";
  title: string;
  slug: {
    current: string;
  };
  content?: any[]; // Rich text content
  seo?: {
    title?: string;
    description?: string;
    image?: SanityImage;
  };
}
