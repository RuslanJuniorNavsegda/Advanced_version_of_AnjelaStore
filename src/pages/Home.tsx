import { Link } from "react-router-dom";
import useStore from "../store/useStore";
import { ShoppingBag, Truck, Shield, Heart } from "lucide-react";
import { Product } from "../types/product";

export default function Home() {
  const { products, isLoading } = useStore((state) => ({
    products: state.products,
    isLoading: state.isLoading,
  }));

  const featuredProducts = products.slice(0, 4);
  const girlsProducts = products
    .filter((p) => p.category === "girls")
    .slice(0, 4);
  const boysProducts = products
    .filter((p) => p.category === "boys")
    .slice(0, 4);
  const babyProducts = products
    .filter((p) => p.category === "baby")
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Anjela Store</h1>
            <p className="hero-subtitle">
              Discover our collection of stylish and comfortable children's
              clothing
            </p>
            <Link to="/products" className="btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Safe and secure payment options</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">
                High-quality materials and craftsmanship
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day hassle-free returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="product-card"
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Girls Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Girls Collection</h2>
            <Link to="/products?category=girls" className="btn-outline">
              View All
            </Link>
          </div>
          <div className="products-grid">
            {girlsProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="product-card"
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Boys Section */}
      <section className="section">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Boys Collection</h2>
            <Link to="/products?category=boys" className="btn-outline">
              View All
            </Link>
          </div>
          <div className="products-grid">
            {boysProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="product-card"
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Baby Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Baby Collection</h2>
            <Link to="/products?category=baby" className="btn-outline">
              View All
            </Link>
          </div>
          <div className="products-grid">
            {babyProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="product-card"
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
