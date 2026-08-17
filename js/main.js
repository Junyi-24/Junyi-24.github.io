/* ==========================================================================
   main.js — Junyi Li academic homepage
   1. Loads section fragments (sections/*.html) into their [data-include]
      shells in index.html. Requires HTTP serving (GitHub Pages or a local
      server such as `python3 -m http.server`); plain file:// is blocked
      by browsers.
   2. Theme toggle (dark / light), persisted in localStorage. The initial
      theme (saved choice or system preference) is applied by a small
      inline script in index.html <head>.
   3. Language toggle (English / Chinese), persisted in localStorage as
      "lang". Initial language is also applied by the inline script.
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

  /* ---- 3. Language toggle ------------------------------------------------- */
  var langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var root = document.documentElement;
      if (root.getAttribute("data-lang") === "zh") {
        root.removeAttribute("data-lang");
        root.setAttribute("lang", "en");
        localStorage.setItem("lang", "en");
      } else {
        root.setAttribute("data-lang", "zh");
        root.setAttribute("lang", "zh");
        localStorage.setItem("lang", "zh");
      }
    });
  }
})();
