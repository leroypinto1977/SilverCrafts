'use client'

import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Package, Eye } from 'lucide-react'

// Simple product interface for the current data structure
interface Product {
  _id: string
  name: string
  slug: { current: string }
  weightGrams: number
  heightInches?: number
  diameterInches?: number
  lengthInches?: number
  status?: string
  notes?: string
  category?: {
    _id: string
    name: string
    slug: { current: string }
  }
}

interface Category {
  _id: string
  name: string
  slug: { current: string }
}

// Product Detail Modal Component
interface ProductDetailModalProps {
  productId: string
  isOpen: boolean
  onClose: () => void
}

const ProductDetailModal = ({ productId, isOpen, onClose }: ProductDetailModalProps) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && productId) {
      setLoading(true)
      const query = `*[_type == "product" && _id == "${productId}"][0] {
        _id,
        name,
        slug,
        category->{_id, name, slug},
        weightGrams,
        heightInches,
        diameterInches,
        lengthInches,
        status,
        notes
      }`
      
      client.fetch(query)
        .then(setProduct)
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [productId, isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              Product Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading product details...</p>
            </div>
          ) : product ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-amber-600 font-medium">
                  Category: {product.category?.name || 'Uncategorized'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
                <div>
                  <span className="font-medium text-gray-700">Weight:</span>
                  <p className="text-gray-600">{product.weightGrams}g</p>
                </div>
                {product.heightInches && (
                  <div>
                    <span className="font-medium text-gray-700">Height:</span>
                    <p className="text-gray-600">{product.heightInches}"</p>
                  </div>
                )}
                {product.diameterInches && (
                  <div>
                    <span className="font-medium text-gray-700">Diameter:</span>
                    <p className="text-gray-600">{product.diameterInches}"</p>
                  </div>
                )}
                {product.lengthInches && (
                  <div>
                    <span className="font-medium text-gray-700">Length:</span>
                    <p className="text-gray-600">{product.lengthInches}"</p>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <span className="font-medium text-gray-700">Status:</span>
                <p className={`inline-block ml-2 px-3 py-1 rounded-full text-sm ${
                  product.status === 'Available' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.status || 'Available'}
                </p>
              </div>

              {product.notes && (
                <div className="border-t border-gray-200 pt-4">
                  <span className="font-medium text-gray-700">Notes:</span>
                  <p className="text-gray-600 mt-1">{product.notes}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Product not found</p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200">
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products with basic info
        const productsQuery = `*[_type == "product"] {
          _id,
          name,
          slug,
          category->{_id, name, slug},
          weightGrams,
          heightInches,
          diameterInches,
          lengthInches,
          status,
          notes
        } | order(name asc)`

        // Fetch categories
        const categoriesQuery = `*[_type == "category"] {
          _id,
          name,
          slug
        } | order(name asc)`

        const [productsData, categoriesData] = await Promise.all([
          client.fetch(productsQuery),
          client.fetch(categoriesQuery)
        ])

        console.log('Products fetched:', productsData?.length || 0)
        console.log('Categories fetched:', categoriesData?.length || 0)

        setProducts(productsData || [])
        setCategories(categoriesData || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
      product.category?.slug?.current === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">
              Our Artisan Collection
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our exquisite collection of handcrafted silverware, each piece telling a story of
              South Indian craftsmanship and timeless elegance.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category.slug.current}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Product Image Placeholder */}
                  <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <Package className="h-12 w-12 text-gray-400" />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-amber-600 text-sm font-medium">
                      {product.category?.name || 'Uncategorized'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Weight: {product.weightGrams}g
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.status === 'Available' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.status || 'Available'}
                      </span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Button 
                    onClick={() => setSelectedProductId(product._id)}
                    variant="outline" 
                    className="w-full mt-4 flex items-center justify-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria to discover more pieces.
            </p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        productId={selectedProductId || ''}
        isOpen={!!selectedProductId}
        onClose={() => setSelectedProductId(null)}
      />
    </div>
  )
}
