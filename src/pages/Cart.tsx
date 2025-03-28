import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useCallback } from "react";
import useStore from "../store/useStore";
import { CartItem } from "../types/product";

const SHIPPING_THRESHOLD = 5000;
const SHIPPING_COST = 500;
const MAX_QUANTITY = 10;

export default function Cart() {
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const { cart, updateQuantity, removeFromCart, clearCart } = useStore(
    (state) => ({
      cart: state.cart,
      updateQuantity: state.updateQuantity,
      removeFromCart: state.removeFromCart,
      clearCart: state.clearCart,
    })
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const handleRemoveItem = useCallback(
    async (productId: string) => {
      setIsRemoving(productId);
      await new Promise((resolve) => setTimeout(resolve, 300));
      removeFromCart(productId);
      setIsRemoving(null);
    },
    [removeFromCart]
  );

  const handleUpdateQuantity = useCallback(
    (item: CartItem, newQuantity: number) => {
      updateQuantity(item.id, newQuantity);
    },
    [updateQuantity]
  );

  const renderEmptyCart = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-12 h-12 text-primary-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">
        Корзина пуста
      </h2>
      <p className="text-neutral-500 text-center mb-8">
        Добавьте товары в корзину, чтобы оформить заказ
      </p>
      <Link
        to="/products"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Перейти к покупкам
      </Link>
    </div>
  );

  const renderCartItem = (item: CartItem) => (
    <div
      key={item.id}
      className={`flex items-center py-6 border-b border-neutral-200 ${
        isRemoving === item.id ? "opacity-0 scale-95" : ""
      }`}
    >
      <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="ml-4 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-neutral-900">{item.name}</h3>
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="text-neutral-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-1 text-sm text-neutral-500">{item.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                handleUpdateQuantity(item, Math.max(0, item.quantity - 1))
              }
              className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() =>
                handleUpdateQuantity(
                  item,
                  Math.min(MAX_QUANTITY, item.quantity + 1)
                )
              }
              className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <p className="text-lg font-medium text-neutral-900">
            {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
          </p>
        </div>
      </div>
    </div>
  );

  const renderOrderSummary = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-neutral-900 mb-4">
        Сумма заказа
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between text-neutral-600">
          <span>Подытог</span>
          <span>{subtotal.toLocaleString("ru-RU")} ₽</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Доставка</span>
          <span>{shipping.toLocaleString("ru-RU")} ₽</span>
        </div>
        <div className="border-t border-neutral-200 pt-4">
          <div className="flex justify-between text-lg font-medium text-neutral-900">
            <span>Итого</span>
            <span>{total.toLocaleString("ru-RU")} ₽</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          // Implement checkout functionality
          console.log("Proceeding to checkout...");
        }}
        className="mt-6 w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
      >
        Оформить заказ
      </button>
      {shipping > 0 && (
        <p className="mt-4 text-sm text-neutral-500 text-center">
          Бесплатная доставка при заказе от 3000₽
        </p>
      )}
    </div>
  );

  if (cart.length === 0) {
    return renderEmptyCart();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-neutral-900">Корзина</h1>
            <button
              onClick={clearCart}
              className="text-sm text-neutral-500 hover:text-red-500 transition-colors"
            >
              Очистить корзину
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-sm divide-y divide-neutral-200">
            {cart.map(renderCartItem)}
          </div>
        </div>
        <div className="lg:w-80">{renderOrderSummary()}</div>
      </div>
    </div>
  );
}
