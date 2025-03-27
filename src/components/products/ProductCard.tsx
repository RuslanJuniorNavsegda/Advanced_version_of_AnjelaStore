import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import useStore from "../../store/useStore";
import { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const categoryTranslations: { [key: string]: string } = {
    girls: "Девочки",
    boys: "Мальчики",
    baby: "Малыши",
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative block overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.stock < 5 && product.stock > 0 && (
          <span className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1.5 text-xs font-medium rounded-full shadow-sm">
            Осталось мало
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 text-xs font-medium rounded-full shadow-sm">
            Нет в наличии
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5">
        <h3 className="text-base font-medium text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {categoryTranslations[product.category]}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-primary">
              {product.price.toFixed(2)} ₽
            </p>
            {product.rating && (
              <div className="flex items-center mt-1">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-sm text-gray-500">
                  {product.rating.toFixed(1)} ({product.reviews})
                </span>
              </div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="p-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
            aria-label="Добавить в корзину"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}
