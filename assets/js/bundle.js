// ====== CONFIG ======
// Colors
const COLORS = {
  primary: "#81d4fa",
  secondary: "#ffab91",
  accent: "#c5e1a5",
  dark: "#455a64",
  light: "#f5f5f5",
};

// Product data
const products = [
  // 0-4 years
  {
    id: 1,
    name: "Боди с мишкой",
    price: 899,
    age: "0-4",
    image: "assets/images/baby1.jpg",
    category: "одежда",
  },
  {
    id: 2,
    name: "Комбинезон зимний",
    price: 2499,
    age: "0-4",
    image: "assets/images/baby2.jpg",
    category: "верхняя одежда",
  },
  {
    id: 3,
    name: "Платье праздничное",
    price: 1799,
    age: "0-4",
    image: "assets/images/baby3.jpg",
    category: "одежда",
  },
  {
    id: 4,
    name: "Футболка с динозавром",
    price: 699,
    age: "0-4",
    image: "assets/images/baby4.jpg",
    category: "одежда",
  },
  {
    id: 13,
    name: "Детские кроссовки",
    price: 1299,
    age: "0-4",
    image: "assets/images/baby_shoes1.jpg",
    category: "обувь",
  },
  {
    id: 14,
    name: "Пинетки мягкие",
    price: 599,
    age: "0-4",
    image: "assets/images/baby_shoes2.jpg",
    category: "обувь",
  },
  {
    id: 15,
    name: "Штанишки с зайчиком",
    price: 799,
    age: "0-4",
    image: "assets/images/baby_pants1.jpg",
    category: "брюки",
  },
  {
    id: 16,
    name: "Теплый свитер",
    price: 1099,
    age: "0-4",
    image: "assets/images/baby_sweater1.jpg",
    category: "свитера",
  },
  // 4-8 years
  {
    id: 5,
    name: "Джинсы с наклейками",
    price: 1499,
    age: "4-8",
    image: "assets/images/kids1.jpg",
    category: "брюки",
  },
  {
    id: 6,
    name: "Платье в цветочек",
    price: 1699,
    age: "4-8",
    image: "assets/images/kids2.jpg",
    category: "одежда",
  },
  {
    id: 7,
    name: "Куртка демисезонная",
    price: 2799,
    age: "4-8",
    image: "assets/images/kids3.jpg",
    category: "верхняя одежда",
  },
  {
    id: 8,
    name: "Футболка с героями",
    price: 899,
    age: "4-8",
    image: "assets/images/kids4.jpg",
    category: "одежда",
  },
  {
    id: 17,
    name: "Кроссовки спортивные",
    price: 1599,
    age: "4-8",
    image: "assets/images/kids_shoes1.jpg",
    category: "обувь",
  },
  {
    id: 18,
    name: "Ботинки осенние",
    price: 1899,
    age: "4-8",
    image: "assets/images/kids_shoes2.jpg",
    category: "обувь",
  },
  {
    id: 19,
    name: "Брюки школьные",
    price: 1299,
    age: "4-8",
    image: "assets/images/kids_pants1.jpg",
    category: "брюки",
  },
  {
    id: 20,
    name: "Свитер с оленями",
    price: 1499,
    age: "4-8",
    image: "assets/images/kids_sweater1.jpg",
    category: "свитера",
  },
  // 8-12 years
  {
    id: 9,
    name: "Спортивный костюм",
    price: 2499,
    age: "8-12",
    image: "assets/images/teen1.jpg",
    category: "одежда",
  },
  {
    id: 10,
    name: "Джинсовая юбка",
    price: 1399,
    age: "8-12",
    image: "assets/images/teen2.jpg",
    category: "одежда",
  },
  {
    id: 11,
    name: "Толстовка с капюшоном",
    price: 1899,
    age: "8-12",
    image: "assets/images/teen3.jpg",
    category: "свитера",
  },
  {
    id: 12,
    name: "Школьная форма",
    price: 3499,
    age: "8-12",
    image: "assets/images/teen4.jpg",
    category: "одежда",
  },
  {
    id: 21,
    name: "Кеды высокие",
    price: 1799,
    age: "8-12",
    image: "assets/images/teen_shoes1.jpg",
    category: "обувь",
  },
  {
    id: 22,
    name: "Зимние ботинки",
    price: 2599,
    age: "8-12",
    image: "assets/images/teen_shoes2.jpg",
    category: "обувь",
  },
  {
    id: 23,
    name: "Брюки утепленные",
    price: 1699,
    age: "8-12",
    image: "assets/images/teen_pants1.jpg",
    category: "брюки",
  },
  {
    id: 24,
    name: "Вязаный свитер",
    price: 1599,
    age: "8-12",
    image: "assets/images/teen_sweater1.jpg",
    category: "свитера",
  },
];

// Popular product IDs
const popularProductIds = [1, 5, 9, 2, 6, 10];

// Age groups
const ageGroups = ["0-4", "4-8", "8-12"];

// Helper functions
function getRandomColor(seed) {
  // Generate a consistent color based on product id
  const colors = [
    COLORS.primary, // Primary
    COLORS.secondary, // Secondary
    COLORS.accent, // Accent
    "#e1bee7", // Purple
    "#ffe082", // Yellow
    "#b39ddb", // Light purple
    "#ffcc80", // Orange
    "#a5d6a7", // Green
  ];
  return colors[seed % colors.length];
}

// ====== UTILS ======
// Show a temporary message/notification
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

// Prevent horizontal scrolling
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

// Scroll-based animations using Intersection Observer
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

  // Select all elements with data-scroll attribute
  const animatedElements = document.querySelectorAll("[data-scroll]");

  // Observe each element
  animatedElements.forEach((el) => {
    observer.observe(el);

    // Check if element is already in viewport on page load
    const rect = el.getBoundingClientRect();
    const isInViewport =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    // If already in viewport, add animated class immediately
    if (isInViewport) {
      el.classList.add("animated");
    }
  });

  // Header scroll behavior
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }
}

// Header behavior (hide on scroll down, show on scroll up)
function initHeaderBehavior() {
  let lastScroll = 0;
  const header = document.querySelector(".header");

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

// Initialize newsletter subscription form
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

// ====== CART ======
// Cart state
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const body = document.querySelector("body");

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
    const productCopy = { ...product, quantity: 1 };
    cart.push(productCopy);
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

function renderCart() {
  const container = document.getElementById("cartItems");
  if (!container) return;

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
  const countElement = document.getElementById("cart-count");
  if (countElement) {
    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    countElement.textContent = count;
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

// ====== PRODUCTS ======
// Render all products grouped by age
function renderProducts() {
  ageGroups.forEach((age) => {
    const container = document.querySelector(`[data-age="${age}"]`);
    if (!container) return;

    const filteredProducts = products.filter((p) => p.age === age);
    renderProductsToContainer(container, filteredProducts);

    // Initialize category filters for this age group
    initCategoryFilters(age, filteredProducts);
  });
}

function renderProductsToContainer(container, products) {
  container.innerHTML = products
    .map(
      (product) => `
          <div class="product-card" data-scroll="slide-up" data-category="${
            product.category
          }">
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
}

// Initialize category filters
function initCategoryFilters(age, products) {
  const section = document.querySelector(`#age-${age}`);
  if (!section) return;

  const filterButtons = section.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const category = this.getAttribute("data-category");
      const container = section.querySelector(".products-grid");

      if (category === "all") {
        // Show all products
        renderProductsToContainer(container, products);
      } else {
        // Filter products by category
        const filteredProducts = products.filter(
          (p) => p.category === category
        );
        renderProductsToContainer(container, filteredProducts);
      }

      // Re-initialize scroll animations for new products
      initScrollAnimationsForElements(
        container.querySelectorAll("[data-scroll]")
      );
    });
  });
}

// Initialize scroll animations for specific elements
function initScrollAnimationsForElements(elements) {
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

  elements.forEach((el) => {
    observer.observe(el);
  });
}

// Initialize search functionality
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

// Filter products based on search query
function filterProducts(query) {
  let foundProducts = false;

  ageGroups.forEach((age) => {
    const container = document.querySelector(`[data-age="${age}"]`);
    if (!container) return;

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
      if (container && age === ageGroups[0]) {
        container.innerHTML = '<div class="no-results">Товары не найдены</div>';
      }
    });
  }
}

// Initialize popular products slider
function initPopularItems() {
  // Get popular products
  const popularProducts = products.filter((product) =>
    popularProductIds.includes(product.id)
  );

  // Create slider container
  const slider = document.getElementById("popularSlider");
  const sliderDotsContainer = document.getElementById("sliderDots");

  if (!slider || !sliderDotsContainer) {
    console.warn("Slider elements not found in the DOM");
    return;
  }

  // If no popular products found
  if (!popularProducts || popularProducts.length === 0) {
    console.warn("No popular products found");
    slider.innerHTML =
      '<div class="no-results">Популярные товары скоро появятся</div>';
    return;
  }

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
  const prevSlide = document.getElementById("prevSlide");
  const nextSlide = document.getElementById("nextSlide");

  if (prevSlide) {
    prevSlide.addEventListener("click", () => changeSlide(-1));
  }
  if (nextSlide) {
    nextSlide.addEventListener("click", () => changeSlide(1));
  }

  // Auto-slideshow
  let slideInterval = setInterval(() => changeSlide(1), 5000);

  // Pause slideshow on hover
  slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
  slider.addEventListener(
    "mouseleave",
    () => (slideInterval = setInterval(() => changeSlide(1), 5000))
  );

  // Current slide index
  window.currentSlide = 0;

  // Function to show a specific slide
  window.showSlide = function (index) {
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
    window.currentSlide = index;
  };

  // Function to change slide (prev/next)
  window.changeSlide = function (direction) {
    const slides = document.querySelectorAll(".slider-slide");
    let newIndex = window.currentSlide + direction;

    // Loop back to first/last slide if needed
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;

    window.showSlide(newIndex);
  };
}

// Expose functions to global scope
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;
window.showSlide = showSlide;
window.changeSlide = changeSlide;

// Initialize smooth scrolling for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      // Skip if it's the cart link
      if (this.classList.contains("cart-link")) {
        toggleCart();
        return;
      }

      if (targetId === "#") {
        // If it's just a # link, scroll to top
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Initialize the application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, starting initialization...");

  try {
    // Initialize utilities
    preventHorizontalScroll();
    console.log("Horizontal scroll prevention initialized");

    initHeaderBehavior();
    console.log("Header behavior initialized");

    initScrollAnimations();
    console.log("Scroll animations initialized");

    // Initialize smooth scrolling
    initSmoothScroll();
    console.log("Smooth scrolling initialized");

    // Initialize products
    renderProducts();
    console.log("Products rendered");

    initSearch();
    console.log("Search initialized");

    initPopularItems();
    console.log("Popular items initialized");

    // Initialize cart
    initCart();
    console.log("Cart initialized");

    // Initialize forms
    initNewsletterForm();
    console.log("Newsletter form initialized");

    console.log("AnjelaKids store initialized successfully!");
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});
