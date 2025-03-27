import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Heart,
  User,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import useStore from "../../store/useStore";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const cartItems = useStore((state) => state.cart);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { id: "girls", name: "Девочки", color: "pink" },
    { id: "boys", name: "Мальчики", color: "blue" },
    { id: "baby", name: "Малыши", color: "yellow" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <a
                href="tel:+79001234567"
                className="hover:text-white/80 transition-colors"
              >
                +7 (900) 123-45-67
              </a>
              <a
                href="mailto:info@angelastore.ru"
                className="hover:text-white/80 transition-colors"
              >
                info@angelastore.ru
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span>Доставка по всей России</span>
              <span>•</span>
              <span>Бесплатный возврат</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <span className="text-2xl font-bold text-gray-900">
              AnjelaStore
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="w-full px-4 py-2 pl-12 rounded-full border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            <Link
              to="/favorites"
              className="p-2 text-gray-600 hover:text-primary transition-colors duration-300 relative group"
            >
              <Heart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                0
              </span>
            </Link>
            <Link
              to="/account"
              className="p-2 text-gray-600 hover:text-primary transition-colors duration-300"
            >
              <User className="h-6 w-6" />
            </Link>
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-primary transition-colors duration-300 group"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-8 py-4 border-t">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group"
              onMouseEnter={() => setActiveCategory(category.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link
                to={`/products?category=${category.id}`}
                className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors duration-300"
              >
                <span>{category.name}</span>
                <ChevronDown className="h-4 w-4" />
              </Link>
              <div
                className={`absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ${
                  activeCategory === category.id
                    ? "translate-y-0"
                    : "translate-y-2"
                }`}
              >
                <Link
                  to={`/products?category=${category.id}&type=dresses`}
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors duration-300"
                >
                  Платья
                </Link>
                <Link
                  to={`/products?category=${category.id}&type=tops`}
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors duration-300"
                >
                  Футболки
                </Link>
                <Link
                  to={`/products?category=${category.id}&type=bottoms`}
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors duration-300"
                >
                  Брюки
                </Link>
              </div>
            </div>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <nav className="py-4 border-t">
            <div className="flex flex-col space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="relative">
                  <Link
                    to={`/products?category=${category.id}`}
                    className="flex items-center justify-between px-4 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{category.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
