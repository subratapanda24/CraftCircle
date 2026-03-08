
window.addEventListener(
  "scroll",
  () => {
    const nav = document.querySelector(".cc-nav");

    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    }
  },
  { passive: true }
);

function toggleMobileNav() {
  const btn = document.querySelector(".cc-hamburger");
  const drawer = document.querySelector(".mobile-nav");

  if (btn && drawer) {
    btn.classList.toggle("open");
    drawer.classList.toggle("open");
  }
}

(function () {

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry, i) => {

        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, i * 80);

          observer.unobserve(entry.target);
        }
      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );


  document
    .querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach((el) => observer.observe(el));

})();