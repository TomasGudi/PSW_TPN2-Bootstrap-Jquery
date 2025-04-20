$(document).ready(function() {

  // --- Initialize AOS (Scroll Reveal) ---
  AOS.init({
    duration: 800, // Animation duration in ms
    once: true,    // Whether animation should happen only once - while scrolling down
    offset: 100    // Offset (in px) from the original trigger point
  });

  // --- Blog Post Filtering ---
  const filterButtons = $('.filter-btn');
  const blogItems = $('.blog-item'); // Select the column divs containing the cards

  filterButtons.on('click', function() {
    const $this = $(this);
    const filterValue = $this.data('filter'); // Get the category from data-filter attribute

    // 1. Update Active Button State
    filterButtons.removeClass('active btn-primary').addClass('btn-outline-secondary');
    $this.addClass('active btn-primary').removeClass('btn-outline-secondary');

    // 2. Filter Logic
    if (filterValue === 'all') {
      // Show all items with a fade effect
      blogItems.fadeOut(200, function() { // Fade out first
          $(this).removeClass('d-none'); // Ensure display property is correct before fading in
      }).fadeIn(300);
    } else {
      // Hide all items first (instantly or with fade)
      blogItems.fadeOut(200).addClass('d-none'); // Add d-none after fadeOut completes

      // Show only items matching the filter category with a fade effect
      // Use .filter() with the class selector
      blogItems.filter('.category-' + filterValue).removeClass('d-none').fadeIn(300);
    }

    // Optional: Re-initialize AOS after filtering if elements change visibility significantly
    // AOS.refresh(); // Might not be necessary with simple fade effects
  });


  // --- Comment Reply Button (Basic Interaction Example) ---
  $('.reply-btn').on('click', function() {
    const $comment = $(this).closest('.comment');
    const author = $comment.find('.comment-author').text();

    // Example: Focus the main comment form and maybe prefill something
    $('#comment-text').focus().val(`@${author} `);

    console.log(`Reply button clicked for comment by ${author}`);
    // In a real application, you might insert a nested form here
    // or handle the reply logic differently.
  });

   // --- Comment Form Submission (Basic Example) ---
   $('#commentForm').on('submit', function(e) {
        e.preventDefault(); // Prevent actual form submission
        const name = $('#comment-name').val();
        const text = $('#comment-text').val();

        if (name.trim() && text.trim()) {
            console.log(`New comment submitted by ${name}: ${text}`);
            // Here you would typically send the data via AJAX
            // and then dynamically add the new comment to the .comment-list

            // Example of adding dynamically (very basic):
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
            const newCommentHtml = `
                <div class="comment d-flex gap-3 mb-4 pb-4 border-bottom" style="display: none;">
                  <div class="comment-avatar flex-shrink-0" data-initials="${initials}"></div>
                  <div class="comment-content flex-grow-1">
                    <strong class="comment-author d-block">${$('<div/>').text(name).html()}</strong>
                    <time class="comment-time text-muted small" datetime="${new Date().toISOString()}">Ahora</time>
                    <p class="my-2">${$('<div/>').text(text).html()}</p>
                    <button class="btn btn-sm btn-link text-decoration-none p-0 reply-btn">Responder</button>
                  </div>
                </div>`;

            $(newCommentHtml).appendTo('.comment-list').fadeIn();

            // Clear the form
            $(this)[0].reset();
        } else {
            alert('Por favor, completa tu nombre y comentario.');
        }
   });


}); // End document ready
