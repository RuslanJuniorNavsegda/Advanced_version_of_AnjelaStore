import {
  products,
  ageGroups,
  popularProductIds,
  getRandomColor,
} from "./config.js";

// Render all products grouped by age
export function renderProducts() {
  ageGroups.forEach((age) => {
    const container = document.querySelector(`[data-age="${age}"]`);
    if (!container) return;

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
                    <button class="add-to-cart" onclick="window.cartModule.addToCart(${
                      product.id
                    })">В корзину</button>
                </div>
            </div>
        `
      )
      .join("");
  });
}

// Initialize search functionality
export function initSearch() {
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
                    <button class="add-to-cart" onclick="window.cartModule.addToCart(${
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
export function initPopularItems() {
  // Get popular products
  const popularProducts = products.filter((product) =>
    popularProductIds.includes(product.id)
  );

  // Create slider container
  const slider = document.getElementById("popularSlider");
  const sliderDotsContainer = document.getElementById("sliderDots");

  if (!slider || !sliderDotsContainer) return;

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
          <button class="add-to-cart" onclick="window.cartModule.addToCart(${
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
    ?.addEventListener("click", () => changeSlide(-1));
  document
    .getElementById("nextSlide")
    ?.addEventListener("click", () => changeSlide(1));

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
