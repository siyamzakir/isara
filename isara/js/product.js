// Risk Section Tab Functionality
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".risk-tab-btn");
  const tabContents = document.querySelectorAll(".risk_slider_content");

  if (tabButtons.length === 0 || tabContents.length === 0) {
    return;
  }

  // Function to switch tabs
  function switchTab(tabNumber) {
    // Check if the tab is already active
    const selectedButton = document.querySelector(
      `.risk-tab-btn[data-tab="${tabNumber}"]`
    );
    const selectedContent = document.getElementById(
      `slider-content-${tabNumber}`
    );

    if (!selectedButton || !selectedContent) {
      return;
    }

    if (selectedButton.classList.contains("active")) {
      return; // Already active, do nothing
    }

    // Remove active class from all buttons
    tabButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-expanded", "false");
    });

    // Remove active class from all contents
    tabContents.forEach((content) => {
      content.classList.remove("active");
    });

    // Add active class to selected button and content
    // Use requestAnimationFrame to ensure smooth transition
    requestAnimationFrame(() => {
      selectedButton.classList.add("active");
      selectedButton.setAttribute("aria-expanded", "true");
      selectedContent.classList.add("active");
    });
  }

  // Add click event listeners to all tab buttons
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabNumber = this.getAttribute("data-tab");
      if (tabNumber) {
        switchTab(tabNumber);
      }
    });
  });

  // Initialize: Show first tab by default if no active tab exists
  const activeTab = document.querySelector(".risk_slider_content.active");
  if (!activeTab) {
    switchTab("1");
  }
});

// Smooth Scroll to "How It Works" Section
document.addEventListener("DOMContentLoaded", function () {
  const howItWorksButton = document.querySelector('a[href="#how-it-works"]');
  const howItWorksSection = document.getElementById("how-it-works");

  if (howItWorksButton && howItWorksSection) {
    howItWorksButton.addEventListener("click", function (e) {
      e.preventDefault();
      const offsetTop = howItWorksSection.offsetTop - 120;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  }
});
