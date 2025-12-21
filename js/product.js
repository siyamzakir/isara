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

// Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  const modalOverlay = document.getElementById("modal-overlay");
  const modalContainer = document.querySelector(".modal-container");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.querySelector(".modal-body");
  const modalClose = document.querySelector(".modal-close");
  const modalButtons = document.querySelectorAll("[data-modal]");

  // Modal content data
  const modalContent = {
    "key-features": {
      title: "KEY FEATURES",
      body: `
        <ul class="modal-list">
          <li>Lets you implement high-performance, standards-based quantum-safe cryptographic algorithms into your products</li>
          <li>Free from copyleft licensed code found in open source libraries, reducing your risk of accidentally exposing your intellectual property to the public domain</li>
          <li>API designed to easily plug in your SHA2, SHA3 or RNG implementations for better performance or hardware support considerations</li>
          <li>Developed by our team of embedded security experts with extensive experience implementing cryptography for real-world applications</li>
          <li>Professional documentation, sample code, and developer support available</li>
        </ul>
      `,
    },
    "supported-algorithms": {
      title: "Supported Algorithms",
      body: `
        <div class="modal-algorithms">
          <div class="modal-algorithm-section">
            <h3 class="modal-section-title">Hash algorithms:</h3>
            <ul class="modal-list">
              <li>SHA2 (Secure Hash Algorithm 2; 256 bit, 384 bit and 512 bit)</li>
              <li>SHA3 (Secure Hash Algorithm 3; 256 bit and 512 bit)</li>
            </ul>
          </div>
          <div class="modal-algorithm-section">
            <h3 class="modal-section-title">Message authentication codes:</h3>
            <ul class="modal-list">
              <li>HMAC (Hash-based Message Authentication Code)</li>
              <li>Poly1305</li>
            </ul>
          </div>
          <div class="modal-algorithm-section">
            <h3 class="modal-section-title">Random number generators:</h3>
            <ul class="modal-list">
              <li>HMAC-DRBG (HMAC Deterministic Random Bit Generator)</li>
            </ul>
          </div>
          <div class="modal-algorithm-section">
            <h3 class="modal-section-title">Key derivation functions:</h3>
            <ul class="modal-list">
              <li>RFC-5869</li>
              <li>NIST SP 800-56A Alternative 1 Concatenation</li>
              <li>PBKDF2 (Password-Based Key Derivation Function 2)</li>
            </ul>
          </div>
          <div class="modal-algorithm-section">
            <h3 class="modal-section-title">Digital signature schemes:</h3>
            <ul class="modal-list">
              <li>ML-DSA</li>
              <li>HSS (Hierarchical Signature System)</li>
              <li>XMSS (eXtended Merkle Signature Scheme)</li>
              <li>SPHINCS+</li>
            </ul>
          </div>
          <div class="modal-algorithm-section">
            <h3 class="modal-section-title">Key encapsulation mechanisms:</h3>
            <ul class="modal-list">
              <li>ML-KEM</li>
              <li>Classic McEliece</li>
            </ul>
          </div>
          <div class="modal-algorithm-section">
            <h3 class="modal-section-title">Symmetric cipher:</h3>
            <ul class="modal-list">
              <li>ChaCha20 symmetric</li>
            </ul>
          </div>
        </div>
      `,
    },
    "system-requirements": {
      title: "System Requirements",
      body: `
        <div class="modal-requirements">
          <div class="modal-requirement-section">
            <h3 class="modal-section-title">Recommended:</h3>
            <ul class="modal-list">
              <li>Linux (Ubuntu 20.04 LTS or newer, Debian 11 or newer; 64 bit platforms)</li>
              <li>macOS 11 or newer</li>
              <li>Windows 10 (64 bit platforms)</li>
            </ul>
          </div>
          <div class="modal-requirement-section">
            <h3 class="modal-section-title">Minimum:</h3>
            <ul class="modal-list">
              <li>Linux (Ubuntu 18.04 LTS or newer, Debian 9 or newer; 64 bit platforms)</li>
              <li>macOS 10.14 or newer (64-bit Intel)</li>
              <li>Windows 10 or newer (64-bit platforms)</li>
            </ul>
          </div>
          <div class="modal-requirement-section">
            <h3 class="modal-section-title">Supported CPUs by OS:</h3>
            <ul class="modal-list">
              <li>Linux: x86_64, skylake</li>
              <li>macOS: x86_64, skylake</li>
              <li>Windows: x86_64, skylake</li>
            </ul>
          </div>
          <p class="modal-note">Additional architecture-specific builds can also be created upon request; please contact ISARA's sales team.</p>
        </div>
      `,
    },
  };

  // Function to open modal
  function openModal(modalId) {
    const content = modalContent[modalId];
    if (!content) return;

    modalTitle.textContent = content.title;
    modalBody.innerHTML = content.body;
    modalOverlay.setAttribute("aria-hidden", "false");
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    // Focus management
    modalClose.focus();
  }

  // Function to close modal
  function closeModal() {
    modalOverlay.setAttribute("aria-hidden", "true");
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Event listeners for modal buttons
  modalButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal");
      if (modalId) {
        openModal(modalId);
      }
    });
  });

  // Close modal on close button click
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  // Close modal on overlay click
  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
});
