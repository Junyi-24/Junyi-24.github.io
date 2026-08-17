/* ==========================================================================
   main.js — Junyi Li academic homepage
   1. Loads section fragments (sections/*.html) into their [data-include]
      shells in index.html. Requires HTTP serving (GitHub Pages or a local
      server such as `python3 -m http.server`); plain file:// is blocked
      by browsers.
   2. Theme toggle (dark / light), persisted in localStorage. The initial
      theme (saved choice or system preference) is applied by a small
      inline script in index.html <head>.
   3. Language toggle (English / Chinese). NOT persisted: the page always
      opens in English; switching applies only until the next reload.
   4. Top navigation: highlights the section currently in view.
   ========================================================================== */

(function () {
  "use strict";

  /* ---- 1. Section fragments --------------------------------------------- */
  document.querySelectorAll("[data-include]").forEach(function (shell) {
    fetch(shell.getAttribute("data-include"))
      .then(function (res) {
        return res.ok ? res.text() : Promise.reject(res.status);
      })
      .then(function (html) {
        shell.innerHTML = html;
      })
      .catch(function () {
        shell.innerHTML =
          '<p class="load-error">Failed to load this section. ' +
          'Please preview via a local HTTP server, e.g. ' +
          '<code>python3 -m http.server</code>.</p>';
      });
  });

  /* ---- 2. Theme toggle --------------------------------------------------- */
  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var root = document.documentElement;
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  /* ---- 3. Language toggle (not persisted — page always opens in English) - */
  var langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var root = document.documentElement;
      if (root.getAttribute("data-lang") === "zh") {
        root.removeAttribute("data-lang");
        root.setAttribute("lang", "en");
      } else {
        root.setAttribute("data-lang", "zh");
        root.setAttribute("lang", "zh");
      }
    });
  }

  /* ---- 4. Nav highlight: mark the link of the section in view -------------- */
  var navSections = Array.prototype.slice.call(
    document.querySelectorAll("main section[id]")
  );
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav-links a[href^="#"]')
  );
  function onScroll() {
    var pos = window.scrollY + 90;                 // just below the fixed nav
    var current = navSections[0];
    for (var i = 0; i < navSections.length; i++) {
      if (navSections[i].offsetTop <= pos) { current = navSections[i]; }
    }
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current.id);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
