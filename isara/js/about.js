document.addEventListener("DOMContentLoaded", function () {
  const aboutMissionButton = document.querySelector('a[href="#about-mission"]');
  const aboutMissionSection = document.getElementById("about-mission");

  if (aboutMissionButton && aboutMissionSection) {
    aboutMissionButton.addEventListener("click", function (e) {
      e.preventDefault();
      aboutMissionSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
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
      meetLeadershipSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
});
