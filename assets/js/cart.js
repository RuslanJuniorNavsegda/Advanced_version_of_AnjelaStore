import { config, utils } from "./config.js";
import { showMessage } from "./utils.js";

// Cart state
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM elements
const body = document.querySelector("body");

// Cart module
export const cartModule = {
  // Initialize cart
  init() {
    this.loadCart();
    this.updateCartCount();
    this.initCartModal();
    this.initEventListeners();
  },

  // Load cart from localStorage
  loadCart() {
    const savedCart = localStorage.getItem(config.cart.storageKey);
    this.items = savedCart ? JSON.parse(savedCart) : [];
  },

  // Save cart to localStorage
  saveCart() {
    localStorage.setItem(config.cart.storageKey, JSON.stringify(this.items));
  },

  // Update cart count badge
  updateCartCount() {
    const cartCount = document.querySelector("#cart-count");
    if (cartCount) {
      const totalItems = this.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      cartCount.textContent = totalItems;
      cartCount.style.display = totalItems > 0 ? "block" : "none";
    }
  },

  // Initialize cart modal
  initCartModal() {
    const modal = document.getElementById("cartModal");
    const cartBtn = document.querySelector(".cart-link");
    const closeBtn = modal.querySelector(".close-modal");

    if (cartBtn && modal) {
      cartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openCart();
      });
      closeBtn.addEventListener("click", () => this.closeCart());
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeCart();
      });
    }
  },

  // Initialize event listeners
  initEventListeners() {
    window.addEventListener("addToCart", (e) => {
      this.addToCart(e.detail.productId);
    });
  },

  // Open cart modal
  openCart() {
    const modal = document.getElementById("cartModal");
    if (modal) {
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
      this.renderCartItems();
    }
  },

  // Close cart modal
  closeCart() {
    const modal = document.getElementById("cartModal");
    if (modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  },

  // Add item to cart
  addToCart(productId) {
    const product = config.products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = this.items.find((item) => item.id === productId);
    if (existingItem) {
      if (existingItem.quantity < config.cart.maxItems) {
        existingItem.quantity++;
        this.saveCart();
        this.updateCartCount();
        showMessage("Товар добавлен в корзину", "success");
      } else {
        showMessage("Достигнут лимит товаров в корзине", "warning");
      }
    } else {
      this.items.push({
        id: productId,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
      this.saveCart();
      this.updateCartCount();
      showMessage("Товар добавлен в корзину", "success");
    }
  },

  // Remove item from cart
  removeFromCart(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartCount();
    this.renderCartItems();
    showMessage("Товар удален из корзины", "info");
  },

  // Update item quantity
  updateQuantity(productId, quantity) {
    const item = this.items.find((item) => item.id === productId);
    if (item) {
      if (quantity > 0 && quantity <= config.cart.maxItems) {
        item.quantity = quantity;
        this.saveCart();
        this.updateCartCount();
        this.renderCartItems();
      } else if (quantity > config.cart.maxItems) {
        showMessage("Достигнут лимит товаров в корзине", "warning");
      }
    }
  },

  // Render cart items
  renderCartItems() {
    const cartItems = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total");
    if (!cartItems || !cartTotal) return;

    if (this.items.length === 0) {
      cartItems.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-cart"></i>
          <p>Корзина пуста</p>
        </div>
      `;
      cartTotal.style.display = "none";
      return;
    }

    cartItems.innerHTML = this.items
      .map(
        (item) => `
        <div class="cart-item" data-product-id="${item.id}">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="cart-item-content">
            <h3 class="cart-item-title">${item.name}</h3>
            <p class="cart-item-price">${utils.formatPrice(item.price)}</p>
            <div class="cart-item-quantity">
              <button class="quantity-btn minus" data-action="decrease">-</button>
              <input type="number" value="${item.quantity}" min="1" max="${
          config.cart.maxItems
        }" />
              <button class="quantity-btn plus" data-action="increase">+</button>
            </div>
          </div>
          <button class="remove-item">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `
      )
      .join("");

    cartTotal.style.display = "block";
    cartTotal.innerHTML = `
      <div class="cart-total-content">
        <p>Итого:</p>
        <p class="total-price">${utils.formatPrice(this.getTotalPrice())}</p>
      </div>
      <button class="btn btn-primary checkout-btn">
        Оформить заказ
      </button>
    `;

    // Add event listeners
    this.addCartItemEventListeners();
  },

  // Add event listeners to cart items
  addCartItemEventListeners() {
    const cartItems = document.querySelector(".cart-items");
    if (!cartItems) return;

    // Quantity buttons
    cartItems.querySelectorAll(".quantity-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const item = e.target.closest(".cart-item");
        const productId = parseInt(item.dataset.productId);
        const input = item.querySelector("input[type='number']");
        const currentValue = parseInt(input.value);
        const action = e.target.dataset.action;

        if (action === "increase") {
          this.updateQuantity(productId, currentValue + 1);
        } else if (action === "decrease") {
          this.updateQuantity(productId, currentValue - 1);
        }
      });
    });

    // Quantity input
    cartItems.querySelectorAll("input[type='number']").forEach((input) => {
      input.addEventListener("change", (e) => {
        const item = e.target.closest(".cart-item");
        const productId = parseInt(item.dataset.productId);
        const value = parseInt(e.target.value);
        this.updateQuantity(productId, value);
      });
    });

    // Remove buttons
    cartItems.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const item = e.target.closest(".cart-item");
        const productId = parseInt(item.dataset.productId);
        this.removeFromCart(productId);
      });
    });

    // Checkout button
    const checkoutBtn = document.querySelector(".checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => this.checkout());
    }
  },

  // Calculate total price
  getTotalPrice() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  // Checkout
  checkout() {
    // Show loading state
    const checkoutBtn = document.querySelector(".checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Обработка...';
    }

    // Simulate API call
    setTimeout(() => {
      showMessage("Заказ успешно оформлен!", "success");
      this.clearCart();
      this.closeCart();
    }, 1500);
  },

  // Clear cart
  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartCount();
    this.renderCartItems();
  },
};

// Export individual functions for direct use
export const { init: initCart } = cartModule;

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
            <div class="cart-item-img" style="background-color: ${utils.getRandomColor(
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
