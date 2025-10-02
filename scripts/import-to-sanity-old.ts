#!/usr/bin/env tsx
/**
 * Sanity Import Script for SilverCrafts CSV Product Data
 *
 * This script imports the authentic South Indian silvercraft product catalog
 * parsed from the CSV file into Sanity CMS.
 *
 * Usage: npm run import-sanity
 */

import dotenv from "dotenv";
import { createClient } from "@sanity/client";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

import {
  silverCraftsCategories,
  silverCraftsProducts,
  silverCraftsMaterials,
  silverCraftsCollections,
  silverCraftsCompleteData,
} from "../src/data/silvercrafts-complete-data";

// Debug: Check what environment variables are loaded
console.log("🔍 Checking environment variables:");
console.log("PROJECT_ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log("DATASET:", process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log("API_VERSION:", process.env.NEXT_PUBLIC_SANITY_API_VERSION);
console.log("TOKEN present:", !!process.env.SANITY_API_TOKEN);

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error(
    "❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID in environment variables"
  );
  process.exit(1);
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.error(
    "❌ Missing NEXT_PUBLIC_SANITY_DATASET in environment variables"
  );
  process.exit(1);
}

if (!process.env.SANITY_API_TOKEN) {
  console.error("❌ Missing SANITY_API_TOKEN in environment variables");
  console.error("Please add SANITY_API_TOKEN=your_token_here to .env.local");
  process.exit(1);
}

// Create a client with write permissions
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-09-29",
  token: process.env.SANITY_API_TOKEN, // Using the API token from .env.local
  useCdn: false, // We want fresh data for imports
});

interface ImportResult {
  type: string;
  count: number;
  success: boolean;
  ids: string[];
  errors: any[];
}

// Product category mapping based on names
// Helper function to convert string to Sanity block content
function stringToBlockContent(text: string) {
  return [
    {
      _type: "block",
      _key: `block-${Date.now()}`,
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: `span-${Date.now()}`,
          text: text,
          marks: [],
        },
      ],
    },
  ];
}

// Helper functions for mapping data
function getProductCategory(productName: string, description: string): string {
  const name = productName.toLowerCase();

  if (name.includes("bowl")) return "bowls";
  if (name.includes("chombu")) return "chombu";
  if (name.includes("cup")) return "cups-drinkware";
  if (name.includes("glass")) return "glasses";
  if (name.includes("lamp") || name.includes("kuthuvizhaku"))
    return "lamps-lighting";
  if (name.includes("plate")) return "plates-serving";
  if (name.includes("tray")) return "trays";
  if (name.includes("coin") || name.includes("bar")) return "coins-bars";
  if (name.includes("adukku") || name.includes("chatti"))
    return "vessels-cookware";
  if (name.includes("pela")) return "simil-containers";

  return "other-items"; // default category
}

// Material mapping based on product description
const getProductMaterials = (
  productName: string,
  description: string
): string[] => {
  const text = (productName + " " + description).toLowerCase();

  if (text.includes("pure silver") || text.includes("99.9%")) {
    return ["pure-silver-999"];
  } else if (text.includes("sterling") || text.includes("92.5%")) {
    return ["sterling-silver-925"];
  }

  return ["traditional-silver-alloy"]; // default material
};

// Collection mapping based on product features
const getProductCollections = (
  productName: string,
  description: string
): string[] => {
  const text = (productName + " " + description).toLowerCase();
  const collections: string[] = [];

  if (text.includes("plain")) collections.push("plain-heritage");
  if (
    text.includes("design") ||
    text.includes("pattern") ||
    text.includes("engraved")
  )
    collections.push("hand-engraved-artistry");
  if (text.includes("matte")) collections.push("matte-finish-contemporary");
  if (
    text.includes("ceremonial") ||
    text.includes("ritual") ||
    text.includes("sacred")
  )
    collections.push("ceremonial-ritual");
  if (text.includes("daily") || text.includes("serving"))
    collections.push("daily-use-essentials");
  if (
    text.includes("coin") ||
    text.includes("bar") ||
    text.includes("investment")
  )
    collections.push("investment-grade");

  if (collections.length === 0) {
    collections.push("plain-heritage"); // default collection
  }

  return collections;
};

async function importCategories(): Promise<ImportResult> {
  console.log("🗂️  Importing Categories...");
  const result: ImportResult = {
    type: "categories",
    count: 0,
    success: true,
    ids: [],
    errors: [],
  };

  try {
    for (const category of silverCraftsCategories) {
      const doc = {
        _type: "category",
        _id: `category-${category.slug.current}`,
        name: category.name,
        slug: category.slug,
        description: category.description,
        order: category.order,
      };

      const response = await client.createOrReplace(doc);
      result.ids.push(response._id);
      result.count++;
      console.log(`   ✅ Created category: ${category.name}`);
    }
  } catch (error) {
    console.error("❌ Error importing categories:", error);
    result.success = false;
    result.errors.push(error);
  }

  return result;
}

async function importMaterials(): Promise<ImportResult> {
  console.log("🧱 Importing Materials...");
  const result: ImportResult = {
    type: "materials",
    count: 0,
    success: true,
    ids: [],
    errors: [],
  };

  try {
    for (const material of silverCraftsMaterials) {
      const doc = {
        _type: "material",
        _id: `material-${material.slug.current}`,
        name: material.name,
        slug: material.slug,
        description: material.description,
        properties: material.properties,
      };

      const response = await client.createOrReplace(doc);
      result.ids.push(response._id);
      result.count++;
      console.log(`   ✅ Created material: ${material.name}`);
    }
  } catch (error) {
    console.error("❌ Error importing materials:", error);
    result.success = false;
    result.errors.push(error);
  }

  return result;
}

async function importCollections(): Promise<ImportResult> {
  console.log("📦 Importing Collections...");
  const result: ImportResult = {
    type: "collections",
    count: 0,
    success: true,
    ids: [],
    errors: [],
  };

  try {
    for (const collection of silverCraftsCollections) {
      const doc = {
        _type: "collection",
        _id: `collection-${collection.slug.current}`,
        name: collection.name,
        slug: collection.slug,
        description: collection.description,
        featured: collection.featured,
      };

      const response = await client.createOrReplace(doc);
      result.ids.push(response._id);
      result.count++;
      console.log(`   ✅ Created collection: ${collection.name}`);
    }
  } catch (error) {
    console.error("❌ Error importing collections:", error);
    result.success = false;
    result.errors.push(error);
  }

  return result;
}

async function importProducts(): Promise<ImportResult> {
  console.log("🍴 Importing Products...");
  const result: ImportResult = {
    type: "products",
    count: 0,
    success: true,
    ids: [],
    errors: [],
  };

  try {
    for (const product of silverCraftsProducts) {
      const categorySlug = getProductCategory(
        product.name,
        product.description
      );
      const materialSlugs = getProductMaterials(
        product.name,
        product.description
      );
      const collectionSlugs = getProductCollections(
        product.name,
        product.description
      );

      const doc = {
        _type: "product",
        _id: `product-${product.slug.current}`,
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        description: stringToBlockContent(product.description),
        images: product.images,
        dimensions: product.dimensions,
        weight: product.weight,
        features: product.features,
        craftingTechnique: product.craftingTechnique,
        origin: product.origin,
        artisan: product.artisan,
        careInstructions: product.careInstructions,
        isAvailable: product.isAvailable,
        featured: product.featured,
        // Add references
        category: {
          _type: "reference",
          _ref: `category-${categorySlug}`,
        },
        materials: materialSlugs.map((materialSlug: string) => ({
          _type: "reference",
          _ref: `material-${materialSlug}`,
          _key: materialSlug,
        })),
        collections: collectionSlugs.map((collectionSlug: string) => ({
          _type: "reference",
          _ref: `collection-${collectionSlug}`,
          _key: collectionSlug,
        })),
      };

      const response = await client.createOrReplace(doc);
      result.ids.push(response._id);
      result.count++;
      console.log(
        `   ✅ Created product: ${product.name} (${product.weight.value}g) → ${categorySlug}`
      );
    }
  } catch (error) {
    console.error("❌ Error importing products:", error);
    result.success = false;
    result.errors.push(error);
  }

  return result;
}

async function main() {
  console.log("🚀 Starting SilverCrafts CSV Data Import to Sanity...");
  console.log("===============================================\n");

  // Check if we have the required environment variables
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error(
      "❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable"
    );
    process.exit(1);
  }

  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    console.error("❌ Missing NEXT_PUBLIC_SANITY_DATASET environment variable");
    process.exit(1);
  }

  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌ Missing SANITY_API_TOKEN environment variable");
    console.error("   Create a token at: https://manage.sanity.io/");
    process.exit(1);
  }

  console.log(`📊 Import Summary:`);
  console.log(
    `   Categories: ${silverCraftsCompleteData.metadata.totalCategories}`
  );
  console.log(
    `   Materials: ${silverCraftsCompleteData.metadata.totalMaterials}`
  );
  console.log(
    `   Collections: ${silverCraftsCompleteData.metadata.totalCollections}`
  );
  console.log(
    `   Products: ${silverCraftsCompleteData.metadata.totalProducts}`
  );
  console.log("");

  const results: ImportResult[] = [];

  try {
    // Import in the correct order to maintain relationships
    results.push(await importCategories());
    results.push(await importMaterials());
    results.push(await importCollections());
    results.push(await importProducts());

    // Summary
    console.log("\n📈 Import Summary:");
    console.log("==================");

    let totalSuccess = 0;
    let totalErrors = 0;

    for (const result of results) {
      if (result.success) {
        console.log(
          `✅ ${result.type}: ${result.count} items imported successfully`
        );
        totalSuccess += result.count;
      } else {
        console.log(
          `❌ ${result.type}: Failed with ${result.errors.length} errors`
        );
        totalErrors += result.errors.length;
      }
    }

    console.log("");
    console.log(`🎯 Total Success: ${totalSuccess} items`);
    if (totalErrors > 0) {
      console.log(`⚠️  Total Errors: ${totalErrors}`);
    }

    if (totalErrors === 0) {
      console.log("");
      console.log("🎉 All CSV data successfully imported to Sanity!");
      console.log("🎨 Next steps:");
      console.log("   1. Open Sanity Studio: npx sanity dev");
      console.log("   2. Upload product images");
      console.log("   3. Link images to products");
      console.log("   4. Publish your content");
    }
  } catch (error) {
    console.error("💥 Fatal error during import:", error);
    process.exit(1);
  }
}

// Error handling
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Run the import
main().catch(console.error);
