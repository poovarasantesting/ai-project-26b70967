import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Search } from "lucide-react";

export default function Products() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Extract unique categories from products
  const categories = products
    ? ["all", ...new Set(products.map((product) => product.category))]
    : ["all"];

  // Filter products based on search term and category
  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product detail
    e.stopPropagation(); // Stop event bubbling
    addToCart(product);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={(value) => setCategoryFilter(value)}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <Link to={`/products/${product.id}`} className="block">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm text-gray-500 mb-2">
                    {product.category}
                  </p>
                  <p className="text-xl font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 border rounded-lg">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}