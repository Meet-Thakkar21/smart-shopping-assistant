"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const categories = [
  "Trending",
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
];

// Product data
const products = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    price: 249.99,
    salePrice: 199.99,
    category: "Electronics",
    rating: 4.8,
    reviewCount: 256,
    image: "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isSale: true,
    isNew: false,
    onSale: true,
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 399.99,
    salePrice: null,
    category: "Electronics",
    rating: 4.6,
    reviewCount: 189,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isSale: false,
    isNew: true,
    onSale: false,
  },
  {
    id: 3,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    salePrice: 19.99,
    category: "Fashion",
    rating: 4.5,
    reviewCount: 320,
    image: "https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isSale: true,
    isNew: false,
    onSale: true,
  },
  {
    id: 4,
    name: "Minimalist Desk Lamp",
    price: 79.99,
    salePrice: null,
    category: "Home",
    rating: 4.3,
    reviewCount: 142,
    image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isSale: false,
    isNew: true,
    onSale: false,
  },
  {
    id: 5,
    name: "Natural Skin Care Set",
    price: 89.99,
    salePrice: 69.99,
    category: "Beauty",
    rating: 4.7,
    reviewCount: 203,
    image: "https://images.pexels.com/photos/3737586/pexels-photo-3737586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isSale: true,
    isNew: false,
    onSale: true,
  },
  {
    id: 6,
    name: "Wireless Earbuds Pro",
    price: 129.99,
    salePrice: null,
    category: "Electronics",
    rating: 4.4,
    reviewCount: 178,
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isSale: false,
    isNew: true,
    onSale: false,
  },
  {
    id: 7,
    name: "Designer Sunglasses",
    price: 149.99,
    salePrice: 99.99,
    category: "Fashion",
    rating: 4.5,
    reviewCount: 156,
    image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isSale: true,
    isNew: false,
    onSale: true,
  },
  {
    id: 8,
    name: "Smart Home Security Camera",
    price: 199.99,
    salePrice: null,
    category: "Home",
    rating: 4.6,
    reviewCount: 231,
    image: "https://images.pexels.com/photos/207589/pexels-photo-207589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isSale: false,
    isNew: true,
    onSale: false,
  },
];

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card 
        className={cn(
          "overflow-hidden transition-all duration-300 h-full",
          isHovered && "shadow-lg"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered && "scale-110"
            )}
          />
          
          {/* Product badges */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
            )}
            {product.onSale && (
              <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
            )}
          </div>

          {/* Quick action buttons - show on hover */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <Button size="icon" variant="secondary" className="rounded-full" aria-label="Quick view">
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full" aria-label="Add to wishlist">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full" aria-label="Add to cart">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          
          <div className="flex items-center mt-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(product.rating) 
                      ? "text-amber-400 fill-amber-400" 
                      : "text-gray-300 dark:text-gray-600"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              ({product.reviewCount})
            </span>
          </div>
          
          <div className="flex items-center mt-1">
            {product.salePrice ? (
              <>
                <span className="font-medium text-foreground">${product.salePrice}</span>
                <span className="ml-2 text-sm text-muted-foreground line-through">${product.price}</span>
              </>
            ) : (
              <span className="font-medium text-foreground">${product.price}</span>
            )}
          </div>
          
          <Button 
            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProductShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("Trending");

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "Trending"
    ? products
    : products.filter(product => product.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-16 bg-muted/30" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="mt-2 text-muted-foreground">
              Discover our curated selection of top products
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="mt-4 md:mt-0"
            onClick={() => {
              // Would navigate to full shop page
            }}
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="Trending" className="mb-8">
          <TabsList className="flex flex-wrap w-full justify-start mb-6 bg-transparent">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700",
                  "dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400",
                  "rounded-full px-4 py-2 transition-all"
                )}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={category} // Add key to force re-animation when tab changes
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductShowcase;