// Данные товаров
const products = [
  {
    id: 1,
    name: "Платье с цветами",
    price: 899,
    category: "Девочки",
    image: "images/dress.jpg",
  },
  {
    id: 2,
    name: "Джинсы с динозаврами",
    price: 1200,
    category: "Мальчики",
    image: "images/jeans.jpg",
  },
];

// Корзина
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
  initScrollAnimations();
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
    { threshold: 0.1 }
  );

  document
    .querySelectorAll("[data-scroll]")
    .forEach((el) => observer.observe(el));

  // Анимация шапки
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    header.classList.toggle("scrolled", window.scrollY > 100);
  });
}

// Рендер товаров
function renderProducts() {
  const container = document.getElementById("products-container");
  container.innerHTML = products
    .map(
      (product, index) => `
        <div class="product-card" data-scroll data-scroll-delay="${
          index * 100
        }">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-card-content">
                <h3>${product.name}</h3>
                <p>${product.price} ₴</p>
                <button onclick="addToCart(${product.id})">В корзину</button>
            </div>
        </div>
    `
    )
    .join("");
}

// Работа с корзиной
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCartAnimation();
}

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

function showCartAnimation() {
  const cartIcon = document.querySelector(".cart-link");
  cartIcon.style.transform = "scale(1.2)";
  setTimeout(() => (cartIcon.style.transform = "scale(1)"), 500);
}
