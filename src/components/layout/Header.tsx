import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Heart,
  User,
  ChevronDown,
  Phone,
  Mail,
  Truck,
  RefreshCw,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import useStore from "../../store/useStore";

interface CartItem {
  id: string;
  quantity: number;
}

const categories = [
  {
    name: "Одежда",
    subcategories: [
      { name: "Платья", href: "/category/dresses" },
      { name: "Блузки", href: "/category/blouses" },
      { name: "Юбки", href: "/category/skirts" },
      { name: "Брюки", href: "/category/pants" },
    ],
  },
  {
    name: "Аксессуары",
    subcategories: [
      { name: "Сумки", href: "/category/bags" },
      { name: "Украшения", href: "/category/jewelry" },
      { name: "Шарфы", href: "/category/scarves" },
      { name: "Ремни", href: "/category/belts" },
    ],
  },
  {
    name: "Обувь",
    subcategories: [
      { name: "Туфли", href: "/category/shoes" },
      { name: "Сапоги", href: "/category/boots" },
      { name: "Сандалии", href: "/category/sandals" },
      { name: "Спортивная обувь", href: "/category/sneakers" },
    ],
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const cart = useStore((state) => state.cart);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const cartItemsCount = cart.reduce(
    (total: number, item: CartItem) => total + item.quantity,
    0
  );

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-neutral-900 text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <a
                href="tel:+79001234567"
                className="flex items-center hover:text-primary-400 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                +7 (900) 123-45-67
              </a>
              <a
                href="mailto:info@anjela.ru"
                className="flex items-center hover:text-primary-400 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                info@anjela.ru
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-primary-400">
                <Truck className="w-4 h-4 mr-2" />
                Бесплатная доставка от 3000₽
              </div>
              <div className="flex items-center text-primary-400">
                <RefreshCw className="w-4 h-4 mr-2" />
                Возврат в течение 14 дней
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">A</span>
            </div>
            <span className="text-2xl font-serif font-bold text-neutral-900">
              Anjela
            </span>
          </Link>

          {/* Search */}
          <div ref={searchRef} className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Поиск товаров..."
                className={`w-full px-4 py-2 pl-12 rounded-full border-2 transition-all duration-200 ${
                  isSearchFocused
                    ? "border-primary-500 shadow-lg"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            </form>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/favorites"
              className="p-2 hover:text-primary-600 transition-colors"
            >
              <Heart className="w-6 h-6" />
            </Link>
            <Link
              to="/account"
              className="p-2 hover:text-primary-600 transition-colors"
            >
              <User className="w-6 h-6" />
            </Link>
            <Link
              to="/cart"
              className="p-2 hover:text-primary-600 transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:text-primary-600 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center space-x-8 mt-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative group"
              onMouseEnter={() => setActiveCategory(category.name)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <button className="flex items-center space-x-1 py-2 text-neutral-700 hover:text-primary-600 transition-colors">
                <span>{category.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeCategory === category.name && (
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 mt-2">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.name}
                      to={subcategory.href}
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-colors"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-4">
              {categories.map((category) => (
                <div key={category.name}>
                  <button
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === category.name ? null : category.name
                      )
                    }
                    className="flex items-center justify-between w-full py-2 text-neutral-700 hover:text-primary-600 transition-colors"
                  >
                    <span>{category.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 transform transition-transform ${
                        activeCategory === category.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeCategory === category.name && (
                    <div className="pl-4 space-y-2 mt-2">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.name}
                          to={subcategory.href}
                          className="block py-2 text-neutral-600 hover:text-primary-600 transition-colors"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-neutral-200">
                <Link
                  to="/favorites"
                  className="flex items-center py-2 text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Избранное
                </Link>
                <Link
                  to="/account"
                  className="flex items-center py-2 text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  <User className="w-5 h-5 mr-2" />
                  Личный кабинет
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center py-2 text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Корзина
                  {cartItemsCount > 0 && (
                    <span className="ml-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
