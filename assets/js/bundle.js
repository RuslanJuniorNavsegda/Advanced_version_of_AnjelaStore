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

// Initialize scroll animations
function initScrollAnimations() {
  const scrollElements = document.querySelectorAll("[data-scroll]");

  if (scrollElements.length === 0) {
    console.log("No scroll animation elements found");
    return;
  }

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        // Once animation is triggered, no need to observe anymore
        observer.unobserve(entry.target);
      }
    });
  }, options);

  scrollElements.forEach((el) => {
    observer.observe(el);
  });

  console.log(
    `Initialized scroll animations for ${scrollElements.length} elements`
  );
}

// Initialize header behavior
function initHeaderBehavior() {
  const header = document.querySelector(".header");
  if (!header) {
    console.error("Header element not found");
    return;
  }

  // Add scrolled class when scrolling down
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Check initial scroll position
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  }
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

function toggleCart() {
  const cartModal = document.getElementById("cartModal");
  if (!cartModal) {
    console.error("Cart modal not found");
    return;
  }

  // Always refresh cart contents when toggling
  renderCart();

  // Toggle visibility with animation
  cartModal.classList.toggle("active");

  // Toggle body scrolling to prevent background scrolling when cart is open
  document.body.classList.toggle("no-scroll");

  // Log for debugging
  console.log(
    "Cart toggled:",
    cartModal.classList.contains("active") ? "opened" : "closed"
  );
}

function initCart() {
  // Load saved cart from localStorage
  loadCart();

  // Add click handler to cart icon in header
  const cartLink = document.querySelector(".cart-link");
  if (cartLink) {
    cartLink.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent event bubbling
      toggleCart();
    });
  } else {
    console.error("Cart icon not found");
  }

  // Add click handler to close button
  const closeCartBtn = document.querySelector(".close-cart");
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", function () {
      toggleCart();
    });
  }

  // Close cart when clicking outside the content
  const cartModal = document.getElementById("cartModal");
  if (cartModal) {
    cartModal.addEventListener("click", function (e) {
      // Only close if clicking on the backdrop (not the content)
      if (e.target === cartModal) {
        toggleCart();
      }
    });
  }

  // Initialize cart contents and counter
  renderCart();
  updateCartCount();
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

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

  // Animate cart icon
  const cartIcon = document.querySelector(".cart-link i");
  if (cartIcon) {
    cartIcon.classList.add("cart-pulse");
    setTimeout(() => {
      cartIcon.classList.remove("cart-pulse");
    }, 700);
  }
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
  if (!container) {
    console.error("Cart items container not found");
    return;
  }

  // Calculate total cost
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // Empty cart message
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Ваша корзина пуста</p>
        <small>Добавьте товары, чтобы продолжить покупки</small>
      </div>
    `;

    const totalElement = document.getElementById("cartTotal");
    if (totalElement) {
      totalElement.textContent = "0 ₽";
    }
    return;
  }

  // Clear container before adding items
  container.innerHTML = "";

  // Add each cart item with staggered animation
  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.style.animationDelay = `${index * 0.05}s`;

    let itemImage;
    if (item.image) {
      itemImage = `background-image: url('${item.image}')`;
    } else {
      itemImage = `background-color: ${item.color || getRandomColor(item.id)}`;
    }

    itemElement.innerHTML = `
      <div class="cart-item-img" style="${itemImage}">
        ${!item.image ? `<span>${item.name.charAt(0)}</span>` : ""}
      </div>
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">${item.price} ₽</div>
        <span class="cart-item-category">${item.category}</span>
      </div>
      <div class="quantity-controls">
        <button class="quantity-btn" onclick="removeFromCart(${item.id})">
          <i class="fas fa-minus"></i>
        </button>
        <span class="quantity">${item.quantity || 1}</span>
        <button class="quantity-btn" onclick="addToCart(${item.id})">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    `;

    container.appendChild(itemElement);
  });

  // Update total price
  const totalElement = document.getElementById("cartTotal");
  if (totalElement) {
    totalElement.textContent = `${total} ₽`;

    // Add animation to total when updated
    totalElement.classList.add("total-updated");
    setTimeout(() => {
      totalElement.classList.remove("total-updated");
    }, 500);
  }

  // Make sure checkout button has event listener
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    // Remove any existing event listeners
    const newCheckoutBtn = checkoutBtn.cloneNode(true);
    checkoutBtn.parentNode.replaceChild(newCheckoutBtn, checkoutBtn);

    // Add new event listener
    newCheckoutBtn.addEventListener("click", initiateCheckout);
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
        <button class="back-to-cart" id="backToCart"><i class="fas fa-arrow-left"></i> Назад</button>
        <button class="complete-order" id="completeOrder"><i class="fas fa-check"></i> Оформить заказ</button>
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
// Render products in product grids
function renderProducts() {
  // Get all product grid containers
  const productGrids = document.querySelectorAll(".products-grid");

  productGrids.forEach((grid) => {
    const age = grid.dataset.age;
    // Filter products by age
    const ageProducts = products.filter((product) => product.age === age);

    // Clear current content
    grid.innerHTML = "";

    // Check if there are products for this age
    if (ageProducts.length === 0) {
      grid.innerHTML = `<div class="no-products">
        <i class="fas fa-box-open"></i>
        <p>Нет товаров для этой возрастной группы</p>
      </div>`;
      return;
    }

    // Add products to grid
    ageProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.dataset.category = product.category;

      // Determine product image
      let productImage = "";
      if (product.image) {
        productImage = `<div class="product-img" style="background-image: url('${product.image}')"></div>`;
      } else {
        // Use a colored placeholder with the first letter
        const bgColor = product.color || getRandomColor(product.id);
        productImage = `
          <div class="product-img product-placeholder" style="background-color: ${bgColor}">
            <span>${product.name.charAt(0)}</span>
          </div>
        `;
      }

      productCard.innerHTML = `
        ${productImage}
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <div class="product-details">
            <span class="product-price">${product.price} ₽</span>
            <span class="product-category">${product.category}</span>
          </div>
          <button class="add-to-cart" onclick="addToCart(${product.id})">
            <i class="fas fa-cart-plus"></i> В корзину
          </button>
        </div>
      `;

      grid.appendChild(productCard);
    });

    // Initialize filter buttons for this grid
    const filterBtns = grid
      .closest(".age-section")
      .querySelectorAll(".filter-btn");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const category = this.dataset.category;

        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // Filter products
        const productCards = grid.querySelectorAll(".product-card");
        productCards.forEach((card) => {
          if (category === "all" || card.dataset.category === category) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
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
          p.price.toString().includes(query) ||
          p.category.toLowerCase().includes(query))
      );
    });

    if (filteredProducts.length > 0) {
      foundProducts = true;
    }

    // Use the same renderProductsToContainer function for consistency
    renderProductsToContainer(container, filteredProducts);

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
        container.innerHTML =
          '<div class="no-results"><i class="fas fa-search"></i> Товары не найдены</div>';
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
          <p class="product-category">Категория: ${product.category}</p>
          <p class="product-age">Возраст: ${product.age} лет</p>
          <button class="add-to-cart" onclick="addToCart(${
            product.id
          })"><i class="fas fa-shopping-cart"></i> В корзину</button>
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

// Function to add all products from a category to cart
function addAllToCart(age, category = null) {
  // Filter products by age and optionally by category
  let filteredProducts = products.filter((product) => product.age === age);

  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  if (filteredProducts.length === 0) {
    showNotification("Нет товаров для добавления в корзину", "error");
    return;
  }

  // Add each product to cart
  let addedCount = 0;
  filteredProducts.forEach((product) => {
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      // If product exists, increment quantity
      if (!cart[existingItemIndex].quantity) {
        cart[existingItemIndex].quantity = 1;
      }
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new product with quantity 1
      const productCopy = { ...product, quantity: 1 };
      cart.push(productCopy);
    }
    addedCount++;
  });

  // Save to localStorage
  saveCart();

  // Update cart UI
  updateCartCount();
  renderCart();

  // Show confirmation
  showNotification(`Добавлено товаров: ${addedCount}`, "success");

  // Animate cart icon
  const cartIcon = document.querySelector(".cart-link i");
  if (cartIcon) {
    cartIcon.classList.add("cart-pulse");
    setTimeout(() => {
      cartIcon.classList.remove("cart-pulse");
    }, 700);
  }
}

// Expose functions to global scope
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;
window.showSlide = showSlide;
window.changeSlide = changeSlide;
window.addAllToCart = addAllToCart;

// Initialize smooth scrolling for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // Skip for cart link
      if (this.classList.contains("cart-link")) return;

      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) {
        console.error(`Target element ${targetId} not found`);
        return;
      }

      // Get header height for offset
      const headerHeight = document.querySelector(".header").offsetHeight;
      const yOffset = -headerHeight - 10; // Extra padding

      const y =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });

      // Add active class to current nav link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
}

/**
 * Shows a notification message to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, info)
 */
function showNotification(message, type = "info") {
  if (!message) {
    console.error("Notification message is required");
    return;
  }

  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notificationMessage");

  if (!notification || !notificationMessage) {
    // Fallback to alert if notification elements not found
    console.error("Notification elements not found, falling back to alert");
    alert(message);
    return;
  }

  // Set the message
  notificationMessage.textContent = message;

  // Remove all classes and add the type class
  notification.className = "notification";
  notification.classList.add(`notification-${type}`);

  // Show the notification
  notification.classList.add("show");

  // Hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
      console.log("Cart loaded from localStorage:", cart.length, "items");
    } catch (e) {
      console.error("Error parsing cart from localStorage:", e);
      cart = [];
    }
  } else {
    cart = [];
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ====== ADMIN PANEL ======
function initAdminPanel() {
  // Admin button
  const adminBtn = document.getElementById("adminBtn");
  const adminModal = document.getElementById("adminModal");
  const closeAdminBtn = document.querySelector(".close-admin");

  if (adminBtn && adminModal) {
    // Toggle admin panel
    adminBtn.addEventListener("click", function () {
      adminModal.classList.add("active");
      renderAdminProducts(); // Populate products list
    });

    // Close admin panel
    if (closeAdminBtn) {
      closeAdminBtn.addEventListener("click", function () {
        adminModal.classList.remove("active");
      });
    }

    // Close when clicking outside
    adminModal.addEventListener("click", function (e) {
      if (e.target === adminModal) {
        adminModal.classList.remove("active");
      }
    });

    // Add product form
    const addProductForm = document.getElementById("addProductForm");
    if (addProductForm) {
      addProductForm.addEventListener("submit", function (e) {
        e.preventDefault();
        addNewProduct();
      });
    }
  }
}

// Add a new product
function addNewProduct() {
  // Get form values
  const name = document.getElementById("productName").value;
  const price = parseInt(document.getElementById("productPrice").value);
  const age = document.getElementById("productAge").value;
  const category = document.getElementById("productCategory").value;
  const color = document.getElementById("productColor").value;

  // Validate inputs
  if (!name || !price || !age || !category) {
    showNotification("Пожалуйста, заполните все поля", "error");
    return;
  }

  // Generate a new ID (max + 1)
  const newId = Math.max(...products.map((p) => p.id), 0) + 1;

  // Create new product object
  const newProduct = {
    id: newId,
    name: name,
    price: price,
    age: age,
    category: category,
    color: color, // Store custom color
  };

  // Add to products array
  products.push(newProduct);

  // Save to localStorage
  saveProducts();

  // Refresh admin products list
  renderAdminProducts();

  // Refresh displayed products
  renderProducts();

  // Reset form
  document.getElementById("addProductForm").reset();

  // Show success message
  showNotification(`Товар "${name}" успешно добавлен`, "success");
}

// Render products in admin panel
function renderAdminProducts() {
  const container = document.getElementById("adminProductsList");
  if (!container) return;

  // Sort products by ID
  const sortedProducts = [...products].sort((a, b) => b.id - a.id);

  // Generate HTML for each product
  container.innerHTML = sortedProducts
    .map(
      (product) => `
    <div class="admin-product-item" data-id="${product.id}">
      <div class="admin-product-color" style="background-color: ${
        product.color || getRandomColor(product.id)
      }"></div>
      <div class="admin-product-info">
        <div class="admin-product-name">${product.name}</div>
        <div class="admin-product-details">
          <span>${product.price} ₽</span>
          <span>${product.age}</span>
          <span>${product.category}</span>
        </div>
      </div>
      <div class="admin-product-actions">
        <div class="admin-product-action" onclick="editProduct(${product.id})">
          <i class="fas fa-edit"></i>
        </div>
        <div class="admin-product-action" onclick="deleteProduct(${
          product.id
        })">
          <i class="fas fa-trash"></i>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Edit product
function editProduct(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  // Fill form with product data
  document.getElementById("productName").value = product.name;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productAge").value = product.age;
  document.getElementById("productCategory").value = product.category;
  if (product.color) {
    document.getElementById("productColor").value = product.color;
  }

  // Change form submit button
  const submitBtn = document.querySelector(".add-product-btn");
  submitBtn.innerHTML = '<i class="fas fa-save"></i> Сохранить изменения';
  submitBtn.dataset.editId = id;

  // Change form submit behavior
  const form = document.getElementById("addProductForm");
  const originalSubmit = form.onsubmit;

  form.onsubmit = function (e) {
    e.preventDefault();

    // Update product data
    product.name = document.getElementById("productName").value;
    product.price = parseInt(document.getElementById("productPrice").value);
    product.age = document.getElementById("productAge").value;
    product.category = document.getElementById("productCategory").value;
    product.color = document.getElementById("productColor").value;

    // Save changes
    saveProducts();

    // Reset form
    form.reset();
    submitBtn.innerHTML = '<i class="fas fa-plus"></i> Добавить товар';
    delete submitBtn.dataset.editId;

    // Restore original submit behavior
    form.onsubmit = originalSubmit;

    // Refresh products
    renderAdminProducts();
    renderProducts();

    // Show success message
    showNotification(`Товар "${product.name}" успешно обновлен`, "success");
  };
}

// Delete product
function deleteProduct(id) {
  if (!confirm("Вы уверены, что хотите удалить этот товар?")) return;

  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    const productName = products[index].name;
    products.splice(index, 1);

    // Save changes
    saveProducts();

    // Refresh products
    renderAdminProducts();
    renderProducts();

    // Show success message
    showNotification(`Товар "${productName}" успешно удален`, "success");
  }
}

// Save products to localStorage
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

// Load products from localStorage
function loadProducts() {
  const savedProducts = localStorage.getItem("products");
  if (savedProducts) {
    try {
      // Merge with existing products, keeping original ones
      const parsedProducts = JSON.parse(savedProducts);

      // Create a map of existing products by ID
      const existingProductsMap = {};
      products.forEach((p) => {
        existingProductsMap[p.id] = true;
      });

      // Add only new products
      parsedProducts.forEach((p) => {
        if (!existingProductsMap[p.id]) {
          products.push(p);
        }
      });

      console.log("Custom products loaded:", parsedProducts.length);
    } catch (e) {
      console.error("Error parsing products from localStorage:", e);
    }
  }
}

// Expose admin functions
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;

// Initialize the application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, starting initialization...");

  try {
    // Load custom products
    loadProducts();

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

    // Initialize admin panel
    initAdminPanel();
    console.log("Admin panel initialized");

    // Initialize forms
    initNewsletterForm();
    console.log("Newsletter form initialized");

    console.log("AnjelaKids store initialized successfully!");
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});

// Expose functions to global scope for HTML event handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.addAllToCart = addAllToCart;
window.toggleCart = toggleCart;
window.initiateCheckout = initiateCheckout;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
