import "../css/index.css";

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
