// js/auth.js - Specific to our login/register buttons only
document.addEventListener('DOMContentLoaded', function() {
    // Only run if our elements exist
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (!loginBtn || !registerBtn) return;
    
    // Ripple effect function
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add("ripple");
        
        const ripple = button.getElementsByClassName("ripple")[0];
        if (ripple) ripple.remove();
        
        button.appendChild(circle);
    }
    
    // Add event listeners
    loginBtn.addEventListener('click', function(e) {
        createRipple(e);
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 300);
    });
    
    registerBtn.addEventListener('click', function(e) {
        createRipple(e);
        setTimeout(() => {
            window.location.href = 'register.html';
        }, 300);
    });
});