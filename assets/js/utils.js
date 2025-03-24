// Utility functions

// Show a temporary message/notification
export function showMessage(text) {
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
export function preventHorizontalScroll() {
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
export function initScrollAnimations() {
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

  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// Header behavior (hide on scroll down, show on scroll up)
export function initHeaderBehavior() {
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
export function initNewsletterForm() {
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
