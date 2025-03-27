import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, Clock, RefreshCw } from "lucide-react";
import useStore from "../store/useStore";
import ProductCard from "../components/products/ProductCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function Home() {
  const { products, isLoading, fetchProducts } = useStore((state) => ({
    products: state.products,
    isLoading: state.isLoading,
    fetchProducts: state.fetchProducts,
  }));

  const featuredProducts = products.filter((product) => product.featured);
  const girlsProducts = products.filter(
    (product) => product.category === "girls"
  );
  const boysProducts = products.filter(
    (product) => product.category === "boys"
  );
  const babyProducts = products.filter(
    (product) => product.category === "baby"
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-primary/90 to-primary/70">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">
              Модная детская одежда для ваших малышей
            </h1>
            <p className="text-xl mb-8">
              Откройте для себя коллекцию стильной и комфортной детской одежды
              для всех возрастов
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors duration-300"
            >
              Смотреть коллекцию
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <Truck className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-medium text-gray-900">Бесплатная доставка</h3>
              <p className="text-sm text-gray-500">При заказе от 5000₽</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-medium text-gray-900">Безопасная оплата</h3>
              <p className="text-sm text-gray-500">Все способы оплаты</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <Clock className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-medium text-gray-900">Быстрая доставка</h3>
              <p className="text-sm text-gray-500">1-3 рабочих дня</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <RefreshCw className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-medium text-gray-900">Легкий возврат</h3>
              <p className="text-sm text-gray-500">В течение 14 дней</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Популярные товары
          </h2>
          <Link
            to="/products"
            className="text-primary hover:text-primary/80 transition-colors duration-300"
          >
            Смотреть все
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Коллекции</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/products?category=girls"
            className="group relative h-[400px] rounded-xl overflow-hidden"
          >
            <img
              src="/girls-collection.jpg"
              alt="Коллекция для девочек"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Девочки</h3>
              <p className="text-white/80">
                Стильная одежда для маленьких принцесс
              </p>
            </div>
          </Link>

          <Link
            to="/products?category=boys"
            className="group relative h-[400px] rounded-xl overflow-hidden"
          >
            <img
              src="/boys-collection.jpg"
              alt="Коллекция для мальчиков"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Мальчики</h3>
              <p className="text-white/80">
                Удобная одежда для маленьких джентльменов
              </p>
            </div>
          </Link>

          <Link
            to="/products?category=baby"
            className="group relative h-[400px] rounded-xl overflow-hidden"
          >
            <img
              src="/baby-collection.jpg"
              alt="Коллекция для малышей"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Малыши</h3>
              <p className="text-white/80">
                Нежная и комфортная одежда для малышей
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
