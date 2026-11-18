const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/*===== MENU SHOW =====*/
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

function setMenuOpen(isOpen) {
  navMenu.classList.toggle("show", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
}

navToggle.addEventListener("click", () => {
  setMenuOpen(!navMenu.classList.contains("show"));
});

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  setMenuOpen(false);
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 70;
    const sectionId = current.getAttribute("id");
    const link = document.querySelector(
      ".nav__menu a[href*=" + sectionId + "]"
    );

    if (link) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add("active-link");
      } else {
        link.classList.remove("active-link");
      }
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*===== SMOOTH SCROLL =====*/
navLink.forEach((n) =>
  n.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    linkAction(); // close menu after clicking
  })
);

/*===== SCROLL REVEAL ANIMATION =====*/
/* The hero is left out so it is visible as soon as the page loads. */
if (!prefersReducedMotion) {
  const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2000,
    delay: 200,
  });

  sr.reveal(".section-title", {});
  sr.reveal(".about__text, .skills__container, .edu__container", {
    interval: 200,
  });
  sr.reveal(".work__card", { interval: 200 });
  sr.reveal(".contact__icon", { delay: 400, interval: 200 });
}
