$(document).ready(function() {

  // --- Initialize Bootstrap Tooltips ---
  // Find all elements with data-bs-toggle="tooltip"
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  // Initialize each tooltip
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    // Optional: Add custom class for styling, or other options
    return new bootstrap.Tooltip(tooltipTriggerEl/*, { customClass: 'custom-tooltip' }*/);
  });

  // --- Price Toggle Logic ---
  const monthlyPrices = $('.price-monthly');
  const annualPrices = $('.price-annual');

  $('input[name="priceToggle"]').on('change', function() {
    if ($('#monthly').is(':checked')) {
      // Show monthly, hide annual
      monthlyPrices.removeClass('d-none');
      annualPrices.addClass('d-none');
    } else if ($('#annual').is(':checked')) {
      // Show annual, hide monthly
      monthlyPrices.addClass('d-none');
      annualPrices.removeClass('d-none');
    }
  });

  // --- Table Column Highlighting ---
  const pricingTable = $('#pricingTable');
  // Select only cells within tbody and the plan headers in thead
  const tableCells = pricingTable.find('tbody td, thead th.plan-col');

  tableCells.on('mouseenter', function() {
    const $cell = $(this);
    // Get the column index (works for both thead and tbody cells)
    const colIndex = $cell.index();

    // Ignore the first column (index 0 - feature names)
    if (colIndex === 0) return;

    // Remove highlight from all columns first
    pricingTable.find('th, td').removeClass('highlight-col');

    // Add highlight to the current column (header and body cells)
    // Use index() + 1 because nth-child is 1-based
    pricingTable.find('th:nth-child(' + (colIndex + 1) + '), td:nth-child(' + (colIndex + 1) + ')').addClass('highlight-col');
  });

  // Remove highlight when mouse leaves the entire table area
  pricingTable.on('mouseleave', function() {
    pricingTable.find('th, td').removeClass('highlight-col');
  });

}); // End document ready
