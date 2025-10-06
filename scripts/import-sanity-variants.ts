/**
 * Import Script for SilverCrafts Sanity Data with Variants
 *
 * This script imports the processed CSV data with variants structure into Sanity.
 * Run with: npm run import-sanity-variants
 */

import "dotenv/config";
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

// Configure Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

// Load processed data
const dataDir = path.join(process.cwd(), "src/data/csv-processed-variants");
const categoriesData = JSON.parse(
  fs.readFileSync(path.join(dataDir, "categories.json"), "utf-8")
);
const materialsData = JSON.parse(
  fs.readFileSync(path.join(dataDir, "materials.json"), "utf-8")
);
const collectionsData = JSON.parse(
  fs.readFileSync(path.join(dataDir, "collections.json"), "utf-8")
);
const productsData = JSON.parse(
  fs.readFileSync(path.join(dataDir, "products.json"), "utf-8")
);

console.log("🚀 Starting SilverCrafts Variants Import to Sanity...");
console.log("===============================================");
console.log();
console.log(`📊 Import Summary:`);
console.log(`   Categories: ${categoriesData.length}`);
console.log(`   Materials: ${materialsData.length}`);
console.log(`   Collections: ${collectionsData.length}`);
console.log(`   Products: ${productsData.length}`);
console.log();

// Import functions
async function importCategories() {
  console.log("🗂️  Importing Categories...");

  const mutations = categoriesData.map((category: any) => ({
    create: {
      _type: "category",
      _id: `category-${category.slug}`,
      name: category.name,
      slug: {
        _type: "slug",
        current: category.slug,
      },
      description:
        category.description ||
        `${category.name} category for traditional silvercraft items`,
    },
  }));

  try {
    const result = await client.mutate(mutations);
    console.log(`   ✅ Created ${result.length} categories`);
    return { success: true, count: result.length };
  } catch (error) {
    console.log(`   ❌ Error importing categories:`, error);
    return { success: false, error, count: 0 };
  }
}

async function importMaterials() {
  console.log("🧱 Importing Materials...");

  const mutations = materialsData.map((material: any) => ({
    create: {
      _type: "material",
      _id: `material-${material.slug}`,
      name: material.name,
      slug: {
        _type: "slug",
        current: material.slug,
      },
      description: material.description,
      purity: material.purity,
    },
  }));

  try {
    const result = await client.mutate(mutations);
    console.log(`   ✅ Created ${result.length} materials`);
    return { success: true, count: result.length };
  } catch (error) {
    console.log(`   ❌ Error importing materials:`, error);
    return { success: false, error, count: 0 };
  }
}

async function importCollections() {
  console.log("📦 Importing Collections...");

  const mutations = collectionsData.map((collection: any) => ({
    create: {
      _type: "collection",
      _id: `collection-${collection.slug}`,
      name: collection.name,
      slug: {
        _type: "slug",
        current: collection.slug,
      },
      description: collection.description,
    },
  }));

  try {
    const result = await client.mutate(mutations);
    console.log(`   ✅ Created ${result.length} collections`);
    return { success: true, count: result.length };
  } catch (error) {
    console.log(`   ❌ Error importing collections:`, error);
    return { success: false, error, count: 0 };
  }
}

async function importProducts() {
  console.log("🍴 Importing Products with Variants...");

  let successCount = 0;
  let totalVariants = 0;

  for (const product of productsData) {
    try {
      // Convert variants to proper format
      const variants = product.variants.map((variant: any, index: number) => ({
        _key: `variant-${index}`,
        _type: "variant",
        weightGrams: variant.weightGrams,
        heightInches: variant.heightInches,
        diameterInches: variant.diameterInches,
        lengthInches: variant.lengthInches,
        status: variant.status || "available",
        sku: variant.sku,
        notes: variant.notes,
      }));

      const mutation = {
        create: {
          _type: "product",
          _id: `product-${product.slug}`,
          name: product.name,
          slug: {
            _type: "slug",
            current: product.slug,
          },
          category: {
            _type: "reference",
            _ref: `category-${product.category}`,
          },
          variants: variants,
          shortDescription: `Traditional ${product.name} available in ${variants.length} variants`,
          description: `Our ${product.name} represents the finest in traditional South Indian silvercraft. Each piece is carefully crafted using time-honored techniques passed down through generations. Available in multiple sizes to suit your needs.`,
          featured: Math.random() > 0.8, // 20% chance of being featured
          available: variants.some((v: any) => v.status === "available"),
          tags: [product.category, "traditional", "handcrafted", "silverware"],
        },
      };

      await client.mutate([mutation]);
      successCount++;
      totalVariants += variants.length;

      console.log(
        `   ✅ Created product: ${product.name} (${variants.length} variants)`
      );
    } catch (error) {
      console.log(`   ❌ Error importing product ${product.name}:`, error);
    }
  }

  return { success: true, count: successCount, totalVariants };
}

// Main import function
async function runImport() {
  const results = {
    categories: { success: false, count: 0 },
    materials: { success: false, count: 0 },
    collections: { success: false, count: 0 },
    products: { success: false, count: 0, totalVariants: 0 },
  };

  // Import in order (categories first, then materials, collections, and finally products)
  results.categories = await importCategories();
  results.materials = await importMaterials();
  results.collections = await importCollections();
  results.products = await importProducts();

  console.log();
  console.log("📈 Import Summary:");
  console.log("==================");
  console.log(
    `${results.categories.success ? "✅" : "❌"} categories: ${results.categories.success ? results.categories.count + " items imported successfully" : "Failed"}`
  );
  console.log(
    `${results.materials.success ? "✅" : "❌"} materials: ${results.materials.success ? results.materials.count + " items imported successfully" : "Failed"}`
  );
  console.log(
    `${results.collections.success ? "✅" : "❌"} collections: ${results.collections.success ? results.collections.count + " items imported successfully" : "Failed"}`
  );
  console.log(
    `${results.products.success ? "✅" : "❌"} products: ${results.products.success ? results.products.count + " items imported successfully" : "Failed"}`
  );

  if (results.products.success) {
    console.log(
      `   📊 Total variants imported: ${results.products.totalVariants}`
    );
  }

  console.log();
  const totalSuccess = [
    results.categories,
    results.materials,
    results.collections,
    results.products,
  ].reduce((sum, result) => sum + (result.success ? result.count : 0), 0);
  const totalErrors = [
    results.categories,
    results.materials,
    results.collections,
    results.products,
  ].filter((result) => !result.success).length;

  console.log(`🎯 Total Success: ${totalSuccess} items`);
  if (totalErrors > 0) {
    console.log(`⚠️  Total Errors: ${totalErrors}`);
  }
  console.log();
  console.log(
    "🎉 Import complete! Check your Sanity Studio to see the imported data."
  );
}

// Check environment variables
console.log("🔍 Checking environment variables:");
console.log(`PROJECT_ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
console.log(`DATASET: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);
console.log(`TOKEN present: ${!!process.env.SANITY_API_TOKEN}`);
console.log();

if (
  !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  !process.env.NEXT_PUBLIC_SANITY_DATASET ||
  !process.env.SANITY_API_TOKEN
) {
  console.error("❌ Missing required environment variables!");
  console.error(
    "Please ensure NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_TOKEN are set in your .env.local file."
  );
  process.exit(1);
}

// Run the import
runImport().catch(console.error);
