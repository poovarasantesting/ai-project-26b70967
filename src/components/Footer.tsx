import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ShopEasy</h3>
            <p className="text-gray-600">
              Your one-stop shop for all your shopping needs.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-primary">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-600">
              <p>1234 Shop Street</p>
              <p>Shopping City, SC 12345</p>
              <p className="mt-2">Email: info@shopeasy.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {currentYear} ShopEasy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}