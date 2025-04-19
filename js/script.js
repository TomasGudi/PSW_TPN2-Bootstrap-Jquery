// Wait for the DOM to be fully loaded
$(function() {

  // --- Navbar Shrink Effect ---
  // Add background color to navbar when scrolling down
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 50) {
      $('#mainNavbar').addClass('navbar-scrolled');
    } else {
      $('#mainNavbar').removeClass('navbar-scrolled');
    }
  });
  // Add a CSS rule for .navbar-scrolled if you want a different bg on scroll
  // e.g. in style.css:
  // .navbar-scrolled { background-color: var(--bs-body-bg) !important; box-shadow: 0 4px 6px rgba(0,0,0,.05); }


  // --- Hero Section Animation ---
  // Fade in elements sequentially after a short delay
  const heroTitle = $('.hero-title');
  const heroSubtitle = $('.hero-subtitle');
  const heroButton = $('.hero-button');

  setTimeout(() => {
    heroTitle.fadeIn(1000, function() {
      heroSubtitle.slideDown(500, function() {
        heroButton.fadeIn(500);
      });
    });
  }, 500); // Start animation after 500ms


  // --- Card Hover Effect (jQuery Animation Example) ---
  // Note: The CSS :hover effect is often smoother. This is just for demo.
  $('.custom-card').hover(
    function() {
      // Mouse enter: Animate slightly up and increase shadow
      $(this).stop(true, false).animate({ // stop(clearQueue, jumpToEnd)
        'margin-top': '-5px',
        // 'box-shadow': '0 12px 20px rgba(0, 0, 0, 0.15)' // Can animate shadow with plugins
      }, 200);
    },
    function() {
      // Mouse leave: Animate back to original position
      $(this).stop(true, false).animate({
        'margin-top': '0px',
        // 'box-shadow': '0 8px 15px rgba(0, 0, 0, 0.1)'
      }, 200);
    }
  );
  // Make sure cards have position: relative if animating margin/top/left etc.
  // Add this to style.css: .custom-card { position: relative; }


  // --- Animated Counter (using CountUp.js) ---
  // Function to start counters when they become visible
  function startCounters() {
    const counters = $('.contador .numero');
    if (counters.length === 0) return; // No counters found

    counters.each(function() {
      const element = $(this)[0]; // Get the DOM element
      const targetCount = $(this).data('count');

      // Check if CountUp is defined and element exists
      if (typeof CountUp !== 'undefined' && element && targetCount !== undefined) {
        const options = {
          duration: 2.5, // Animation duration in seconds
          separator: '.', // Optional: thousands separator
          enableScrollSpy: true, // Start animation when element scrolls into view
          scrollSpyDelay: 50, // Delay in ms after scrolling into view
          scrollSpyOnce: true // Only run the animation once
        };
        const countUp = new CountUp(element, targetCount, options);
        if (!countUp.error) {
          // countUp.start(); // Not needed if using scrollSpy
        } else {
          console.error("CountUp Error:", countUp.error);
          // Fallback: just display the number if CountUp fails
          $(this).text(targetCount);
        }
      } else {
         // Fallback if CountUp is not loaded or data is missing
         if(targetCount !== undefined) $(this).text(targetCount);
         console.warn("CountUp library not found or element/data missing for:", element);
      }
    });
  }

  // Initialize counters (CountUp's scrollSpy will handle the trigger)
  startCounters();


  // --- Testimonial Carousel Initialization (Bootstrap 5) ---
  const testimonialCarouselElement = document.querySelector('#testimonialCarousel');
  if (testimonialCarouselElement) {
    const testimonialCarousel = new bootstrap.Carousel(testimonialCarouselElement, {
      interval: 6000, // Time between slides in ms
      pause: 'hover', // Pause slideshow on mouse hover
      wrap: true // Allow carousel to loop continuously
    });
  }


  // --- Footer Newsletter Form Validation & Spinner ---
  const newsletterForm = $('#newsletterForm');
  const submitButton = $('#newsletterSubmitBtn');
  const spinner = $('#newsletterSpinner');
  const successMessage = $('#newsletterSuccess');

  newsletterForm.on('submit', function(event) {
    event.preventDefault(); // Prevent default browser submission
    event.stopPropagation(); // Stop Bootstrap's default event handling if needed

    // Hide previous messages
    successMessage.addClass('d-none');

    if (this.checkValidity() === false) {
      // If form is invalid, let Bootstrap handle showing errors
      newsletterForm.addClass('was-validated');
    } else {
      // Form is valid, show spinner and simulate submission
      newsletterForm.removeClass('was-validated'); // Clear previous validation state
      const originalButtonText = submitButton.html();
      submitButton.prop('disabled', true);
      spinner.removeClass('d-none'); // Show spinner
      submitButton.html(`
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Enviando...
      `);

      // Simulate network request
      setTimeout(function() {
        // Re-enable button and restore text
        submitButton.prop('disabled', false);
        submitButton.html(originalButtonText);
        spinner.addClass('d-none'); // Hide spinner

        // Show success message
        successMessage.removeClass('d-none');

        // Reset the form
        newsletterForm[0].reset();
        newsletterForm.removeClass('was-validated');

        // Optional: Hide success message after a few seconds
        setTimeout(function() {
            successMessage.addClass('d-none');
        }, 4000);

      }, 2000); // Simulate 2 seconds delay
    }
  });

  // --- Footer: Update Copyright Year ---
  $('#currentYear').text(new Date().getFullYear());

}); // End of $(document).ready
