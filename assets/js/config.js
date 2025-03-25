// Configuration and Constants
export const COLORS = {
  primary: "#81d4fa",
  secondary: "#ffab91",
  accent: "#c5e1a5",
  dark: "#455a64",
  light: "#f5f5f5",
};

// Configuration and Data
const config = {
  // Product data
  products: [
    {
      id: 1,
      name: "Комплект для новорожденного",
      price: 2500,
      age: "0-4",
      category: "одежда",
      description: "Мягкий комплект из натурального хлопка для новорожденных",
      image: "assets/images/products/newborn-set.jpg",
    },
    {
      id: 2,
      name: "Детские кроссовки",
      price: 1800,
      age: "4-8",
      category: "обувь",
      description: "Удобные кроссовки с ортопедической стелькой",
      image: "assets/images/products/sneakers.jpg",
    },
    {
      id: 3,
      name: "Джинсы",
      price: 2200,
      age: "8-12",
      category: "брюки",
      description: "Классические джинсы с эластичной вставкой",
      image: "assets/images/products/jeans.jpg",
    },
    {
      id: 4,
      name: "Свитер с оленями",
      price: 1900,
      age: "4-8",
      category: "свитера",
      description: "Теплый свитер с милым принтом оленей",
      image: "assets/images/products/sweater.jpg",
    },
    {
      id: 5,
      name: "Платье принцессы",
      price: 2800,
      age: "4-8",
      category: "одежда",
      description: "Красивое платье с оборками и стразами",
      image: "assets/images/products/dress.jpg",
    },
    {
      id: 6,
      name: "Спортивный костюм",
      price: 2100,
      age: "8-12",
      category: "одежда",
      description: "Удобный спортивный костюм для активных детей",
      image: "assets/images/products/tracksuit.jpg",
    },
  ],

  // Age groups
  ageGroups: ["0-4", "4-8", "8-12"],

  // Popular product IDs
  popularProductIds: [1, 2, 4, 5],

  // Categories
  categories: ["все", "одежда", "обувь", "брюки", "свитера"],

  // Cart settings
  cart: {
    maxItems: 10,
    storageKey: "anjelaKidsCart",
  },

  // API settings
  api: {
    baseUrl: "https://api.angelakids.ru",
    timeout: 5000,
  },

  // Animation settings
  animation: {
    duration: 300,
    easing: "ease-in-out",
  },
};

// Helper functions
export function getRandomColor(seed) {
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

// Utility functions
const utils = {
  // Generate random color based on string
  getRandomColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 90%)`;
  },

  // Format price with currency
  formatPrice(price) {
    return `${price.toLocaleString()} ₽`;
  },

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Show message
  showMessage(message, type = "info") {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${type}`;
    messageElement.innerHTML = `
      <i class="fas ${this.getMessageIcon(type)}"></i>
      <span>${message}</span>
    `;
    document.body.appendChild(messageElement);

    // Trigger animation
    requestAnimationFrame(() => {
      messageElement.classList.add("show");
    });

    // Remove after delay
    setTimeout(() => {
      messageElement.classList.remove("show");
      setTimeout(() => messageElement.remove(), 300);
    }, 3000);
  },

  // Get message icon based on type
  getMessageIcon(type) {
    switch (type) {
      case "success":
        return "fa-check-circle";
      case "error":
        return "fa-exclamation-circle";
      case "warning":
        return "fa-exclamation-triangle";
      default:
        return "fa-info-circle";
    }
  },
};

// Make config and utils available globally
window.config = config;
window.utils = utils;

// Export for modules
export { config, utils };
