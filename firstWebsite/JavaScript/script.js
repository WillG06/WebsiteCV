document.addEventListener('DOMContentLoaded', function() {
  const sliderButton = document.getElementById('slider-button');
  const bookmarkMenu = document.getElementById('bookmark-menu');

  // Open menu on button hover
  sliderButton.addEventListener('mouseover', function() {
      bookmarkMenu.classList.add('active');
  });

  // Keep menu open while hovering over it
  bookmarkMenu.addEventListener('mouseover', function() {
      bookmarkMenu.classList.add('active');
  });

  // Hide menu when not hovering over button or menu
  document.addEventListener('mouseover', function(event) {
      if (!sliderButton.contains(event.target) && !bookmarkMenu.contains(event.target)) {
          bookmarkMenu.classList.remove('active');
      }
  });
});
