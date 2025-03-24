const products = [
  // 0-4 years
  {
    id: 1,
    name: "Боди с мишкой",
    price: 899,
    age: "0-4",
    image: "images/baby1.jpg",
  },
  {
    id: 2,
    name: "Комбинезон зимний",
    price: 2499,
    age: "0-4",
    image: "images/baby2.jpg",
  },
  {
    id: 3,
    name: "Платье праздничное",
    price: 1799,
    age: "0-4",
    image: "images/baby3.jpg",
  },
  {
    id: 4,
    name: "Футболка с динозавром",
    price: 699,
    age: "0-4",
    image: "images/baby4.jpg",
  },

  // 4-8 years
  {
    id: 5,
    name: "Джинсы с наклейками",
    price: 1499,
    age: "4-8",
    image: "images/kids1.jpg",
  },
  {
    id: 6,
    name: "Платье в цветочек",
    price: 1699,
    age: "4-8",
    image: "images/kids2.jpg",
  },
  {
    id: 7,
    name: "Куртка демисезонная",
    price: 2799,
    age: "4-8",
    image: "images/kids3.jpg",
  },
  {
    id: 8,
    name: "Футболка с героями",
    price: 899,
    age: "4-8",
    image: "images/kids4.jpg",
  },

  // 8-12 years
  {
    id: 9,
    name: "Спортивный костюм",
    price: 2499,
    age: "8-12",
    image: "images/teen1.jpg",
  },
  {
    id: 10,
    name: "Джинсовая юбка",
    price: 1399,
    age: "8-12",
    image: "images/teen2.jpg",
  },
  {
    id: 11,
    name: "Толстовка с капюшоном",
    price: 1899,
    age: "8-12",
    image: "images/teen3.jpg",
  },
  {
    id: 12,
    name: "Школьная форма",
    price: 3499,
    age: "8-12",
    image: "images/teen4.jpg",
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
  initSearch();
  initPopularItems();
  initNewsletterForm();
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
                <div class="product-image-container">
                    <div class="product-image-placeholder" style="background-color: ${getRandomColor(
                      product.id
                    )};">
                        <span>${product.name.charAt(0)}</span>
                    </div>
                </div>
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
  });
}

function getRandomColor(seed) {
  // Generate a consistent color based on product id
  const colors = [
    "#81d4fa", // Primary
    "#ffab91", // Secondary
    "#c5e1a5", // Accent
    "#e1bee7", // Purple
    "#ffe082", // Yellow
    "#b39ddb", // Light purple
    "#ffcc80", // Orange
    "#a5d6a7", // Green
  ];
  return colors[seed % colors.length];
}

function initCart() {
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

function toggleCart() {
  document.getElementById("cartModal").classList.toggle("active");
  body.classList.toggle("no-scroll");
}

function addToCart(productId) {
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

function removeFromCart(productId) {
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

function showMessage(text) {
  // Create message element
  const message = document.createElement("div");
  message.className = "notification";
  message.textContent = text;

  // Add to DOM
  document.body.appendChild(message);

  // Trigger animation
  setTimeout(() => {
    message.classList.add("show");
  }, 10);

  // Remove after animation
  setTimeout(() => {
    message.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(message);
    }, 500);
  }, 3000);
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
                <button class="quantity-btn" onclick="removeFromCart(${
                  item.id
                })">-</button>
                <span class="quantity">${item.quantity || 1}</span>
                <button class="quantity-btn" onclick="addToCart(${
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

function initSearch() {
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase().trim();

      if (query.length > 1) {
        filterProducts(query);
      } else {
        // If search is cleared, show all products
        renderProducts();
      }
    });
  }
}

function filterProducts(query) {
  const ageGroups = ["0-4", "4-8", "8-12"];
  let foundProducts = false;

  ageGroups.forEach((age) => {
    const container = document.querySelector(`[data-age="${age}"]`);
    const filteredProducts = products.filter((p) => {
      return (
        p.age === age &&
        (p.name.toLowerCase().includes(query) ||
          p.price.toString().includes(query))
      );
    });

    if (filteredProducts.length > 0) {
      foundProducts = true;
    }

    container.innerHTML = filteredProducts
      .map(
        (product) => `
            <div class="product-card" data-scroll="slide-up">
                <div class="product-image-container">
                    <div class="product-image-placeholder" style="background-color: ${getRandomColor(
                      product.id
                    )};">
                        <span>${product.name.charAt(0)}</span>
                    </div>
                </div>
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

    // Show no results message if empty
    if (filteredProducts.length === 0) {
      container.innerHTML = "";
    }
  });

  // If no products found at all
  if (!foundProducts) {
    ageGroups.forEach((age) => {
      const container = document.querySelector(`[data-age="${age}"]`);
      if (age === "0-4") {
        container.innerHTML = '<div class="no-results">Товары не найдены</div>';
      }
    });
  }
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

function initPopularItems() {
  // Select popular products (for example, items with ids 1, 5, 9)
  const popularIds = [1, 5, 9, 2, 6, 10];
  const popularProducts = products.filter((product) =>
    popularIds.includes(product.id)
  );

  // Create slider container
  const slider = document.getElementById("popularSlider");
  const sliderDotsContainer = document.getElementById("sliderDots");

  if (!slider) return;

  // Create slider content
  const sliderWrapper = document.createElement("div");
  sliderWrapper.className = "slider-wrapper";

  // Add products to slider
  popularProducts.forEach((product, index) => {
    const slide = document.createElement("div");
    slide.className = "slider-slide";
    slide.style.display = index === 0 ? "flex" : "none";
    slide.dataset.index = index;

    slide.innerHTML = `
      <div class="slider-product-card">
        <div class="product-image-container">
          <div class="product-image-placeholder" style="background-color: ${getRandomColor(
            product.id
          )};">
            <span>${product.name.charAt(0)}</span>
          </div>
        </div>
        <div class="product-content">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">${product.price} ₽</p>
          <p class="product-age">Возраст: ${product.age} лет</p>
          <button class="add-to-cart" onclick="addToCart(${
            product.id
          })">В корзину</button>
        </div>
      </div>
    `;

    sliderWrapper.appendChild(slide);

    // Create dot for this slide
    const dot = document.createElement("div");
    dot.className = `slider-dot ${index === 0 ? "active" : ""}`;
    dot.dataset.index = index;
    dot.addEventListener("click", () => showSlide(index));
    sliderDotsContainer.appendChild(dot);
  });

  slider.appendChild(sliderWrapper);

  // Add event listeners for prev/next buttons
  document
    .getElementById("prevSlide")
    .addEventListener("click", () => changeSlide(-1));
  document
    .getElementById("nextSlide")
    .addEventListener("click", () => changeSlide(1));

  // Auto-slideshow
  let slideInterval = setInterval(() => changeSlide(1), 5000);

  // Pause slideshow on hover
  slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
  slider.addEventListener(
    "mouseleave",
    () => (slideInterval = setInterval(() => changeSlide(1), 5000))
  );

  // Current slide index
  let currentSlide = 0;

  // Function to show a specific slide
  function showSlide(index) {
    const slides = document.querySelectorAll(".slider-slide");
    const dots = document.querySelectorAll(".slider-dot");

    // Hide all slides
    slides.forEach((slide) => (slide.style.display = "none"));

    // Remove active class from all dots
    dots.forEach((dot) => dot.classList.remove("active"));

    // Show selected slide and activate corresponding dot
    slides[index].style.display = "flex";
    dots[index].classList.add("active");

    // Update current slide index
    currentSlide = index;
  }

  // Function to change slide (prev/next)
  function changeSlide(direction) {
    const slides = document.querySelectorAll(".slider-slide");
    let newIndex = currentSlide + direction;

    // Loop back to first/last slide if needed
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;

    showSlide(newIndex);
  }
}

function initNewsletterForm() {
  const form = document.querySelector(".newsletter-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      if (email) {
        // In a real application, this would send the email to a server
        showMessage(
          "Спасибо за подписку! Мы отправили код скидки на ваш email"
        );
        this.reset();
      }
    });
  }
}
