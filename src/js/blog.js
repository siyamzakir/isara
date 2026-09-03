import '../css/blog.css';

document.addEventListener("DOMContentLoaded", function () {
  const headerOffset = 120;

  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const targetSection = document.querySelector(href);
      if (!targetSection) return;
      e.preventDefault();
      window.scrollTo({
        top: targetSection.offsetTop - headerOffset,
        behavior: "smooth",
      });
    });
  });

  initBlogPostToc();
  initBlogPostFaq();
});

function initBlogPostToc() {
  const links = document.querySelectorAll(".blog-toc__link");
  if (!links.length) return;

  const sections = [];
  links.forEach(function (link) {
    const id = link.getAttribute("href");
    const section = id ? document.querySelector(id) : null;
    if (section) sections.push({ link: link, section: section });
  });
  if (!sections.length) return;

  function setActive(activeLink) {
    links.forEach(function (link) {
      link.classList.toggle("is-active", link === activeLink);
    });
  }

  const observer = new IntersectionObserver(
    function (entries) {
      const visible = entries
        .filter(function (entry) {
          return entry.isIntersecting;
        })
        .sort(function (a, b) {
          return a.boundingClientRect.top - b.boundingClientRect.top;
        });
      if (!visible.length) return;
      const match = sections.find(function (item) {
        return item.section === visible[0].target;
      });
      if (match) setActive(match.link);
    },
    { rootMargin: "-120px 0px -55% 0px", threshold: 0.1 }
  );

  sections.forEach(function (item) {
    observer.observe(item.section);
  });
}

function initBlogPostFaq() {
  const faqItems = document.querySelectorAll(".blog-faq-item");
  if (!faqItems.length) return;

  faqItems.forEach(function (item) {
    const btn = item.querySelector(".blog-faq-item__btn");
    if (!btn) return;
    const answer = document.getElementById(btn.getAttribute("aria-controls"));
    if (!answer) return;

    btn.addEventListener("click", function () {
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      faqItems.forEach(function (other) {
        const otherBtn = other.querySelector(".blog-faq-item__btn");
        const otherAnswer = otherBtn
          ? document.getElementById(otherBtn.getAttribute("aria-controls"))
          : null;
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        if (otherAnswer) otherAnswer.hidden = true;
      });

      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        answer.hidden = false;
      }
    });
  });
}

function fetchBlogPosts() {
  console.log("Blog posts will be loaded dynamically from database");
}
