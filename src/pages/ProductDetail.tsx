import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <Skeleton className="w-full aspect-square rounded-lg" />
          </div>
          <div className="md:w-1/2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/3" />
            <div className="space-y-2 mt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-10 w-full mt-6" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/products')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate('/products')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
      </Button>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="rounded-lg overflow-hidden border">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="text-gray-500 ml-2">(24 reviews)</span>
          </div>
          
          <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
              {product.category}
            </div>
          </div>
          
          <Button 
            size="lg" 
            className="w-full"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>✓ In stock and ready to ship</p>
            <p>✓ Free shipping on orders over $50</p>
            <p>✓ 30-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
}