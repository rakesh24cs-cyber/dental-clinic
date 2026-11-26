document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");

  menuToggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const cards = [...document.querySelectorAll(".testimonial-card")];
  let current = 0;
  const showCard = (index) => {
    cards.forEach((card, i) => card.classList.toggle("active", i === index));
  };
  document.querySelector(".carousel-button.next")?.addEventListener("click", () => {
    current = (current + 1) % cards.length;
    showCard(current);
  });
  document.querySelector(".carousel-button.prev")?.addEventListener("click", () => {
    current = (current - 1 + cards.length) % cards.length;
    showCard(current);
  });

  const form = document.querySelector(".contact-form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements.name;
    const email = form.elements.email;
    const phone = form.elements.phone;
    const status = form.querySelector(".form-status");
    let valid = true;

    [name, email, phone].forEach((field) => {
      field.classList.toggle("invalid", !field.value.trim());
      if (!field.value.trim()) valid = false;
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() && !emailPattern.test(email.value.trim())) {
      email.classList.add("invalid");
      valid = false;
    }

    if (!valid) {
      status.textContent = "Please complete all required fields with valid details.";
      return;
    }

    status.textContent = "Thank you! Your message has been received.";
    form.reset();
  });

  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".primary-nav a")];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55%", threshold: 0 });
  sections.forEach((section) => observer.observe(section));
});
