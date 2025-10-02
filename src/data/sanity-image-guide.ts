/**
 * Sanity Image Upload and Reference Guide
 *
 * This file provides a complete mapping of product images and their intended usage
 * for uploading to Sanity Studio and referencing in product documents.
 */

// ========================================
// IMAGE UPLOAD CHECKLIST
// ========================================

export const imageUploadPlan = {
  // Products folder organization
  productsFolder: "/public/assets/products/",

  // Main product images (already available in assets)
  existingImages: [
    "fork-elegance.jpg",
    "spoon-sterling.jpg",
    "tray-ornate.jpg",
    "knife-carved.jpg",
    "complete-flatware-set.jpg",
    "professional-serving-pieces.jpg",
    "tea-set-elegant.jpg",
    "wedding-bands.jpg",
    "dinner-forks-collection.jpg",
    "serving-spoons-collection.jpg",
    "serving-utensils-collection.jpg",
    "soup-spoons-collection.jpg",
    "specialty-cutlery-collection.jpg",
    "steak-knives-set.jpg",
    "professional-dinnerware.jpg",
    "elegant-serving-trays.jpg",
    "dinner-set-cutlery.jpg",
    "dining-set.jpg",
    "cake-servers-set.jpg",
  ],

  // Additional images needed (to be generated/found)
  additionalImagesNeeded: [
    "sterling-spoon-collection-detail.jpg",
    "ornate-serving-tray-detail.jpg",
    "carved-dinner-knife-detail.jpg",
    "complete-flatware-set-arrangement.jpg",
    "professional-serving-pieces-detail.jpg",
    "elegant-tea-set-complete.jpg",
    "wedding-ring-collection-display.jpg",
  ],
};

// ========================================
// PRODUCT IMAGE MAPPING
// ========================================

export const productImageMapping = {
  "elegance-fork-set": {
    primary: "fork-elegance.jpg",
    gallery: ["fork-elegance.jpg", "dinner-forks-collection.jpg"],
    description: "Sterling silver dinner fork with intricate European designs",
  },

  "sterling-spoon-collection": {
    primary: "spoon-sterling.jpg",
    gallery: [
      "spoon-sterling.jpg",
      "serving-spoons-collection.jpg",
      "soup-spoons-collection.jpg",
    ],
    description:
      "Handcrafted sterling silver spoons with traditional bowl shaping",
  },

  "ornate-serving-tray": {
    primary: "tray-ornate.jpg",
    gallery: ["tray-ornate.jpg", "elegant-serving-trays.jpg"],
    description: "Hand-engraved serving tray with detailed border patterns",
  },

  "carved-dinner-knife-set": {
    primary: "knife-carved.jpg",
    gallery: [
      "knife-carved.jpg",
      "steak-knives-set.jpg",
      "specialty-cutlery-collection.jpg",
    ],
    description: "Premium dinner knives with carved sterling silver handles",
  },

  "complete-flatware-set": {
    primary: "complete-flatware-set.jpg",
    gallery: [
      "complete-flatware-set.jpg",
      "dinner-set-cutlery.jpg",
      "dining-set.jpg",
      "professional-dinnerware.jpg",
    ],
    description: "75-piece comprehensive flatware set for elegant dining",
  },

  "professional-serving-pieces": {
    primary: "professional-serving-pieces.jpg",
    gallery: [
      "professional-serving-pieces.jpg",
      "serving-utensils-collection.jpg",
      "cake-servers-set.jpg",
    ],
    description: "Professional-grade serving utensils for fine dining",
  },

  "elegant-tea-set": {
    primary: "tea-set-elegant.jpg",
    gallery: ["tea-set-elegant.jpg"],
    description:
      "Complete sterling silver tea service with traditional English styling",
  },

  "wedding-ring-collection": {
    primary: "wedding-bands.jpg",
    gallery: [
      "wedding-bands.jpg",
      "ring-acacia.jpg",
      "ring-dahlia.jpg",
      "ring-eternity.jpg",
    ],
    description: "Handcrafted wedding bands in precious metals",
  },
};

// ========================================
// SANITY UPLOAD INSTRUCTIONS
// ========================================

export const sanityUploadSteps = `
STEP-BY-STEP SANITY IMAGE UPLOAD PROCESS
=========================================

1. ACCESS SANITY STUDIO:
   - Navigate to /studio in your application
   - Login with admin credentials

2. UPLOAD IMAGES TO MEDIA LIBRARY:
   - Go to "Media" section in Sanity Studio
   - Upload each image from /public/assets/products/ folder
   - Use descriptive filenames and alt text
   - Note the asset reference ID for each uploaded image

3. ORGANIZE UPLOADS BY PRODUCT:
   
   📁 ELEGANCE FORK SET:
   - fork-elegance.jpg (Primary)
   - dinner-forks-collection.jpg (Gallery)
   
   📁 STERLING SPOON COLLECTION:
   - spoon-sterling.jpg (Primary)
   - serving-spoons-collection.jpg (Gallery)
   - soup-spoons-collection.jpg (Gallery)
   
   📁 ORNATE SERVING TRAY:
   - tray-ornate.jpg (Primary)
   - elegant-serving-trays.jpg (Gallery)
   
   📁 CARVED DINNER KNIFE SET:
   - knife-carved.jpg (Primary)
   - steak-knives-set.jpg (Gallery)
   - specialty-cutlery-collection.jpg (Gallery)
   
   📁 COMPLETE FLATWARE SET:
   - complete-flatware-set.jpg (Primary)
   - dinner-set-cutlery.jpg (Gallery)
   - dining-set.jpg (Gallery)
   - professional-dinnerware.jpg (Gallery)
   
   📁 PROFESSIONAL SERVING PIECES:
   - professional-serving-pieces.jpg (Primary)
   - serving-utensils-collection.jpg (Gallery)
   - cake-servers-set.jpg (Gallery)
   
   📁 ELEGANT TEA SET:
   - tea-set-elegant.jpg (Primary)
   
   📁 WEDDING RING COLLECTION:
   - wedding-bands.jpg (Primary)
   - ring-acacia.jpg (Gallery)
   - ring-dahlia.jpg (Gallery)
   - ring-eternity.jpg (Gallery)

4. RECORD ASSET REFERENCES:
   - Copy the asset reference ID for each uploaded image
   - Format: image-[hash]-[dimensions]-[format]
   - Example: "image-abc123def456-1200x1200-jpg"

5. UPDATE SEED DATA:
   - Replace placeholder image references with actual Sanity asset IDs
   - Ensure each product has proper image array structure

EXAMPLE SANITY IMAGE STRUCTURE:
{
  images: [
    {
      asset: { _ref: "image-abc123def456-1200x1200-jpg" },
      alt: "Elegance Fork Set - Sterling Silver Dinner Forks",
      caption: "Hand-forged sterling silver with intricate European patterns"
    },
    {
      asset: { _ref: "image-def789ghi012-1200x1200-jpg" },
      alt: "Dinner Forks Collection Display",
      caption: "Complete set arrangement showing pattern details"
    }
  ]
}
`;

// ========================================
// UPDATED SEED DATA TEMPLATE
// ========================================

export const updatedProductsWithImages = [
  {
    _type: "product",
    name: "Elegance Fork Set",
    slug: { current: "elegance-fork-set" },
    // Images will be updated with actual Sanity asset references
    images: [
      {
        // Replace with actual Sanity asset reference after upload
        asset: { _ref: "REPLACE-WITH-FORK-ELEGANCE-ASSET-ID" },
        alt: "Elegance Fork Set - Sterling Silver Dinner Forks",
        caption: "Hand-forged sterling silver with intricate European patterns",
      },
      {
        asset: { _ref: "REPLACE-WITH-DINNER-FORKS-COLLECTION-ASSET-ID" },
        alt: "Dinner Forks Collection Display",
        caption: "Complete set arrangement showing pattern details",
      },
    ],
    // ... rest of product data
  },

  {
    _type: "product",
    name: "Sterling Spoon Collection",
    slug: { current: "sterling-spoon-collection" },
    images: [
      {
        asset: { _ref: "REPLACE-WITH-SPOON-STERLING-ASSET-ID" },
        alt: "Sterling Spoon Collection - Handcrafted Silver Spoons",
        caption: "Traditional bowl shaping with comfortable handles",
      },
      {
        asset: { _ref: "REPLACE-WITH-SERVING-SPOONS-COLLECTION-ASSET-ID" },
        alt: "Serving Spoons Collection Display",
        caption: "Various spoon types for different dining needs",
      },
      {
        asset: { _ref: "REPLACE-WITH-SOUP-SPOONS-COLLECTION-ASSET-ID" },
        alt: "Soup Spoons Collection",
        caption: "Specialized soup spoons with perfect depth",
      },
    ],
    // ... rest of product data
  },

  // Additional products follow same pattern...
];

export default {
  imageUploadPlan,
  productImageMapping,
  sanityUploadSteps,
  updatedProductsWithImages,
};
