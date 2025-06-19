import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const { toast } = useToast();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checkout",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    });
    clearCart();
  };

  const applyPromoCode = () => {
    if (!promoCode) {
      toast({
        title: "Please enter a promo code",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Invalid promo code",
      description: "The code you entered is not valid or has expired",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild size="lg">
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Shopping Cart ({totalItems} items)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center py-4">
                    <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden mr-4 mb-4 sm:mb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-500 text-sm mb-2">Unit Price: ${item.price.toFixed(2)}</p>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-3 w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end mt-4 sm:mt-0">
                      <span className="font-bold text-lg mb-2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-0 h-auto"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button asChild variant="outline">
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button onClick={applyPromoCode}>Apply</Button>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${(totalPrice + totalPrice * 0.08).toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}