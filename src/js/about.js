import '../css/about.css';

document.addEventListener("DOMContentLoaded", function () {
  const aboutMissionButton = document.querySelector('a[href="#about-mission"]');
  const aboutMissionSection = document.getElementById("about-mission");

  if (aboutMissionButton && aboutMissionSection) {
    aboutMissionButton.addEventListener("click", function (e) {
      e.preventDefault();
      const offsetTop = aboutMissionSection.offsetTop - 120;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  }

  const meetLeadershipButton = document.querySelector(
    'a[href="#meet-leadership"]'
  );
  const meetLeadershipSection = document.getElementById("meet-leadership");

  if (meetLeadershipButton && meetLeadershipSection) {
    meetLeadershipButton.addEventListener("click", function (e) {
      e.preventDefault();
      const offsetTop = meetLeadershipSection.offsetTop - 120;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  }
});
