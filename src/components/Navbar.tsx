import { Link } from "react-router-dom";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            ShopEasy
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary">
              Products
            </Link>
          </nav>

          {/* User and cart actions - desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/cart"
                className="text-gray-700 hover:text-primary flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart ({totalItems})
              </Link>
            </div>

            <div className="pt-2 border-t">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">Signed in as {user?.name}</p>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    asChild
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}