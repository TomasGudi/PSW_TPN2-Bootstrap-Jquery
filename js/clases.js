// js/clases.js
$(function() {

    // --- Class Gallery Filtering ---
    const filterButtons = $('#clasesFiltros .filter-btn');
    const galleryItems = $('.galeria-clases .clase-item'); // Target the individual items
  
    filterButtons.on('click', function() {
      const filterValue = $(this).data('filter'); // Get filter from data-filter attribute
  
      // Update active button state
      filterButtons.removeClass('active');
      $(this).addClass('active');
  
      // Filter items
      if (filterValue === 'all') {
        // Show all items with a fade effect
        galleryItems.fadeIn(400); // Adjust speed as needed
        // Or use classes for animation:
        // galleryItems.removeClass('item-hidden').addClass('item-visible');
      } else {
        // Hide all items first, then show matching ones
        galleryItems.fadeOut(200).promise().done(function() {
            // Ensure hiding is complete before showing
            galleryItems.filter(filterValue).fadeIn(400);
        });
  
        // Or use classes for animation:
        // galleryItems.addClass('item-hidden');
        // galleryItems.filter(filterValue).removeClass('item-hidden').addClass('item-visible');
      }
    });
  
     $('.clase-item.card').hover(
       function() {
         // Mouse enter
         $(this).find('.card-img-overlay.info').stop(true, true).fadeIn(200);
       },
       function() {
         // Mouse leave
         $(this).find('.card-img-overlay.info').stop(true, true).fadeOut(200);
       }
     );
    // Note: The CSS hover effect is generally smoother and preferred.
    // Ensure the overlay has `display: none;` initially in clases.css if using this jQuery hover.
  
  }); // End of $(document).ready
  