"use client";

import { useState, useEffect } from "react";
import { Search, Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity";
import { Product, Category, Collection } from "@/types/sanity";
import Image from "next/image";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, selectedCollection, sortBy]);

  const fetchData = async () => {
    try {
      // Fetch products with related data
      const productsQuery = `
        *[_type == "product" && isAvailable == true] {
          _id,
          name,
          slug,
          description,
          shortDescription,
          images,
          category->{
            _id,
            name,
            slug
          },
          collection->{
            _id,
            name,
            slug
          },
          materials[]->{
            _id,
            name,
            properties
          },
          dimensions,
          features,
          craftingTechnique,
          origin,
          artisan,
          featured,
          createdAt
        }
      `;

      // Fetch categories
      const categoriesQuery = `
        *[_type == "category"] {
          _id,
          name,
          slug,
          description,
          image
        }
      `;

      // Fetch collections
      const collectionsQuery = `
        *[_type == "collection"] {
          _id,
          name,
          slug,
          description,
          image,
          featured
        }
      `;

      const [productsData, categoriesData, collectionsData] = await Promise.all(
        [
          client.fetch(productsQuery),
          client.fetch(categoriesQuery),
          client.fetch(collectionsQuery),
        ]
      );

      setProducts(productsData);
      setCategories(categoriesData);
      setCollections(collectionsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // You could set some fallback data here if needed
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category?.slug.current === selectedCategory;
      const matchesCollection =
        selectedCollection === "all" ||
        product.collection?.slug.current === selectedCollection;

      return matchesSearch && matchesCategory && matchesCollection;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return (a.category?.name || "").localeCompare(b.category?.name || "");
        case "newest":
          return (
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
          );
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">
              Loading our exquisite collection...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Artisan Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our exquisite collection of handcrafted silverware, each
            piece telling a story of European craftsmanship and timeless
            elegance.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search our collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
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

          <Select
            value={selectedCollection}
            onValueChange={setSelectedCollection}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Collection" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Collections</SelectItem>
              {collections.map((collection) => (
                <SelectItem
                  key={collection._id}
                  value={collection.slug.current}
                >
                  {collection.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="featured">Featured First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">No products found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria to discover more
              pieces.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product._id}
                className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-primary/50"
              >
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                    {product.images?.[0] ? (
                      <Image
                        src={urlFor(product.images[0])
                          .width(400)
                          .height(400)
                          .url()}
                        alt={product.images[0].alt || product.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    {product.category && (
                      <Badge variant="secondary" className="text-xs">
                        {product.category.name}
                      </Badge>
                    )}
                    {product.featured && (
                      <Badge variant="default" className="text-xs bg-primary">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <CardTitle className="text-lg mb-2 line-clamp-2">
                    {product.name}
                  </CardTitle>

                  <CardDescription className="text-sm mb-4 line-clamp-3">
                    {product.shortDescription || product.description}
                  </CardDescription>

                  {/* Product Details */}
                  <div className="space-y-2 mb-4 text-xs text-gray-600">
                    {product.craftingTechnique && (
                      <p>
                        <span className="font-medium">Technique:</span>{" "}
                        {product.craftingTechnique}
                      </p>
                    )}
                    {product.origin && (
                      <p>
                        <span className="font-medium">Origin:</span>{" "}
                        {product.origin}
                      </p>
                    )}
                    {product.artisan && (
                      <p>
                        <span className="font-medium">Artisan:</span>{" "}
                        {product.artisan}
                      </p>
                    )}
                  </div>

                  {/* Materials */}
                  {product.materials && product.materials.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-600 mb-1">
                        Materials:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {product.materials.map((material) => (
                          <Badge
                            key={material._id}
                            variant="outline"
                            className="text-xs"
                          >
                            {material.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link href={`/products/${product.slug.current}`}>
                    <Button className="w-full group">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button (if needed) */}
        {filteredProducts.length > 0 && filteredProducts.length >= 12 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Discover More Pieces
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
