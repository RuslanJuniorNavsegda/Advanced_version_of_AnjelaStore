import { products, getRandomColor } from "./config.js";
import { showMessage } from "./utils.js";

// Cart state
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM elements
const body = document.querySelector("body");

export function initCart() {
  document.querySelector(".cart-link").addEventListener("click", toggleCart);
  document.querySelector(".close-cart").addEventListener("click", toggleCart);
  document.getElementById("cartModal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("cartModal")) toggleCart();
  });

  // Add checkout button listener
  document
    .querySelector(".checkout-btn")
    .addEventListener("click", initiateCheckout);

  renderCart();
}

export function toggleCart() {
  document.getElementById("cartModal").classList.toggle("active");
  body.classList.toggle("no-scroll");
}

export function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  // Check if product already exists in cart
  const existingItemIndex = cart.findIndex((item) => item.id === productId);

  if (existingItemIndex !== -1) {
    // If product exists, increment quantity
    if (!cart[existingItemIndex].quantity) {
      cart[existingItemIndex].quantity = 1; // Initialize if doesn't exist
    }
    cart[existingItemIndex].quantity += 1;
  } else {
    // Add new product with quantity 1
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();

  // Show confirmation message
  showMessage(`${product.name} добавлен в корзину`);
}

export function removeFromCart(productId) {
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      // Reduce quantity if more than 1
      cart[itemIndex].quantity -= 1;
    } else {
      // Remove completely if quantity is 1
      cart.splice(itemIndex, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  container.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <div class="cart-item-img" style="background-color: ${getRandomColor(
              item.id
            )};">
                <span>${item.name.charAt(0)}</span>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price} ₽</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="window.cartModule.removeFromCart(${
                  item.id
                })">-</button>
                <span class="quantity">${item.quantity || 1}</span>
                <button class="quantity-btn" onclick="window.cartModule.addToCart(${
                  item.id
                })">+</button>
            </div>
        </div>
    `
    )
    .join("");

  document.getElementById("cartTotal").textContent = `${total} ₽`;

  // Show empty cart message
  if (cart.length === 0) {
    container.innerHTML = '<div class="empty-cart">Ваша корзина пуста</div>';
  }
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  document.getElementById("cart-count").textContent = count;
}

function initiateCheckout() {
  if (cart.length === 0) {
    showMessage("Добавьте товары в корзину");
    return;
  }

  // Create checkout form
  const cartModal = document.getElementById("cartModal");
  const cartContent = document.querySelector(".cart-modal-content");

  // Save current cart content
  const originalContent = cartContent.innerHTML;

  // Create checkout form
  cartContent.innerHTML = `
    <div class="checkout-form">
      <h3 class="checkout-title">Оформление заказа</h3>
      
      <div class="form-group">
        <label for="name">Ваше имя</label>
        <input type="text" id="name" placeholder="Введите ваше имя" required>
      </div>
      
      <div class="form-group">
        <label for="phone">Телефон</label>
        <input type="tel" id="phone" placeholder="+7 (___) ___-__-__" required>
      </div>
      
      <div class="form-group">
        <label for="address">Адрес доставки</label>
        <textarea id="address" placeholder="Введите адрес доставки" required></textarea>
      </div>
      
      <div class="form-group">
        <label for="payment">Способ оплаты</label>
        <select id="payment" required>
          <option value="" disabled selected>Выберите способ оплаты</option>
          <option value="card">Банковская карта</option>
          <option value="cash">Наличные при получении</option>
        </select>
      </div>
      
      <div class="checkout-summary">
        <div class="summary-item">
          <span>Товары (${cart.reduce(
            (total, item) => total + (item.quantity || 1),
            0
          )})</span>
          <span>${cart.reduce(
            (sum, item) => sum + item.price * (item.quantity || 1),
            0
          )} ₽</span>
        </div>
        <div class="summary-item">
          <span>Доставка</span>
          <span>350 ₽</span>
        </div>
        <div class="summary-item total">
          <span>Итого</span>
          <span>${
            cart.reduce(
              (sum, item) => sum + item.price * (item.quantity || 1),
              0
            ) + 350
          } ₽</span>
        </div>
      </div>
      
      <div class="checkout-buttons">
        <button class="back-to-cart" id="backToCart">Назад в корзину</button>
        <button class="complete-order" id="completeOrder">Оформить заказ</button>
      </div>
    </div>
  `;

  // Add event listeners for new buttons
  document.getElementById("backToCart").addEventListener("click", () => {
    cartContent.innerHTML = originalContent;

    // Reattach checkout button listener
    document
      .querySelector(".checkout-btn")
      .addEventListener("click", initiateCheckout);

    // Update cart display
    renderCart();
  });

  document
    .getElementById("completeOrder")
    .addEventListener("click", completeOrder);
}

function completeOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const payment = document.getElementById("payment").value;

  // Simple validation
  if (!name || !phone || !address || !payment) {
    showMessage("Пожалуйста, заполните все поля");
    return;
  }

  // Order successful
  const cartContent = document.querySelector(".cart-modal-content");

  cartContent.innerHTML = `
    <div class="order-success">
      <div class="success-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3>Заказ успешно оформлен!</h3>
      <p>Спасибо за покупку, ${name}!</p>
      <p>Номер вашего заказа: ${Math.floor(Math.random() * 1000000)}</p>
      <p>Мы отправили детали заказа на ваш телефон.</p>
      <button class="continue-shopping" id="continueShopping">Продолжить покупки</button>
    </div>
  `;

  // Clear cart
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  // Add event listener for continue shopping button
  document.getElementById("continueShopping").addEventListener("click", () => {
    toggleCart();
    // Reset cart modal for next opening
    setTimeout(() => {
      document.querySelector(".cart-modal-content").innerHTML = `
        <div class="cart-header">
          <h3 class="cart-title">Ваша корзина</h3>
          <button class="close-cart">&times;</button>
        </div>
        <div class="cart-items" id="cartItems"></div>
        <div class="cart-footer">
          <div class="cart-total">
            <span>Итого:</span>
            <span id="cartTotal">0 ₽</span>
          </div>
          <button class="checkout-btn">Перейти к оплате</button>
        </div>
      `;

      // Reattach event listeners
      document
        .querySelector(".close-cart")
        .addEventListener("click", toggleCart);
      document
        .querySelector(".checkout-btn")
        .addEventListener("click", initiateCheckout);
      renderCart();
    }, 500);
  });
}

// Expose cart methods to global scope for HTML event handlers
window.cartModule = { addToCart, removeFromCart, toggleCart };
