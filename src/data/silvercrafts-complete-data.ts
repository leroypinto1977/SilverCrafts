/**
 * Complete Silvercrafts Sanity Import Data
 *
 * This file combines all the categories, materials, collections, and products
 * derived from the actual CSV product catalog for easy import into Sanity Studio.
 */

import silverCraftsCategories from "./silvercrafts-categories";
import silverCraftsMaterials from "./silvercrafts-materials";
import silverCraftsCollections from "./silvercrafts-collections";
import silverCraftsProducts from "./silvercrafts-products";

// ===================
// IMPORT INSTRUCTIONS
// ===================

const silverCraftsImportInstructions = `
SILVERCRAFTS SANITY IMPORT GUIDE
================================

This data is based on the actual CSV product catalog and represents
authentic South Indian silvercraft products and categories.

IMPORT ORDER:
1. Categories (16 categories) - Import first
2. Materials (3 materials) - Import second  
3. Collections (8 collections) - Import third
4. Products (25 representative products) - Import last

PHASE 1: FOUNDATION DATA
-----------------------
📁 CATEGORIES TO IMPORT:
- Bowls (various finishes and designs)
- Boxes (storage and decorative)
- Chombu (traditional water vessels)
- Cups & Drinkware
- Glasses (plain and engraved)
- Kamakshi Items (sacred items)
- Kodam (large vessels)
- Lamps & Lighting
- Panchapathram & Ritual Items
- Plates & Serving
- Simil (small containers)
- Trays (serving and decorative)
- Vel (ceremonial spears)
- Vessels & Cookware
- Coins & Bars
- Other Items

🧱 MATERIALS TO IMPORT:
- Pure Silver (99.9%)
- Sterling Silver (92.5%)
- Traditional Silver Alloy

📦 COLLECTIONS TO IMPORT:
- Sacred Motifs Collection
- Plain Heritage Collection
- Hand Engraved Artistry
- Machine Engraved Precision
- Matte Finish Contemporary
- Ceremonial & Ritual
- Daily Use Essentials
- Investment Grade

PHASE 2: PRODUCTS
----------------
🍴 25 REPRESENTATIVE PRODUCTS including:
- Plain Silver Bowl - 25g
- Design Matte Finish Bowl - 50g
- Bowl Nagas Design - 100g
- Chombu Plain - 200g
- Chombu Ashtalakshmi - 250g
- Pela Kolavu - 50g
- Cup Fruit - 100g
- Glass Plain - 50g
- Glass Hand Engraving - 80g
- Kuthuvizhaku Plain - 100g
- Lamp Annam Nagas - 200g
- Plate Telephone Round - 100g
- Plate Lunch - 300g
- Tray Nappu - 250g
- Tray Ashtalakshmi - 500g
- Silver Coin - 10g
- Silver Bar - 100g
- Adukku - 200g
- Mysore Chatti - 500g
- And more...

PRODUCT FEATURES:
- Authentic product names from CSV
- Accurate weights and dimensions
- Traditional descriptions
- Cultural context and significance
- Proper crafting techniques
- Care instructions
- All products marked as available

NOTES:
- All dimensions converted from inches to millimeters
- Weights preserved from original CSV data
- Product descriptions include cultural context
- Traditional crafting techniques documented
- Ready for image addition after upload to Sanity
`;

// ===================
// COMBINED EXPORT
// ===================

export const silverCraftsCompleteData = {
  categories: silverCraftsCategories,
  products: silverCraftsProducts,
  materials: silverCraftsMaterials,
  collections: silverCraftsCollections,
  instructions: silverCraftsImportInstructions,
  metadata: {
    totalProducts: silverCraftsProducts.length,
    totalCategories: silverCraftsCategories.length,
    totalMaterials: silverCraftsMaterials.length,
    totalCollections: silverCraftsCollections.length,
    description:
      "Complete SilverCrafts product catalog with authentic South Indian silverware items",
    version: "1.0.0",
    lastUpdated: new Date().toISOString(),
  },
};

export {
  silverCraftsCategories,
  silverCraftsProducts,
  silverCraftsMaterials,
  silverCraftsCollections,
  silverCraftsImportInstructions,
};

export default silverCraftsCompleteData;
