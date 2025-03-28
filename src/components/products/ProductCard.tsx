import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { useState } from "react";
import useStore from "../../store/useStore";

type Category = "girls" | "boys" | "baby";
type AgeGroup =
  | "0-12m"
  | "1-2y"
  | "2-3y"
  | "3-4y"
  | "4-5y"
  | "5-6y"
  | "6-7y"
  | "7-8y"
  | "8-9y"
  | "9-10y"
  | "10-12y";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  stock: number;
  rating?: number;
  description: string;
  ageGroup: AgeGroup;
  createdAt: string;
  updatedAt: string;
}

interface ProductCardProps {
  product: Product;
}

const categoryTranslations: Record<string, string> = {
  dresses: "Платья",
  blouses: "Блузки",
  skirts: "Юбки",
  pants: "Брюки",
  bags: "Сумки",
  jewelry: "Украшения",
  scarves: "Шарфы",
  belts: "Ремни",
  shoes: "Туфли",
  boots: "Сапоги",
  sandals: "Сандалии",
  sneakers: "Спортивная обувь",
};

const getStockStatus = (stock: number) => {
  if (stock === 0) {
    return {
      text: "Нет в наличии",
      color: "text-red-500",
      bg: "bg-red-50",
    };
  }
  if (stock < 5) {
    return {
      text: "Осталось несколько штук",
      color: "text-orange-500",
      bg: "bg-orange-50",
    };
  }
  return {
    text: "В наличии",
    color: "text-green-500",
    bg: "bg-green-50",
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        {/* Quick Actions */}
        <div
          className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          <button
            className="p-2 bg-white rounded-full shadow-md hover:bg-primary-50 hover:text-primary-600 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // Add to favorites functionality
            }}
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            className="p-2 bg-white rounded-full shadow-md hover:bg-primary-50 hover:text-primary-600 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // Quick view functionality
            }}
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="text-sm text-neutral-500 mb-1">
          {categoryTranslations[product.category] || product.category}
        </div>

        {/* Name */}
        <h3 className="text-lg font-medium text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 0)
                      ? "text-yellow-400 fill-current"
                      : "text-neutral-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-neutral-500">
              ({product.rating.toFixed(1)})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-neutral-900">
            {product.price.toLocaleString("ru-RU")} ₽
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`p-2 rounded-full transition-colors ${
              product.stock === 0
                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                : "bg-primary-50 text-primary-600 hover:bg-primary-100"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* Stock Status */}
        <div
          className={`mt-2 text-sm font-medium px-2 py-1 rounded-full inline-block ${stockStatus.bg} ${stockStatus.color}`}
        >
          {stockStatus.text}
        </div>
      </div>
    </Link>
  );
}
