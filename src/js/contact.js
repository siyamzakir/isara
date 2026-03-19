import '../css/contact.css';
document.addEventListener("DOMContentLoaded", function () {
  const bookDemoBtn = document.getElementById("book-demo-btn");
  const bookingFormSection = document.getElementById("booking-form-section");

  if (bookDemoBtn && bookingFormSection) {
    bookDemoBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const offsetTop = bookingFormSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  }
});
