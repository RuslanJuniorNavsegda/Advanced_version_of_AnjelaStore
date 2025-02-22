const products = [
  {
    id: 1,
    name: "Боди с мишкой",
    price: 899,
    age: "0-4",
    image: "images/baby1.jpg",
  },
  {
    id: 2,
    name: "Джинсы с наклейками",
    price: 1499,
    age: "4-8",
    image: "images/kids1.jpg",
  },
  {
    id: 3,
    name: "Спортивный костюм",
    price: 2499,
    age: "8-12",
    image: "images/teen1.jpg",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let lastScroll = 0;
const header = document.querySelector(".header");
const body = document.querySelector("body");

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
  initCart();
  initScrollAnimations();
  initHeaderBehavior();
  preventHorizontalScroll();
});

function preventHorizontalScroll() {
  window.addEventListener("scroll", () => {
    if (window.scrollX !== 0) {
      window.scrollTo(0, window.scrollY);
    }
  });

  document.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        if (touch.clientX > document.documentElement.offsetWidth) {
          e.preventDefault();
        }
      }
    },
    { passive: false }
  );
}

function initHeaderBehavior() {
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });
}

function renderProducts() {
  const ageGroups = ["0-4", "4-8", "8-12"];

  ageGroups.forEach((age) => {
    const container = document.querySelector(`[data-age="${age}"]`);
    const filteredProducts = products.filter((p) => p.age === age);

    container.innerHTML = filteredProducts
      .map(
        (product) => `
            <div class="product-card" data-scroll="slide-up">
                <img class="product-image" src="${product.image}" alt="${product.name}">
                <div class="product-content">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${product.price} ₽</p>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">В корзину</button>
                </div>
            </div>
        `
      )
      .join("");
  });
}

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
  body.classList.toggle("no-scroll");
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
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

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll("[data-scroll]").forEach((el) => {
    observer.observe(el);
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
}
