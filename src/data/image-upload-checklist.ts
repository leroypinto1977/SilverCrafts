/**
 * SANITY IMAGE UPLOAD CHECKLIST
 *
 * Use this checklist when uploading images to Sanity Studio
 * Check off each image as you upload and record the asset ID
 */

export const imageUploadChecklist = [
  // ✅ PRIMARY PRODUCT IMAGES
  {
    filename: "fork-elegance.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Elegance Fork Set (Primary)",
  },
  {
    filename: "spoon-sterling.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Sterling Spoon Collection (Primary)",
  },
  {
    filename: "tray-ornate.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Ornate Serving Tray (Primary)",
  },
  {
    filename: "knife-carved.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Carved Dinner Knife Set (Primary)",
  },
  {
    filename: "complete-flatware-set.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Complete Flatware Set (Primary)",
  },
  {
    filename: "professional-serving-pieces.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Professional Serving Pieces (Primary)",
  },
  {
    filename: "tea-set-elegant.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Elegant Tea Set (Primary)",
  },
  {
    filename: "wedding-bands.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Wedding Ring Collection (Primary)",
  },

  // ✅ GALLERY IMAGES
  {
    filename: "dinner-forks-collection.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Elegance Fork Set (Gallery)",
  },
  {
    filename: "serving-spoons-collection.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Sterling Spoon Collection (Gallery)",
  },
  {
    filename: "soup-spoons-collection.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Sterling Spoon Collection (Gallery)",
  },
  {
    filename: "elegant-serving-trays.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Ornate Serving Tray (Gallery)",
  },
  {
    filename: "steak-knives-set.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Carved Dinner Knife Set (Gallery)",
  },
  {
    filename: "specialty-cutlery-collection.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Carved Dinner Knife Set (Gallery)",
  },
  {
    filename: "dinner-set-cutlery.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Complete Flatware Set (Gallery)",
  },
  {
    filename: "dining-set.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Complete Flatware Set (Gallery)",
  },
  {
    filename: "professional-dinnerware.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Complete Flatware Set (Gallery)",
  },
  {
    filename: "serving-utensils-collection.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Professional Serving Pieces (Gallery)",
  },
  {
    filename: "cake-servers-set.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Professional Serving Pieces (Gallery)",
  },
  {
    filename: "ring-acacia.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Wedding Ring Collection (Gallery)",
  },
  {
    filename: "ring-dahlia.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Wedding Ring Collection (Gallery)",
  },
  {
    filename: "ring-eternity.jpg",
    uploaded: false,
    assetId: "",
    productUse: "Wedding Ring Collection (Gallery)",
  },
];

// Quick reference for updating seed data placeholders
export const placeholderMapping = {
  // Primary images
  "fork-elegance.jpg": "ADD-FORK-ELEGANCE-ASSET-ID-HERE",
  "spoon-sterling.jpg": "ADD-SPOON-STERLING-ASSET-ID-HERE",
  "tray-ornate.jpg": "ADD-TRAY-ORNATE-ASSET-ID-HERE",
  "knife-carved.jpg": "ADD-KNIFE-CARVED-ASSET-ID-HERE",
  "complete-flatware-set.jpg": "ADD-COMPLETE-FLATWARE-SET-ASSET-ID-HERE",
  "professional-serving-pieces.jpg":
    "ADD-PROFESSIONAL-SERVING-PIECES-ASSET-ID-HERE",
  "tea-set-elegant.jpg": "ADD-TEA-SET-ELEGANT-ASSET-ID-HERE",
  "wedding-bands.jpg": "ADD-WEDDING-BANDS-ASSET-ID-HERE",

  // Gallery images
  "dinner-forks-collection.jpg": "ADD-DINNER-FORKS-COLLECTION-ASSET-ID-HERE",
  "serving-spoons-collection.jpg":
    "ADD-SERVING-SPOONS-COLLECTION-ASSET-ID-HERE",
  "soup-spoons-collection.jpg": "ADD-SOUP-SPOONS-COLLECTION-ASSET-ID-HERE",
  "elegant-serving-trays.jpg": "ADD-ELEGANT-SERVING-TRAYS-ASSET-ID-HERE",
  "steak-knives-set.jpg": "ADD-STEAK-KNIVES-SET-ASSET-ID-HERE",
  "specialty-cutlery-collection.jpg":
    "ADD-SPECIALTY-CUTLERY-COLLECTION-ASSET-ID-HERE",
  "dinner-set-cutlery.jpg": "ADD-DINNER-SET-CUTLERY-ASSET-ID-HERE",
  "dining-set.jpg": "ADD-DINING-SET-ASSET-ID-HERE",
  "professional-dinnerware.jpg": "ADD-PROFESSIONAL-DINNERWARE-ASSET-ID-HERE",
  "serving-utensils-collection.jpg":
    "ADD-SERVING-UTENSILS-COLLECTION-ASSET-ID-HERE",
  "cake-servers-set.jpg": "ADD-CAKE-SERVERS-SET-ASSET-ID-HERE",
  "ring-acacia.jpg": "ADD-RING-ACACIA-ASSET-ID-HERE",
  "ring-dahlia.jpg": "ADD-RING-DAHLIA-ASSET-ID-HERE",
  "ring-eternity.jpg": "ADD-RING-ETERNITY-ASSET-ID-HERE",
};

/**
 * INSTRUCTIONS FOR USE:
 *
 * 1. Print this checklist or keep it open while uploading
 * 2. Upload each image to Sanity Studio Media library
 * 3. Copy the asset ID from Sanity (format: image-abc123-1200x1200-jpg)
 * 4. Mark as uploaded and record the asset ID
 * 5. Use the placeholderMapping to find and replace in seed data
 *
 * EXAMPLE:
 * - Upload fork-elegance.jpg → get asset ID: image-abc123def456-1200x1200-jpg
 * - Find 'ADD-FORK-ELEGANCE-ASSET-ID-HERE' in seed data
 * - Replace with: image-abc123def456-1200x1200-jpg
 */

export default {
  imageUploadChecklist,
  placeholderMapping,
};
