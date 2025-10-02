#!/usr/bin/env tsx
/**
 * Sanity Import Script for SilverCrafts CSV Product Data
 *
 * This script imports the comprehensive CSV-processed product catalog
 * into Sanity CMS with the correct schemas.
 *
 * Usage: npm run import-sanity
 */

import dotenv from "dotenv";
import { createClient } from "@sanity/client";
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// Load CSV-processed JSON data
const dataPath = join(process.cwd(), 'src', 'data', 'csv-processed');
const categoriesData = JSON.parse(readFileSync(join(dataPath, 'categories.json'), 'utf-8'));
const materialsData = JSON.parse(readFileSync(join(dataPath, 'materials.json'), 'utf-8'));
const collectionsData = JSON.parse(readFileSync(join(dataPath, 'collections.json'), 'utf-8'));
const productsData = JSON.parse(readFileSync(join(dataPath, 'products.json'), 'utf-8'));

// Debug: Check what environment variables are loaded
console.log("🔍 Checking environment variables:");
console.log("PROJECT_ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log("DATASET:", process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log("API_VERSION:", process.env.NEXT_PUBLIC_SANITY_API_VERSION);
console.log("TOKEN present:", !!process.env.SANITY_API_TOKEN);

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID is required");
  process.exit(1);
}

if (!process.env.SANITY_API_TOKEN) {
  console.error("❌ SANITY_API_TOKEN is required");
  process.exit(1);
}

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-09-29",
});

async function importDocuments(documents: any[], type: string, emoji: string) {
  console.log(`${emoji} Importing ${type}...`);
  
  try {
    // Create transaction for batch import
    const transaction = client.transaction();
    
    documents.forEach((doc) => {
      transaction.createOrReplace(doc);
    });
    
    const result = await transaction.commit();
    
    // Log each created item
    documents.forEach((doc) => {
      console.log(`   ✅ Created ${type.slice(0, -1)}: ${doc.name}`);
    });
    
    return { success: true, count: documents.length, error: null };
  } catch (error) {
    console.error(`❌ Error importing ${type}:`, error);
    return { success: false, error, count: 0 };
  }
}

async function importAllData() {
  console.log("🚀 Starting SilverCrafts CSV Data Import to Sanity...");
  console.log("===============================================\n");

  console.log("📊 Import Summary:");
  console.log(`   Categories: ${categoriesData.length}`);
  console.log(`   Materials: ${materialsData.length}`);
  console.log(`   Collections: ${collectionsData.length}`);
  console.log(`   Products: ${productsData.length}\n`);

  const results = {
    categories: { success: false, count: 0, error: null as unknown },
    materials: { success: false, count: 0, error: null as unknown },
    collections: { success: false, count: 0, error: null as unknown },
    products: { success: false, count: 0, error: null as unknown },
  };

  // Import in order of dependencies (no references first)
  results.categories = await importDocuments(categoriesData, "categories", "🗂️ ");
  results.materials = await importDocuments(materialsData, "materials", "🧱");
  results.collections = await importDocuments(collectionsData, "collections", "📦");
  results.products = await importDocuments(productsData, "products", "🍴");

  // Print summary
  console.log("\n📈 Import Summary:");
  console.log("==================");
  
  Object.entries(results).forEach(([key, result]) => {
    if (result.success) {
      console.log(`✅ ${key}: ${result.count} items imported successfully`);
    } else {
      console.log(`❌ ${key}: Failed with ${result.error ? 1 : 0} errors`);
    }
  });

  const totalSuccess = Object.values(results).reduce((sum, result) => sum + result.count, 0);
  const totalErrors = Object.values(results).filter(result => !result.success).length;

  console.log(`\n🎯 Total Success: ${totalSuccess} items`);
  console.log(`⚠️  Total Errors: ${totalErrors}`);

  if (totalErrors === 0) {
    console.log("\n🎉 All data imported successfully!");
    console.log("📍 You can now view your products at:");
    console.log(`   Studio: http://localhost:3334`);
    console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}`);
  }
}

// Run the import
importAllData().catch((error) => {
  console.error("💥 Fatal error during import:", error);
  process.exit(1);
});