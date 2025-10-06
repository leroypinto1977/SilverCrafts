/**
 * Silvercrafts Products - Generated from Actual Product Catalog CSV
 *
 * This file contains a comprehensive selection of products from the CSV data,
 * organized by category with proper specifications and dimensions.
 *
 * Note: Images will be added after uploading to Sanity Studio
 * All dimensions are converted from inches to millimeters for consistency
 */

// Helper function to convert inches to millimeters
const inchesToMm = (inches: number): number => Math.round(inches * 25.4);

export const silverCraftsProducts = [
  // ===================
  // BOWLS CATEGORY
  // ===================
  {
    _type: "product",
    name: "Plain Silver Bowl - 25g",
    slug: { current: "plain-silver-bowl-25g" },
    shortDescription:
      "Classic plain silver bowl perfect for serving and ceremonial use.",
    description:
      "Our 25-gram plain silver bowl represents the essence of traditional craftsmanship. Hand-formed from pure silver with a smooth, polished finish that reflects light beautifully. Perfect for serving sweets, nuts, or as a ceremonial vessel for religious occasions.",

    // 🖼️ IMAGES TO ADD AFTER UPLOAD:
    // Primary: bowl-plain-25g.jpg
    images: [],

    // References to be added after creating categories and materials
    // category: { _ref: 'ADD-BOWLS-CATEGORY-ID-HERE' },
    // materials: [{ _ref: 'ADD-STERLING-SILVER-MATERIAL-ID-HERE' }],

    dimensions: {
      height: inchesToMm(1.5),
      diameter: inchesToMm(3),
      unit: "mm",
    },
    weight: {
      value: 25,
      unit: "g",
    },
    features: [
      "Hand-formed from pure silver",
      "Mirror-polished finish",
      "Traditional design",
      "Suitable for food serving",
      "Easy to clean and maintain",
      "Ceremonial and daily use",
    ],
    craftingTechnique: "Traditional hand-forming and polishing",
    origin: "Tamil Nadu, India",
    artisan: "Traditional Silvercrafts Artisans",
    careInstructions: [
      "Hand wash with mild soap",
      "Dry immediately with soft cloth",
      "Polish regularly to maintain shine",
      "Store in dry place",
    ],
    isAvailable: true,
    featured: true,
  },

  {
    _type: "product",
    name: "Design Matte Finish Bowl - 50g",
    slug: { current: "design-matte-finish-bowl-50g" },
    shortDescription:
      "Elegant matte finish bowl with intricate design patterns.",
    description:
      "This sophisticated 50-gram bowl features a unique matte finish combined with subtle design elements. The textured surface provides an elegant contrast to traditional polished silver, making it a perfect centerpiece for modern and traditional settings alike.",

    images: [],

    dimensions: {
      height: inchesToMm(1.75),
      diameter: inchesToMm(4),
      unit: "mm",
    },
    weight: {
      value: 50,
      unit: "g",
    },
    features: [
      "Unique matte finish",
      "Intricate design patterns",
      "Contemporary aesthetic",
      "Durable construction",
      "Versatile serving piece",
    ],
    craftingTechnique: "Hand-crafted with specialized matte finishing",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: false,
  },

  {
    _type: "product",
    name: "Bowl Nagas Design - 100g",
    slug: { current: "bowl-nagas-design-100g" },
    shortDescription:
      "Traditional bowl featuring sacred Nagas (serpent) motifs.",
    description:
      "This exquisite 100-gram bowl showcases the traditional Nagas design, representing divine serpents in Hindu mythology. The intricate engravings tell stories of protection and prosperity, making this piece both functional and spiritually significant.",

    images: [],

    dimensions: {
      height: inchesToMm(2.25),
      diameter: inchesToMm(5),
      unit: "mm",
    },
    weight: {
      value: 100,
      unit: "g",
    },
    features: [
      "Sacred Nagas serpent motifs",
      "Traditional Hindu symbolism",
      "Hand-engraved details",
      "Spiritual significance",
      "Ceremonial quality",
    ],
    craftingTechnique: "Traditional hand-engraving with Nagas motifs",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: true,
  },

  // ===================
  // CHOMBU CATEGORY
  // ===================
  {
    _type: "product",
    name: "Chombu Plain - 200g",
    slug: { current: "chombu-plain-200g" },
    shortDescription:
      "Traditional South Indian water vessel with classic design.",
    description:
      "The Chombu is an essential vessel in South Indian households, traditionally used for storing and serving water. This 200-gram plain version features the classic rounded shape with a narrow neck, designed for optimal water storage and pouring.",

    images: [],

    dimensions: {
      height: inchesToMm(3.25),
      diameter: inchesToMm(5),
      unit: "mm",
    },
    weight: {
      value: 200,
      unit: "g",
    },
    features: [
      "Traditional Chombu design",
      "Optimal water storage shape",
      "Comfortable pouring neck",
      "Daily use functionality",
      "Cultural significance",
    ],
    craftingTechnique: "Traditional forming and shaping",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: true,
  },

  {
    _type: "product",
    name: "Chombu Ashtalakshmi - 250g",
    slug: { current: "chombu-ashtalakshmi-250g" },
    shortDescription:
      "Sacred water vessel featuring the eight forms of Goddess Lakshmi.",
    description:
      "This magnificent Chombu features the Ashtalakshmi design, depicting the eight forms of Goddess Lakshmi. Each engraving represents different aspects of wealth, prosperity, and abundance, making this vessel particularly auspicious for religious ceremonies and special occasions.",

    images: [],

    dimensions: {
      height: inchesToMm(3.5),
      diameter: inchesToMm(5.25),
      unit: "mm",
    },
    weight: {
      value: 250,
      unit: "g",
    },
    features: [
      "Ashtalakshmi sacred motifs",
      "Eight forms of Goddess Lakshmi",
      "Religious significance",
      "Detailed engravings",
      "Ceremonial quality",
    ],
    craftingTechnique: "Hand-engraved Ashtalakshmi patterns",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: true,
  },

  // ===================
  // CUPS & DRINKWARE
  // ===================
  {
    _type: "product",
    name: "Pela Kolavu - 50g",
    slug: { current: "pela-kolavu-50g" },
    shortDescription:
      "Traditional South Indian drinking cup with elegant design.",
    description:
      "The Pela Kolavu is a traditional drinking vessel, perfect for serving water, milk, or other beverages. Its ergonomic design fits comfortably in hand while the silver construction provides natural antimicrobial properties.",

    images: [],

    dimensions: {
      height: inchesToMm(3),
      diameter: inchesToMm(3.75),
      unit: "mm",
    },
    weight: {
      value: 50,
      unit: "g",
    },
    features: [
      "Traditional drinking vessel",
      "Ergonomic design",
      "Natural antimicrobial properties",
      "Suitable for all beverages",
      "Cultural authenticity",
    ],
    craftingTechnique: "Traditional cup forming",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: false,
  },

  {
    _type: "product",
    name: "Cup Fruit - 100g",
    slug: { current: "cup-fruit-100g" },
    shortDescription:
      "Elegant silver cup designed for serving fruits and desserts.",
    description:
      "This beautiful fruit cup combines functionality with elegance. Perfect for serving fresh fruits, desserts, or small portions. The substantial 100-gram weight provides excellent balance and a premium feel.",

    images: [],

    dimensions: {
      height: inchesToMm(4),
      diameter: inchesToMm(5),
      unit: "mm",
    },
    weight: {
      value: 100,
      unit: "g",
    },
    features: [
      "Designed for fruit serving",
      "Elegant proportions",
      "Substantial weight",
      "Versatile use",
      "Premium quality",
    ],
    craftingTechnique: "Precision forming and finishing",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: false,
  },

  // ===================
  // GLASSES
  // ===================
  {
    _type: "product",
    name: "Glass Plain - 50g",
    slug: { current: "glass-plain-50g" },
    shortDescription:
      "Classic silver drinking glass with clean, simple design.",
    description:
      "Our plain silver glass represents timeless elegance in its simplest form. Perfect for water, milk, or any beverage, this glass provides the health benefits of silver while maintaining a classic aesthetic that complements any table setting.",

    images: [],

    dimensions: {
      height: inchesToMm(3.25),
      diameter: inchesToMm(2.75),
      unit: "mm",
    },
    weight: {
      value: 50,
      unit: "g",
    },
    features: [
      "Clean, simple design",
      "Health benefits of silver",
      "Suitable for all beverages",
      "Timeless appeal",
      "Easy maintenance",
    ],
    craftingTechnique: "Traditional glass forming",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: false,
  },

  {
    _type: "product",
    name: "Glass Hand Engraving - 80g",
    slug: { current: "glass-hand-engraving-80g" },
    shortDescription:
      "Artistically hand-engraved silver glass with intricate patterns.",
    description:
      "This exceptional drinking glass features hand-engraved patterns that showcase the skill of traditional artisans. Each piece is unique, with intricate designs that catch and reflect light beautifully, making every sip a luxurious experience.",

    images: [],

    dimensions: {
      height: inchesToMm(4.25),
      diameter: inchesToMm(3.5),
      unit: "mm",
    },
    weight: {
      value: 80,
      unit: "g",
    },
    features: [
      "Hand-engraved patterns",
      "Unique artisan design",
      "Light-reflecting details",
      "Luxury drinking experience",
      "Collector quality",
    ],
    craftingTechnique: "Hand-engraving by master artisans",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: true,
  },

  // ===================
  // LAMPS & LIGHTING
  // ===================
  {
    _type: "product",
    name: "Kuthuvizhaku Plain - 100g",
    slug: { current: "kuthuvizhaku-plain-100g" },
    shortDescription:
      "Traditional oil lamp for religious ceremonies and decoration.",
    description:
      "The Kuthuvizhaku is an essential element in South Indian religious practices. This plain version maintains the traditional design while providing excellent functionality for oil lighting during prayers, festivals, and special occasions.",

    images: [],

    dimensions: {
      height: inchesToMm(9.75),
      unit: "mm",
    },
    weight: {
      value: 100,
      unit: "g",
    },
    features: [
      "Traditional oil lamp design",
      "Religious significance",
      "Festival lighting",
      "Decorative element",
      "Authentic craftsmanship",
    ],
    craftingTechnique: "Traditional lamp forming",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: true,
  },

  {
    _type: "product",
    name: "Lamp Annam Nagas - 200g",
    slug: { current: "lamp-annam-nagas-200g" },
    shortDescription: "Decorative oil lamp featuring Annam and Nagas designs.",
    description:
      "This elaborate oil lamp combines the Annam (swan) and Nagas (serpent) motifs, creating a piece rich in Hindu symbolism. The swan represents divine knowledge and purity, while the serpents symbolize protection and cosmic energy.",

    images: [],

    dimensions: {
      height: inchesToMm(13),
      unit: "mm",
    },
    weight: {
      value: 200,
      unit: "g",
    },
    features: [
      "Annam and Nagas motifs",
      "Rich Hindu symbolism",
      "Elaborate design",
      "Spiritual significance",
      "Ceremonial quality",
    ],
    craftingTechnique: "Detailed motif engraving and forming",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: true,
  },

  // ===================
  // PLATES & SERVING
  // ===================
  {
    _type: "product",
    name: "Plate Telephone Round - 100g",
    slug: { current: "plate-telephone-round-100g" },
    shortDescription: "Classic round serving plate with telephone edge design.",
    description:
      "The telephone round plate features a distinctive rim design that resembles traditional telephone dial patterns. This 100-gram plate is perfect for serving main courses, sweets, or as a decorative piece.",

    images: [],

    dimensions: {
      height: inchesToMm(0.75),
      diameter: inchesToMm(7),
      unit: "mm",
    },
    weight: {
      value: 100,
      unit: "g",
    },
    features: [
      "Distinctive telephone rim design",
      "Versatile serving size",
      "Classic proportions",
      "Multi-purpose use",
      "Traditional craftsmanship",
    ],
    craftingTechnique: "Traditional plate forming with rim design",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: false,
  },

  {
    _type: "product",
    name: "Plate Lunch - 300g",
    slug: { current: "plate-lunch-300g" },
    shortDescription: "Large lunch plate perfect for traditional meals.",
    description:
      "This substantial lunch plate is designed for traditional South Indian meals. Its generous size accommodates rice, curry, vegetables, and accompaniments, making it ideal for authentic dining experiences.",

    images: [],

    dimensions: {
      height: inchesToMm(1),
      diameter: inchesToMm(8.25),
      unit: "mm",
    },
    weight: {
      value: 300,
      unit: "g",
    },
    features: [
      "Large serving capacity",
      "Traditional meal design",
      "Generous proportions",
      "Authentic dining experience",
      "Substantial construction",
    ],
    craftingTechnique: "Traditional large plate forming",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: false,
  },

  // ===================
  // TRAYS
  // ===================
  {
    _type: "product",
    name: "Tray Nappu - 250g",
    slug: { current: "tray-nappu-250g" },
    shortDescription: "Traditional serving tray with Nappu edge design.",
    description:
      "The Nappu tray features a traditional edge design that adds both beauty and functionality. Perfect for serving tea, sweets, or as a decorative piece, this tray represents generations of silversmithing tradition.",

    images: [],

    dimensions: {
      height: inchesToMm(1.5),
      diameter: inchesToMm(8.25),
      unit: "mm",
    },
    weight: {
      value: 250,
      unit: "g",
    },
    features: [
      "Traditional Nappu edge design",
      "Multi-purpose serving",
      "Decorative and functional",
      "Generous serving area",
      "Cultural authenticity",
    ],
    craftingTechnique: "Traditional tray forming with Nappu edges",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: false,
  },

  {
    _type: "product",
    name: "Tray Ashtalakshmi - 500g",
    slug: { current: "tray-ashtalakshmi-500g" },
    shortDescription:
      "Sacred serving tray featuring the eight forms of Goddess Lakshmi.",
    description:
      "This magnificent serving tray showcases the complete Ashtalakshmi design, featuring all eight forms of Goddess Lakshmi. Each section represents different aspects of prosperity and abundance, making this tray perfect for religious ceremonies and auspicious occasions.",

    images: [],

    dimensions: {
      height: inchesToMm(1.9),
      diameter: inchesToMm(11.25),
      unit: "mm",
    },
    weight: {
      value: 500,
      unit: "g",
    },
    features: [
      "Complete Ashtalakshmi design",
      "Eight forms of Goddess Lakshmi",
      "Religious significance",
      "Ceremonial quality",
      "Substantial serving area",
    ],
    craftingTechnique: "Hand-engraved Ashtalakshmi patterns",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: true,
  },

  // ===================
  // COINS & BARS
  // ===================
  {
    _type: "product",
    name: "Silver Coin - 10g",
    slug: { current: "silver-coin-10g" },
    shortDescription:
      "Investment-grade silver coin perfect for collectors and investors.",
    description:
      "Our 10-gram silver coin represents pure investment-grade silver in a convenient, portable form. Perfect for gifting, collecting, or as a reliable store of value, each coin is crafted to exacting standards.",

    images: [],

    weight: {
      value: 10,
      unit: "g",
    },
    features: [
      "Investment-grade purity",
      "Convenient size",
      "Perfect for gifting",
      "Store of value",
      "Collector quality",
    ],
    craftingTechnique: "Precision minting",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: false,
  },

  {
    _type: "product",
    name: "Silver Bar - 100g",
    slug: { current: "silver-bar-100g" },
    shortDescription: "Pure silver bar for serious investors and collectors.",
    description:
      "This 100-gram silver bar represents a significant investment in precious metals. Crafted from the finest silver with precise weight and purity, it's perfect for those building a precious metals portfolio or making substantial gifts.",

    images: [],

    weight: {
      value: 100,
      unit: "g",
    },
    features: [
      "High-purity silver",
      "Investment grade",
      "Precise weight",
      "Substantial value",
      "Portfolio building",
    ],
    craftingTechnique: "Precision casting and finishing",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: false,
  },

  // ===================
  // VESSELS & COOKWARE
  // ===================
  {
    _type: "product",
    name: "Adukku - 200g",
    slug: { current: "adukku-200g" },
    shortDescription: "Traditional cooking vessel perfect for small portions.",
    description:
      "The Adukku is a traditional South Indian cooking vessel, perfect for preparing small portions of rice, dal, or other dishes. Its compact size and efficient heat distribution make it ideal for individual servings or small family meals.",

    images: [],

    dimensions: {
      height: inchesToMm(2.75),
      diameter: inchesToMm(4.5),
      unit: "mm",
    },
    weight: {
      value: 200,
      unit: "g",
    },
    features: [
      "Traditional cooking vessel",
      "Efficient heat distribution",
      "Perfect for small portions",
      "Compact size",
      "Authentic design",
    ],
    craftingTechnique: "Traditional vessel forming",
    origin: "Tamil Nadu, India",
    isAvailable: true,
    featured: false,
  },

  {
    _type: "product",
    name: "Mysore Chatti - 500g",
    slug: { current: "mysore-chatti-500g" },
    shortDescription: "Large traditional cooking pot from the Mysore region.",
    description:
      "The Mysore Chatti is a substantial cooking vessel traditionally used for preparing large quantities of food. Its wide base and deep sides make it perfect for cooking rice, curries, and other traditional dishes for families and gatherings.",

    images: [],

    dimensions: {
      height: inchesToMm(4.25),
      diameter: inchesToMm(7),
      unit: "mm",
    },
    weight: {
      value: 500,
      unit: "g",
    },
    features: [
      "Large cooking capacity",
      "Traditional Mysore design",
      "Wide base for even heating",
      "Family-sized portions",
      "Regional authenticity",
    ],
    craftingTechnique: "Traditional large vessel forming",
    origin: "Karnataka/Tamil Nadu, India",
    isAvailable: true,
    featured: false,
  },
];

export default silverCraftsProducts;
