import {
  initHeaderBehavior,
  initScrollAnimations,
  preventHorizontalScroll,
  initNewsletterForm,
} from "./utils.js";
import { initCart } from "./cart.js";
import { renderProducts, initSearch, initPopularItems } from "./products.js";

// Initialize the application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize utilities
  preventHorizontalScroll();
  initHeaderBehavior();
  initScrollAnimations();

  // Initialize products
  renderProducts();
  initSearch();
  initPopularItems();

  // Initialize cart
  initCart();

  // Initialize forms
  initNewsletterForm();
});
