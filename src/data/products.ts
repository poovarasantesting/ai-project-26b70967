export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Smartphone X",
    description: "A powerful smartphone with the latest features and technology.",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=500&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Laptop Pro",
    description: "Ultra-thin laptop with high performance and long battery life.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=500&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Wireless Headphones",
    description: "Premium noise-cancelling headphones for immersive sound experience.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    id: 4,
    name: "Smart Watch",
    description: "Track your fitness and stay connected with this sleek smart watch.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    id: 5,
    name: "Designer T-Shirt",
    description: "Comfortable cotton t-shirt with modern design.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500&auto=format&fit=crop",
    category: "Clothing"
  },
  {
    id: 6,
    name: "Running Shoes",
    description: "Lightweight and supportive shoes perfect for running or casual wear.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop",
    category: "Footwear"
  },
  {
    id: 7,
    name: "Coffee Maker",
    description: "Automatic coffee maker for brewing perfect coffee every time.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1570701123784-0ddb5d3f4d33?q=80&w=500&auto=format&fit=crop",
    category: "Home"
  },
  {
    id: 8,
    name: "Backpack",
    description: "Durable backpack with multiple compartments for organization.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop",
    category: "Accessories"
  }
];

// Simulate fetching products from an API
export const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

// Simulate fetching a single product by ID
export const fetchProductById = (id: number): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find(p => p.id === id);
      resolve(product);
    }, 500);
  });
};