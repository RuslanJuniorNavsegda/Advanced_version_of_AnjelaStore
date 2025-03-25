import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { useSearchParams } from "react-router-dom";
import { Filter, SortAsc, SortDesc } from "lucide-react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ProductCard from "../components/products/ProductCard";

type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");

  const {
    products,
    isLoading,
    searchQuery,
    selectedCategory,
    selectedAgeGroup,
    setSelectedCategory,
    setSelectedAgeGroup,
  } = useStore();

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams, setSelectedCategory]);

  const categories = ["All", "Girls", "Boys", "Babies", "Accessories"];
  const ageGroups = [
    "All",
    "0-2 years",
    "2-4 years",
    "4-6 years",
    "6-8 years",
    "8+ years",
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory ||
        selectedCategory === "All" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesAge =
        !selectedAgeGroup ||
        selectedAgeGroup === "All" ||
        product.ageGroup === selectedAgeGroup;
      return matchesSearch && matchesCategory && matchesAge;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category === "All" ? null : category)
                  }
                  className={`block w-full text-left px-4 py-2 rounded-lg ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Age Groups</h3>
            <div className="space-y-2">
              {ageGroups.map((age) => (
                <button
                  key={age}
                  onClick={() =>
                    setSelectedAgeGroup(age === "All" ? null : age)
                  }
                  className={`block w-full text-left px-4 py-2 rounded-lg ${
                    selectedAgeGroup === age
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filters Button & Sort */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="md:hidden flex items-center space-x-2 text-gray-600"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>

            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Mobile Filters Modal */}
          {isMobileFiltersOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setIsMobileFiltersOpen(false)}
              />
              <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-white p-6">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(
                              category === "All" ? null : category
                            );
                            setIsMobileFiltersOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 rounded-lg ${
                            selectedCategory === category
                              ? "bg-primary text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Age Groups</h3>
                    <div className="space-y-2">
                      {ageGroups.map((age) => (
                        <button
                          key={age}
                          onClick={() => {
                            setSelectedAgeGroup(age === "All" ? null : age);
                            setIsMobileFiltersOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 rounded-lg ${
                            selectedAgeGroup === age
                              ? "bg-primary text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {age}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {isLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
