// JavaScript for the responsive navbar
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navbarLinks = document.querySelector('.navbar-links');
    
    // Toggle navigation when hamburger is clicked
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navbarLinks.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.navbar-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbarLinks.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = navbarLinks.contains(event.target) || hamburger.contains(event.target);
        
        if (!isClickInsideNavbar && navbarLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navbarLinks.classList.remove('active');
     }
    });
});