/* =========================================================
   startsite.ch — Interactions
   Vanilla JS only, no dependencies.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Hero mockup: cursor-driven 3D tilt + glossy highlight ---------- */
  var heroVisual = document.querySelector(".hero-visual");
  var tiltCard = document.getElementById("hero-tilt-card");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var supportsFineHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (heroVisual && tiltCard && !prefersReducedMotion && supportsFineHover) {
    var bounds = null;

    heroVisual.addEventListener("pointerenter", function () {
      bounds = heroVisual.getBoundingClientRect();
      tiltCard.classList.add("is-tilting");
    });

    heroVisual.addEventListener("pointermove", function (e) {
      if (!bounds) bounds = heroVisual.getBoundingClientRect();
      var px = (e.clientX - bounds.left) / bounds.width;
      var py = (e.clientY - bounds.top) / bounds.height;
      var rotateY = (px - 0.5) * 14;
      var rotateX = (0.5 - py) * 10;
      tiltCard.style.transform = "rotateY(" + rotateY.toFixed(2) + "deg) rotateX(" + rotateX.toFixed(2) + "deg)";
      tiltCard.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
      tiltCard.style.setProperty("--my", (py * 100).toFixed(1) + "%");
    });

    heroVisual.addEventListener("pointerleave", function () {
      tiltCard.classList.remove("is-tilting");
      tiltCard.style.transform = "";
      bounds = null;
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mainNav.querySelectorAll("a[data-nav]").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Scroll-spy: highlight active nav link ---------- */
  var navLinks = document.querySelectorAll(".main-nav a[data-nav]");
  var sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ---------- Reveal-on-scroll animations ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 0.06 + "s";
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- FAQ accordion ---------- */
  var triggers = document.querySelectorAll(".accordion-trigger");
  triggers.forEach(function (trigger) {
    var panel = trigger.nextElementSibling;
    trigger.addEventListener("click", function () {
      var isOpen = trigger.getAttribute("aria-expanded") === "true";

      triggers.forEach(function (other) {
        if (other === trigger) return;
        other.setAttribute("aria-expanded", "false");
        other.nextElementSibling.style.maxHeight = null;
      });

      trigger.setAttribute("aria-expanded", isOpen ? "false" : "true");
      panel.style.maxHeight = isOpen ? null : panel.scrollHeight + "px";
    });
  });

  /* ---------- Contact form: mailto fallback ---------- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var need = form.need.value;
      var phone = form.phone ? form.phone.value.trim() : "";
      var message = form.message.value.trim();

      if (!name || !email) {
        status.textContent = "Bitte fülle Name und E-Mail aus.";
        return;
      }

      var subject = "Erstgespräch-Anfrage über startsite.ch – " + need;
      var body =
        "Name: " + name + "\n" +
        "E-Mail: " + email + "\n" +
        (phone ? "Telefon: " + phone + "\n" : "") +
        "Anliegen: " + need + "\n\n" +
        "Nachricht:\n" + (message || "(keine Nachricht angegeben)");

      var mailtoLink =
        "mailto:hallo@startsite.ch" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailtoLink;
      status.textContent = "Dein E-Mail-Programm öffnet sich gleich – falls nicht, ruf uns direkt an oder schreib uns an hallo@startsite.ch.";
    });
  }

  /* ---------- Sticky mobile CTA: show once past hero, hide once contact form is reached ---------- */
  var mobileCtaBar = document.getElementById("mobile-cta-bar");
  var heroSection = document.getElementById("hero");
  var kontaktSection = document.getElementById("kontakt");
  if (mobileCtaBar && heroSection && kontaktSection) {
    var onScrollCta = function () {
      var heroBottom = heroSection.getBoundingClientRect().bottom;
      var kontaktTop = kontaktSection.getBoundingClientRect().top;
      var shouldShow = heroBottom < 0 && kontaktTop > 120;
      mobileCtaBar.classList.toggle("is-visible", shouldShow);
    };
    onScrollCta();
    window.addEventListener("scroll", onScrollCta, { passive: true });
  }
})();
