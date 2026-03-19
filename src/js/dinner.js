import '../css/dinner.css';

document.addEventListener("DOMContentLoaded", function () {
  const howItWorksButton = document.querySelector(
    'a[href="#request-invitation"]'
  );
  const howItWorksSection = document.getElementById("request-invitation");

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
