"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  Share2,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity";
import { Product } from "@/types/sanity";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      fetchProduct(params.slug as string);
    }
  }, [params.slug]);

  const fetchProduct = async (slug: string) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch the specific product
      const productQuery = `
        *[_type == "product" && slug.current == $slug && isAvailable == true][0] {
          _id,
          name,
          slug,
          description,
          shortDescription,
          images,
          category->{
            _id,
            name,
            slug,
            description
          },
          collection->{
            _id,
            name,
            slug,
            description
          },
          materials[]->{
            _id,
            name,
            description,
            properties,
            careInstructions
          },
          dimensions,
          weight,
          features,
          craftingTechnique,
          origin,
          artisan,
          careInstructions,
          specifications,
          featured,
          createdAt
        }
      `;

      const productData = await client.fetch(productQuery, { slug });

      if (!productData) {
        setError("Product not found");
        return;
      }

      setProduct(productData);

      // Fetch related products from the same category
      if (productData.category) {
        const relatedQuery = `
          *[_type == "product" && 
            category._ref == $categoryId && 
            _id != $productId && 
            isAvailable == true
          ][0...4] {
            _id,
            name,
            slug,
            shortDescription,
            images,
            category->{
              name
            },
            featured
          }
        `;

        const relatedData = await client.fetch(relatedQuery, {
          categoryId: productData.category._id,
          productId: productData._id,
        });

        setRelatedProducts(relatedData);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (product?.images && currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const shareProduct = () => {
    if (navigator.share && product) {
      navigator.share({
        title: product.name,
        text: product.shortDescription || product.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Product URL copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-8">
              {error || "The product you're looking for doesn't exist."}
            </p>
            <Link href="/products">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <span>/</span>
          {product.category && (
            <>
              <span>{product.category.name}</span>
              <span>/</span>
            </>
          )}
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
              {product.images && product.images.length > 0 ? (
                <>
                  <Image
                    src={urlFor(product.images[currentImageIndex])
                      .width(600)
                      .height(600)
                      .url()}
                    alt={product.images[currentImageIndex].alt || product.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />

                  {product.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={prevImage}
                        disabled={currentImageIndex === 0}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={nextImage}
                        disabled={
                          currentImageIndex === product.images.length - 1
                        }
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image Available</span>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex
                        ? "border-primary"
                        : "border-gray-200"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={urlFor(image).width(80).height(80).url()}
                      alt={image.alt || `${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {product.category && (
                  <Badge variant="secondary">{product.category.name}</Badge>
                )}
                {product.featured && (
                  <Badge variant="default" className="bg-primary">
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {product.shortDescription && (
                <p className="text-xl text-gray-600 mb-6">
                  {product.shortDescription}
                </p>
              )}
            </div>

            {/* Quick Details */}
            <div className="grid grid-cols-2 gap-4">
              {product.craftingTechnique && (
                <div>
                  <h3 className="font-medium text-gray-900">
                    Crafting Technique
                  </h3>
                  <p className="text-gray-600">{product.craftingTechnique}</p>
                </div>
              )}
              {product.origin && (
                <div>
                  <h3 className="font-medium text-gray-900">Origin</h3>
                  <p className="text-gray-600">{product.origin}</p>
                </div>
              )}
              {product.artisan && (
                <div>
                  <h3 className="font-medium text-gray-900">Artisan</h3>
                  <p className="text-gray-600">{product.artisan}</p>
                </div>
              )}
              {product.collection && (
                <div>
                  <h3 className="font-medium text-gray-900">Collection</h3>
                  <p className="text-gray-600">{product.collection.name}</p>
                </div>
              )}
            </div>

            {/* Materials */}
            {product.materials && product.materials.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Materials</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((material) => (
                    <Badge key={material._id} variant="outline">
                      {material.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Dimensions & Weight */}
            {(product.dimensions || product.weight) && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Specifications
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  {product.dimensions && (
                    <div>
                      <span className="font-medium">Dimensions: </span>
                      {product.dimensions.length &&
                        `L: ${product.dimensions.length}${product.dimensions.unit || "mm"}`}
                      {product.dimensions.width &&
                        ` × W: ${product.dimensions.width}${product.dimensions.unit || "mm"}`}
                      {product.dimensions.height &&
                        ` × H: ${product.dimensions.height}${product.dimensions.unit || "mm"}`}
                    </div>
                  )}
                  {product.weight && (
                    <div>
                      <span className="font-medium">Weight: </span>
                      {product.weight.value} {product.weight.unit}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={shareProduct}
                variant="outline"
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="care">Care Instructions</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                {product.description ? (
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">
                    No detailed description available.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                {product.features && product.features.length > 0 ? (
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">
                    No specific features listed.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="care" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                {product.careInstructions ? (
                  <div className="text-gray-700 leading-relaxed">
                    {typeof product.careInstructions === "string" ? (
                      <p>{product.careInstructions}</p>
                    ) : Array.isArray(product.careInstructions) ? (
                      <ul className="space-y-2">
                        {product.careInstructions.map(
                          (instruction: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              <span>{instruction}</span>
                            </li>
                          )
                        )}
                      </ul>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No care instructions provided.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-bold">
                Related Products
              </h2>
              <Link href="/products">
                <Button variant="outline">View All Products</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct._id}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                      {relatedProduct.images?.[0] ? (
                        <Image
                          src={urlFor(relatedProduct.images[0])
                            .width(300)
                            .height(300)
                            .url()}
                          alt={
                            relatedProduct.images[0].alt || relatedProduct.name
                          }
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      {relatedProduct.category && (
                        <Badge variant="secondary" className="text-xs">
                          {relatedProduct.category.name}
                        </Badge>
                      )}
                      {relatedProduct.featured && (
                        <Badge variant="default" className="text-xs bg-primary">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <CardTitle className="text-lg mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </CardTitle>

                    {relatedProduct.shortDescription && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {relatedProduct.shortDescription}
                      </p>
                    )}

                    <Link href={`/products/${relatedProduct.slug.current}`}>
                      <Button className="w-full" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Back to Products */}
        <div className="text-center mt-16">
          <Link href="/products">
            <Button variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Products
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
