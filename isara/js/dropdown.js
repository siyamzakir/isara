document.addEventListener("DOMContentLoaded", function () {
  const nativeSelect = document.getElementById("inquiry_type_select");
  const customSelect = document.querySelector(".custom-select");
  const customSelectTrigger = document.querySelector(".custom-select-trigger");
  const customSelectValue = document.querySelector(".custom-select-value");
  const customSelectOptions = document.querySelectorAll(
    ".custom-select-option"
  );
  const customSelectArrow = document.querySelector(".custom-select-arrow");

  // Update custom select display when native select changes
  function updateCustomSelect() {
    const selectedOption = nativeSelect.options[nativeSelect.selectedIndex];
    if (selectedOption.value && selectedOption.value !== "") {
      customSelectValue.textContent = selectedOption.text;
      customSelect.classList.remove("placeholder");
    } else {
      customSelectValue.textContent = nativeSelect.options[0].text;
      customSelect.classList.add("placeholder");
    }
  }

  // Toggle dropdown
  customSelectTrigger.addEventListener("click", function (e) {
    e.stopPropagation();
    customSelect.classList.toggle("is-open");
  });

  // Handle option selection
  customSelectOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const value = this.getAttribute("data-value");
      nativeSelect.value = value;
      updateCustomSelect();
      customSelect.classList.remove("is-open");

      // Trigger change event for form validation
      nativeSelect.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove("is-open");
    }
  });

  // Sync with native select changes (if changed programmatically)
  nativeSelect.addEventListener("change", updateCustomSelect);

  // Initialize - ensure first option (placeholder) is selected
  nativeSelect.selectedIndex = 0;
  updateCustomSelect();
});
