import '../css/microsoft-azure.css';
/* Also pull in product.css for .cta / .hero__actions / isara-btn shared styles */
import '../css/product.css';

/* =============================================
   SMOOTH SCROLL — "See How It Works"
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {
  const link = document.querySelector('a[href="#how-it-works"]');
  const target = document.getElementById('how-it-works');
  if (link && target) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 120, behavior: 'smooth' });
    });
  }
});


/* =============================================
   FAQ ACCORDION
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.ms-azure-faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(function (item) {
    const btn = item.querySelector('.ms-azure-faq-item__btn');
    const answerId = btn.getAttribute('aria-controls');
    const answer = document.getElementById(answerId);
    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      /* Close all first */
      faqItems.forEach(function (other) {
        const otherBtn = other.querySelector('.ms-azure-faq-item__btn');
        const otherAnswerId = otherBtn.getAttribute('aria-controls');
        const otherAnswer = document.getElementById(otherAnswerId);
        otherBtn.setAttribute('aria-expanded', 'false');
        if (otherAnswer) otherAnswer.hidden = true;
      });

      /* Toggle selected — if it was closed, open it */
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });
});
