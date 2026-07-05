/* =========================================================
   Maya's Neighborhood Association — Shared Site Script
   Handles: shrinking sticky header, dropdown menus (desktop
   hover + mobile tap), mobile hamburger toggle, tap-to-reveal
   behavior for Contact Us cards, and the image carousel.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Keep page content clear of the fixed header at any size ----------
     The header's height is no longer treated as a fixed assumption. Real
     content can make it taller than --header-height: browser zoom, a
     browser's "text only" zoom, wrapped nav items, a taller client logo,
     or longer translated text. This keeps a live CSS variable in sync with
     the header's true rendered height so main content is never covered,
     at any zoom level. */
  var siteHeader = document.getElementById("siteHeader");
  function syncHeaderHeight() {
    if (!siteHeader) return;
    document.documentElement.style.setProperty("--header-height-actual", siteHeader.offsetHeight + "px");
  }
  if (siteHeader) {
    syncHeaderHeight();
    if (window.ResizeObserver) {
      new ResizeObserver(syncHeaderHeight).observe(siteHeader);
    } else {
      window.addEventListener("resize", syncHeaderHeight);
    }
    window.addEventListener("load", syncHeaderHeight);
  }

  /* ---------- Shrinking sticky header ---------- */
  var body = document.body;
  var SHRINK_AFTER = 60; // px scrolled before header shrinks

  function onScroll() {
    if (window.scrollY > SHRINK_AFTER) {
      body.classList.add("shrunk");
    } else {
      body.classList.remove("shrunk");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile hamburger toggle ---------- */
  var navToggle = document.querySelector(".mobile-nav-toggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = mainNav.classList.toggle("mobile-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.textContent = isOpen ? "✕" : "☰";
    });
  }

  /* ---------- Dropdown menus (click-to-toggle, works for
     both mouse and touch; CSS :hover still works on desktop) --- */
  var dropdownParents = document.querySelectorAll(".nav-list > li.has-dropdown");
  dropdownParents.forEach(function (li) {
    var trigger = li.querySelector(":scope > a, :scope > button.nav-toggle");
    if (!trigger) return;
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", function (e) {
      // On small screens, tapping the parent should open the submenu
      // instead of navigating away immediately.
      if (window.innerWidth <= 880) {
        var alreadyOpen = li.classList.contains("open");
        // Close sibling dropdowns
        dropdownParents.forEach(function (other) {
          if (other !== li) {
            other.classList.remove("open");
            var otherTrigger = other.querySelector(":scope > a, :scope > button.nav-toggle");
            if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
          }
        });
        if (!alreadyOpen) {
          e.preventDefault();
          li.classList.add("open");
          trigger.setAttribute("aria-expanded", "true");
        } else {
          li.classList.remove("open");
          trigger.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // Close mobile menu / dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!mainNav) return;
    if (!mainNav.contains(e.target) && e.target !== navToggle) {
      dropdownParents.forEach(function (li) { li.classList.remove("open"); });
      mainNav.classList.remove("mobile-open");
      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = "☰";
      }
    }
  });

  /* ---------- Contact card tap-to-reveal (touch devices) ---------- */
  var contactCards = document.querySelectorAll(".contact-card");
  contactCards.forEach(function (card) {
    card.setAttribute("tabindex", "0");
    card.addEventListener("click", function () {
      var wasRevealed = card.classList.contains("revealed");
      contactCards.forEach(function (c) { c.classList.remove("revealed"); });
      if (!wasRevealed) card.classList.add("revealed");
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* ---------- Image carousel (supports multiple per page) ---------- */
  document.querySelectorAll(".carousel").forEach(function (carousel) {
    var track = carousel.querySelector(".carousel-track");
    var slides = carousel.querySelectorAll(".carousel-slide");
    var dots = carousel.querySelectorAll(".carousel-dot");
    var prevBtn = carousel.querySelector(".carousel-prev");
    var nextBtn = carousel.querySelector(".carousel-next");
    if (!track || slides.length === 0) return;
    var index = 0;

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (d, di) { d.classList.toggle("active", di === index); });
    }
    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(index - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(index + 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { goTo(i); });
    });
  });
})();
