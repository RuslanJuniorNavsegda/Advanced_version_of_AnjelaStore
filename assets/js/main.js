import { config, utils } from "./config.js";
import { initCart } from "./cart.js";
import { renderProducts, initSearch, initPopularItems } from "./products.js";
import { initAnimations } from "./utils.js";

// Initialize application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Show loading overlay
  const loadingOverlay = document.querySelector("#loadingOverlay");
  if (loadingOverlay) {
    loadingOverlay.style.display = "flex";
  }

  // Initialize animations
  initAnimations();

  // Initialize modules
  initCart();
  renderProducts();
  initSearch();
  initPopularItems();

  // Add loading states to cards
  const productCards = document.querySelectorAll(".product-card");
  const benefitCards = document.querySelectorAll(".benefit-card");
  const sliderSlides = document.querySelectorAll(".slider-slide");

  // Simulate loading delay
  setTimeout(() => {
    productCards.forEach((card) => {
      card.classList.remove("loading");
    });
    benefitCards.forEach((card) => {
      card.classList.remove("loading");
    });
    sliderSlides.forEach((slide) => {
      slide.classList.remove("loading");
    });
  }, 1000);

  // Handle form validation errors
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        utils.showMessage(
          "Пожалуйста, заполните все обязательные поля",
          "error"
        );
      }
    });
  });

  // Handle API errors
  window.addEventListener("error", (e) => {
    if (e.target.tagName === "IMG") {
      utils.showMessage("Ошибка загрузки изображения", "error");
    }
  });

  // Hide loading overlay
  setTimeout(() => {
    if (loadingOverlay) {
      loadingOverlay.style.display = "none";
    }
  }, 1500);
});
