const products = [
  {
    id: 1,
    name: "Платье с цветами",
    price: 2499,
    category: "Девочки",
    image: "images/dress.jpg",
  },
  {
    id: 2,
    name: "Джинсы с динозаврами",
    price: 1899,
    category: "Мальчики",
    image: "images/jeans.jpg",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
  initScrollAnimations();
  initCart();
});

// Анимации при скролле
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll("[data-scroll]")
    .forEach((el) => observer.observe(el));

  // Анимация хедера при скролле
  window.addEventListener("scroll", () => {
    document
      .querySelector(".header")
      .classList.toggle("scrolled", window.scrollY > 50);
  });
}

// Рендер товаров
function renderProducts() {
  const container = document.getElementById("products-container");
  container.innerHTML = products
    .map(
      (product, index) => `
        <div class="product-card" data-scroll="slide-up" data-scroll-delay="${
          index * 150
        }">
            <img class="product-image" src="${product.image}" alt="${
        product.name
      }">
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price} ₽</p>
                <button class="add-to-cart" onclick="addToCart(${
                  product.id
                })">В корзину</button>
            </div>
        </div>
    `
    )
    .join("");
}

// Работа с корзиной
function initCart() {
  document.querySelector(".cart-link").addEventListener("click", toggleCart);
  document.querySelector(".close-cart").addEventListener("click", toggleCart);
  document.getElementById("cartModal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("cartModal")) toggleCart();
  });
  renderCart();
}

function toggleCart() {
  document.getElementById("cartModal").classList.toggle("active");
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  animateCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  container.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price} ₽</div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `
    )
    .join("");

  document.getElementById("cartTotal").textContent = `${total} ₽`;
}

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

function animateCart() {
  const cartIcon = document.querySelector(".cart-link");
  cartIcon.style.transform = "scale(1.2)";
  setTimeout(() => (cartIcon.style.transform = "scale(1)"), 300);
}
