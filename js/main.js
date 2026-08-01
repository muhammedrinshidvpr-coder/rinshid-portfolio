document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  var menuButton = document.getElementById("menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      mobileNav.setAttribute("aria-hidden", !isOpen);
      menuButton.setAttribute("aria-expanded", isOpen);
      menuButton.querySelector(".material-symbols-outlined").textContent =
        isOpen ? "close" : "menu";
      if (isOpen) {
        mobileNav.querySelector("a")?.focus();
      }
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        mobileNav.setAttribute("aria-hidden", "true");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.querySelector(".material-symbols-outlined").textContent =
          "menu";
      });
    });
  }

  // Contact form: open the visitor's email client with a prefilled message
  var contactForm = document.getElementById("contact-form");
  var contactSuccess = document.getElementById("contact-success");

  if (contactForm && contactSuccess) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = contactForm.elements["name"].value;
      var email = contactForm.elements["email"].value;
      var message = contactForm.elements["message"].value;

      var subject = "Portfolio contact from " + name;
      var body =
        message + "\n\n---\nFrom: " + name + " (" + email + ")";
      var mailtoLink =
        "mailto:muhammedrinshidvpr@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailtoLink;

      contactForm.reset();
      contactForm.classList.add("hidden");
      contactSuccess.classList.add("is-visible");
    });
  }
});
