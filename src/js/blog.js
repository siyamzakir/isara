import '../css/blog.css';

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for anchor links
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href !== "#") {
        const targetSection = document.querySelector(href);
        if (targetSection) {
          e.preventDefault();
          const offsetTop = targetSection.offsetTop - 120;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Blog posts will be loaded dynamically here
  // Example: fetchBlogPosts();
});

// Function placeholder for dynamic blog post loading
// This will be implemented when connecting to the database
function fetchBlogPosts() {
  // TODO: Implement blog posts fetching from database
  console.log('Blog posts will be loaded dynamically from database');
}

