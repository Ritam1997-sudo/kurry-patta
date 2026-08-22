document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isActive = links.classList.toggle('active');
      toggle.classList.toggle('is-open', isActive);
      toggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close the menu whenever a nav link is tapped
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('active');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close the menu if someone taps outside of it
    document.addEventListener('click', function (e) {
      if (!links.classList.contains('active')) return;
      if (!links.contains(e.target) && !toggle.contains(e.target)) {
        links.classList.remove('active');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
