// Utility functions
export const utils = {
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

  // Smooth scroll to element
  smoothScroll(target, offset = 0) {
    const element = document.querySelector(target);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  },

  // Prevent horizontal scroll
  preventHorizontalScroll() {
    document.body.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  },

  // Initialize scroll animations
  initScrollAnimations() {
    const elements = document.querySelectorAll("[data-scroll]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animation = entry.target.dataset.scroll;
            entry.target.classList.add(`animate-${animation}`);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    elements.forEach((element) => observer.observe(element));

    // Header scroll behavior
    let lastScroll = 0;
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        header.classList.remove("scroll-up");
        return;
      }

      if (
        currentScroll > lastScroll &&
        !header.classList.contains("scroll-down")
      ) {
        // Scroll Down
        header.classList.remove("scroll-up");
        header.classList.add("scroll-down");
      } else if (
        currentScroll < lastScroll &&
        header.classList.contains("scroll-down")
      ) {
        // Scroll Up
        header.classList.remove("scroll-down");
        header.classList.add("scroll-up");
      }
      lastScroll = currentScroll;
    });
  },

  // Initialize newsletter form
  initNewsletterForm() {
    const form = document.querySelector(".newsletter-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = form.querySelector("input[type='email']").value;
      const submitBtn = form.querySelector("button[type='submit']");

      // Validate email
      if (!this.validateEmail(email)) {
        this.showMessage("Пожалуйста, введите корректный email", "error");
        return;
      }

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Отправка...';

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Show success message
        this.showMessage("Спасибо за подписку!", "success");
        form.reset();
      } catch (error) {
        // Show error message
        this.showMessage("Произошла ошибка. Попробуйте позже.", "error");
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Подписаться";
      }
    });
  },

  // Validate email
  validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },

  // Initialize smooth scroll for anchor links
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = anchor.getAttribute("href");
        this.smoothScroll(target, 80); // 80px offset for header
      });
    });
  },

  // Initialize all animations and behaviors
  initAnimations() {
    this.initScrollAnimations();
    this.initSmoothScroll();
    this.initNewsletterForm();
    this.preventHorizontalScroll();
  },
};

// Export individual functions for direct use
export const { showMessage, smoothScroll, initAnimations } = utils;
