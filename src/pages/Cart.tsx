import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import useStore from "../store/useStore";

export default function Cart() {
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
  const shipping = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Ваша корзина пуста
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Добавьте товары в корзину, чтобы увидеть их здесь.
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors duration-300"
          >
            Продолжить покупки
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 transition-colors duration-300"
        >
          <Trash2 className="h-5 w-5" />
          Очистить корзину
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-lg">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                  <p className="text-primary font-semibold mt-2 text-xl">
                    {item.price.toFixed(2)} ₽
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                    aria-label="Уменьшить количество"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.min(10, item.quantity + 1))
                    }
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                    aria-label="Увеличить количество"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 rounded-full hover:bg-red-50 text-red-600 transition-colors duration-300"
                    aria-label="Удалить товар"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-6">Сумма заказа</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Подытог</span>
              <span>{subtotal.toFixed(2)} ₽</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Доставка</span>
              <span>
                {shipping === 0 ? "Бесплатно" : `${shipping.toFixed(2)} ₽`}
              </span>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Итого</span>
                <span>{total.toFixed(2)} ₽</span>
              </div>
            </div>
          </div>
          <Link
            to="/checkout"
            className="block w-full mt-8 px-8 py-3 bg-primary text-white rounded-full font-medium text-center hover:bg-primary/90 transition-colors duration-300"
          >
            Оформить заказ
          </Link>
        </div>
      </div>
    </div>
  );
}
