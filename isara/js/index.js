"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const whyQuantumNowBtn = document.getElementById("why-quantum-now-btn");
  const howItWorksSection = document.getElementById("how-we-solve-section");

  if (whyQuantumNowBtn && howItWorksSection) {
    whyQuantumNowBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const offsetTop = howItWorksSection.offsetTop - 120;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  }
});

(function () {
  function initContinuousSliders() {
    var sliders = document.querySelectorAll(".customer-slider .slide-track");
    sliders.forEach(function (track) {
      // avoid duplicating multiple times
      if (track.dataset.dup === "true") return;

      // duplicate track content for seamless loop
      track.innerHTML = track.innerHTML + track.innerHTML;
      track.dataset.dup = "true";

      // compute a duration proportional to number of original slides
      var slides = track.querySelectorAll(".slide");
      var total = slides.length / 2 || slides.length; // original count
      // base speed: 3s per slide, min 20s, max 120s
      var duration = Math.max(20, Math.min(120, Math.round(total * 3)));
      track.style.animation = "scroll " + duration + "s linear infinite";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContinuousSliders);
  } else {
    initContinuousSliders();
  }
})();

// ========================================
// NAVIGATION BAR JAVASCRIPT
// ========================================

(function () {
  // DOM Elements
  const navbar = document.getElementById("isaraMainNav");
  const toggler = document.getElementById("navbarToggler");
  const collapse = document.getElementById("navbarCollapse");
  const dropdownToggles = document.querySelectorAll("[data-dropdown]");
  const allDropdowns = document.querySelectorAll(".isara-dropdown-menu");
  const navLinks = document.querySelectorAll(".isara-nav-link");

  // Check if mobile viewport
  const isMobile = () => window.innerWidth <= 991;

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  function initMobileToggle() {
    if (!toggler || !collapse) return;

    toggler.addEventListener("click", function () {
      const isExpanded = toggler.getAttribute("aria-expanded") === "true";

      // Toggle aria attributes
      toggler.setAttribute("aria-expanded", !isExpanded);
      toggler.classList.toggle("is-active");
      collapse.classList.toggle("show");

      // Prevent body scroll when menu is open on mobile
      if (isMobile()) {
        document.body.style.overflow = !isExpanded ? "hidden" : "";
      }
    });
  }

  // ========================================
  // DROPDOWN MENU FUNCTIONALITY
  // ========================================
  function initDropdowns() {
    dropdownToggles.forEach((toggle) => {
      const dropdownId = toggle.getAttribute("data-dropdown");
      const dropdown = document.getElementById(`dropdown-${dropdownId}`);
      const navItem = toggle.closest(".isara-nav-item");

      if (!dropdown || !navItem) return;

      // Desktop: Hover to open
      if (!isMobile()) {
        navItem.addEventListener("mouseenter", () => {
          closeAllDropdowns();
          openDropdown(navItem, dropdown);
        });

        navItem.addEventListener("mouseleave", () => {
          closeDropdown(navItem, dropdown);
        });
      }

      // Mobile: Click to toggle
      if (isMobile()) {
        toggle.addEventListener("click", (e) => {
          e.preventDefault();
          const isOpen = dropdown.classList.contains("show");

          if (isOpen) {
            closeDropdown(navItem, dropdown);
          } else {
            closeAllDropdowns();
            openDropdown(navItem, dropdown);
          }
        });
      }

      // Desktop: Click to toggle (alternative behavior)
      if (!isMobile()) {
        toggle.addEventListener("click", (e) => {
          e.preventDefault();
          const isOpen = dropdown.classList.contains("show");

          if (isOpen) {
            closeDropdown(navItem, dropdown);
          } else {
            closeAllDropdowns();
            openDropdown(navItem, dropdown);
          }
        });
      }
    });
  }

  // ========================================
  // DROPDOWN HELPER FUNCTIONS
  // ========================================
  function openDropdown(navItem, dropdown) {
    navItem.classList.add("show");
    dropdown.classList.add("show", "animate", "slideIn");
    const toggle = navItem.querySelector(".dropdown-toggle");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
    }
  }

  function closeDropdown(navItem, dropdown) {
    navItem.classList.remove("show");
    dropdown.classList.remove("show");
    const toggle = navItem.querySelector(".dropdown-toggle");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
  }

  function closeAllDropdowns() {
    allDropdowns.forEach((dropdown) => {
      const navItem = dropdown.closest(".isara-nav-item");
      if (navItem) {
        closeDropdown(navItem, dropdown);
      }
    });
  }

  // ========================================
  // CLOSE MENU ON OUTSIDE CLICK
  // ========================================
  function initOutsideClick() {
    document.addEventListener("click", (e) => {
      // Close dropdowns if clicking outside
      if (!isMobile()) {
        const clickedDropdown = e.target.closest(".isara-nav-item.dropdown");
        if (!clickedDropdown) {
          closeAllDropdowns();
        }
      }

      // Close mobile menu if clicking outside
      if (isMobile() && collapse.classList.contains("show")) {
        const clickedNav = e.target.closest(".isara-navbar");
        const clickedToggler = e.target.closest(".isara-navbar__toggler");

        if (!clickedNav && !clickedToggler) {
          closeMobileMenu();
        }
      }
    });
  }

  // ========================================
  // CLOSE MOBILE MENU
  // ========================================
  function closeMobileMenu() {
    if (collapse && collapse.classList.contains("show")) {
      toggler.classList.remove("is-active");
      collapse.classList.remove("show");
      toggler.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      closeAllDropdowns();
    }
  }

  // ========================================
  // NAVBAR SCROLL BEHAVIOR
  // ========================================
  function initScrollBehavior() {
    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener("scroll", () => {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > scrollThreshold) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      lastScroll = currentScroll;
    });
  }

  // ========================================
  // CLOSE MOBILE MENU ON RESIZE
  // ========================================
  function initResizeHandler() {
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!isMobile() && collapse.classList.contains("show")) {
          closeMobileMenu();
        }
        closeAllDropdowns();
      }, 250);
    });
  }

  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================
  function initKeyboardNavigation() {
    // Escape key to close menus
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeAllDropdowns();
        if (isMobile() && collapse.classList.contains("show")) {
          closeMobileMenu();
          toggler.focus();
        }
      }
    });

    // Arrow keys for dropdown navigation
    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("keydown", (e) => {
        const dropdownId = toggle.getAttribute("data-dropdown");
        const dropdown = document.getElementById(`dropdown-${dropdownId}`);
        const navItem = toggle.closest(".isara-nav-item");

        if (!dropdown) return;

        if (e.key === "ArrowDown" || e.key === "Enter") {
          e.preventDefault();
          if (!dropdown.classList.contains("show")) {
            closeAllDropdowns();
            openDropdown(navItem, dropdown);
          }
          const firstItem = dropdown.querySelector(".isara-dropdown-item");
          if (firstItem) firstItem.focus();
        }
      });
    });

    // Tab navigation for dropdown items
    allDropdowns.forEach((dropdown) => {
      const items = dropdown.querySelectorAll(".isara-dropdown-item");
      items.forEach((item, index) => {
        item.addEventListener("keydown", (e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = items[index + 1] || items[0];
            next?.focus();
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prev = items[index - 1] || items[items.length - 1];
            prev?.focus();
          } else if (e.key === "Escape") {
            e.preventDefault();
            closeDropdown(dropdown.closest(".isara-nav-item"), dropdown);
            const toggle = dropdown
              .closest(".isara-nav-item")
              ?.querySelector(".dropdown-toggle");
            toggle?.focus();
          }
        });
      });
    });
  }

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  function initSmoothScroll() {
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");

        // If it's an anchor link, smooth scroll
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            // Close mobile menu after navigation
            if (isMobile()) {
              closeMobileMenu();
            }
          }
        }
      });
    });
  }

  // ========================================
  // INITIALIZE ALL FUNCTIONALITY
  // ========================================
  function init() {
    initMobileToggle();
    initDropdowns();
    initOutsideClick();
    initScrollBehavior();
    initResizeHandler();
    initKeyboardNavigation();
    initSmoothScroll();
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose closeMobileMenu for external use if needed
  window.isaraNavbar = {
    closeMobileMenu: closeMobileMenu,
    closeAllDropdowns: closeAllDropdowns,
  };
})();
