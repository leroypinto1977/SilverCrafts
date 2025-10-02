/**
 * Silvercrafts Materials - Based on Traditional South Indian Silverware
 * 
 * Materials commonly used in traditional South Indian silver craftsmanship
 */

export const silverCraftsMaterials = [
  {
    _type: 'material',
    name: 'Pure Silver (99.9%)',
    slug: { current: 'pure-silver-999' },
    description: 'Highest purity silver used for premium religious and ceremonial items.',
    properties: [
      { property: 'Purity', value: '99.9%' },
      { property: 'Malleability', value: 'Very High' },
      { property: 'Luster', value: 'Brilliant' },
      { property: 'Antimicrobial', value: 'Excellent' },
      { property: 'Tarnish Rate', value: 'Slow' },
    ],
  },
  {
    _type: 'material',
    name: 'Sterling Silver (92.5%)',
    slug: { current: 'sterling-silver-925' },
    description: 'Standard silver alloy providing excellent durability for daily use items.',
    properties: [
      { property: 'Purity', value: '92.5%' },
      { property: 'Durability', value: 'High' },
      { property: 'Workability', value: 'Excellent' },
      { property: 'Strength', value: 'Good' },
      { property: 'Daily Use', value: 'Ideal' },
    ],
  },
  {
    _type: 'material',
    name: 'Traditional Silver Alloy',
    slug: { current: 'traditional-silver-alloy' },
    description: 'Time-tested silver composition used in South Indian silvercraft traditions.',
    properties: [
      { property: 'Heritage', value: 'Traditional' },
      { property: 'Regional Authenticity', value: 'South Indian' },
      { property: 'Crafting Suitability', value: 'Excellent' },
      { property: 'Cultural Significance', value: 'High' },
    ],
  },
];

export default silverCraftsMaterials;