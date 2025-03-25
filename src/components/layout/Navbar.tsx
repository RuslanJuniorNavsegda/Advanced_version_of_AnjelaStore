import { Link } from "react-router-dom";
import useStore from "../../store/useStore";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cart = useStore((state) => state.cart);
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              AnjelaKids
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-primary">
              All Products
            </Link>
            <Link
              to="/products?category=girls"
              className="text-gray-700 hover:text-primary"
            >
              Girls
            </Link>
            <Link
              to="/products?category=boys"
              className="text-gray-700 hover:text-primary"
            >
              Boys
            </Link>
            <Link
              to="/products?category=babies"
              className="text-gray-700 hover:text-primary"
            >
              Babies
            </Link>
          </div>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 relative"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/products"
                className="text-gray-700 hover:text-primary"
                onClick={toggleMenu}
              >
                All Products
              </Link>
              <Link
                to="/products?category=girls"
                className="text-gray-700 hover:text-primary"
                onClick={toggleMenu}
              >
                Girls
              </Link>
              <Link
                to="/products?category=boys"
                className="text-gray-700 hover:text-primary"
                onClick={toggleMenu}
              >
                Boys
              </Link>
              <Link
                to="/products?category=babies"
                className="text-gray-700 hover:text-primary"
                onClick={toggleMenu}
              >
                Babies
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
