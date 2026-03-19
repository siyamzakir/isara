import "../css/solutions.css";

document.addEventListener("DOMContentLoaded", function () {
    const exploreSolutionsButton = document.querySelector("#explore-solutions");
    const capabilitiesSection = document.getElementById("solution-capabilities");

    if (exploreSolutionsButton && capabilitiesSection) {
        exploreSolutionsButton.addEventListener("click", function (e) {
            e.preventDefault();
            const offsetTop = capabilitiesSection.offsetTop - 120;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        });
    }
});
