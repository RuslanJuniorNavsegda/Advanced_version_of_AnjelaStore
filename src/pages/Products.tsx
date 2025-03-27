import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useStore from "../store/useStore";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ProductCard from "../components/products/ProductCard";

export default function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const {
    products,
    isLoading,
    error,
    selectedCategory,
    setSelectedCategory,
    fetchProducts,
  } = useStore((state) => ({
    products: state.products,
    isLoading: state.isLoading,
    error: state.error,
    selectedCategory: state.selectedCategory,
    setSelectedCategory: state.setSelectedCategory,
    fetchProducts: state.fetchProducts,
  }));

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
    fetchProducts();
  }, [category, setSelectedCategory, fetchProducts]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const categoryTranslations: { [key: string]: string } = {
    girls: "Девочки",
    boys: "Мальчики",
    baby: "Малыши",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Произошла ошибка
          </h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={fetchProducts}
            className="inline-block px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors duration-300"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Товары не найдены
          </h2>
          <p className="text-gray-600 mb-8">
            {selectedCategory
              ? `В категории "${categoryTranslations[selectedCategory]}" пока нет товаров`
              : "В данный момент товары отсутствуют"}
          </p>
          <button
            onClick={() => setSelectedCategory(null)}
            className="inline-block px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors duration-300"
          >
            Показать все товары
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {selectedCategory
            ? `Коллекция ${categoryTranslations[selectedCategory]}`
            : "Все товары"}
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Найдено {filteredProducts.length} товаров
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
