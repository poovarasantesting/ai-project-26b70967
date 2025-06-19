import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/data/products";

export default function Home() {
  const { data: featuredProducts } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const products = await fetchProducts();
      // Just get the first 4 products for the featured section
      return products.slice(0, 4);
    },
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-primary to-primary/70 text-white rounded-xl mb-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to ShopEasy
            </h1>
            <p className="text-lg mb-6">
              Discover amazing products at unbeatable prices. Your one-stop shop for all your needs.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=500&auto=format&fit=crop" 
              alt="Shopping" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts?.map((product) => (
              <Link 
                to={`/products/${product.id}`}
                key={product.id}
                className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-gray-500 mb-2">{product.category}</p>
                  <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-12 bg-gray-50 py-12 rounded-xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                  <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                  <line x1="12" y1="20" x2="12" y2="20"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders over $50</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our customer service team is available around the clock</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">All transactions are processed securely</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}