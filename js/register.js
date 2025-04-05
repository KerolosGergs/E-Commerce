// Mock product list for search
const products = [
    { name: "Women's Sneakers", category: "Shoes" },
    { name: "Men's Jacket", category: "Men" },
    { name: "Smart Watch", category: "Watches" },
    { name: "Women's Dress", category: "Women" },
    { name: "Running Shoes", category: "Shoes" }
];

// Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Search modal handling (existing code)
    const searchIcon = document.getElementById('searchIcon');
    const searchModal = document.getElementById('searchModal');
    const closeSearch = document.querySelector('.close-search');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchIcon) searchIcon.addEventListener('click', () => searchModal.style.display = 'block');
    if (closeSearch) closeSearch.addEventListener('click', closeSearchModal);
    window.addEventListener('click', (e) => e.target === searchModal && closeSearchModal());
    
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            searchResults.innerHTML = '';
            
            if (query) {
                const filtered = products.filter(p => 
                    p.name.toLowerCase().includes(query) || 
                    p.category.toLowerCase().includes(query)
                );
                
                if (filtered.length) {
                    filtered.forEach(p => {
                        const item = document.createElement('p');
                        item.textContent = `${p.name} (${p.category})`;
                        searchResults.appendChild(item);
                    });
                } else {
                    searchResults.innerHTML = '<p>No results found.</p>';
                }
            } else {
                searchResults.innerHTML = '<p>Please enter a search term.</p>';
            }
        });
    }

    function closeSearchModal() {
        searchModal.style.display = 'none';
        searchInput.value = '';
        searchResults.innerHTML = '';
    }

    // Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();
            const password = document.getElementById('regPassword').value;
            const message = document.getElementById('registerMessage');

            // Validation
            if (firstName.length < 2) return showMessage(message, 'First name must be at least 2 characters!');
            if (lastName.length < 2) return showMessage(message, 'Last name must be at least 2 characters!');
            if (!/^[0-9]{10}$/.test(phone)) return showMessage(message, 'Phone must be 10 digits!');
            if (address.length < 5) return showMessage(message, 'Address must be at least 5 characters!');
            if (password.length < 6) return showMessage(message, 'Password must be at least 6 characters!');
            if (localStorage.getItem(email)) return showMessage(message, 'User already exists!');

            // Save user
            localStorage.setItem(email, JSON.stringify({
                firstName, lastName, email, phone, address, password
            }));
            
            showMessage(message, 'Registration successful! Redirecting...', true);
            setTimeout(() => window.location.href = 'login.html', 1000);
        });
    }

    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const message = document.getElementById('loginMessage');

            const userData = localStorage.getItem(email);
            if (!userData) return showMessage(message, 'User not found!');
            
            const user = JSON.parse(userData);
            if (user.password !== password) return showMessage(message, 'Incorrect password!');

            // Successful login
            localStorage.setItem('loggedInUser', email);
            showMessage(message, 'Login successful! Redirecting...', true);
            setTimeout(() => window.location.href = 'home.html', 1000);
        });
    }

    // Update UI based on login status
    updateLoginStatus();

    function showMessage(element, text, isSuccess = false) {
        element.textContent = text;
        element.style.color = isSuccess ? 'green' : 'red';
    }
});

// Update login/logout status across all pages
function updateLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginLink = document.getElementById('loginLink');
    const userInfoDiv = document.getElementById('userInfo');

    if (loggedInUser) {
        // Update login link to logout
        if (loginLink) {
            loginLink.textContent = 'Logout';
            loginLink.href = '#';
            loginLink.onclick = (e) => {
                e.preventDefault();
                localStorage.removeItem('loggedInUser');
                window.location.href = 'login.html';
            };
        }

        // Display user info if element exists
        if (userInfoDiv) {
            const userData = localStorage.getItem(loggedInUser);
            if (userData) {
                const user = JSON.parse(userData);
                userInfoDiv.style.display = 'block';
                document.getElementById('displayFirstName').textContent = user.firstName;
                document.getElementById('displayLastName').textContent = user.lastName;
                document.getElementById('displayEmail').textContent = user.email;
            }
        }
    }
}

// Global logout function
window.logout = function() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
};