const toggleButton = document.getElementById("menu-toggle");
const nav = document.getElementById("site-nav");
const header = document.querySelector(".site-header");

const closeMenu = () => {
  if (!nav || !toggleButton) return;
  nav.classList.remove("open");
  toggleButton.setAttribute("aria-expanded", "false");
};

if (toggleButton && nav) {
  toggleButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    const clickedInsideNav = nav.contains(event.target);
    const clickedToggle = toggleButton.contains(event.target);
    if (!clickedInsideNav && !clickedToggle) closeMenu();
  });
}

window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 50);
});

const revealElements = document.querySelectorAll(
  ".section-header, .project-card, .about-card, .testimonial, .contact-wrap"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  revealElements.forEach((el, index) => {
    el.classList.add("reveal-init");
    el.style.transitionDelay = `${(index % 3) * 0.1}s`;
    observer.observe(el);
  });
} else {
  revealElements.forEach((el) => el.classList.add("reveal"));
}

const supportsCustomCursor =
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (supportsCustomCursor) {
  const cursor = document.createElement("div");
  cursor.className = "cursor-follower";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll("a, button, .project-card, .card").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });
}
