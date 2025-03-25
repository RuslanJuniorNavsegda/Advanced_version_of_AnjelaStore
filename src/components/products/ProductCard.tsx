import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useStore } from "../../store/useStore";
import { Product } from "../../types/store";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Product Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
        {!product.inStock && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded">
            Out of Stock
          </span>
        )}
      </div>
    </Link>
  );
}
