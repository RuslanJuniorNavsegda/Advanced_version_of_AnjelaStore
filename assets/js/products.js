import { config, utils } from "./config.js";

// Products module
export const productsModule = {
  // Render products by age group
  renderProducts() {
    const ageGroups = config.ageGroups;
    const products = config.products;

    ageGroups.forEach((age) => {
      const container = document.querySelector(
        `.products-grid[data-age="${age}"]`
      );
      if (!container) return;

      // Show loading state
      container.innerHTML = `
        <div class="product-card loading">
          <div class="product-image-container">
            <div class="product-image"></div>
          </div>
          <div class="product-content">
            <h3 class="product-title"></h3>
            <p class="product-price"></p>
          </div>
        </div>
      `.repeat(3);

      // Filter products by age
      const ageProducts = products.filter((product) => product.age === age);

      // Render products
      setTimeout(() => {
        container.innerHTML = ageProducts
          .map(
            (product) => `
            <div class="product-card" data-product-id="${product.id}">
              <div class="product-image-container">
                <img
                  src="${product.image}"
                  alt="${product.name}"
                  class="product-image"
                  loading="lazy"
                />
              </div>
              <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${utils.formatPrice(product.price)}</p>
                <p class="product-age">${product.age} лет</p>
                <button class="btn btn-primary add-to-cart">
                  В корзину
                </button>
              </div>
            </div>
          `
          )
          .join("");

        // Add event listeners
        container.querySelectorAll(".product-card").forEach((card) => {
          const addToCartBtn = card.querySelector(".add-to-cart");
          if (addToCartBtn) {
            addToCartBtn.addEventListener("click", () => {
              const productId = parseInt(card.dataset.productId);
              window.dispatchEvent(
                new CustomEvent("addToCart", { detail: { productId } })
              );
            });
          }
        });
      }, 500);
    });
  },

  // Initialize search functionality
  initSearch() {
    const searchInput = document.querySelector("#searchInput");
    if (!searchInput) return;

    const debouncedSearch = utils.debounce((query) => {
      this.filterProducts(query);
    }, 300);

    searchInput.addEventListener("input", (e) => {
      debouncedSearch(e.target.value.toLowerCase());
    });
  },

  // Filter products based on search query
  filterProducts(query) {
    const products = config.products;
    const containers = document.querySelectorAll(".products-grid");
    let hasResults = false;

    containers.forEach((container) => {
      const cards = container.querySelectorAll(".product-card");
      cards.forEach((card) => {
        const title = card
          .querySelector(".product-title")
          .textContent.toLowerCase();
        const price = card
          .querySelector(".product-price")
          .textContent.toLowerCase();
        const age = card
          .querySelector(".product-age")
          .textContent.toLowerCase();

        if (
          title.includes(query) ||
          price.includes(query) ||
          age.includes(query)
        ) {
          card.style.display = "";
          hasResults = true;
        } else {
          card.style.display = "none";
        }
      });

      // Show no results message
      const noResults = container.querySelector(".no-results");
      if (!hasResults && !noResults) {
        container.insertAdjacentHTML(
          "beforeend",
          `
          <div class="no-results">
            <i class="fas fa-search"></i>
            <p>Товары не найдены</p>
          </div>
        `
        );
      } else if (hasResults && noResults) {
        noResults.remove();
      }
    });
  },

  // Initialize popular items slider
  initPopularItems() {
    const slider = document.querySelector("#popularSlider");
    if (!slider) return;

    const popularProducts = config.products.filter((product) =>
      config.popularProductIds.includes(product.id)
    );

    // Create slider wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "slider-wrapper";
    slider.appendChild(wrapper);

    // Create slides
    popularProducts.forEach((product) => {
      const slide = document.createElement("div");
      slide.className = "slider-slide";
      slide.innerHTML = `
        <div class="product-card">
          <div class="product-image-container">
            <img
              src="${product.image}"
              alt="${product.name}"
              class="product-image"
              loading="lazy"
            />
          </div>
          <div class="product-content">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">${utils.formatPrice(product.price)}</p>
            <button class="btn btn-primary add-to-cart">
              В корзину
            </button>
          </div>
        </div>
      `;
      wrapper.appendChild(slide);
    });

    // Create dots
    const dotsContainer = document.querySelector("#sliderDots");
    if (dotsContainer) {
      popularProducts.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.className = "slider-dot";
        dot.setAttribute("aria-label", `Перейти к слайду ${index + 1}`);
        if (index === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
      });
    }

    // Initialize slider functionality
    let currentSlide = 0;
    const slides = wrapper.querySelectorAll(".slider-slide");
    const dots = dotsContainer.querySelectorAll(".slider-dot");
    const prevBtn = document.querySelector("#prevSlide");
    const nextBtn = document.querySelector("#nextSlide");

    function updateSlider() {
      wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
        dot.setAttribute(
          "aria-current",
          index === currentSlide ? "true" : "false"
        );
      });
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === slides.length - 1;
    }

    // Event listeners
    prevBtn.addEventListener("click", () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateSlider();
      }
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index;
        updateSlider();
      });
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    wrapper.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });

    wrapper.addEventListener("touchmove", (e) => {
      touchEndX = e.touches[0].clientX;
    });

    wrapper.addEventListener("touchend", () => {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSlide < slides.length - 1) {
          currentSlide++;
        } else if (diff < 0 && currentSlide > 0) {
          currentSlide--;
        }
        updateSlider();
      }
    });

    // Auto slide
    let autoSlideInterval = setInterval(() => {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateSlider();
      }
    }, 5000);

    // Pause on hover
    slider.addEventListener("mouseenter", () => {
      clearInterval(autoSlideInterval);
    });

    slider.addEventListener("mouseleave", () => {
      autoSlideInterval = setInterval(() => {
        if (currentSlide < slides.length - 1) {
          currentSlide++;
          updateSlider();
        }
      }, 5000);
    });

    // Add to cart buttons
    wrapper.querySelectorAll(".add-to-cart").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const productId = popularProducts[index].id;
        window.dispatchEvent(
          new CustomEvent("addToCart", { detail: { productId } })
        );
      });
    });
  },
};

// Export individual functions for direct use
export const { renderProducts, initSearch, initPopularItems } = productsModule;
