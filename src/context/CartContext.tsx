import { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setItems(currentItems => {
      // Check if item already exists in cart
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity of existing item
        const updatedItems = currentItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        
        toast({
          title: "Cart updated",
          description: `${product.name} quantity increased to ${existingItem.quantity + 1}`,
        });
        
        return updatedItems;
      } else {
        // Add new item to cart
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        });
        
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === id);
      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.name} has been removed from your cart`,
        });
      }
      return currentItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  // Calculate total items and price
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}