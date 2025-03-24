// Configuration and Constants
export const COLORS = {
  primary: "#81d4fa",
  secondary: "#ffab91",
  accent: "#c5e1a5",
  dark: "#455a64",
  light: "#f5f5f5",
};

// Product data
export const products = [
  // 0-4 years
  {
    id: 1,
    name: "Боди с мишкой",
    price: 899,
    age: "0-4",
    image: "assets/images/baby1.jpg",
  },
  {
    id: 2,
    name: "Комбинезон зимний",
    price: 2499,
    age: "0-4",
    image: "assets/images/baby2.jpg",
  },
  {
    id: 3,
    name: "Платье праздничное",
    price: 1799,
    age: "0-4",
    image: "assets/images/baby3.jpg",
  },
  {
    id: 4,
    name: "Футболка с динозавром",
    price: 699,
    age: "0-4",
    image: "assets/images/baby4.jpg",
  },

  // 4-8 years
  {
    id: 5,
    name: "Джинсы с наклейками",
    price: 1499,
    age: "4-8",
    image: "assets/images/kids1.jpg",
  },
  {
    id: 6,
    name: "Платье в цветочек",
    price: 1699,
    age: "4-8",
    image: "assets/images/kids2.jpg",
  },
  {
    id: 7,
    name: "Куртка демисезонная",
    price: 2799,
    age: "4-8",
    image: "assets/images/kids3.jpg",
  },
  {
    id: 8,
    name: "Футболка с героями",
    price: 899,
    age: "4-8",
    image: "assets/images/kids4.jpg",
  },

  // 8-12 years
  {
    id: 9,
    name: "Спортивный костюм",
    price: 2499,
    age: "8-12",
    image: "assets/images/teen1.jpg",
  },
  {
    id: 10,
    name: "Джинсовая юбка",
    price: 1399,
    age: "8-12",
    image: "assets/images/teen2.jpg",
  },
  {
    id: 11,
    name: "Толстовка с капюшоном",
    price: 1899,
    age: "8-12",
    image: "assets/images/teen3.jpg",
  },
  {
    id: 12,
    name: "Школьная форма",
    price: 3499,
    age: "8-12",
    image: "assets/images/teen4.jpg",
  },
];

// Popular product IDs
export const popularProductIds = [1, 5, 9, 2, 6, 10];

// Age groups
export const ageGroups = ["0-4", "4-8", "8-12"];

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
