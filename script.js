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

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
  initScrollAnimations();
});

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".category-card, .product-card")
    .forEach((el) => observer.observe(el));

  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
}

function renderProducts() {
  const container = document.getElementById("products-container");
  container.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
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
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  animateCart();
}

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

function animateCart() {
  const cartIcon = document.querySelector(".cart-link");
  cartIcon.style.transform = "scale(1.2)";
  setTimeout(() => (cartIcon.style.transform = "scale(1)"), 300);
}
