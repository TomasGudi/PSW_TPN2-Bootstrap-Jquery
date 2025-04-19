$(function() {
    const themeToggleBtn = $('#darkModeToggle');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const bodyElement = $('body'); // Use body or html element for data-bs-theme
    const activeIcon = themeToggleBtn.find('.theme-icon-active');

    // Function to set the theme
    function setTheme(theme) {
        if (theme === 'dark') {
            bodyElement.attr('data-bs-theme', 'dark');
            if (activeIcon.length) activeIcon.text('☀️'); // Sun icon for dark mode
            localStorage.setItem('theme', 'dark');
            // Ensure navbar class reflects theme if needed (Bootstrap usually handles this)
            // $('#mainNavbar').removeClass('navbar-light bg-light').addClass('navbar-dark bg-dark');
        } else {
            bodyElement.attr('data-bs-theme', 'light');
             if (activeIcon.length) activeIcon.text('🌙'); // Moon icon for light mode
            localStorage.setItem('theme', 'light');
            // $('#mainNavbar').removeClass('navbar-dark bg-dark').addClass('navbar-light bg-light');
        }
    }

    // Apply the saved theme or detect preference on load
    if (currentTheme) {
        setTheme(currentTheme);
    } else {
        if (prefersDarkScheme.matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    // Listener for toggle button click
    themeToggleBtn.on('click', function() {
        const newTheme = bodyElement.attr('data-bs-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Optional: Listener for OS theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only change if no user preference is stored
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

});
