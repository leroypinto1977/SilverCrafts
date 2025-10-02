import { category } from './category'
import { material } from './material'
import { product } from './product'
import { collection } from './collection'
import { page } from './page'
import { testimonial } from './testimonial'

export const schemaTypes = [
  // Product-related schemas
  category,
  material,
  product,
  collection,
  
  // Content schemas
  page,
  testimonial,
]