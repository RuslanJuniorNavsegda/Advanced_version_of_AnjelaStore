import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    clearCart();
    navigate("/thank-you");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Корзина пуста</h2>
          <p className="mb-4">
            Добавьте товары в корзину, чтобы оформить заказ
          </p>
          <button onClick={() => navigate("/products")} className="btn-primary">
            Перейти к товарам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="order-2 md:order-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="name" className="label">
                Имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="label">
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address" className="label">
                Адрес доставки
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Оформить заказ
            </button>
          </form>
        </div>

        <div className="order-1 md:order-2">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Ваш заказ</h3>
            </div>

            <div className="card-body divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="py-4 flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x {item.price} ₽
                    </p>
                  </div>
                  <p className="font-medium">{item.price * item.quantity} ₽</p>
                </div>
              ))}
            </div>

            <div className="card-footer space-y-2">
              <div className="flex justify-between">
                <p>Подытог</p>
                <p>{subtotal} ₽</p>
              </div>
              <div className="flex justify-between">
                <p>Доставка</p>
                <p>{shipping} ₽</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Итого</p>
                <p>{total} ₽</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
