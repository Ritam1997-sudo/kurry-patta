document.addEventListener('DOMContentLoaded', function () {
  /* ---------- MOBILE NAV TOGGLE ---------- */
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
  /* ---------- WHATSAPP FORMS (Contact + Catering) ---------- */
  var waForms = document.querySelectorAll('.whatsapp-form');
  waForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var phoneNumber = form.getAttribute('data-whatsapp');
      if (!phoneNumber) return;
      var lines = [];
      var fields = form.querySelectorAll('input, select, textarea');
      fields.forEach(function (field) {
        var value = (field.value || '').trim();
        if (!value) return; // skip empty/optional fields
        var label = field.getAttribute('data-label') || field.name || 'Detail';
        lines.push(label + ': ' + value);
      });
      if (lines.length === 0) {
        return; // nothing filled in, let native "required" validation handle it
      }
      var messageHeader = form.id === 'cat-enquiry' || form.closest('#enquiry')
        ? 'New catering enquiry from the Kurry Patta website:'
        : 'New enquiry from the Kurry Patta website:';
      var message = messageHeader + '\n\n' + lines.join('\n');
      var waUrl = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
      window.open(waUrl, '_blank', 'noopener');
    });
  });
  /* ---------- GALLERY FILTER ---------- */
  var filterButtons = document.querySelectorAll('.gallery-filter button');
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        galleryItems.forEach(function (item) {
          var category = item.getAttribute('data-category');
          var show = filter === 'all' || category === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }
});
