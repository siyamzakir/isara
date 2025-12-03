document.addEventListener("DOMContentLoaded", function () {
  const howItWorksButton = document.querySelector(
    'a[href="#request-invitation"]'
  );
  const howItWorksSection = document.getElementById("request-invitation");

  if (howItWorksButton && howItWorksSection) {
    howItWorksButton.addEventListener("click", function (e) {
      e.preventDefault();
      howItWorksSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
});
