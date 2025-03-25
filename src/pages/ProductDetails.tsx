import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const { product, isLoading, addToCart } = useStore((state) => ({
    product: state.products.find((p) => p.id === id),
    isLoading: state.isLoading,
    addToCart: state.addToCart,
  }));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-primary font-bold mb-6">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-8">{product.description}</p>

          <div className="space-y-6">
            {/* Category & Age Group */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="mt-1 text-lg">{product.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Age Group</h3>
                <p className="mt-1 text-lg">{product.ageGroup}</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 rounded-full border hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 rounded-full border hover:bg-gray-100"
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full flex items-center justify-center space-x-2 px-8 py-4 rounded-lg text-white font-semibold transition-colors ${
                product.inStock
                  ? "bg-primary hover:bg-primary-dark"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
            </button>

            {/* Stock Status */}
            {!product.inStock && (
              <p className="text-red-500 text-center">
                This product is currently out of stock.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
