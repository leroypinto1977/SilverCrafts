/**
 * Sanity Seed Data for Silvercrafts
 *
 * This file contains structured data that can be imported into Sanity Studio
 * to populate the CMS with initial content for products, categories, materials, etc.
 *
 * Usage:
 * 1. Copy the data structures below
 * 2. Import them manually through Sanity Studio
 * 3. Or use Sanity's CLI import tools
 */

// ========================================
// CATEGORIES
// ========================================

export const categories = [
  {
    _type: "category",
    name: "Cutlery",
    slug: { current: "cutlery" },
    description:
      "Premium dining cutlery including forks, knives, and spoons crafted from the finest materials.",
    order: 1,
  },
  {
    _type: "category",
    name: "Serving Pieces",
    slug: { current: "serving-pieces" },
    description:
      "Elegant serving trays, platters, and utensils for sophisticated entertaining.",
    order: 2,
  },
  {
    _type: "category",
    name: "Dinnerware",
    slug: { current: "dinnerware" },
    description:
      "Complete dining sets and individual pieces for formal and casual dining.",
    order: 3,
  },
  {
    _type: "category",
    name: "Tea & Coffee Sets",
    slug: { current: "tea-coffee-sets" },
    description:
      "Exquisite tea and coffee service sets for refined beverage service.",
    order: 4,
  },
  {
    _type: "category",
    name: "Jewelry",
    slug: { current: "jewelry" },
    description:
      "Handcrafted rings, pendants, and accessories in precious metals.",
    order: 5,
  },
];

// ========================================
// MATERIALS
// ========================================

export const materials = [
  {
    _type: "material",
    name: "Sterling Silver",
    slug: { current: "sterling-silver" },
    description:
      "92.5% pure silver alloy, the standard for premium silverware.",
    properties: [
      { property: "Purity", value: "92.5%" },
      { property: "Durability", value: "High" },
      { property: "Tarnish Resistance", value: "Good with proper care" },
      { property: "Dishwasher Safe", value: "Hand wash recommended" },
    ],
  },
  {
    _type: "material",
    name: "Fine Silver",
    slug: { current: "fine-silver" },
    description: "99.9% pure silver for the most luxurious pieces.",
    properties: [
      { property: "Purity", value: "99.9%" },
      { property: "Softness", value: "High" },
      { property: "Luster", value: "Exceptional" },
      { property: "Use Case", value: "Decorative and special occasions" },
    ],
  },
  {
    _type: "material",
    name: "Silver Plate",
    slug: { current: "silver-plate" },
    description:
      "Base metal coated with a layer of silver for affordability without compromising beauty.",
    properties: [
      { property: "Base Material", value: "Copper or Brass" },
      { property: "Silver Layer", value: "10-20 microns" },
      { property: "Durability", value: "Good" },
      { property: "Maintenance", value: "Regular polishing required" },
    ],
  },
  {
    _type: "material",
    name: "Stainless Steel",
    slug: { current: "stainless-steel" },
    description: "Durable and low-maintenance option for everyday use.",
    properties: [
      { property: "Durability", value: "Very High" },
      { property: "Maintenance", value: "Low" },
      { property: "Dishwasher Safe", value: "Yes" },
      { property: "Corrosion Resistance", value: "Excellent" },
    ],
  },
];

// ========================================
// COLLECTIONS
// ========================================

export const collections = [
  {
    _type: "collection",
    name: "Royal Heritage",
    slug: { current: "royal-heritage" },
    description:
      "Inspired by European royal dining traditions, featuring intricate patterns and exceptional craftsmanship.",
    featured: true,
  },
  {
    _type: "collection",
    name: "Executive Collection",
    slug: { current: "executive-collection" },
    description:
      "Professional-grade pieces designed for fine dining establishments and executive settings.",
    featured: true,
  },
  {
    _type: "collection",
    name: "Wedding Celebration",
    slug: { current: "wedding-celebration" },
    description:
      "Perfect for special occasions and wedding gifts, designed to become family heirlooms.",
    featured: false,
  },
  {
    _type: "collection",
    name: "Modern Elegance",
    slug: { current: "modern-elegance" },
    description:
      "Contemporary designs that blend traditional craftsmanship with modern aesthetics.",
    featured: false,
  },
];

// ========================================
// PRODUCTS
// ========================================

export const products = [
  {
    _type: "product",
    name: "Elegance Fork Set",
    slug: { current: "elegance-fork-set" },
    shortDescription:
      "Sterling silver dinner fork set with intricate European designs, perfect for formal dining.",
    description:
      "Our Elegance Fork Set represents the pinnacle of European silverware craftsmanship. Each fork is meticulously handcrafted from 92.5% sterling silver, featuring intricate patterns that have been passed down through generations of skilled artisans. The set includes 12 dinner forks, each weighing approximately 85 grams, providing the perfect balance and feel in hand. The ergonomic design ensures comfortable dining while the lustrous finish adds sophistication to any table setting.",

    // 🖼️ IMAGES TO ADD AFTER UPLOAD:
    // Primary: fork-elegance.jpg
    // Gallery: dinner-forks-collection.jpg
    images: [
      // {
      //   asset: { _ref: 'ADD-FORK-ELEGANCE-ASSET-ID-HERE' },
      //   alt: 'Elegance Fork Set - Sterling Silver Dinner Forks',
      //   caption: 'Hand-forged sterling silver with intricate European patterns'
      // },
      // {
      //   asset: { _ref: 'ADD-DINNER-FORKS-COLLECTION-ASSET-ID-HERE' },
      //   alt: 'Dinner Forks Collection Display',
      //   caption: 'Complete set arrangement showing pattern details'
      // }
    ],

    // Note: Reference these after creating categories, materials, and collections
    // category: { _ref: 'ADD-CUTLERY-CATEGORY-ID-HERE' },
    // materials: [{ _ref: 'ADD-STERLING-SILVER-MATERIAL-ID-HERE' }],
    // collection: { _ref: 'ADD-ROYAL-HERITAGE-COLLECTION-ID-HERE' },
    dimensions: {
      length: 205,
      width: 25,
      height: 8,
      unit: "mm",
    },
    weight: {
      value: 85,
      unit: "g",
    },
    features: [
      "Hand-forged sterling silver construction",
      "Intricate European pattern detailing",
      "Perfectly balanced weight distribution",
      "Mirror-polish finish",
      "Dishwasher safe (hand wash recommended)",
      "Comes in elegant presentation box",
    ],
    craftingTechnique: "Traditional hand-forging with pattern chasing",
    origin: "Sheffield, England",
    artisan: "Master Silversmith James Morrison",
    careInstructions: [
      "Hand wash with mild soap and warm water",
      "Dry immediately with soft cloth",
      "Polish monthly with silver polish",
      "Store in anti-tarnish cloth or case",
      "Avoid contact with rubber or eggs",
    ],
    isAvailable: true,
    featured: true,
  },
  {
    _type: "product",
    name: "Sterling Spoon Collection",
    slug: { current: "sterling-spoon-collection" },
    shortDescription:
      "Handcrafted tablespoon collection in premium sterling silver with traditional bowl shaping.",
    description:
      "The Sterling Spoon Collection showcases the artistry of traditional spoon making. Each piece is individually shaped from solid sterling silver using time-honored techniques. The collection features perfectly proportioned bowls with smooth, comfortable handles that provide an exceptional dining experience. Whether used for soup service or general dining, these spoons represent the finest in European silverware tradition.",

    // 🖼️ IMAGES TO ADD AFTER UPLOAD:
    // Primary: spoon-sterling.jpg
    // Gallery: serving-spoons-collection.jpg, soup-spoons-collection.jpg
    images: [
      // {
      //   asset: { _ref: 'ADD-SPOON-STERLING-ASSET-ID-HERE' },
      //   alt: 'Sterling Spoon Collection - Handcrafted Silver Spoons',
      //   caption: 'Traditional bowl shaping with comfortable handles'
      // },
      // {
      //   asset: { _ref: 'ADD-SERVING-SPOONS-COLLECTION-ASSET-ID-HERE' },
      //   alt: 'Serving Spoons Collection Display',
      //   caption: 'Various spoon types for different dining needs'
      // },
      // {
      //   asset: { _ref: 'ADD-SOUP-SPOONS-COLLECTION-ASSET-ID-HERE' },
      //   alt: 'Soup Spoons Collection',
      //   caption: 'Specialized soup spoons with perfect depth'
      // }
    ],
    dimensions: {
      length: 190,
      width: 45,
      height: 12,
      unit: "mm",
    },
    weight: {
      value: 75,
      unit: "g",
    },
    features: [
      "Solid sterling silver construction",
      "Traditional bowl shaping technique",
      "Smooth, comfortable handles",
      "Professional weight and balance",
      "Available in sets of 6 or 12",
      "Lifetime craftsmanship warranty",
    ],
    craftingTechnique: "Hand-raised bowls with traditional finishing",
    origin: "Birmingham, England",
    artisan: "Elizabeth Whitmore & Associates",
    careInstructions: [
      "Gentle hand washing recommended",
      "Immediate drying prevents water spots",
      "Regular polishing maintains luster",
      "Store separately to prevent scratching",
    ],
    isAvailable: true,
    featured: true,
  },
  {
    _type: "product",
    name: "Ornate Serving Tray",
    slug: { current: "ornate-serving-tray" },
    shortDescription:
      "Engraved serving tray perfect for special occasions with detailed border patterns.",
    description:
      "This magnificent serving tray exemplifies the pinnacle of decorative silverware artistry. Hand-engraved with intricate border patterns and central motifs, it serves as both a functional serving piece and a work of art. The substantial weight and generous proportions make it ideal for formal entertaining, while the detailed engravings tell a story of traditional European craftsmanship.",

    // 🖼️ IMAGES TO ADD AFTER UPLOAD:
    // Primary: tray-ornate.jpg
    // Gallery: elegant-serving-trays.jpg
    images: [
      // {
      //   asset: { _ref: 'ADD-TRAY-ORNATE-ASSET-ID-HERE' },
      //   alt: 'Ornate Serving Tray - Hand-engraved Silver',
      //   caption: 'Detailed border patterns with central motifs'
      // },
      // {
      //   asset: { _ref: 'ADD-ELEGANT-SERVING-TRAYS-ASSET-ID-HERE' },
      //   alt: 'Elegant Serving Trays Collection',
      //   caption: 'Various serving tray styles and sizes'
      // }
    ],
    dimensions: {
      length: 450,
      width: 320,
      height: 25,
      unit: "mm",
    },
    weight: {
      value: 1200,
      unit: "g",
    },
    features: [
      "Hand-engraved decorative patterns",
      "Substantial sterling silver construction",
      "Non-slip base design",
      "Generous serving surface",
      "Mirror-polished finish",
      "Suitable for both serving and display",
    ],
    craftingTechnique: "Hand-engraving with traditional burin tools",
    origin: "London, England",
    artisan: "Royal Engraving Workshop",
    careInstructions: [
      "Clean with soft, damp cloth",
      "Use silver polish for deep cleaning",
      "Protect engraved areas during cleaning",
      "Store flat to prevent warping",
    ],
    isAvailable: true,
    featured: false,
  },
  {
    _type: "product",
    name: "Carved Dinner Knife Set",
    slug: { current: "carved-dinner-knife-set" },
    shortDescription:
      "Premium dinner knife set with carved handle details and razor-sharp stainless steel blades.",
    description:
      "Our Carved Dinner Knife Set combines functional excellence with artistic beauty. Each knife features a sterling silver handle with intricate carved details, paired with a precision-forged stainless steel blade. The ergonomic design ensures comfortable cutting while the artistic handles add elegance to your dining experience.",

    // 🖼️ IMAGES TO ADD AFTER UPLOAD:
    // Primary: knife-carved.jpg
    // Gallery: steak-knives-set.jpg, specialty-cutlery-collection.jpg
    images: [
      // {
      //   asset: { _ref: 'ADD-KNIFE-CARVED-ASSET-ID-HERE' },
      //   alt: 'Carved Dinner Knife Set - Sterling Silver Handles',
      //   caption: 'Intricate carved details with precision steel blades'
      // },
      // {
      //   asset: { _ref: 'ADD-STEAK-KNIVES-SET-ASSET-ID-HERE' },
      //   alt: 'Steak Knives Set Display',
      //   caption: 'Professional-grade cutting performance'
      // },
      // {
      //   asset: { _ref: 'ADD-SPECIALTY-CUTLERY-COLLECTION-ASSET-ID-HERE' },
      //   alt: 'Specialty Cutlery Collection',
      //   caption: 'Various knife types for different culinary needs'
      // }
    ],
    dimensions: {
      length: 240,
      width: 20,
      height: 15,
      unit: "mm",
    },
    weight: {
      value: 95,
      unit: "g",
    },
    features: [
      "Carved sterling silver handles",
      "High-carbon stainless steel blades",
      "Professional sharpness retention",
      "Ergonomic grip design",
      "Dishwasher safe blades",
      "Hand-finished cutting edges",
    ],
    craftingTechnique: "Hand-carving with precision blade forging",
    origin: "Solingen, Germany",
    artisan: "Klaus Weber Cutlery",
    careInstructions: [
      "Hand wash handles, dishwasher safe blades",
      "Dry immediately after washing",
      "Regular honing maintains sharpness",
      "Store in knife block or magnetic strip",
    ],
    isAvailable: true,
    featured: true,
  },
  {
    _type: "product",
    name: "Complete Flatware Set",
    slug: { current: "complete-flatware-set" },
    shortDescription:
      "Comprehensive 75-piece flatware set for elegant dining with service for 12.",
    description:
      "This comprehensive flatware set provides everything needed for elegant entertaining. The 75-piece collection includes dinner forks, salad forks, knives, spoons, teaspoons, and serving pieces, all crafted to match perfectly. Each piece features our signature Royal Heritage pattern, creating a cohesive and sophisticated table setting.",

    // 🖼️ IMAGES TO ADD AFTER UPLOAD:
    // Primary: complete-flatware-set.jpg
    // Gallery: dinner-set-cutlery.jpg, dining-set.jpg, professional-dinnerware.jpg
    images: [
      // {
      //   asset: { _ref: 'ADD-COMPLETE-FLATWARE-SET-ASSET-ID-HERE' },
      //   alt: 'Complete Flatware Set - 75 Pieces',
      //   caption: 'Comprehensive dining set with Royal Heritage pattern'
      // },
      // {
      //   asset: { _ref: 'ADD-DINNER-SET-CUTLERY-ASSET-ID-HERE' },
      //   alt: 'Dinner Set Cutlery Arrangement',
      //   caption: 'Elegant table setting display'
      // },
      // {
      //   asset: { _ref: 'ADD-DINING-SET-ASSET-ID-HERE' },
      //   alt: 'Complete Dining Set Layout',
      //   caption: 'Full service arrangement for formal dining'
      // },
      // {
      //   asset: { _ref: 'ADD-PROFESSIONAL-DINNERWARE-ASSET-ID-HERE' },
      //   alt: 'Professional Dinnerware Collection',
      //   caption: 'Restaurant-quality presentation'
      // }
    ],
    dimensions: {
      length: "Various sizes per piece type",
      unit: "mm",
    },
    weight: {
      value: 4500,
      unit: "g",
    },
    features: [
      "75 pieces total - service for 12",
      "Includes all essential flatware types",
      "Matching Royal Heritage pattern",
      "Sterling silver construction",
      "Professional restaurant quality",
      "Elegant storage chest included",
    ],
    craftingTechnique: "Traditional silversmithing with pattern consistency",
    origin: "Sheffield, England",
    artisan: "Royal Silverware Collective",
    careInstructions: [
      "Hand wash each piece individually",
      "Polish regularly to maintain finish",
      "Store in provided anti-tarnish chest",
      "Handle with care to preserve patterns",
    ],
    isAvailable: true,
    featured: true,
  },
  {
    _type: "product",
    name: "Professional Serving Pieces",
    slug: { current: "professional-serving-pieces" },
    shortDescription:
      "Professional-grade serving utensils collection for fine dining establishments.",
    description:
      "Designed for professional use in fine dining establishments, this collection of serving pieces meets the highest standards of functionality and presentation. Each piece is weighted and balanced for comfortable service, with finishes that maintain their appearance under commercial use.",

    // 🖼️ IMAGES TO ADD AFTER UPLOAD:
    // Primary: professional-serving-pieces.jpg
    // Gallery: serving-utensils-collection.jpg, cake-servers-set.jpg
    images: [
      // {
      //   asset: { _ref: 'ADD-PROFESSIONAL-SERVING-PIECES-ASSET-ID-HERE' },
      //   alt: 'Professional Serving Pieces Collection',
      //   caption: 'Commercial-grade serving utensils'
      // },
      // {
      //   asset: { _ref: 'ADD-SERVING-UTENSILS-COLLECTION-ASSET-ID-HERE' },
      //   alt: 'Serving Utensils Collection Display',
      //   caption: 'Various serving tools for different needs'
      // },
      // {
      //   asset: { _ref: 'ADD-CAKE-SERVERS-SET-ASSET-ID-HERE' },
      //   alt: 'Cake Servers Set',
      //   caption: 'Specialized serving pieces for desserts'
      // }
    ],
    features: [
      "Commercial-grade construction",
      "Balanced weight distribution",
      "Stain and tarnish resistant",
      "Dishwasher safe",
      "Professional presentation",
      "Comprehensive serving collection",
    ],
    craftingTechnique: "Industrial precision with hand-finishing",
    origin: "Various European workshops",
    artisan: "Professional Cutlery Guild",
    isAvailable: true,
    featured: false,
  },
  {
    _type: "product",
    name: "Elegant Tea Set",
    slug: { current: "elegant-tea-set" },
    shortDescription:
      "Complete sterling silver tea service with traditional English styling.",
    description:
      "This exquisite tea set embodies the tradition of English afternoon tea. Crafted from sterling silver with classical proportions and elegant detailing, it includes a teapot, sugar bowl, cream pitcher, and serving tray. Perfect for formal entertaining or as a treasured family heirloom.",

    // 🖼️ IMAGES TO ADD AFTER UPLOAD:
    // Primary: tea-set-elegant.jpg
    images: [
      // {
      //   asset: { _ref: 'ADD-TEA-SET-ELEGANT-ASSET-ID-HERE' },
      //   alt: 'Elegant Tea Set - Sterling Silver Service',
      //   caption: 'Complete tea service with traditional English styling'
      // }
    ],
    features: [
      "Complete 4-piece tea service",
      "Traditional English styling",
      "Heat-resistant handles",
      "Matching serving tray",
      "Hand-polished finish",
      "Suitable for daily use or display",
    ],
    craftingTechnique: "Traditional raising and shaping techniques",
    origin: "Birmingham, England",
    artisan: "Birmingham Tea Service Company",
    isAvailable: true,
    featured: false,
  },
  {
    _type: "product",
    name: "Wedding Ring Collection",
    slug: { current: "wedding-ring-collection" },
    shortDescription:
      "Handcrafted wedding bands in various precious metals with traditional and modern designs.",
    description:
      "Our wedding ring collection offers timeless symbols of commitment, each piece individually crafted by master jewelers. Available in sterling silver, gold, and platinum, with options for engraving and custom sizing.",

    // 🖼️ IMAGES TO ADD AFTER UPLOAD:
    // Primary: wedding-bands.jpg
    // Gallery: ring-acacia.jpg, ring-dahlia.jpg, ring-eternity.jpg
    images: [
      // {
      //   asset: { _ref: 'ADD-WEDDING-BANDS-ASSET-ID-HERE' },
      //   alt: 'Wedding Ring Collection - Handcrafted Bands',
      //   caption: 'Various precious metal options and designs'
      // },
      // {
      //   asset: { _ref: 'ADD-RING-ACACIA-ASSET-ID-HERE' },
      //   alt: 'Acacia Wedding Ring',
      //   caption: 'Traditional band with nature-inspired details'
      // },
      // {
      //   asset: { _ref: 'ADD-RING-DAHLIA-ASSET-ID-HERE' },
      //   alt: 'Dahlia Wedding Ring',
      //   caption: 'Floral-inspired design with delicate patterns'
      // },
      // {
      //   asset: { _ref: 'ADD-RING-ETERNITY-ASSET-ID-HERE' },
      //   alt: 'Eternity Wedding Ring',
      //   caption: 'Classic eternity band with continuous pattern'
      // }
    ],
    features: [
      "Multiple metal options available",
      "Traditional and contemporary designs",
      "Custom engraving services",
      "Precision sizing",
      "Lifetime polishing service",
      "Certificate of authenticity",
    ],
    craftingTechnique: "Hand-forging and precision casting",
    origin: "London, England",
    artisan: "Heritage Jewelry Atelier",
    isAvailable: true,
    featured: false,
  },
];

// ========================================
// TESTIMONIALS
// ========================================

export const testimonials = [
  {
    _type: "testimonial",
    customerName: "Lady Margaret Thornfield",
    content:
      "The Royal Heritage collection graces our family dining room with unparalleled elegance. Each piece is a testament to exceptional craftsmanship.",
    rating: 5,
    location: "Estate Owner, England",
    featured: true,
  },
  {
    _type: "testimonial",
    customerName: "Chef Antoine Dubois",
    content:
      "Professional quality that enhances our fine dining experience. The weight, balance, and finish are absolutely perfect for our establishment.",
    rating: 5,
    location: "Michelin Star Restaurant",
    featured: true,
  },
  {
    _type: "testimonial",
    customerName: "Sarah & Michael Chen",
    content:
      "Our Wedding Celebration set was the highlight of our reception. Guests could not stop admiring the beautiful craftsmanship.",
    rating: 5,
    location: "Wedding Couple",
    featured: true,
  },
  {
    _type: "testimonial",
    customerName: "Ambassador Robert Williams",
    content:
      "For official state dinners, nothing compares to the sophistication and prestige these pieces bring to our table.",
    rating: 5,
    location: "Diplomatic Corps",
    featured: true,
  },
  {
    _type: "testimonial",
    customerName: "Isabella Rodriguez",
    content:
      "I recommend these pieces to all my luxury clients. The attention to detail and timeless design make them perfect heirloom pieces.",
    rating: 5,
    location: "Interior Designer",
    featured: true,
  },
];

// ========================================
// USAGE INSTRUCTIONS
// ========================================

export const seedDataInstructions = `
SANITY SEED DATA IMPORT INSTRUCTIONS
=====================================

PHASE 1: SETUP FOUNDATION DATA
------------------------------
1. START WITH CATEGORIES:
   - Copy each category object from the categories array
   - Create new Category document in Sanity Studio
   - Paste the data structure and save
   - Note the document ID for each category

2. ADD MATERIALS:
   - Copy each material object from the materials array
   - Create new Material document in Sanity Studio
   - Paste the data structure and save
   - Note the document ID for each material

3. CREATE COLLECTIONS:
   - Copy each collection object from the collections array
   - Create new Collection document in Sanity Studio
   - Paste the data structure and save
   - Note the document ID for each collection

PHASE 2: UPLOAD IMAGES
----------------------
4. UPLOAD PRODUCT IMAGES TO SANITY:
   - Go to Media section in Sanity Studio
   - Upload images from /public/assets/ folder:
     
   📸 PRIORITY IMAGES TO UPLOAD:
   - fork-elegance.jpg
   - spoon-sterling.jpg
   - tray-ornate.jpg
   - knife-carved.jpg
   - complete-flatware-set.jpg
   - professional-serving-pieces.jpg
   - tea-set-elegant.jpg
   - wedding-bands.jpg
   - dinner-forks-collection.jpg
   - serving-spoons-collection.jpg
   - soup-spoons-collection.jpg
   - steak-knives-set.jpg
   - specialty-cutlery-collection.jpg
   - elegant-serving-trays.jpg
   - dinner-set-cutlery.jpg
   - dining-set.jpg
   - professional-dinnerware.jpg
   - serving-utensils-collection.jpg
   - cake-servers-set.jpg
   - ring-acacia.jpg
   - ring-dahlia.jpg
   - ring-eternity.jpg

   - Record the asset reference ID for each uploaded image
   - Format: image-[hash]-[dimensions]-[format]

PHASE 3: CREATE PRODUCTS
-------------------------
5. CREATE PRODUCTS WITH REFERENCES:
   - For each product in the products array:
     a) Copy the product structure (excluding commented image sections)
     b) Create new Product document in Sanity Studio
     c) Add basic product information
     d) Add category reference (from Phase 1)
     e) Add materials references (from Phase 1)
     f) Add collection reference (from Phase 1)
     g) Save the product

6. ADD IMAGES TO PRODUCTS:
   - Edit each saved product
   - Uncomment the images array in seed data
   - Replace placeholder asset IDs with actual Sanity asset references
   - Add the images array to the product in Sanity Studio
   - Save each product

PHASE 4: ADD TESTIMONIALS
-------------------------
7. CREATE TESTIMONIALS:
   - Copy each testimonial object from testimonials array
   - Create new Testimonial document in Sanity Studio
   - Paste the data structure and save

QUICK REFERENCE PLACEHOLDERS:
----------------------------
🔗 Categories: ADD-CUTLERY-CATEGORY-ID-HERE, etc.
🧱 Materials: ADD-STERLING-SILVER-MATERIAL-ID-HERE, etc.
📦 Collections: ADD-ROYAL-HERITAGE-COLLECTION-ID-HERE, etc.
🖼️ Images: ADD-[IMAGE-NAME]-ASSET-ID-HERE

EXAMPLE WORKFLOW FOR ONE PRODUCT:
---------------------------------
1. Create "Elegance Fork Set" product with basic info
2. Reference cutlery category, sterling silver material, royal heritage collection  
3. Save product
4. Edit product to add images:
   - Uncomment images array from seed data
   - Replace ADD-FORK-ELEGANCE-ASSET-ID-HERE with actual asset reference
   - Replace ADD-DINNER-FORKS-COLLECTION-ASSET-ID-HERE with actual asset reference
5. Save updated product

NOTES:
- All products are pre-configured as available and appropriately featured
- Dimensions are in millimeters, weights in grams
- Care instructions and features are comprehensive
- Image placeholders are clearly marked for easy replacement
`;

export default {
  categories,
  materials,
  collections,
  products,
  testimonials,
  instructions: seedDataInstructions,
};
